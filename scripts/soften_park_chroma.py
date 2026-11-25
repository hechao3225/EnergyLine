"""一次性迁移：把 public/assets/park 里非管件素材统一做 Lab 彩度柔化，并同步 manifest。

幂等：manifest 的 processing 里带「彩度柔化」标记的条目直接跳过。
新素材由 prepare_park_assets.py 生成时自动应用同一曲线（scripts/park_chroma.py 的 CHROMA_SOFT）。
"""
import hashlib
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / 'scripts'))
from PIL import Image
from park_chroma import soften_chroma, CHROMA_SOFT

DEST = ROOT / 'public/assets/park'
MANIFEST = DEST / 'manifest.json'
MARK = '彩度柔化'


def main():
    manifest = json.loads(MANIFEST.read_text(encoding='utf-8'))
    done, skipped = [], []
    for item in manifest:
        name = item['name']
        if name.startswith('pipe-'):
            continue
        if MARK in item.get('processing', ''):
            skipped.append(name)
            continue
        path = DEST / f'{name}.webp'
        im = soften_chroma(Image.open(path).convert('RGBA'))
        im.save(path, 'WEBP', quality=95, method=4)
        saved = Image.open(path).convert('RGBA')
        alpha = saved.getchannel('A')
        item.update({
            'sha256': hashlib.sha256(path.read_bytes()).hexdigest(),
            'bytes': path.stat().st_size,
            'size': list(saved.size),
            'alpha_bbox': alpha.point(lambda v: 255 if v > 28 else 0).getbbox(),
            'processing': (item.get('processing', '') +
                           '；' + MARK + f'：Lab 彩度压至 C*≤{CHROMA_SOFT["cap"]:g}（k={CHROMA_SOFT["k"]:g}），L* 与 alpha 不变').strip('；'),
        })
        done.append(name)
    MANIFEST.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding='utf-8')
    print(json.dumps({'graded': len(done), 'skipped': len(skipped), 'params': CHROMA_SOFT}, ensure_ascii=False))


if __name__ == '__main__':
    main()
