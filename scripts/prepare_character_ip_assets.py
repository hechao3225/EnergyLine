#!/usr/bin/env python3
"""整理角色 IP 资产：表情切片、48×48 头像、云绒庆祝姿态，并同步清单与 QA 证据。

数据来源：
- docs/UI设计稿2.0/generated-sources/character-ip/*_raw.png（生图原始白底图）
- docs/角色IP/素材/主角三人组-角色设计图.jpg（48×48 图标区）

运行：
  python scripts/prepare_character_ip_assets.py
  python scripts/prepare_character_ip_assets.py --check
"""
from __future__ import annotations

import argparse
import hashlib
import json
from io import BytesIO
from pathlib import Path

from PIL import Image, ImageChops, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parents[1]
RAW_DIR = ROOT / "docs/UI设计稿2.0/generated-sources/character-ip"
SHEET_PATH = ROOT / "docs/角色IP/素材/主角三人组-角色设计图.jpg"
EXPRESSION_DIR = ROOT / "assets/energy_park_art_pack_v1/02_characters/expressions"
ASSET_DIR = ROOT / "public/assets/park"
QA_DIR = ROOT / "docs/QA/character-ip-2026-11-21"
ART_MANIFEST_PATH = ROOT / "assets/energy_park_art_pack_v1/manifest.json"
RUNTIME_MANIFEST_PATH = ASSET_DIR / "manifest.json"
SHOP_MANIFEST_PATH = ASSET_DIR / "shop-assets.json"
BACKGROUND_MARKER = (255, 0, 255)
ROUTE = "images_api gpt-image-2.5"

CHARACTERS = [
    {"id": "xingya", "runtime": "sheep", "label": "星芽", "sheet_box": (1215, 655, 1302, 731)},
    {"id": "boling", "runtime": "spirit", "label": "波铃", "sheet_box": (1320, 654, 1407, 731)},
    {"id": "yunrong", "runtime": "rabbit", "label": "云绒", "sheet_box": (1427, 654, 1513, 730)},
]
STATES = ["happy", "wink", "sleep", "surprised", "sparkle"]
MOOD_ORDER = ["sheep", "rabbit", "spirit"]


def load_font(size: int = 18) -> ImageFont.ImageFont:
    for candidate in (
        Path("/System/Library/Fonts/PingFang.ttc"),
        Path("/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc"),
        Path("C:/Windows/Fonts/msyh.ttc"),
    ):
        if candidate.exists():
            return ImageFont.truetype(str(candidate), size)
    return ImageFont.load_default()


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


def crop_visible(image: Image.Image, padding: int = 0, alpha_threshold: int = 8) -> Image.Image:
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


def clear_border(image: Image.Image) -> Image.Image:
    rgba = image.convert("RGBA")
    alpha = rgba.getchannel("A")
    width, height = rgba.size
    alpha.paste(0, (0, 0, width, 1))
    alpha.paste(0, (0, height - 1, width, height))
    alpha.paste(0, (0, 0, 1, height))
    alpha.paste(0, (width - 1, 0, width, height))
    rgba.putalpha(alpha)
    return rgba


def rounded_mask(size: int, radius: int, supersample: int = 4) -> Image.Image:
    mask = Image.new("L", (size * supersample, size * supersample), 0)
    draw = ImageDraw.Draw(mask)
    draw.rounded_rectangle(
        (0, 0, size * supersample - 1, size * supersample - 1),
        radius=radius * supersample,
        fill=255,
    )
    return mask.resize((size, size), Image.LANCZOS)


def webp_bytes(image: Image.Image, quality: int = 92) -> bytes:
    buffer = BytesIO()
    image.save(buffer, "WEBP", quality=quality, method=6)
    return buffer.getvalue()


def png_bytes(image: Image.Image) -> bytes:
    buffer = BytesIO()
    image.save(buffer, "PNG", optimize=True)
    return buffer.getvalue()


