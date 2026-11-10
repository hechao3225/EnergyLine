"""从保留的生图原件制作 UI 2.0 补充资产及透明边缘审查图。"""
from pathlib import Path
import hashlib
import json

from PIL import Image, ImageDraw
from rembg import new_session, remove

ROOT = Path(__file__).resolve().parents[1]
SOURCE_DIR = ROOT / 'docs/UI设计稿2.0/generated-sources'
DEST = ROOT / 'public/assets/park'
REPORT = ROOT / 'docs/QA/ui2-2026-11-10'
CROPS = {
    'reward-ribbon': ('wide-panels-v2.png', (0, 650, 1536, 1024)),
    'repair-sign': ('wide-panels-v2.png', (0, 330, 1536, 635)),
    'icon-shop': ('ui-details-v2.png', (90, 245, 690, 695)),
    'settings-button': ('ui-details-v2.png', (940, 285, 1380, 690)),
    'facility-frame': ('ui-details-v2.png', (0, 695, 768, 1024)),
    'status-panel': ('wide-panels-v2.png', (0, 0, 1536, 325)),
}

session = new_session('u2netp')
manifest = json.loads((DEST / 'manifest.json').read_text(encoding='utf-8'))
manifest = [item for item in manifest if item['name'] not in CROPS]
audit = []
sheet = Image.new('RGB', (1000, len(CROPS) * 210), '#301b54')
draw = ImageDraw.Draw(sheet)
for row, (name, (filename, rect)) in enumerate(CROPS.items()):
    source = Image.open(SOURCE_DIR / filename).convert('RGBA')
    original = source.crop(rect)
    cutout = remove(original, session=session)
    visible = cutout.getchannel('A').getbbox()
    assert visible, f'{name} 主体缺失'
    final = cutout.crop(visible)
    if name in ('icon-shop', 'settings-button'):
        size = max(final.size)
        square = Image.new('RGBA', (size, size))
        square.alpha_composite(final, ((size-final.width)//2, (size-final.height)//2))
        final = square
    padded = Image.new('RGBA', (final.width + 12, final.height + 12))
    padded.alpha_composite(final, (6, 6))
    padded.thumbnail((768, 500), Image.Resampling.LANCZOS)
    output = DEST / f'{name}.webp'
    padded.save(output, 'WEBP', quality=95, method=6)
    alpha = padded.getchannel('A')
    corners = [alpha.getpixel(p) for p in [(0, 0), (padded.width-1, 0), (0, padded.height-1), (padded.width-1, padded.height-1)]]
    assert corners == [0, 0, 0, 0], f'{name} 四角应透明'
    record = {
        'name': name, 'file': str(output.relative_to(ROOT)).replace('\\', '/'),
        'source': filename, 'crop': rect, 'rotation_ccw': 0,
        'size': padded.size, 'alpha_bbox': alpha.getbbox(), 'corner_alpha': corners,
        'sha256': hashlib.sha256(output.read_bytes()).hexdigest(), 'bytes': output.stat().st_size,
        'route': 'images_api / gpt-image-2',
        'processing': 'u2netp background removal, alpha-aware trim, 6px transparent margin, proportional resize',
    }
    manifest.append(record)
    audit.append(record)
    for col, color in enumerate(('#301b54', '#fff1de')):
        preview = padded.copy()
        preview.thumbnail((470, 175), Image.Resampling.LANCZOS)
        tile = Image.new('RGBA', (500, 210), color)
        tile.alpha_composite(preview, ((500-preview.width)//2, (175-preview.height)//2))
        sheet.paste(tile.convert('RGB'), (500*col, 210*row))
        draw.text((500*col + 12, 210*row + 187), name, fill='#ffffff' if col == 0 else '#651b42')

(DEST / 'manifest.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding='utf-8')
(REPORT / 'details-alpha-audit.json').write_text(json.dumps(audit, ensure_ascii=False, indent=2), encoding='utf-8')
sheet.save(REPORT / 'details-alpha-contact.png')
print(json.dumps({'assets': len(audit), 'manifest_total': len(manifest), 'contact': str(REPORT / 'details-alpha-contact.png')}, ensure_ascii=False))
