"""校验商店素材的尺寸、透明通道、字节数和 sha256。"""

from __future__ import annotations

import argparse
import hashlib
import json
from importlib import metadata
from pathlib import Path

from PIL import Image

from prepare_shop_assets import build_contact_sheet, png_bytes


PROJECT_ROOT = Path(__file__).resolve().parents[1]
REQUIRED_PILLOW_VERSION = "13.0.0"
CONTACT_SHEET_FILE = "docs/QA/shop-assets-2026-11-20/shop-assets-contact-sheet.png"

EXPECTED_ASSETS = {
    "icon-lens": (512, 512, True),
    "icon-coil": (512, 512, True),
    "outfit-sheep-starlight": (951, 1017, True),
    "outfit-rabbit-starlight": (719, 1024, True),
    "outfit-spirit-starlight": (988, 1015, True),
    "mood-sheep-happy": (144, 100, True),
    "mood-rabbit-happy": (144, 132, True),
    "mood-spirit-happy": (144, 136, True),
    "mood-joy": (512, 256, True),
    "theme-calm-preview": (512, 512, False),
}


def fail(message: str) -> None:
    raise SystemExit(f"失败：{message}")


def require_pillow_version() -> None:
    try:
        installed = metadata.version("Pillow")
    except metadata.PackageNotFoundError:
        installed = "未安装"
    if installed != REQUIRED_PILLOW_VERSION:
        fail(
            f"需要 Pillow=={REQUIRED_PILLOW_VERSION}，实际为 {installed}。"
            "安装：python3.12 -m pip install -r scripts/requirements-shop-assets.txt"
        )


def mismatch(
    label: str,
    expected_bytes: int,
    expected_sha256: str,
    actual_bytes: int,
    actual_sha256: str,
) -> None:
    fail(
        f"{label}：expected bytes={expected_bytes}, sha256={expected_sha256}；"
        f"actual bytes={actual_bytes}, sha256={actual_sha256}"
    )


def main() -> None:
    parser = argparse.ArgumentParser(description="校验商店素材")
    parser.add_argument(
        "--root",
        type=Path,
        default=PROJECT_ROOT,
        help=argparse.SUPPRESS,
    )
    args = parser.parse_args()
    require_pillow_version()
    root = args.root.resolve()
    manifest_path = root / "public/assets/park/shop-assets.json"

    try:
        manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as error:
        fail(f"无法读取 shop-assets.json：{error}")

    entries = manifest.get("assets")
    if not isinstance(entries, list):
        fail("shop-assets.json 缺少 assets 数组")
    if len(entries) != 10:
        fail(f"应登记 10 个资源，实际为 {len(entries)} 个")

    names = [entry.get("name") for entry in entries]
    if set(names) != set(EXPECTED_ASSETS) or len(set(names)) != len(names):
        fail(f"资源名称不完整或重复：{names}")

    for entry in entries:
        name = entry["name"]
        path = root / entry["file"]
        if not path.is_file():
            fail(f"{name} 文件不存在：{entry['file']}")
        data = path.read_bytes()
        digest = hashlib.sha256(data).hexdigest()
        if entry.get("bytes") != len(data) or entry.get("sha256") != digest:
            mismatch(
                f"{name} 文件统计与清单不一致",
                entry.get("bytes", -1),
                entry.get("sha256", "<missing>"),
                len(data),
                digest,
            )

        expected_width, expected_height, expected_alpha = EXPECTED_ASSETS[name]
        try:
            with Image.open(path) as image:
                image.load()
                image_format = image.format
                width, height = image.size
                bands = image.getbands()
                alpha = image.getchannel("A") if "A" in bands else None
                has_transparency_info = "transparency" in image.info
        except Exception as error:
            fail(f"{name} 无法解码：{error}")

        if image_format != "WEBP":
            mismatch(
                f"{name} 格式错误：expected=Pillow format WEBP；actual={image_format}",
                entry["bytes"],
                entry["sha256"],
                len(data),
                digest,
            )
        if (width, height) != (expected_width, expected_height):
            mismatch(
                f"{name} 尺寸错误：expected={expected_width}x{expected_height}；"
                f"actual={width}x{height}",
                entry["bytes"],
                entry["sha256"],
                len(data),
                digest,
            )
        if list(entry.get("size", [])) != [width, height]:
            mismatch(
                f"{name} 清单尺寸错误：expected={entry.get('size')}；"
                f"actual={[width, height]}",
                entry["bytes"],
                entry["sha256"],
                len(data),
                digest,
            )
        if bool(entry.get("has_alpha")) != expected_alpha:
            mismatch(
                f"{name} has_alpha 标记不正确：expected={expected_alpha}；"
                f"actual={entry.get('has_alpha')}",
                entry["bytes"],
                entry["sha256"],
                len(data),
                digest,
            )
        if expected_alpha:
            if "A" not in bands:
                mismatch(
                    f"{name} 缺少 RGBA 透明通道",
                    entry["bytes"],
                    entry["sha256"],
                    len(data),
                    digest,
                )
            low, high = alpha.getextrema()
            if low != 0 or high != 255 or alpha.getbbox() is None:
                mismatch(
                    f"{name} alpha 不是有效透明通道：expected=(0, 255)；"
                    f"actual={alpha.getextrema()}",
                    entry["bytes"],
                    entry["sha256"],
                    len(data),
                    digest,
                )
        else:
            if "A" in bands or has_transparency_info:
                mismatch(
                    f"{name} has_alpha=false，但实际包含 alpha 通道",
                    entry["bytes"],
                    entry["sha256"],
                    len(data),
                    digest,
                )
        print(f"通过：{name}  {width}x{height}  {len(data)} bytes")

    assets = {}
    for entry in entries:
        with Image.open(root / entry["file"]) as image:
            assets[entry["name"]] = image.convert("RGBA")
    expected_sheet = png_bytes(build_contact_sheet(manifest, assets))
    expected_sheet_digest = hashlib.sha256(expected_sheet).hexdigest()
    contact_path = root / CONTACT_SHEET_FILE
    if not contact_path.is_file():
        fail(
            f"{CONTACT_SHEET_FILE} 不存在；"
            f"expected bytes={len(expected_sheet)}, sha256={expected_sheet_digest}"
        )
    contact_data = contact_path.read_bytes()
    contact_digest = hashlib.sha256(contact_data).hexdigest()
    with Image.open(contact_path) as contact:
        contact.load()
        contact_format = contact.format
        contact_size = contact.size
    if contact_format != "PNG" or contact_size != (1500, 640):
        mismatch(
            f"联系表格式或尺寸错误：expected=PNG 1500x640；"
            f"actual={contact_format} {contact_size[0]}x{contact_size[1]}",
            len(expected_sheet),
            expected_sheet_digest,
            len(contact_data),
            contact_digest,
        )
    if contact_data != expected_sheet:
        mismatch(
            "联系表与确定性重新生成结果不一致",
            len(expected_sheet),
            expected_sheet_digest,
            len(contact_data),
            contact_digest,
        )
    print(
        f"通过：联系表 1500x640  {len(contact_data)} bytes  "
        f"sha256={contact_digest}"
    )
    print("通过：10 个商店素材及 QA 联系表的格式、尺寸、透明通道、bytes 与 sha256 全部一致")


if __name__ == "__main__":
    main()
