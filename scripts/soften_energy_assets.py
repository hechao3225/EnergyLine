"""把既有通电管身、蓝色伴生花精与首页瀑布的荧光青就地柔化，并同步 manifest 哈希。

幂等：manifest 里已带「护眼复查」标记的条目直接跳过。新素材由
park_pipe_geometry.grade_b1 / prepare_park_assets 在生成时直接输出柔化结果，
本脚本只负责追平仓库里已经生成好的 webp。
"""
import hashlib
import json
from pathlib import Path

import numpy as np
from PIL import Image

from park_pipe_geometry import soften_energy

ROOT = Path(__file__).resolve().parents[1]
DEST = ROOT / 'public/assets/park'
MANIFEST = DEST / 'manifest.json'
MARK = '护眼复查'
PIPES = ['pipe-line-on', 'pipe-corner-on', 'pipe-t_shape-on', 'pipe-cross-on',
         'pipe-switch-on', 'pipe-source']
# name -> soften_energy 关键字参数（管身用 ENERGY_SOFT 默认值）
TARGETS = {name: {} for name in PIPES}
TARGETS.update({
    'spirit': {'sat_cap': 0.52, 'v_scale': 0.97},
    'spirit-cheer': {'sat_cap': 0.52, 'v_scale': 0.97},
    'island': {'sat_cap': 0.52, 'v_scale': 0.97},
})


def avg_sat(image):
    rgb = np.asarray(image.convert('RGBA'), dtype=np.float32) / 255
    a = rgb[..., 3] > 0.5
    if not a.any():
        return 0.0
    mx = rgb[..., :3].max(-1)
    mn = rgb[..., :3].min(-1)
    s = np.where(mx > 0, (mx - mn) / np.maximum(mx, 1e-6), 0)
    return float(s[a].mean())


def main():
    manifest = json.loads(MANIFEST.read_text(encoding='utf-8'))
    by_name = {item['name']: item for item in manifest}
    report = []
    for name, kwargs in TARGETS.items():
        entry = by_name[name]
        if MARK in entry.get('processing', ''):
            report.append({'name': name, 'skipped': True})
            continue
        path = DEST / f'{name}.webp'
        before = Image.open(path).convert('RGBA')
        after = soften_energy(before, name, **kwargs)
        after.save(path, 'WEBP', quality=95, method=4)
        saved = Image.open(path).convert('RGBA')
        alpha = saved.getchannel('A')
        entry.update({
            'sha256': hashlib.sha256(path.read_bytes()).hexdigest(),
            'bytes': path.stat().st_size,
            'size': list(saved.size),
            'alpha_bbox': alpha.point(lambda v: 255 if v > 28 else 0).getbbox(),
            'processing': (entry.get('processing', '') +
                           '；' + MARK + '：荧光青能量色柔化为天青蓝（ENERGY_SOFT，只重映射色相/饱和度/明度）').strip('；'),
        })
        report.append({'name': name, 'avgS_before': round(avg_sat(before) * 100, 1),
                       'avgS_after': round(avg_sat(saved) * 100, 1)})
    MANIFEST.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding='utf-8')
    print(json.dumps(report, ensure_ascii=False))


if __name__ == '__main__':
    main()
