"""把 public/assets/park/manifest.json 的哈希类字段与磁盘文件对齐（只同步，不改像素）。

用于 git 合并/冲突解决后、或手工替换素材后修复 manifest 与文件不一致。
"""
import hashlib
import json
from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
DEST = ROOT / 'public/assets/park'
MANIFEST = DEST / 'manifest.json'


def main():
    manifest = json.loads(MANIFEST.read_text(encoding='utf-8'))
    changed, missing = [], []
    for item in manifest:
        path = DEST / f"{item['name']}.webp"
        if not path.exists():
            missing.append(item['name'])
            continue
        im = Image.open(path).convert('RGBA')
        alpha = im.getchannel('A')
        sha = hashlib.sha256(path.read_bytes()).hexdigest()
        if sha != item.get('sha256') or path.stat().st_size != item.get('bytes'):
            item.update({
                'sha256': sha,
                'bytes': path.stat().st_size,
                'size': list(im.size),
                'alpha_bbox': alpha.point(lambda v: 255 if v > 28 else 0).getbbox(),
            })
            changed.append(item['name'])
    MANIFEST.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding='utf-8')
    print(json.dumps({'synced': len(changed), 'missing': missing}, ensure_ascii=False))


if __name__ == '__main__':
    main()
