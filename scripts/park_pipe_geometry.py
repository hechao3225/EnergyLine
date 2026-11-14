"""把既有管件贴图的端口标定到同一正方形画布，保留原始纹理与透明边缘。"""
from PIL import Image, ImageChops, ImageDraw
import hashlib
import numpy as np

try:  # cv2 只在开发机常驻；无 OpenCV 时退回等价的双三次重采样，产物口径一致。
    import cv2
except ImportError:  # pragma: no cover - 取决于运行环境
    cv2 = None

SIZE = 512
HALF = SIZE / 2
MOUTH = 216
INNER = 86
LO, HI = HALF - MOUTH / 2, HALF + MOUTH / 2

def _hsv(rgb):
    """rgb: float 0..1 -> h(deg), s, v。"""
    r, g, b = rgb[..., 0], rgb[..., 1], rgb[..., 2]
    mx = rgb.max(-1); mn = rgb.min(-1); d = np.maximum(mx - mn, 1e-6)
    h = np.zeros_like(mx)
    m = mx == r; h[m] = ((g - b)[m] / d[m]) % 6
    m = (mx == g) & (mx != r); h[m] = ((b - r)[m] / d[m]) + 2
    m = (mx == b) & (mx != r) & (mx != g); h[m] = ((r - g)[m] / d[m]) + 4
    s = np.where(mx > 0, (mx - mn) / np.maximum(mx, 1e-6), 0)
    return (h * 60) % 360, s, mx


def _hsv_to_rgb(h, s, v):
    """h 度数、s/v 0..1 -> 三通道 float。"""
    c = v * s
    hp = (h / 60) % 6
    x = c * (1 - np.abs(hp % 2 - 1))
    zero = np.zeros_like(c)
    r, g, b = zero.copy(), zero.copy(), zero.copy()
    for lo, (rr, gg, bb) in enumerate([(c, x, zero), (x, c, zero), (zero, c, x),
                                       (zero, x, c), (x, zero, c), (c, zero, x)]):
        m = (hp >= lo) & (hp < lo + 1)
        r[m], g[m], b[m] = rr[m], gg[m], bb[m]
    return r + (v - c), g + (v - c), b + (v - c)


# 接头配色：淡紫（比瓦片亮 ~34 个 L*，色相差 ~30°，在紫色盘面上仍可读）。
B1_GOLD = {'hue': 39.5, 'sat_mid': 0.90, 'sat_fade': 0.32,
           'fade_lo': 0.85, 'fade_hi': 1.0, 'v_gain': 1.0, 'v_lift': 0.0}
# 管身配色：发起人偏好保留原图的紫白（只去掉青色污染），故默认关闭暖白重映射。
# 需要暖白时把 B1_WHITE 设为 {'hue':36.0,'sat':0.10,'lift':0.06}。
B1_WHITE = None

# 瓦片底图：从浓紫压成淡粉紫，保留高光/描边结构。背景靠亮度而非饱和度建立层次。
TILE_THEME = {'hue': 308.0, 'sat_cap': 0.26, 'v_scale': 0.88, 'hue_pull': 0.25}
# 浅色盘面方案默认关闭：发起人反馈饱和度太低，回到原深紫。置 True 可切回淡紫。
TILE_PALE = False

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
    # 阀门手轮比管身宽，原纵向标定会把轮盘顶推出画布；在轮盘顶加锚点，
    # 让轮盘与管身同比例（1.667）落进 8px 边距，管身段(142..256)标定不变。
    'switch-on': ([9, 54, 162.5, 270, 316], [0, INNER, HALF, SIZE-INNER, SIZE], [58, 142, 256], [8, LO, HI]),
    'switch-off': ([9, 54, 162.5, 270, 316], [0, INNER, HALF, SIZE-INNER, SIZE], [57, 141, 256], [6, LO, HI]),
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


def _cubic_kernel(t):
    """Catmull-Rom 变体（a=-0.75），与 cv2.INTER_CUBIC 的核一致。"""
    a = -0.75
    t = np.abs(t)
    return np.where(
        t <= 1,
        (a + 2) * t ** 3 - (a + 3) * t ** 2 + 1,
        np.where(t < 2, a * t ** 3 - 5 * a * t ** 2 + 8 * a * t - 4 * a, 0),
    ).astype(np.float32)


