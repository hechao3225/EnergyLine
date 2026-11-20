"""校验商店素材的尺寸、透明通道、字节数和 sha256。"""

from __future__ import annotations

import argparse
import hashlib
import json
import os
import sys
from importlib import metadata
from pathlib import Path

from PIL import Image

from prepare_shop_assets import build_contact_sheet, png_bytes


PROJECT_ROOT = Path(__file__).resolve().parents[1]
REQUIRED_PILLOW_VERSION = "13.0.0"
SHOP_ASSETS_PYTHON_ENV = "SHOP_ASSETS_PYTHON"
CONTACT_SHEET_FILE = "docs/QA/shop-assets-2026-11-20/shop-assets-contact-sheet.png"
ALPHA_VISIBLE_THRESHOLD = 28

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
    configured = os.environ.get(SHOP_ASSETS_PYTHON_ENV)
    if not configured:
        fail(
            f"需设置 {SHOP_ASSETS_PYTHON_ENV}，且必须为 Python3.12+ 可执行文件。"
            f"示例：export {SHOP_ASSETS_PYTHON_ENV}=/path/to/python3.12"
        )
    executable = Path(configured).expanduser()
    if not executable.is_absolute():
        executable = executable.resolve()
    if not executable.is_file() or not os.access(executable, os.X_OK):
        fail(f"{SHOP_ASSETS_PYTHON_ENV} 必须指向存在的可执行文件：{configured}")
    if Path(sys.executable).resolve() != executable.resolve():
        fail(
            f"当前解释器不是 {SHOP_ASSETS_PYTHON_ENV} 指向的文件："
            f"expected={executable}；actual={sys.executable}"
        )
    if sys.version_info < (3, 12):
        fail(
            f"需 Python3.12+，当前为 {sys.version.split()[0]}。"
            f"请将 {SHOP_ASSETS_PYTHON_ENV} 指向 Python3.12+ 可执行文件。"
        )
    try:
        installed = metadata.version("Pillow")
    except metadata.PackageNotFoundError:
        installed = "未安装"
    if installed != REQUIRED_PILLOW_VERSION:
        fail(
            f"需要 Pillow=={REQUIRED_PILLOW_VERSION}，实际为 {installed}。"
            f'安装：${SHOP_ASSETS_PYTHON_ENV} -m pip install -r scripts/requirements-shop-assets.txt'
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
    main_manifest_path = root / "public/assets/park/manifest.json"

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

    try:
        main_manifest = json.loads(main_manifest_path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as error:
        fail(f"无法读取主 manifest：{error}")
    if not isinstance(main_manifest, list):
        fail("主 manifest 必须为数组")
    main_by_name: dict[str, dict] = {}
    for entry in main_manifest:
        name = entry.get("name")
        if name in EXPECTED_ASSETS:
            if name in main_by_name:
                fail(f"主 manifest 重复登记商店资源：{name}")
            main_by_name[name] = entry
    missing = sorted(set(EXPECTED_ASSETS) - set(main_by_name))
    if missing:
        fail(f"主 manifest 缺少商店资源：{missing}")

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
        shared_metadata = {
            key: entry.get(key)
            for key in (
                "name",
                "file",
                "source",
                "size",
                "alpha_bbox",
                "corner_alpha",
                "bytes",
                "sha256",
                "processing",
            )
        }
        mismatched_main = {
            key: (value, main_by_name[name].get(key))
            for key, value in shared_metadata.items()
            if main_by_name[name].get(key) != value
        }
        if mismatched_main:
            fail(f"{name} 主 manifest 元数据不一致：{mismatched_main}")

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
        if "alpha_bbox" not in entry or "corner_alpha" not in entry:
            fail(f"{name} 缺少 alpha_bbox 或 corner_alpha")
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
            actual_bbox = alpha.point(
                lambda value: 255 if value > ALPHA_VISIBLE_THRESHOLD else 0
            ).getbbox()
            actual_corners = [
                alpha.getpixel((0, 0)),
                alpha.getpixel((width - 1, 0)),
                alpha.getpixel((0, height - 1)),
                alpha.getpixel((width - 1, height - 1)),
            ]
            expected_bbox = list(actual_bbox) if actual_bbox else None
            if entry["alpha_bbox"] != expected_bbox or entry["corner_alpha"] != actual_corners:
                fail(
                    f"{name} alpha 清单错误：expected_bbox={expected_bbox}, "
                    f"actual_bbox={entry['alpha_bbox']}；"
                    f"expected_corners={actual_corners}, "
                    f"actual_corners={entry['corner_alpha']}；"
                    f"bytes={len(data)}, sha256={digest}"
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
            if entry["alpha_bbox"] is not None or entry["corner_alpha"] is not None:
                fail(
                    f"{name} 无 alpha 资源必须使用 null alpha_bbox/corner_alpha；"
                    f"actual_bbox={entry['alpha_bbox']}, "
                    f"actual_corners={entry['corner_alpha']}"
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
    print(
        f"通过：10 个商店素材与主 manifest 元数据一致；alpha>{ALPHA_VISIBLE_THRESHOLD} "
        "边界、格式、尺寸、bytes 与 sha256 全部通过"
    )


if __name__ == "__main__":
    main()
