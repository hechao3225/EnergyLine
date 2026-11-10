"""把既有管件贴图的端口标定到同一正方形画布，保留原始纹理与透明边缘。"""
from PIL import Image, ImageChops, ImageDraw
import hashlib
import cv2
import numpy as np

SIZE = 512
HALF = SIZE / 2
MOUTH = 216
INNER = 86
LO, HI = HALF - MOUTH / 2, HALF + MOUTH / 2

# 原图中的金属接头外沿、内沿及开口中心，来自保留原件的切片坐标。
# 末端口统一落在画布边界，管径统一为 216/512；中央留白不参与居中。
CALIBRATIONS = {
    'line-off': ([8, 58, 158.5, 258, 309], [0, INNER, HALF, SIZE-INNER, SIZE], [94, 158.5, 223], [LO, HALF, HI]),
    'line-on': ([8, 58, 158.5, 258, 309], [0, INNER, HALF, SIZE-INNER, SIZE], [93, 157.5, 222], [LO, HALF, HI]),
    'corner-off': ([11, 78.5, 146, 208, 255], [LO, HALF, HI, SIZE-INNER, SIZE], [8, 74.5, 141, 210, 260], [LO, HALF, HI, SIZE-INNER, SIZE]),
    'corner-on': ([12, 80, 148, 210, 256], [LO, HALF, HI, SIZE-INNER, SIZE], [8, 74.5, 141, 209, 260], [LO, HALF, HI, SIZE-INNER, SIZE]),
    't_shape-off': ([8, 53, 103, 162, 221, 270, 316], [0, INNER, LO, HALF, HI, SIZE-INNER, SIZE], [54, 114.5, 175, 225, 270], [LO, HALF, HI, SIZE-INNER, SIZE]),
    't_shape-on': ([9, 54, 104, 163.5, 223, 271, 317], [0, INNER, LO, HALF, HI, SIZE-INNER, SIZE], [55, 115.5, 176, 226, 270], [LO, HALF, HI, SIZE-INNER, SIZE]),
    'cross-off': ([15, 61, 105, 166, 227, 271, 317], [0, INNER, LO, HALF, HI, SIZE-INNER, SIZE], [9, 58, 119, 179, 239, 277, 324], [0, INNER, LO, HALF, HI, SIZE-INNER, SIZE]),
    'cross-on': ([14, 59, 104, 165, 226, 271, 316], [0, INNER, LO, HALF, HI, SIZE-INNER, SIZE], [8, 57, 118, 177.5, 237, 276, 323], [0, INNER, LO, HALF, HI, SIZE-INNER, SIZE]),
    'switch-on': ([9, 54, 162.5, 270, 316], [0, INNER, HALF, SIZE-INNER, SIZE], [142, 199, 256], [LO, HALF, HI]),
    'switch-off': ([9, 54, 162.5, 270, 316], [0, INNER, HALF, SIZE-INNER, SIZE], [141, 198.5, 256], [LO, HALF, HI]),
    'diode': ([9, 58, 164, 269, 319], [0, INNER, HALF, SIZE-INNER, SIZE], [99, 163, 227], [LO, HALF, HI]),
}
PORTS = {
    'line': ['left', 'right'], 'corner': ['right', 'bottom'],
    't_shape': ['left', 'right', 'bottom'], 'cross': ['top', 'right', 'bottom', 'left'],
    'switch': ['left', 'right'], 'diode': ['left', 'right'], 'source': ['right'],
}


def inverse_coordinates(original, destination):
    pixels = np.arange(SIZE, dtype=np.float32) + .5
    mapped = np.interp(pixels, destination, original)
    left, right = pixels < destination[0], pixels > destination[-1]
    mapped[left] = original[0] + (pixels[left]-destination[0]) * (original[1]-original[0]) / (destination[1]-destination[0])
    mapped[right] = original[-1] + (pixels[right]-destination[-1]) * (original[-1]-original[-2]) / (destination[-1]-destination[-2])
    return mapped.astype(np.float32)


