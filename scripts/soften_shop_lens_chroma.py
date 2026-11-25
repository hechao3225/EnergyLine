"""火花透镜（icon-lens）蓝色降饱和迁移 + 两份 manifest / 联系表同步。

背景：商店补给图里只有火花透镜的蓝色玻璃没跟上 2026-11-19 的全站彩度柔化，
       在奶白卡片上偏刺眼；本轮只压蓝色相带（195°–292°）的 Lab C*，
       金色镜框、珍珠环、紫色手柄和 alpha 全部不动。

幂等：产物始终从白底生成源按商店管线（prepare_shop_assets.build_assets）重新生成，
重复执行只会得到同一张 WebP。

用法：
    SHOP_ASSETS_PYTHON=/path/to/python3.12 python scripts/soften_shop_lens_chroma.py
"""
from __future__ import annotations

import hashlib
import json
import sys
from io import BytesIO
from pathlib import Path

import numpy as np

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))

from PIL import Image

import prepare_shop_assets as P
from park_chroma import rgb_to_lab

DEST = P.ASSET_DIR
SHOP_MANIFEST = P.MANIFEST_PATH
MAIN_MANIFEST = DEST / "manifest.json"
CONTACT_SHEET = P.CONTACT_SHEET_PATH
NAME = "icon-lens"
HUE_LO, HUE_HI = 195.0, 292.0


def blue_chroma(data: bytes) -> dict[str, float]:
    with Image.open(BytesIO(data)) as image:
        rgba = np.asarray(image.convert("RGBA"), dtype=np.float32) / 255
    lab = rgb_to_lab(rgba[..., :3])
    chroma = np.hypot(lab[..., 1], lab[..., 2])
    hue = (np.degrees(np.arctan2(lab[..., 2], lab[..., 1])) + 360.0) % 360.0
    mask = (rgba[..., 3] > 0.5) & (hue > HUE_LO) & (hue < HUE_HI)
    return {
        "mean": round(float(chroma[mask].mean()), 1),
        "p95": round(float(np.percentile(chroma[mask], 95)), 1),
    }


def main() -> None:
    path = DEST / f"{NAME}.webp"
    before_data = path.read_bytes() if path.is_file() else b""
    assets, metadata = P.build_assets()
    lens = assets[NAME]
    data = P.asset_webp_bytes(NAME, lens)
    changed = not before_data or before_data != data
    if changed:
        path.write_bytes(data)

    with Image.open(BytesIO(data)) as encoded:
        alpha_bbox, corner_alpha = P.alpha_metadata(encoded)
    digest = hashlib.sha256(data).hexdigest()

    shop = json.loads(SHOP_MANIFEST.read_text(encoding="utf-8"))
    shop["generated"] = "2026-11-22"
    entry = next(item for item in shop["assets"] if item["name"] == NAME)
    entry.update(
        {
            "size": list(lens.size),
            "has_alpha": True,
            "alpha_bbox": alpha_bbox,
            "corner_alpha": corner_alpha,
            "bytes": len(data),
            "sha256": digest,
            "processing": metadata[NAME]["processing"],
        }
    )
    SHOP_MANIFEST.write_text(
        json.dumps(shop, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )

    sheet_assets = {}
    for item in shop["assets"]:
        with Image.open(ROOT / item["file"]) as image:
            sheet_assets[item["name"]] = image.convert("RGBA")
    sheet_data = P.png_bytes(P.build_contact_sheet(shop, sheet_assets))
    sheet_changed = (
        not CONTACT_SHEET.is_file() or CONTACT_SHEET.read_bytes() != sheet_data
    )
    if sheet_changed:
        CONTACT_SHEET.write_bytes(sheet_data)

    main_manifest = json.loads(MAIN_MANIFEST.read_text(encoding="utf-8"))
    shared = next(item for item in main_manifest if item.get("name") == NAME)
    shared.update(
        {
            "size": entry["size"],
            "alpha_bbox": entry["alpha_bbox"],
            "corner_alpha": entry["corner_alpha"],
            "bytes": entry["bytes"],
            "sha256": entry["sha256"],
            "processing": entry["processing"],
        }
    )
    MAIN_MANIFEST.write_text(
        json.dumps(main_manifest, ensure_ascii=False, indent=2), encoding="utf-8"
    )

    print(
        json.dumps(
            {
                "asset": NAME,
                "webp_changed": changed,
                "bytes": {"before": len(before_data), "after": len(data)},
                "sha256": digest,
                "blue_C": {"before": blue_chroma(before_data), "after": blue_chroma(data)},
                "contact_sheet_changed": sheet_changed,
                "params": P.LENS_BLUE_SOFT,
                "processing": entry["processing"],
            },
            ensure_ascii=False,
        )
    )


if __name__ == "__main__":
    main()
