"""把首页/UI 的 CSS 颜色统一做 Lab 彩度柔化（保 L* 明度与色相，alpha 不变）。

与素材同一个曲线（scripts/park_chroma.py 的 CHROMA_SOFT），保证「图」和「CSS 色块」
降饱和幅度一致；因为保 L*，文字与底色的对比度基本不变。
"""
import re
import sys
from pathlib import Path

import numpy as np

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / 'scripts'))
from park_chroma import grade_rgb, CHROMA_SOFT  # noqa: E402

TARGETS = [ROOT / 'src/index.css']
HTML = ROOT / 'index.html'

HEX_RE = re.compile(r'#([0-9a-fA-F]{3,8})\b')
RGB_RE = re.compile(r'(rgba?\()\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})([^)]*\))')


def hex_to_rgb(h):
    if len(h) == 3:
        h = ''.join(c * 2 for c in h)
    return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4)), h[6:]


def transform_hex(match):
    h = match.group(1)
    if len(h) not in (3, 6, 8):
        return match.group(0)
    rgb, alpha = hex_to_rgb(h)
    out = grade_rgb(rgb)
    return '#' + ''.join(f'{c:02x}' for c in out) + alpha


def transform_rgb(match):
    prefix, r, g, b, rest = match.groups()
    out = grade_rgb((int(r), int(g), int(b)))
    return f"{prefix}{out[0]}, {out[1]}, {out[2]}{rest}"


MARK = 'park-chroma-soft'


def main():
    total = 0
    for path in TARGETS:
        text = path.read_text(encoding='utf-8')
        if MARK in text:
            print(f'{path.name}: already softened, skipped')
            continue
        new, n1 = HEX_RE.subn(transform_hex, text)
        new, n2 = RGB_RE.subn(transform_rgb, new)
        if new != text:
            path.write_text(new, encoding='utf-8')
            total += n1 + n2
        print(f'{path.name}: hex {n1} / rgb {n2}')
    if HTML.exists():
        text = HTML.read_text(encoding='utf-8')
        new, n = HEX_RE.subn(transform_hex, text)
        if new != text:
            HTML.write_text(new, encoding='utf-8')
            print(f'index.html: hex {n}')
    print(f'CHROMA_SOFT={CHROMA_SOFT} total replacements={total}')


if __name__ == '__main__':
    main()