def normalize_pipe(image, name):
    xs, xd, ys, yd = CALIBRATIONS[name.removeprefix('pipe-')]
    x, y = np.meshgrid(inverse_coordinates(xs, xd), inverse_coordinates(ys, yd))
    rgba = np.asarray(image.convert('RGBA'), dtype=np.float32) / 255
    # 预乘透明度后重采样，防止接头边缘出现黑色/白色描边。
    rgba[:, :, :3] *= rgba[:, :, 3:4]
    warped = cv2.remap(rgba, x, y, cv2.INTER_CUBIC, borderMode=cv2.BORDER_CONSTANT)
    warped = np.clip(warped, 0, 1)
    np.divide(warped[:, :, :3], warped[:, :, 3:4], out=warped[:, :, :3], where=warped[:, :, 3:4] > 0)
    warped[:, :, :3] = np.clip(warped[:, :, :3], 0, 1)
    warped[warped[:, :, 3] == 0, :3] = 0
    return Image.fromarray(np.round(warped*255).astype(np.uint8), 'RGBA')


def normalize_source(image, line):
    image = image.convert('RGBA')
    image.thumbnail((400, 273), Image.Resampling.LANCZOS)
    # 能量源外形保持原比例，右侧接入同一套有能量的直管与金色接头。
    body = image.crop((0, 0, 274, 273))
    mask = Image.new('L', body.size)
    ImageDraw.Draw(mask).ellipse((0, 0, 273, 273), fill=255)
    body.putalpha(ImageChops.multiply(body.getchannel('A'), mask))
    body = body.resize((350, 349), Image.Resampling.LANCZOS)
    result = Image.new('RGBA', (SIZE, SIZE))
    result.alpha_composite(line.crop((SIZE//2, 0, SIZE, SIZE)), (SIZE//2, 0))
    result.alpha_composite(body, (0, (SIZE-body.height)//2))
    return result


def port_metadata(name):
    family = name.removeprefix('pipe-').removesuffix('-on').removesuffix('-off')
    points = {'top': [HALF, 0], 'right': [SIZE, HALF], 'bottom': [HALF, SIZE], 'left': [0, HALF]}
    return {'canvas': [SIZE, SIZE], 'pivot': [HALF, HALF], 'mouth_diameter': MOUTH,
            'ports': {direction: points[direction] for direction in PORTS[family]}}


def standardize_couplers(destination, manifest):
    """所有端口复用同一枚金属接头，避免明暗状态和不同管型的口径再次漂移。"""
    line = Image.open(destination/'pipe-line-on.webp').convert('RGBA')
    right = Image.new('RGBA', (SIZE, SIZE))
    right.alpha_composite(line.crop((SIZE-INNER, 0, SIZE, SIZE)), (SIZE-INNER, 0))
    collars = {'right': right, 'top': right.transpose(Image.Transpose.ROTATE_90),
               'left': right.transpose(Image.Transpose.ROTATE_180), 'bottom': right.transpose(Image.Transpose.ROTATE_270)}
    regions = {'right': (SIZE-INNER, 0, SIZE, SIZE), 'left': (0, 0, INNER, SIZE),
               'top': (0, 0, SIZE, INNER), 'bottom': (0, SIZE-INNER, SIZE, SIZE)}
    for item in manifest:
        if not item['name'].startswith('pipe-'):
            continue
        path = destination/f"{item['name']}.webp"
        image = Image.open(path).convert('RGBA')
        for direction in item['port_geometry']['ports']:
            image.paste((0, 0, 0, 0), regions[direction])
            image.alpha_composite(collars[direction])
        image.save(path, 'WEBP', quality=95, method=4)
        item['sha256'] = hashlib.sha256(path.read_bytes()).hexdigest()
        item['bytes'] = path.stat().st_size
        item['alpha_bbox'] = image.getchannel('A').point(lambda value:255 if value>28 else 0).getbbox()
        item['processing'] += '；全管型与明暗状态共用金属端口'
