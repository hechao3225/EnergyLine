"""从发行贴图像素测量实际端口，核对管径、明暗状态和四个旋转方向。"""
from pathlib import Path
import json
import numpy as np
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
REPORT = ROOT / 'docs/QA/pipe-alignment-2026-11-10'
REPORT.mkdir(parents=True, exist_ok=True)
EXPECTED = {
    'line-off': ('left', 'right'), 'line-on': ('left', 'right'),
    'corner-off': ('right', 'bottom'), 'corner-on': ('right', 'bottom'),
    't_shape-off': ('left', 'right', 'bottom'), 't_shape-on': ('left', 'right', 'bottom'),
    'cross-off': ('top', 'right', 'bottom', 'left'), 'cross-on': ('top', 'right', 'bottom', 'left'),
    'switch-on': ('left', 'right'), 'switch-off': ('left', 'right'),
    'diode': ('left', 'right'), 'source': ('right',),
}
clockwise = ['top', 'right', 'bottom', 'left']
rows = []
font = ImageFont.truetype('C:/Windows/Fonts/msyh.ttc', 17)
sheet = Image.new('RGB', (1040, len(EXPECTED)*240), '#291647')
draw = ImageDraw.Draw(sheet)
for row, (name, ports) in enumerate(EXPECTED.items()):
    image = Image.open(ROOT/f'public/assets/park/pipe-{name}.webp').convert('RGBA')
    assert image.size == (512, 512), name
    for angle in range(4):
        actual = image.rotate(-90*angle)
        alpha = np.array(actual)[:, :, 3]
        observed = {}
        for port in ports:
            direction = clockwise[(clockwise.index(port)+angle)%4]
            band = {'left':alpha[:,:8].max(axis=1), 'right':alpha[:,-8:].max(axis=1),
                    'top':alpha[:8,:].max(axis=0), 'bottom':alpha[-8:,:].max(axis=0)}[direction]
            visible = np.flatnonzero(band > 128)
            assert len(visible), f'{name} {angle*90}° {direction} 端口断开'
            center = (int(visible[0])+int(visible[-1])) / 2
            # 标准管件边中心在像素255.5，512图上容许1px抗锯齿差。
            assert abs(center-255.5) <= 1, f'{name} {direction} 中心偏移：{center}'
            observed[direction] = {'center_px': center, 'diameter_px': int(visible[-1]-visible[0]+1)}
        rows.append({'name':name, 'rotation':angle*90, 'ports':observed})
        tile = Image.new('RGBA', (260, 240), '#291647' if angle%2 == 0 else '#fff1dd')
        thumb = actual.resize((190, 190), Image.Resampling.LANCZOS)
        tile.alpha_composite(thumb, (35, 5))
        sheet.paste(tile.convert('RGB'), (angle*260, row*240))
        draw.text((angle*260+8, row*240+205), f'{name} {angle*90}°', font=font, fill='white' if angle%2==0 else '#651b42')

diameters = [port['diameter_px'] for result in rows for port in result['ports'].values()]
assert max(diameters) - min(diameters) <= 1, f'接头口径不一致：{min(diameters)}..{max(diameters)}'
result = {'status':'通过', 'cases':len(rows), 'canvas':[512,512], 'diameter_range': [min(diameters),max(diameters)],
          'max_center_error_px':max(abs(port['center_px']-255.5) for row in rows for port in row['ports'].values()), 'observations':rows}
(REPORT/'port-pixel-audit.json').write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding='utf-8')
sheet.save(REPORT/'pipe-rotation-contact.png')
print(json.dumps({key:result[key] for key in ['status','cases','diameter_range','max_center_error_px']}, ensure_ascii=False))
