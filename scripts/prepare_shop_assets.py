"""整理商店新增素材，并维护独立的 shop-assets.json 清单。"""

from __future__ import annotations

import argparse
import hashlib
import json
from io import BytesIO
from pathlib import Path

from PIL import Image, ImageChops, ImageDraw, ImageFilter


ROOT = Path(__file__).resolve().parents[1]
SOURCE_DIR = ROOT / "docs/UI设计稿2.0/generated-sources/shop"
EXPRESSION_DIR = ROOT / "assets/energy_park_art_pack_v1/02_characters/expressions"
ASSET_DIR = ROOT / "public/assets/park"
QA_DIR = ROOT / "docs/QA/shop-assets-2026-11-20"
MANIFEST_PATH = ASSET_DIR / "shop-assets.json"
CONTACT_SHEET_PATH = QA_DIR / "shop-assets-contact-sheet.png"
BACKGROUND_MARKER = (255, 0, 255)

WHITE_SOURCES = {
    "icon-lens": ("icon-lens.png", "icon"),
    "icon-coil": ("icon-coil.png", "icon"),
    "outfit-sheep-starlight": ("shop-sample-sheep-starlight.png", "outfit"),
    "outfit-rabbit-starlight": ("shop-sample-rabbit-starlight.png", "outfit"),
    "outfit-spirit-starlight": ("shop-sample-spirit-starlight.png", "outfit"),
}

MOOD_SOURCES = {
    "mood-sheep-happy": ("xingya_happy.png", "mood"),
    "mood-rabbit-happy": ("yunrong_happy.png", "mood"),
    "mood-spirit-happy": ("boling_happy.png", "mood"),
}


def exact_color_mask(image: Image.Image, color: tuple[int, int, int]) -> Image.Image:
    channels = []
    for channel, value in zip(image.split(), color):
        channels.append(channel.point(lambda pixel, target=value: 255 if pixel == target else 0))
    return ImageChops.multiply(ImageChops.multiply(channels[0], channels[1]), channels[2])


def remove_white_background(source: Image.Image) -> Image.Image:
    rgb = source.convert("RGB")
    flood = rgb.copy()
    width, height = rgb.size
    seeds = []
    for x in range(0, width, 8):
        seeds.extend(((x, 0), (x, height - 1)))
    for y in range(0, height, 8):
        seeds.extend(((0, y), (width - 1, y)))
    for point in seeds:
        pixel = flood.getpixel(point)
        if pixel != BACKGROUND_MARKER and min(pixel) >= 235:
            ImageDraw.floodfill(flood, point, BACKGROUND_MARKER, thresh=18)

    background = exact_color_mask(flood, BACKGROUND_MARKER)
    foreground = ImageChops.invert(background)
    boundary = ImageChops.subtract(foreground, foreground.filter(ImageFilter.MinFilter(5)))
    background_image = Image.new("RGB", rgb.size, tuple(int(v) for v in rgb.getpixel((0, 0))))
    distance = ImageChops.difference(rgb, background_image)
    red, green, blue = distance.split()
    max_distance = ImageChops.lighter(ImageChops.lighter(red, green), blue)
    soft_edge = max_distance.point(lambda value: max(0, min(255, round((value - 5) * 255 / 24))))
    alpha = Image.composite(soft_edge, foreground, boundary)
    rgba = rgb.convert("RGBA")
    rgba.putalpha(alpha)
    return rgba


def crop_visible(image: Image.Image, padding: int, alpha_threshold: int = 8) -> Image.Image:
    visible = image.getchannel("A").point(lambda value: 255 if value > alpha_threshold else 0)
    bbox = visible.getbbox()
    if bbox is None:
        raise ValueError("透明处理后没有识别到主体")
    box = (
        max(0, bbox[0] - padding),
        max(0, bbox[1] - padding),
        min(image.width, bbox[2] + padding),
        min(image.height, bbox[3] + padding),
    )
    return image.crop(box)