def alpha_metadata(image: Image.Image) -> tuple[list[int] | None, list[int] | None]:
    if "A" not in image.getbands():
        return None, None
    alpha = image.getchannel("A")
    bbox = alpha.point(lambda value: 255 if value > 28 else 0).getbbox()
    corners = [
        alpha.getpixel((0, 0)),
        alpha.getpixel((image.width - 1, 0)),
        alpha.getpixel((0, image.height - 1)),
        alpha.getpixel((image.width - 1, image.height - 1)),
    ]
    return list(bbox) if bbox else None, corners


def find_raw(name: str) -> Path:
    for candidate in (f"{name}_raw.png", f"{name}_v1.png"):
        path = RAW_DIR / candidate
        if path.exists():
            return path
    raise FileNotFoundError(f"缺少生图原始文件：{name}_raw.png")


def build_expression(character_id: str, state: str) -> tuple[Image.Image, Path]:
    raw = Image.open(find_raw(f"{character_id}_{state}")).convert("RGB")
    subject = crop_visible(remove_white_background(raw), padding=2)
    scale = 144 / subject.width
    size = (144, max(1, round(subject.height * scale)))
    image = clear_border(subject.resize(size, Image.LANCZOS))
    path = EXPRESSION_DIR / f"{character_id}_{state}.png"
    return image, path


def build_avatar(sheet: Image.Image, box: tuple[int, int, int, int]) -> Image.Image:
    crop = sheet.crop(box).resize((96, 96), Image.LANCZOS)
    rgba = crop.convert("RGBA")
    rgba.putalpha(rounded_mask(96, 21))
    return rgba


def build_cheer() -> Image.Image:
    raw = Image.open(find_raw("yunrong_cheer")).convert("RGB")
    subject = crop_visible(remove_white_background(raw), padding=2)
    subject.thumbnail((400, 400), Image.LANCZOS)
    canvas = Image.new("RGBA", (subject.width, subject.height))
    canvas.alpha_composite(subject)
    return clear_border(canvas)


