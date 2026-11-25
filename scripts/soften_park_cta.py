"""主按钮底板（button-gold.webp）只降饱和迁移 + manifest 同步。

幂等：
- 素材彩度已降（可见像素平均 C* <= 66）时不再重复处理，只同步 manifest 哈希；
- manifest 的 processing 已有「按钮降饱和」标记时只补标记。

合并冲突等导致 manifest 与文件短暂不一致时，等 git 合并完成后再跑本脚本即可追平。
"""
import hashlib
import json
import sys
from pathlib import Path

import numpy as np

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / 'scripts'))
from PIL import Image
from park_chroma import CTA_SOFT, rgb_to_lab, soften_cta_chroma

DEST = ROOT / 'public/assets/park'
MANIFEST = DEST / 'manifest.json'
MARK = '按钮降饱和'
OLD_MARK = '按钮降亮'
TARGETS = ['button-gold']
C_THRESHOLD = 66.0  # 降饱和前约 74.6；降后约 57.6


def mean_chroma(path):
    im = Image.open(path).convert('RGBA')
    a = np.asarray(im, dtype=np.float32) / 255
    mask = a[..., 3] > 0.4
    lab = rgb_to_lab(a[..., :3])
    return float(np.hypot(lab[..., 1], lab[..., 2])[mask].mean())


def main():
    manifest = json.loads(MANIFEST.read_text(encoding='utf-8'))
    by_name = {item['name']: item for item in manifest}
    report = []
    for name in TARGETS:
        item = by_name[name]
        path = DEST / f'{name}.webp'
        before = mean_chroma(path)
        applied = False
        if before > C_THRESHOLD:
            soften_cta_chroma(Image.open(path).convert('RGBA')).save(path, 'WEBP', quality=95, method=4)
            applied = True
        saved = Image.open(path).convert('RGBA')
        alpha = saved.getchannel('A')
        item.update({
            'sha256': hashlib.sha256(path.read_bytes()).hexdigest(),
            'bytes': path.stat().st_size,
            'size': list(saved.size),
            'alpha_bbox': alpha.point(lambda v: 255 if v > 28 else 0).getbbox(),
        })
        note = f'{MARK}：Lab C*×{CTA_SOFT["f"]}（软膝 {CTA_SOFT["knee"]:g}），L* 与色相不变'
        processing = item.get('processing', '')
        if OLD_MARK in processing:
            processing = '；'.join(p for p in processing.split('；') if not p.startswith(OLD_MARK))
        if MARK not in processing:
            processing = (processing + '；' + note).strip('；')
        item['processing'] = processing
        report.append({'name': name, 'applied': applied,
                       'C_before': round(before, 1), 'C_after': round(mean_chroma(path), 1)})
    MANIFEST.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding='utf-8')
    print(json.dumps({'report': report, 'params': CTA_SOFT}, ensure_ascii=False))


if __name__ == '__main__':
    main()
