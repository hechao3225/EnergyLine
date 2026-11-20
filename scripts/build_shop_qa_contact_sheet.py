"""将商店 QA 截图目录合成为可复现联系表。"""

from __future__ import annotations

import argparse
import os
import sys
from importlib import metadata
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


REQUIRED_PILLOW_VERSION = "13.0.0"
SHOP_ASSETS_PYTHON_ENV = "SHOP_ASSETS_PYTHON"


def require_pillow_version() -> None:
    configured = os.environ.get(SHOP_ASSETS_PYTHON_ENV)
    if not configured:
        raise SystemExit(f"失败：需设置 {SHOP_ASSETS_PYTHON_ENV}")
    executable = Path(configured).expanduser()
    if not executable.is_absolute():
        executable = executable.resolve()
    if not executable.is_file() or not os.access(executable, os.X_OK):
        raise SystemExit(
            f"失败：{SHOP_ASSETS_PYTHON_ENV} 必须指向存在的可执行文件：{configured}"
        )
    if Path(sys.executable).resolve() != executable.resolve():
        raise SystemExit(
            f"失败：当前解释器不是 {SHOP_ASSETS_PYTHON_ENV} 指向的文件"
        )
    installed = metadata.version("Pillow")
    if installed != REQUIRED_PILLOW_VERSION:
        raise SystemExit(
            f"失败：需要 Pillow=={REQUIRED_PILLOW_VERSION}，实际为 {installed}"
        )


def load_font(size: int) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    for candidate in (
        Path("/System/Library/Fonts/PingFang.ttc"),
        Path("/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc"),
        Path("C:/Windows/Fonts/msyh.ttc"),
    ):
        if candidate.exists():
            return ImageFont.truetype(str(candidate), size)
    return ImageFont.load_default()


def main() -> None:
    parser = argparse.ArgumentParser(description="生成商店 QA 截图联系表")
    parser.add_argument("input_dir", type=Path, help="截图目录")
    parser.add_argument("output", type=Path, help="输出 JPG 或 PNG")
    args = parser.parse_args()
    require_pillow_version()

    screenshot_dir = args.input_dir.resolve()
    if (screenshot_dir / "screens").is_dir():
        screenshot_dir /= "screens"
    output = args.output.resolve()
    output.parent.mkdir(parents=True, exist_ok=True)
    files = sorted(
        path
        for path in screenshot_dir.iterdir()
        if path.is_file()
        and path.suffix.lower() in {".png", ".jpg", ".jpeg"}
        and path.resolve() != output
    )
    if not files:
        raise SystemExit(f"失败：{screenshot_dir} 中没有截图")

    cell_width = 300
    cell_height = 700
    columns = 5
    rows = (len(files) + columns - 1) // columns
    sheet = Image.new("RGB", (columns * cell_width, rows * cell_height), "#241431")
    draw = ImageDraw.Draw(sheet)
    label_font = load_font(18)
    for index, file in enumerate(files):
        with Image.open(file) as source:
            image = source.convert("RGB")
            image.thumbnail(
                (cell_width - 24, cell_height - 56),
                Image.Resampling.LANCZOS,
            )
        left = index % columns * cell_width
        top = index // columns * cell_height
        sheet.paste(
            image,
            (
                left + (cell_width - image.width) // 2,
                top + 36 + (cell_height - 56 - image.height) // 2,
            ),
        )
        draw.text(
            (left + 12, top + 9),
            file.stem,
            fill="#fff8e8",
            font=label_font,
        )

    if output.suffix.lower() in {".jpg", ".jpeg"}:
        sheet.save(output, quality=90, optimize=True)
    elif output.suffix.lower() == ".png":
        sheet.save(output, optimize=True)
    else:
        raise SystemExit("失败：输出文件必须使用 .jpg、.jpeg 或 .png")
    print(f"完成：{len(files)} 张截图 -> {output} ({sheet.width}x{sheet.height})")


if __name__ == "__main__":
    main()
