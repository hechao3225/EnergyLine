"""校验商店素材的尺寸、透明通道、字节数和 sha256。"""

from __future__ import annotations

import hashlib
import json
from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
MANIFEST_PATH = ROOT / "public/assets/park/shop-assets.json"

EXPECTED_ASSETS = {
    "icon-lens": (512, 512, True),
    "icon-coil": (512, 512, True),
    "outfit-sheep-starlight": (None, None, True),
    "outfit-rabbit-starlight": (None, None, True),
    "outfit-spirit-starlight": (None, None, True),
    "mood-sheep-happy": (144, 100, True),
    "mood-rabbit-happy": (144, 132, True),
    "mood-spirit-happy": (144, 136, True),
    "mood-joy": (512, 256, True),
    "theme-calm-preview": (512, 512, False),
}


def fail(message: str) -> None:
    raise SystemExit(f"失败：{message}")


def main() -> None:
    try:
        manifest = json.loads(MANIFEST_PATH.read_text(encoding="utf-8"))
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
        path = ROOT / entry["file"]
        if not path.is_file():
            fail(f"{name} 文件不存在：{entry['file']}")
        data = path.read_bytes()
        if entry.get("bytes") != len(data):
            fail(f"{name} 字节数不一致")
        digest = hashlib.sha256(data).hexdigest()
        if entry.get("sha256") != digest:
            fail(f"{name} sha256 不一致")

        try:
            with Image.open(path) as image:
                image.load()
                width, height = image.size
                mode = image.mode
                alpha = image.convert("RGBA").getchannel("A")
        except Exception as error:
            fail(f"{name} 无法解码：{error}")

        expected_width, expected_height, expected_alpha = EXPECTED_ASSETS[name]
        if expected_width is not None and (width, height) != (expected_width, expected_height):
            fail(
                f"{name} 尺寸应为 {expected_width}x{expected_height}，"
                f"实际为 {width}x{height}"
            )
        if name.startswith("outfit-"):
            if max(width, height) > 1024 or min(width, height) < 600:
                fail(f"{name} 裁边尺寸异常：{width}x{height}")
        if list(entry.get("size", [])) != [width, height]:
            fail(f"{name} 清单尺寸与实际图片不一致")
        if bool(entry.get("has_alpha")) != expected_alpha:
            fail(f"{name} has_alpha 标记不正确")
        if expected_alpha:
            if mode not in ("RGBA", "LA") and "transparency" not in image.info:
                fail(f"{name} 缺少 RGBA 透明通道")
            low, high = alpha.getextrema()
            if low != 0 or high != 255 or alpha.getbbox() is None:
                fail(f"{name} alpha 不是有效透明通道")
        print(f"通过：{name}  {width}x{height}  {len(data)} bytes")

    print("通过：10 个商店素材文件存在、可解码、尺寸/透明通道/字节数/sha256 全部一致")


if __name__ == "__main__":
    main()