def build_icon(image: Image.Image) -> Image.Image:
    subject = crop_visible(image, padding=0)
    subject.thumbnail((448, 448), Image.Resampling.LANCZOS)
    canvas = Image.new("RGBA", (512, 512))
    canvas.alpha_composite(
        subject,
        ((512 - subject.width) // 2, (512 - subject.height) // 2),
    )
    return canvas


def build_outfit(image: Image.Image) -> Image.Image:
    subject = crop_visible(image, padding=14)
    return subject


def build_mood(source_path: Path) -> Image.Image:
    return Image.open(source_path).convert("RGBA")


def build_mood_joy(moods: dict[str, Image.Image]) -> Image.Image:
    canvas = Image.new("RGBA", (512, 256))
    ordered = [
        moods["mood-sheep-happy"],
        moods["mood-rabbit-happy"],
        moods["mood-spirit-happy"],
    ]
    for image, center_x in zip(ordered, (85, 256, 425)):
        canvas.alpha_composite(
            image,
            (center_x - image.width // 2, 128 - image.height // 2),
        )
    return canvas


def build_theme_preview() -> Image.Image:
    screenshot = Image.open(SOURCE_DIR / "theme-calm-home-390x844.png").convert("RGB")
    if screenshot.size != (780, 1688):
        raise ValueError(f"主题首页截图尺寸应为 780x1688，实际为 {screenshot.size}")
    return screenshot.crop((0, 270, 780, 1050)).resize((512, 512), Image.Resampling.LANCZOS)


def webp_bytes(image: Image.Image, quality: int) -> bytes:
    buffer = BytesIO()
    image.save(buffer, "WEBP", quality=quality, method=6)
    return buffer.getvalue()


def build_assets() -> tuple[dict[str, Image.Image], dict[str, dict[str, str | bool]]]:
    assets: dict[str, Image.Image] = {}
    metadata: dict[str, dict[str, str | bool]] = {}

    for name, (filename, kind) in WHITE_SOURCES.items():
        source_path = SOURCE_DIR / filename
        processed = remove_white_background(Image.open(source_path))
        image = build_icon(processed) if kind == "icon" else build_outfit(processed)
        assets[name] = image
        metadata[name] = {
            "source": f"docs/UI设计稿2.0/generated-sources/shop/{filename}",
            "has_alpha": True,
            "processing": (
                "边界近白泛洪去底；2px 软边；透明裁边；512x512 居中透明画布"
                if kind == "icon"
                else "边界近白泛洪去底；2px 软边；透明裁边并保留原始比例"
            ),
        }

    moods = {}
    for name, (filename, kind) in MOOD_SOURCES.items():
        source_path = EXPRESSION_DIR / filename
        image = build_mood(source_path)
        moods[name] = image
        assets[name] = image
        metadata[name] = {
            "source": f"assets/energy_park_art_pack_v1/02_characters/expressions/{filename}",
            "has_alpha": True,
            "processing": "沿用现有开心表情透明画布；保持原尺寸转 WebP",
        }

    joy = build_mood_joy(moods)
    assets["mood-joy"] = joy
    metadata["mood-joy"] = {
        "source": (
            "assets/energy_park_art_pack_v1/02_characters/expressions/"
            "xingya_happy.png + yunrong_happy.png + boling_happy.png"
        ),
        "has_alpha": True,
        "processing": "三张开心表情按原始画布尺寸横向居中合成 512x256 透明画布",
    }

    assets["theme-calm-preview"] = build_theme_preview()
    metadata["theme-calm-preview"] = {
        "source": "docs/UI设计稿2.0/generated-sources/shop/theme-calm-home-390x844.png",
        "has_alpha": False,
        "processing": "真实宁静主题首页截图裁切 (0,270,780,1050) 后缩放为 512x512 RGB",
    }
    return assets, metadata


def manifest_for(assets: dict[str, Image.Image], metadata: dict[str, dict[str, str | bool]]) -> dict:
    entries = []
    for name, image in assets.items():
        data = webp_bytes(image, 88 if name == "theme-calm-preview" else 92)
        digest = hashlib.sha256(data).hexdigest()
        entries.append(
            {
                "name": name,
                "file": f"public/assets/park/{name}.webp",
                "source": metadata[name]["source"],
                "size": list(image.size),
                "has_alpha": metadata[name]["has_alpha"],
                "bytes": len(data),
                "sha256": digest,
                "processing": metadata[name]["processing"],
            }
        )
    return {
        "version": 1,
        "generated": "2026-11-20",
        "assets": entries,
    }


def build_contact_sheet(manifest: dict) -> Image.Image:
    cell_width = 300
    cell_height = 320
    columns = 5
    rows = 2
    sheet = Image.new("RGB", (cell_width * columns, cell_height * rows), "#211532")
    draw = ImageDraw.Draw(sheet)
    for index, entry in enumerate(manifest["assets"]):
        image = Image.open(ROOT / entry["file"]).convert("RGBA")
        image.thumbnail((244, 230), Image.Resampling.LANCZOS)
        left = (index % columns) * cell_width
        top = (index // columns) * cell_height
        draw.rounded_rectangle(
            (left + 7, top + 7, left + cell_width - 7, top + cell_height - 7),
            radius=18,
            fill="#302044",
            outline="#d7bd83",
            width=2,
        )
        swatch_width = image.width // 2
        for x in range(swatch_width):
            shade = 55 + int((x / max(1, swatch_width - 1)) * 165)
            draw.line((left + 28 + x, top + 20, left + 28 + x, top + 258), fill=(shade, shade, shade))
        sheet.paste(image, (left + 28, top + 20), image)
        draw.text((left + 20, top + 282), entry["name"], fill="#fff4dc")
    return sheet


def write_assets(assets: dict[str, Image.Image], manifest: dict) -> None:
    ASSET_DIR.mkdir(parents=True, exist_ok=True)
    QA_DIR.mkdir(parents=True, exist_ok=True)
    for name, image in assets.items():
        data = webp_bytes(image, 88 if name == "theme-calm-preview" else 92)
        (ASSET_DIR / f"{name}.webp").write_bytes(data)
    MANIFEST_PATH.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    build_contact_sheet(manifest).save(CONTACT_SHEET_PATH, "PNG", optimize=True)


def check_assets(generated_manifest: dict) -> None:
    current_manifest = json.loads(MANIFEST_PATH.read_text(encoding="utf-8"))
    current_entries = current_manifest.get("assets", [])
    generated_entries = generated_manifest.get("assets", [])
    current_by_name = {entry["name"]: entry for entry in current_entries}
    generated_by_name = {entry["name"]: entry for entry in generated_entries}
    expected_names = set(generated_by_name)
    if set(current_by_name) != expected_names or len(current_by_name) != len(current_entries):
        raise ValueError("清单资源名称与脚本定义不一致")

    for name, generated in generated_by_name.items():
        current = current_by_name[name]
        file_label = generated["file"]
        path = ROOT / file_label
        if not path.is_file():
            raise ValueError(f"{file_label} 不存在")
        data = path.read_bytes()
        digest = hashlib.sha256(data).hexdigest()
        if current["bytes"] != len(data) or current["sha256"] != digest:
            raise ValueError(f"{file_label} 与清单记录不一致")
        if generated["bytes"] != len(data) or generated["sha256"] != digest:
            raise ValueError(
                f"{file_label} 与重新处理源图生成的新产物不一致；"
                f"请重新运行 prepare_shop_assets.py "
                f"（新产物 {generated['bytes']} bytes / {generated['sha256']}）"
            )
        if generated["size"] != current["size"]:
            raise ValueError(f"{file_label} 尺寸与重新处理源图生成的新产物不一致")


def main() -> None:
    parser = argparse.ArgumentParser(description="整理并校验商店新增素材")
    parser.add_argument("--check", action="store_true", help="只校验现有素材与清单，不重写文件")
    args = parser.parse_args()
    assets, metadata = build_assets()
    manifest = manifest_for(assets, metadata)
    if args.check:
        if not MANIFEST_PATH.exists():
            raise FileNotFoundError(f"缺少 {MANIFEST_PATH.relative_to(ROOT)}")
        check_assets(manifest)
        print(f"通过：{len(assets)} 个商店素材与重新处理源图生成的新产物一致")
        return
    write_assets(assets, manifest)
    print(f"完成：已生成 {len(assets)} 个商店素材")
    print(f"清单：{MANIFEST_PATH.relative_to(ROOT)}")
    print(f"联系表：{CONTACT_SHEET_PATH.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