def _remap_bicubic(src, map_x, map_y):
    """等价于 cv2.remap(INTER_CUBIC, BORDER_CONSTANT)，无 OpenCV 时使用。"""
    src_h, src_w = src.shape[:2]
    height, width = map_x.shape
    x0 = np.floor(map_x).astype(np.int32)
    y0 = np.floor(map_y).astype(np.int32)
    dx = map_x - x0
    dy = map_y - y0

    acc = np.zeros((height, width, src.shape[2]), dtype=np.float32)
    for j in range(-1, 3):
        yy = y0 + j
        wy = _cubic_kernel(dy - j) * ((yy >= 0) & (yy < src_h))
        y_clip = np.clip(yy, 0, src_h - 1)
        for i in range(-1, 3):
            xx = x0 + i
            wx = _cubic_kernel(dx - i) * ((xx >= 0) & (xx < src_w))
            x_clip = np.clip(xx, 0, src_w - 1)
            acc += src[y_clip, x_clip] * (wx * wy)[:, :, None]
    return acc


def _remap(src, map_x, map_y):
    if cv2 is not None:
        return cv2.remap(src, map_x, map_y, cv2.INTER_CUBIC, borderMode=cv2.BORDER_CONSTANT)
    return _remap_bicubic(src, map_x, map_y)


def normalize_pipe(image, name):
    xs, xd, ys, yd = CALIBRATIONS[name.removeprefix('pipe-')]
    x, y = np.meshgrid(inverse_coordinates(xs, xd), inverse_coordinates(ys, yd))
    rgba = np.asarray(image.convert('RGBA'), dtype=np.float32) / 255
    # 预乘透明度后重采样，防止接头边缘出现黑色/白色描边。
    rgba[:, :, :3] *= rgba[:, :, 3:4]
    warped = _remap(rgba, x, y)
    warped = np.clip(warped, 0, 1)
    np.divide(warped[:, :, :3], warped[:, :, 3:4], out=warped[:, :, :3], where=warped[:, :, 3:4] > 0)
    warped[:, :, :3] = np.clip(warped[:, :, :3], 0, 1)
    warped[warped[:, :, 3] == 0, :3] = 0
    return Image.fromarray(np.round(warped*255).astype(np.uint8), 'RGBA')


def grade_b1(image, name=''):
    """B1 配色：金色转香槟金，断电管身转暖白。

    通电状态的青色光管保持原样（只调金色），阀门红/绿轮不做色相迁移；
    只重映射色相/饱和度/明度，不新增像素形状，原件保留在图集里。
    """
    rgba = np.asarray(image.convert('RGBA'), dtype=np.float32) / 255
    rgb = rgba[..., :3]
    a = rgba[..., 3]
    h, s, v = _hsv(rgb)
    gold = (h >= 16) & (h <= 76) & (s > 0.38) & (v > 0.18)
    cool = (h >= 145) & (h <= 245) & (s > 0.22)
    accent = (((h < 18) | (h > 336)) | ((h >= 70) & (h < 150))) & (s > 0.22)
    tube = (a > 0.02) & ~gold & ~cool & ~accent

    hg = (B1_GOLD['hue'] + (h - 41.3) * 0.45) % 360
    fade = np.clip((v - B1_GOLD['fade_lo']) / (B1_GOLD['fade_hi'] - B1_GOLD['fade_lo']), 0, 1)
    fade = fade * fade * (3 - 2 * fade)
    sg = s * (B1_GOLD['sat_mid'] - B1_GOLD['sat_fade'] * fade)
    vg = np.clip(v * B1_GOLD['v_gain'] + B1_GOLD.get('v_lift', 0.0) * (1 - v), 0, 1)

    out = rgba.copy()
    m = gold & (a > 0)
    if m.any():
        r, g, b = _hsv_to_rgb(hg[m], sg[m], vg[m])
        out[..., 0][m], out[..., 1][m], out[..., 2][m] = r, g, b

    if B1_WHITE and not name.endswith('-on'):  # 通电管身是青色光管，只调金属
        ht = (B1_WHITE['hue'] + (h - 279.0) * 0.06) % 360
        st = np.minimum(s * 0.45, B1_WHITE['sat'])
        vt = v + (1 - v) * B1_WHITE['lift']
        m = tube & (a > 0)
        if m.any():
            r, g, b = _hsv_to_rgb(ht[m], st[m], vt[m])
            out[..., 0][m], out[..., 1][m], out[..., 2][m] = r, g, b

    out = np.clip(out, 0, 1)
    out[out[..., 3] == 0, :3] = 0
    return Image.fromarray(np.round(out * 255).astype(np.uint8), 'RGBA')


