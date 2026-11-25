"""把商店补给图标 icon-coil 迁移为 icon-step（应急线圈 → 加步电池）。

- 源图替换为 docs/UI设计稿2.0/generated-sources/shop/icon-step.png，按商店管线重新生成 512 RGBA WebP；
- 删除旧的 public/assets/park/icon-coil.webp；
- 同步 shop-assets.json、主 manifest.json 与联系表（name/file/source/size/alpha/bytes/sha256/processing）。

幂等：产物始终由管线从源图重新生成，重复执行结果一致。

用法：
    SHOP_ASSETS_PYTHON=/path/to/python3.12 python scripts/migrate_shop_step_icon.py
"""
from __future__ import annotations

import hashlib
import json
import sys
from io import BytesIO
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))

from PIL import Image

import prepare_shop_assets as P

DEST = P.ASSET_DIR
SHOP_MANIFEST = P.MANIFEST_PATH
MAIN_MANIFEST = DEST / "manifest.json"
CONTACT_SHEET = P.CONTACT_SHEET_PATH
OLD_NAME = "icon-coil"
NEW_NAME = "icon-step"


def main() -> None:
    assets, metadata = P.build_assets()
    if NEW_NAME not in assets:
        raise SystemExit(f"管线里没有 {NEW_NAME}，先检查 prepare_shop_assets.WHITE_SOURCES")
    image = assets[NEW_NAME]
    data = P.asset_webp_bytes(NEW_NAME, image)
    new_path = DEST / f"{NEW_NAME}.webp"
    changed = not new_path.is_file() or new_path.read_bytes() != data
    if changed:
        new_path.write_bytes(data)

    old_path = DEST / f"{OLD_NAME}.webp"
    removed_old = False
    if old_path.is_file():
        old_path.unlink()
        removed_old = True

    with Image.open(BytesIO(data)) as encoded:
        alpha_bbox, corner_alpha = P.alpha_metadata(encoded)
    digest = hashlib.sha256(data).hexdigest()

    shop = json.loads(SHOP_MANIFEST.read_text(encoding="utf-8"))
    shop["generated"] = "2026-11-22"
    index = next(
        (i for i, item in enumerate(shop["assets"]) if item["name"] in {OLD_NAME, NEW_NAME}),
        None,
    )
    if index is None:
        raise SystemExit(f"shop-assets.json 里找不到 {OLD_NAME}/{NEW_NAME} 条目")
    entry = shop["assets"][index]
    entry.update(
        {
            "name": NEW_NAME,
            "file": f"public/assets/park/{NEW_NAME}.webp",
            "source": metadata[NEW_NAME]["source"],
            "size": list(image.size),
            "has_alpha": True,
            "alpha_bbox": alpha_bbox,
            "corner_alpha": corner_alpha,
            "bytes": len(data),
            "sha256": digest,
            "processing": metadata[NEW_NAME]["processing"],
        }
    )
    SHOP_MANIFEST.write_text(
        json.dumps(shop, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )

    sheet_assets = {}
    for item in shop["assets"]:
        with Image.open(ROOT / item["file"]) as sheet_image:
            sheet_assets[item["name"]] = sheet_image.convert("RGBA")
    sheet_data = P.png_bytes(P.build_contact_sheet(shop, sheet_assets))
    sheet_changed = (
        not CONTACT_SHEET.is_file() or CONTACT_SHEET.read_bytes() != sheet_data
    )
    if sheet_changed:
        CONTACT_SHEET.write_bytes(sheet_data)

    main_manifest = json.loads(MAIN_MANIFEST.read_text(encoding="utf-8"))
    shared = next(
        (item for item in main_manifest if item.get("name") in {OLD_NAME, NEW_NAME}),
        None,
    )
    if shared is None:
        raise SystemExit(f"主 manifest 里找不到 {OLD_NAME}/{NEW_NAME} 条目")
    shared.update(
        {
            "name": NEW_NAME,
            "file": entry["file"],
            "source": entry["source"],
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
                "asset": NEW_NAME,
                "webp_changed": changed,
                "removed_old": removed_old,
                "bytes": len(data),
                "sha256": digest,
                "contact_sheet_changed": sheet_changed,
                "processing": entry["processing"],
            },
            ensure_ascii=False,
        )
    )


if __name__ == "__main__":
    main()
