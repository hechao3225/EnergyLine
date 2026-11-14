"""按 B1「香槟金 + 暖白」重出 12 张管件素材。

步骤与 prepare_park_assets.py 的管件分支一致（图集切片 → 去边裁切 → 方形画布 →
端口标定 → 共享金属接头），中间插入 grade_b1 调色。原图集与其它素材不动。
"""
import hashlib
import json
import os
import shutil
from pathlib import Path

import numpy as np
from PIL import Image

from park_pipe_geometry import (MOUTH, SIZE, grade_b1, normalize_pipe,
                                normalize_source, port_metadata, standardize_couplers)

ROOT = Path(__file__).resolve().parents[1]
ATLAS = ROOT / 'docs/UI设计稿2.0/generated-sources/pipes.png'
DEST = Path(os.environ.get('PARK_PIPE_DEST', ROOT / 'public/assets/park'))
MANIFEST = DEST / 'manifest.json'


def trim(im):
    a = np.array(im)
    a[:, :, 3][a[:, :, 3] <= 4] = 0
    im = Image.fromarray(a)
    bbox = im.getchannel('A').point(lambda v: 255 if v > 28 else 0).getbbox()
    return im.crop((max(0, bbox[0] - 8), max(0, bbox[1] - 8),
                    min(im.width, bbox[2] + 8), min(im.height, bbox[3] + 8)))


def build(atlas, crop, rotate=0):
    im = trim(atlas.crop(tuple(crop)))
    if rotate:
        im = im.rotate(rotate, expand=True)
    canvas = Image.new('RGBA', (max(im.size),) * 2)
    canvas.alpha_composite(im, ((canvas.width - im.width) // 2, (canvas.height - im.height) // 2))
    return canvas


def main():
    manifest = json.loads(MANIFEST.read_text(encoding='utf-8'))
    atlas = Image.open(ATLAS).convert('RGBA')
    pipes = [item for item in manifest if item['name'].startswith('pipe-')]
    line_on = None
    for item in pipes:
        name = item['name']
        rotate = 90 if 'corner' in name else 0
        if name == 'pipe-source':
            # 独立生成件：与 prepare_park_assets.py 的 extra-sources 分支同样处理。
            if line_on is None:
                line_on = Image.open(DEST / 'pipe-line-on.webp').convert('RGBA')
            im = trim(Image.open(ATLAS.parent / 'pipe-source.png').convert('RGBA'))
            im = normalize_source(im, line_on)
            im.thumbnail((SIZE, SIZE), Image.Resampling.LANCZOS)
        else:
            im = normalize_pipe(build(atlas, item['crop'], rotate), name)
        im = grade_b1(im, name)
        path = DEST / f'{name}.webp'
        im.save(path, 'WEBP', quality=95, method=4)
        alpha = im.getchannel('A')
        item.update({
            'size': im.size,
            'alpha_bbox': alpha.point(lambda v: 255 if v > 28 else 0).getbbox(),
            'corner_alpha': [alpha.getpixel(p) for p in
                             [(0, 0), (im.width - 1, 0), (0, im.height - 1), (im.width - 1, im.height - 1)]],
            'sha256': hashlib.sha256(path.read_bytes()).hexdigest(),
            'bytes': path.stat().st_size,
            'port_geometry': port_metadata(name),
            'processing': '保留原件；端口中心/边界/管径标定到512方形画布；预乘alpha重采样；'
                          'B1香槟金+暖白调色（色相/饱和度重映射，不新增像素形状）',
        })

    standardize_couplers(DEST, pipes)
    MANIFEST.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding='utf-8')
    print(json.dumps({'pipes': len(pipes), 'size': [SIZE, SIZE], 'mouth': MOUTH,
                      'manifest': str(MANIFEST)}, ensure_ascii=False))


if __name__ == '__main__':
    main()