def grade_tile(image):
    """把瓦片底图压成淡粉紫，供浅色盘面使用；alpha 与描边结构不变。"""
    rgba = np.asarray(image.convert('RGBA'), dtype=np.float32) / 255
    a = rgba[..., 3]
    h, s, v = _hsv(rgba[..., :3])
    ht = (TILE_THEME['hue'] + (h - 283.0) * TILE_THEME['hue_pull']) % 360
    st = np.minimum(s, TILE_THEME['sat_cap'])
    vt = np.clip(v * TILE_THEME['v_scale'], 0, 1)
    out = rgba.copy()
    m = a > 0.004
    r, g, b = _hsv_to_rgb(ht[m], st[m], vt[m])
    out[..., 0][m], out[..., 1][m], out[..., 2][m] = r, g, b
    out = np.clip(out, 0, 1)
    out[out[..., 3] == 0, :3] = 0
    return Image.fromarray(np.round(out * 255).astype(np.uint8), 'RGBA')


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


def _bore_weight(image):
    """开口光管的软权重（0..1）：按青蓝饱和与明暗渐变过渡，避免硬边。"""
    rgba = np.asarray(image.convert('RGBA'), dtype=np.float32) / 255
    h, s, v = _hsv(rgba[..., :3])
    hue_w = np.clip((h - 140) / 25, 0, 1) * np.clip((250 - h) / 25, 0, 1)
    sat_w = np.clip((s - 0.10) / 0.22, 0, 1)
    alpha_w = np.clip((rgba[..., 3] - 0.05) / 0.45, 0, 1)
    w = hue_w * sat_w * alpha_w
    return w * w * (3 - 2 * w)


def tint_bore(collar, reference_rgb):
    """把标准接头开口里的通电光管换成该管件自己的管身色。

    开口的形状与明暗梯度不变，只按参考色重上色：断电/单向管得到暖白暗腔，
    通电管保持青光，接头几何仍然完全统一。
    """
    rgba = np.asarray(collar.convert('RGBA'), dtype=np.float32) / 255
    w = _bore_weight(collar)[..., None]
    ref = np.asarray(reference_rgb, dtype=np.float32) / 255
    ref_v = max(float(ref.max()), 1e-3)
    lum = rgba[..., :3].max(-1)[..., None]
    tinted = np.clip(ref * (lum / ref_v) * 0.82 + ref * 0.18, 0, 1)
    out = rgba.copy()
    out[..., :3] = rgba[..., :3] * (1 - w) + tinted * w
    return Image.fromarray(np.round(np.clip(out, 0, 1) * 255).astype(np.uint8), 'RGBA')


