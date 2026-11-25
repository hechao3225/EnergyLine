"""按新参数回补已做过的 CSS 彩度柔化（调强度时用）。

当前颜色 = 原色经过 OLD 曲线压缩的结果，对未触顶色值精确反推原彩度后按 NEW 曲线重压：
    C_orig = knee + (C_cur - knee) / k_old
    C_new  = min(knee + (C_orig - knee) * k_new, cap_new)
触顶色无法精确还原，统一落到 cap_new（相当于一次有界增益）。L*/色相/alpha 均不变。

用法：
    python scripts/retune_park_css_chroma.py --old-k 0.75 --old-cap 70
"""
import argparse
import re
import sys
from pathlib import Path

import numpy as np

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / 'scripts'))
from park_chroma import rgb_to_lab, lab_to_rgb, CHROMA_SOFT  # noqa: E402

TARGETS = [ROOT / 'src/index.css', ROOT / 'index.html']
HEX_RE = re.compile(r'#([0-9a-fA-F]{3,8})\b')
RGB_RE = re.compile(r'(rgba?\()\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})([^)]*\))')


class Curve:
    def __init__(self, k, cap, knee=6.0):
        self.k, self.cap, self.knee = k, cap, knee

    def target(self, cur):
        if cur <= self.knee:
            return cur
        if cur >= self.cap - 0.5:
            return self.new.cap
        orig = self.knee + (cur - self.knee) / self.k
        return min(self.knee + (orig - self.knee) * self.new.k, self.new.cap)


def make_retarget(old, new):
    def retarget(rgb255):
        rgb = np.array(rgb255, dtype=np.float64) / 255.0
        lab = rgb_to_lab(rgb)
        chroma = float(np.hypot(lab[1], lab[2]))
        if chroma <= old.knee:
            return tuple(rgb255)
        if chroma >= old.cap - 0.5:
            new_c = new.cap
        else:
            orig = old.knee + (chroma - old.knee) / old.k
            new_c = min(new.knee + (orig - new.knee) * new.k, new.cap)
        scale = new_c / max(chroma, 1e-6)
        lab[1] *= scale
        lab[2] *= scale
        out = np.clip(lab_to_rgb(lab) * 255, 0, 255)
        return tuple(int(round(v)) for v in out)
    return retarget


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--old-k', type=float, required=True)
    ap.add_argument('--old-cap', type=float, required=True)
    args = ap.parse_args()
    old = Curve(args.old_k, args.old_cap)
    new = Curve(CHROMA_SOFT['k'], CHROMA_SOFT['cap'], CHROMA_SOFT['knee'])
    retarget = make_retarget(old, new)

    def sub_hex(m):
        h = m.group(1)
        if len(h) not in (3, 6, 8):
            return m.group(0)
        if len(h) == 3:
            h = ''.join(c * 2 for c in h)
        rgb = tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))
        out = retarget(rgb)
        return '#' + ''.join(f'{c:02x}' for c in out) + h[6:]

    def sub_rgb(m):
        prefix, r, g, b, rest = m.groups()
        out = retarget((int(r), int(g), int(b)))
        return f"{prefix}{out[0]}, {out[1]}, {out[2]}{rest}"

    for path in TARGETS:
        text = path.read_text(encoding='utf-8')
        new_text, n1 = HEX_RE.subn(sub_hex, text)
        new_text, n2 = RGB_RE.subn(sub_rgb, new_text)
        if new_text != text:
            path.write_text(new_text, encoding='utf-8')
        print(f'{path.name}: hex {n1} / rgb {n2}')
    print(f'old=({old.k},{old.cap}) new=({new.k},{new.cap})')


if __name__ == '__main__':
    main()