def build_mood_joy(moods: dict[str, Image.Image]) -> Image.Image:
    canvas = Image.new("RGBA", (512, 256))
    for name, center_x in zip(MOOD_ORDER, (85, 256, 425)):
        image = moods[name]
        canvas.alpha_composite(image, (center_x - image.width // 2, 128 - image.height // 2))
    return canvas


def save_asset(image: Image.Image, name: str) -> dict:
    data = webp_bytes(image)
    path = ASSET_DIR / f"{name}.webp"
    path.write_bytes(data)
    alpha_bbox, corner_alpha = alpha_metadata(image)
    return {
        "name": name,
        "file": str(path.relative_to(ROOT)).replace("\\", "/"),
        "size": list(image.size),
        "has_alpha": "A" in image.getbands(),
        "alpha_bbox": alpha_bbox,
        "corner_alpha": corner_alpha,
        "bytes": len(data),
        "sha256": hashlib.sha256(data).hexdigest(),
    }


def update_runtime_manifest(entries: list[dict], updates: dict[str, dict], additions: list[dict]) -> None:
    by_name = {item["name"]: item for item in entries}
    for name, payload in updates.items():
        target = by_name.get(name)
        if not target:
            raise KeyError(f"运行时清单缺少条目：{name}")
        for key in ("size", "has_alpha", "alpha_bbox", "corner_alpha", "bytes", "sha256"):
            target[key] = payload[key]
        target["processing"] = "2026-11-21 重新绘制表情；保持原画布尺寸转 WebP"

    for payload in additions:
        if payload["name"] in by_name:
            for key in ("size", "has_alpha", "alpha_bbox", "corner_alpha", "bytes", "sha256", "source", "processing", "route"):
                if key in payload:
                    by_name[payload["name"]][key] = payload[key]
        else:
            entries.append(payload)
    RUNTIME_MANIFEST_PATH.write_text(json.dumps(entries, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def update_shop_manifest(payloads: dict[str, dict]) -> None:
    manifest = json.loads(SHOP_MANIFEST_PATH.read_text(encoding="utf-8"))
    by_name = {item["name"]: item for item in manifest["assets"]}
    for name, payload in payloads.items():
        target = by_name.get(name)
        if not target:
            raise KeyError(f"商店清单缺少条目：{name}")
        for key in ("size", "has_alpha", "alpha_bbox", "corner_alpha", "bytes", "sha256"):
            target[key] = payload[key]
        target["processing"] = "2026-11-21 重新绘制表情；保持原画布尺寸转 WebP"
    SHOP_MANIFEST_PATH.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def update_art_manifest(expressions: dict[str, tuple[Image.Image, Path]], additions: list[dict]) -> None:
    manifest = json.loads(ART_MANIFEST_PATH.read_text(encoding="utf-8"))
    assets = manifest["assets"]
    by_file = {item["file"]: item for item in assets}
    existing_files = set(by_file)
    additions = [item for item in additions if item["file"] not in existing_files]
    for character_id, state in [(c["id"], s) for c in CHARACTERS for s in STATES]:
        image, _ = expressions[(character_id, state)]
        rel = f"02_characters/expressions/{character_id}_{state}.png"
        if rel in by_file:
            by_file[rel]["size"] = list(image.size)
            by_file[rel]["alpha"] = True
            by_file[rel]["note"] = "2026-11-21 重新绘制的小尺寸表情头像；供提示气泡或弹窗使用"
    insert_after = {f"02_characters/expressions/{c['id']}_sleep.png": c["id"] for c in CHARACTERS}
    rebuilt = []
    for asset in assets:
        rebuilt.append(asset)
        character_id = insert_after.get(asset["file"])
        if character_id:
            rebuilt.extend(additions_for(character_id, additions))
    manifest["assets"] = rebuilt
    manifest["asset_count"] = len(rebuilt)
    manifest["version"] = "1.1"
    ART_MANIFEST_PATH.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def additions_for(character_id: str, additions: list[dict]) -> list[dict]:
    return [
        item
        for item in additions
        if item["file"].startswith(f"02_characters/expressions/{character_id}_")
        and not item["file"].endswith(("_happy.png", "_wink.png", "_sleep.png"))
    ]


def build_expression_contact(expressions: dict[str, tuple[Image.Image, Path]], before: dict[str, Image.Image]) -> Image.Image:
    cell = 200
    columns = len(STATES)
    rows = len(CHARACTERS)
    sheet = Image.new("RGB", (cell * columns + 130, cell * rows + 70), "#241436")
    draw = ImageDraw.Draw(sheet)
    font = load_font(18)
    draw.text((14, 12), "新表情（白底/深底各半）", fill="#ffffff", font=font)
    for row, character in enumerate(CHARACTERS):
        draw.text((14, 60 + row * cell), character["label"], fill="#ffd76a", font=font)
        for col, state in enumerate(STATES):
            image = expressions[(character["id"], state)][0].convert("RGBA")
            image.thumbnail((cell - 34, cell - 34), Image.LANCZOS)
            left = 130 + col * cell
            top = 55 + row * cell
            draw.text((left + 4, top), f"{state}", fill="#cfc3e8", font=load_font(14))
            for half, color in ((0, (255, 255, 255)), (1, (36, 20, 54))):
                tile = Image.new("RGB", (cell // 2, cell - 20), color)
                sheet.paste(tile, (left + half * cell // 2, top + 20))
            sheet.paste(image, (left + (cell - image.width) // 2, top + 20 + (cell - 20 - image.height) // 2), image)
    # 修复前后对照：旧素材放大到同格
    before_sheet = Image.new("RGB", (cell * columns + 130, cell * rows + 70), "#3a1020")
    draw = ImageDraw.Draw(before_sheet)
    draw.text((14, 12), "修复前（旧表情贴图残缺）", fill="#ffffff", font=load_font(18))
    for row, character in enumerate(CHARACTERS):
        draw.text((14, 60 + row * cell), character["label"], fill="#ffb3c1", font=load_font(18))
        for col, state in enumerate(["happy", "wink", "sleep"]):
            image = before[state]
            image = image.get(character["id"], Image.new("RGBA", (10, 10))).convert("RGBA")
            image.thumbnail((cell - 34, cell - 34), Image.LANCZOS)
            left = 130 + col * cell
            top = 55 + row * cell
            tile = Image.new("RGB", (cell - 20, cell - 20), (255, 255, 255))
            before_sheet.paste(tile, (left, top + 20))
            before_sheet.paste(image, (left + (cell - 20 - image.width) // 2, top + 20 + (cell - 20 - image.height) // 2), image)
    combined = Image.new("RGB", (sheet.width, sheet.height + before_sheet.height + 10), "#171021")
    combined.paste(sheet, (0, 0))
    combined.paste(before_sheet, (0, sheet.height + 10))
    return combined


def build_avatar_contact(avatars: dict[str, Image.Image]) -> Image.Image:
    cell = 180
    sheet = Image.new("RGB", (cell * 3, cell * 2 + 40), "#241436")
    draw = ImageDraw.Draw(sheet)
    draw.text((12, 10), "48×48 角色图标（上 4x 放大预览 / 下 48px 实际）", fill="#ffffff", font=load_font(16))
    for index, character in enumerate(CHARACTERS):
        icon = avatars[character["id"]]
        preview = icon.resize((96, 96), Image.LANCZOS)
        sheet.paste(preview, (index * cell + 42, 45), preview)
        small = icon.resize((48, 48), Image.LANCZOS)
        sheet.paste(small, (index * cell + 66, cell + 70), small)
        draw.text((index * cell + 12, cell + 130), character["label"], fill="#ffd76a", font=load_font(16))
    return sheet


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--check", action="store_true", help="只校验清单与素材，不重新生成")
    args = parser.parse_args()

    if args.check:
        return verify()

    RAW_DIR.mkdir(parents=True, exist_ok=True)
    QA_DIR.mkdir(parents=True, exist_ok=True)

    sheet = Image.open(SHEET_PATH).convert("RGB")
    before = {}
    for state in ("happy", "wink", "sleep"):
        before[state] = {
            character["id"]: Image.open(EXPRESSION_DIR / f"{character['id']}_{state}.png").convert("RGBA")
            for character in CHARACTERS
        }

    expressions: dict[tuple[str, str], tuple[Image.Image, Path]] = {}
    for character in CHARACTERS:
        for state in STATES:
            image, path = build_expression(character["id"], state)
            path.write_bytes(png_bytes(image))
            expressions[(character["id"], state)] = (image, path)

    moods = {
        "sheep": expressions[("xingya", "happy")][0],
        "rabbit": expressions[("yunrong", "happy")][0],
        "spirit": expressions[("boling", "happy")][0],
    }
    runtime_updates: dict[str, dict] = {}
    for runtime_name, image in moods.items():
        payload = save_asset(image, f"mood-{runtime_name}-happy")
        runtime_updates[payload["name"]] = payload
    joy = build_mood_joy(moods)
    joy_payload = save_asset(joy, "mood-joy")
    runtime_updates["mood-joy"] = joy_payload

    cheer = build_cheer()
    cheer_payload = save_asset(cheer, "rabbit-cheer")
    cheer_payload["source"] = "character-ip/yunrong_cheer_raw.png"
    cheer_payload["route"] = ROUTE
    cheer_payload["processing"] = "边界近白泛洪去底；透明裁边；最长边 400px 等比缩放；WebP 92"

    avatars: dict[str, Image.Image] = {}
    additions: list[dict] = [cheer_payload]
    for character in CHARACTERS:
        icon = build_avatar(sheet, character["sheet_box"])
        avatars[character["id"]] = icon
        for suffix, target in (("", 48), ("@2x", 96)):
            image = icon if target == 96 else icon.resize((48, 48), Image.LANCZOS)
            name = f"avatar-{character['id']}{suffix}"
            payload = save_asset(image, name)
            payload["source"] = "docs/角色IP/素材/主角三人组-角色设计图.jpg"
            payload["crop"] = list(character["sheet_box"])
            payload["route"] = "design-sheet crop"
            payload["processing"] = "设计图 48×48 图标区裁切；缩放方形后圆角遮罩去底；WebP 92"
            additions.append(payload)

    update_runtime_manifest(
        json.loads(RUNTIME_MANIFEST_PATH.read_text(encoding="utf-8")),
        runtime_updates,
        additions,
    )
    update_shop_manifest({**runtime_updates})
    art_additions = []
    for character in CHARACTERS:
        for state in ("surprised", "sparkle"):
            image, _ = expressions[(character["id"], state)]
            art_additions.append(
                {
                    "file": f"02_characters/expressions/{character['id']}_{state}.png",
                    "size": list(image.size),
                    "category": "expression",
                    "note": "2026-11-21 新增情绪表情；供提示气泡、弹窗与活动文案使用",
                    "alpha": True,
                }
            )
    update_art_manifest(expressions, art_additions)

    build_expression_contact(expressions, before).save(QA_DIR / "expressions-contact.png")
    build_avatar_contact(avatars).save(QA_DIR / "avatars-contact.png")
    cheer.resize((min(cheer.width * 2, 800), min(cheer.height * 2, 800)), Image.LANCZOS).save(QA_DIR / "yunrong-cheer-preview.png")

    audit = {
        "date": "2026-11-21",
        "model": "gpt-image-2.5",
        "route": "images_api /images/edits via ~/.config/ai/imagegen.env",
        "expressions": {
            f"{character['id']}_{state}": {
                "size": list(expressions[(character['id'], state)][0].size),
                "file": str(expressions[(character['id'], state)][1].relative_to(ROOT)).replace("\\", "/"),
            }
            for character in CHARACTERS
            for state in STATES
        },
        "runtime_assets": additions,
        "mood_updates": runtime_updates,
    }
    (QA_DIR / "character-ip-audit.json").write_text(json.dumps(audit, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({"ok": True, "expressions": len(expressions), "runtime_added": len(additions), "qa": str(QA_DIR.relative_to(ROOT))}, ensure_ascii=False))
    return verify()


def verify() -> int:
    errors: list[str] = []
    manifest = json.loads(RUNTIME_MANIFEST_PATH.read_text(encoding="utf-8"))
    for item in manifest:
        path = ROOT / item["file"]
        if not path.exists():
            errors.append(f"missing: {item['file']}")
            continue
        data = path.read_bytes()
        if hashlib.sha256(data).hexdigest() != item["sha256"]:
            errors.append(f"sha256: {item['name']}")
        with Image.open(path) as image:
            if list(image.size) != item["size"]:
                errors.append(f"size: {item['name']} {image.size} != {item['size']}")
            if "A" in image.getbands():
                alpha = image.convert("RGBA").getchannel("A")
                if any(alpha.getpixel(point) != 0 for point in [(0, 0), (image.width - 1, 0), (0, image.height - 1), (image.width - 1, image.height - 1)]):
                    errors.append(f"corner alpha: {item['name']}")
    shop = json.loads(SHOP_MANIFEST_PATH.read_text(encoding="utf-8"))
    runtime_by_name = {item["name"]: item for item in manifest}
    for item in shop["assets"]:
        target = runtime_by_name.get(item["name"])
        if not target:
            errors.append(f"shop entry missing in runtime manifest: {item['name']}")
            continue
        for key in ("name", "file", "source", "size", "alpha_bbox", "corner_alpha", "sha256", "bytes", "processing"):
            if target.get(key) != item.get(key):
                errors.append(f"shop mismatch: {item['name']} {key}")
    art = json.loads(ART_MANIFEST_PATH.read_text(encoding="utf-8"))
    for asset in art["assets"]:
        if asset["file"].startswith("07_previews/"):
            continue
        path = ROOT / "assets/energy_park_art_pack_v1" / asset["file"]
        if not path.exists():
            errors.append(f"art missing: {asset['file']}")
            continue
        with Image.open(path) as image:
            if list(image.size) != asset.get("size"):
                errors.append(f"art size: {asset['file']}")
    if errors:
        print("\n".join(errors))
        raise SystemExit(1)
    print(json.dumps({"verified": True, "runtime_assets": len(manifest), "shop_assets": len(shop["assets"]), "art_assets": len(art["assets"])}, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
