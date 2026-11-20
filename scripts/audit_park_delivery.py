"""核验发行资源与截图，生成同尺寸设计稿对照和可追溯的证据清单。"""
from pathlib import Path
import hashlib
import json
from datetime import datetime, timezone

import numpy as np
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
REPORT = ROOT / 'docs/QA/ui2-2026-11-10'
SCREENS = REPORT / 'screens'


def load_label_font():
    for candidate in (
        Path('/System/Library/Fonts/PingFang.ttc'),
        Path('/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc'),
        Path('C:/Windows/Fonts/msyh.ttc'),
    ):
        if candidate.exists():
            return ImageFont.truetype(str(candidate), 20)
    return ImageFont.load_default()


def resolve_source(source: str) -> list[Path]:
    paths = []
    for part in (item.strip() for item in source.split('+')):
        candidate = ROOT / part
        if not candidate.exists():
            candidate = ROOT / 'docs/UI设计稿2.0/generated-sources' / part
        assert candidate.exists(), f'缺少原件：{part}'
        paths.append(candidate)
    return paths


label_font = load_label_font()
manifest = json.loads((ROOT / 'public/assets/park/manifest.json').read_text(encoding='utf-8'))
shop_manifest = json.loads((ROOT / 'public/assets/park/shop-assets.json').read_text(encoding='utf-8'))
shop_by_name = {item['name']: item for item in shop_manifest['assets']}
assets = []
for item in manifest:
    file = ROOT / item['file']
    runtime = ROOT / 'dist/assets/park' / file.name
    digest = hashlib.sha256(file.read_bytes()).hexdigest()
    assert digest == item['sha256'], f'清单摘要过期：{file.name}'
    assert runtime.exists() and runtime.read_bytes() == file.read_bytes(), f'构建资产不一致：{file.name}'
    with Image.open(file) as image:
        image.load()
        assert list(image.size) == item['size'], f'清单尺寸过期：{file.name}'
        alpha = image.convert('RGBA').getchannel('A')
        shop_item = shop_by_name.get(item['name'])
        has_alpha = shop_item['has_alpha'] if shop_item else item.get('has_alpha', item['name'] != 'background')
        if has_alpha:
            assert all(alpha.getpixel(p) == 0 for p in [(0, 0), (image.width-1, 0), (0, image.height-1), (image.width-1, image.height-1)]), f'角点不透明：{file.name}'
    sources = resolve_source(item['source'])
    if shop_item:
        for key in ('name', 'file', 'source', 'size', 'alpha_bbox', 'corner_alpha', 'sha256', 'bytes'):
            assert item.get(key) == shop_item.get(key), f'商店条目与独立清单不一致：{item["name"]} {key}'
    assets.append({'name': item['name'], 'size': item['size'], 'sha256': digest,
                   'has_alpha': has_alpha, 'sources': [str(path.relative_to(ROOT)) for path in sources]})

comparisons = []
for number, name, screen in [
    (1, 'home', 'home-361x727.png'),
    (2, 'play', 'play-897x1752.png'),
    (3, 'victory', 'victory-897x1754.png'),
]:
    reference = Image.open(ROOT / f'docs/UI设计稿2.0/{number}.png').convert('RGB')
    runtime = Image.open(SCREENS / screen).convert('RGB')
    assert reference.size == runtime.size, f'{name} 对照尺寸不同：{reference.size} / {runtime.size}'
    delta = np.abs(np.asarray(reference, dtype=np.int16) - np.asarray(runtime, dtype=np.int16))
    heat = np.zeros((*delta.shape[:2], 3), dtype=np.uint8)
    heat[:, :, 0] = np.minimum(delta.max(axis=2)*3, 255)
    heat[:, :, 1] = np.minimum(delta.max(axis=2), 180)
    Image.fromarray(heat).save(REPORT / f'{name}-difference.png')
    sheet = Image.new('RGB', (reference.width*2, reference.height+32), '#281355')
    sheet.paste(reference, (0, 32))
    sheet.paste(runtime, (reference.width, 32))
    draw = ImageDraw.Draw(sheet)
    draw.text((12, 3), '设计参考', fill='white', font=label_font)
    draw.text((reference.width+12, 3), '实际运行', fill='white', font=label_font)
    sheet.save(REPORT / f'{name}-comparison.png')
    comparisons.append({'page': name, 'reference': f'{number}.png', 'runtime': screen,
        'size': reference.size, 'mean_absolute_channel_error': round(float(delta.mean()), 3),
        'note': '同尺寸像素差只定位差异；真实关卡、资源、步数、字体和重新生成的插画均产生差异，不作为还原率。'})

screens = []
for file in sorted(SCREENS.glob('*.png')):
    if file.name == 'failure.png':
        continue
    with Image.open(file) as image:
        image.load()
        screens.append({'file': file.name, 'size': image.size, 'sha256': hashlib.sha256(file.read_bytes()).hexdigest()})
columns, width, height = 5, 220, 520
contact = Image.new('RGB', (columns*width, ((len(screens)+columns-1)//columns)*height), '#281355')
draw = ImageDraw.Draw(contact)
for i, entry in enumerate(screens):
    image = Image.open(SCREENS / entry['file']).convert('RGB')
    image.thumbnail((210, 485), Image.Resampling.LANCZOS)
    x, y = i % columns * width, i // columns * height
    contact.paste(image, (x+(width-image.width)//2, y))
    draw.text((x+5, y+490), entry['file'].removesuffix('.png'), fill='white')
contact.save(REPORT / 'screen-contact.png')

source_files = sorted(p for p in (ROOT / 'src').rglob('*') if p.is_file())
build_files = sorted(p for p in (ROOT / 'dist').rglob('*') if p.is_file())
result = {'captured_at': datetime.now(timezone.utc).isoformat(), 'asset_count': len(assets),
    'asset_bytes': sum(item['bytes'] for item in manifest), 'assets': assets,
    'comparisons': comparisons, 'screens': screens,
    'source_snapshot': {str(p.relative_to(ROOT)).replace('\\', '/'): hashlib.sha256(p.read_bytes()).hexdigest() for p in source_files},
    'build_snapshot': {str(p.relative_to(ROOT)).replace('\\', '/'): hashlib.sha256(p.read_bytes()).hexdigest() for p in build_files}}
(REPORT / 'delivery-audit.json').write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding='utf-8')
print(json.dumps({'assets': len(assets), 'screens': len(screens), 'comparisons': comparisons}, ensure_ascii=False))