def _tube_reference(image, direction):
    """取端口向内 24px 处的管身颜色，作为开口开口色参考。"""
    probe = {'right': (SIZE - INNER - 24, SIZE // 2), 'left': (INNER + 24, SIZE // 2),
             'top': (SIZE // 2, INNER + 24), 'bottom': (SIZE // 2, SIZE - INNER - 24)}[direction]
    px = np.asarray(image.convert('RGBA'), dtype=np.float32)[probe[1], probe[0], :3]
    return px / 255


# 端头沿端口轴的宽度比例（1.0 = 原始 87px）。全局重映射会同时压窄异轴端口，
# 实测会让 corner/cross 的口径从 139 掉到 130~187，故默认关闭，等重绘图集后再开。
SLIM_ENDS = 1.0


def _warp(image, map_x, map_y):
    rgba = np.asarray(image, dtype=np.float32) / 255
    rgba[..., :3] *= rgba[..., 3:4]
    out = np.clip(_remap(rgba, map_x, map_y), 0, 1)
    np.divide(out[..., :3], out[..., 3:4], out=out[..., :3], where=out[..., 3:4] > 0)
    out[out[..., 3] == 0, :3] = 0
    return Image.fromarray(np.round(np.clip(out, 0, 1) * 255).astype(np.uint8), 'RGBA')


def slim_ports(image, ports, k=SLIM_ENDS):
    """把端头沿端口轴压窄，管身顺势延长；整幅分段重采样，不留拼接缝。

    端头外径与端口中心不变，因此口径/对接坐标不受影响。
    """
    if k >= 0.999:
        return image
    inner = SIZE - INNER
    dest_edge = SIZE - INNER * k
    pixels = np.arange(SIZE, dtype=np.float32) + .5
    mapping = np.where(pixels <= dest_edge,
                       pixels * (inner / dest_edge),
                       inner + (pixels - dest_edge) * (1 / k))
    if 'left' in ports:
        mapping = SIZE - mapping[::-1].copy()
    if any(p in ('left', 'right') for p in ports):
        map_x = np.tile(mapping[None, :], (SIZE, 1)).astype(np.float32)
        map_y = np.tile(pixels[:, None], (1, SIZE)).astype(np.float32)
        image = _warp(image, map_x, map_y)
    if any(p in ('top', 'bottom') for p in ports):
        vmap = np.where(pixels <= dest_edge,
                        pixels * (inner / dest_edge),
                        inner + (pixels - dest_edge) * (1 / k))
        if 'top' in ports:
            vmap = SIZE - vmap[::-1].copy()
        map_x = np.tile(pixels[None, :], (SIZE, 1)).astype(np.float32)
        map_y = np.tile(vmap[:, None], (1, SIZE)).astype(np.float32)
        image = _warp(image, map_x, map_y)
    return image


def standardize_couplers(destination, manifest):
    """所有端口复用同一枚标准接头，避免明暗状态和不同管型的口径再次漂移。

    开口按各管件自己的管身色上色：断电管不再带通电青光，通电管保持青光。
    """
    line = Image.open(destination / 'pipe-line-on.webp').convert('RGBA')
    right = Image.new('RGBA', (SIZE, SIZE))
    right.alpha_composite(line.crop((SIZE - INNER, 0, SIZE, SIZE)), (SIZE - INNER, 0))
    collars = {'right': right, 'top': right.transpose(Image.Transpose.ROTATE_90),
               'left': right.transpose(Image.Transpose.ROTATE_180), 'bottom': right.transpose(Image.Transpose.ROTATE_270)}
    regions = {'right': (SIZE - INNER, 0, SIZE, SIZE), 'left': (0, 0, INNER, SIZE),
               'top': (0, 0, SIZE, INNER), 'bottom': (0, SIZE - INNER, SIZE, SIZE)}
    for item in manifest:
        if not item['name'].startswith('pipe-'):
            continue
        path = destination / f"{item['name']}.webp"
        image = Image.open(path).convert('RGBA')
        lit = item['name'].endswith('-on') or item['name'] == 'pipe-source'
        for direction in item['port_geometry']['ports']:
            cut = regions[direction]
            collar = collars[direction].crop(cut)
            if not lit:  # 通电管与能量源保留青光开口
                collar = tint_bore(collar, _tube_reference(image, direction))
            image.paste((0, 0, 0, 0), cut)
            image.alpha_composite(collar, cut[:2])
        image = slim_ports(image, item['port_geometry']['ports'])
        image.save(path, 'WEBP', quality=95, method=4)
        item['sha256'] = hashlib.sha256(path.read_bytes()).hexdigest()
        item['bytes'] = path.stat().st_size
        item['alpha_bbox'] = image.getchannel('A').point(lambda value: 255 if value > 28 else 0).getbbox()
        item['processing'] += ('；全管型共用标准接头几何，开口按本管件管身色上色；'
                               f'端头沿端口轴收窄至 {SLIM_ENDS:.2f}')
