"""公园 UI 颜色处理：Lab 空间压彩度 / 压亮度，保留色相与 alpha。"""
import numpy as np
from PIL import Image

CHROMA_SOFT = {'k': 0.82, 'cap': 76.0, 'knee': 6.0}

_M = np.array([[0.4124564, 0.3575761, 0.1804375],
               [0.2126729, 0.7151522, 0.0721750],
               [0.0193339, 0.1191920, 0.9503041]], dtype=np.float64)
_M_INV = np.linalg.inv(_M)
_WHITE = np.array([0.95047, 1.0, 1.08883])


def _srgb_to_linear(c):
    return np.where(c <= 0.04045, c / 12.92, ((c + 0.055) / 1.055) ** 2.4)


def _linear_to_srgb(c):
    c = np.clip(c, 0, 1)
    return np.where(c <= 0.0031308, c * 12.92, 1.055 * c ** (1 / 2.4) - 0.055)


def _f(t):
    d = 6 / 29
    return np.where(t > d ** 3, np.cbrt(t), t / (3 * d * d) + 4 / 29)


def _f_inv(t):
    d = 6 / 29
    return np.where(t > d, t ** 3, 3 * d * d * (t - 4 / 29))


def rgb_to_lab(rgb):
    lin = _srgb_to_linear(rgb)
    xyz = lin @ _M.T / _WHITE
    fx, fy, fz = _f(xyz[..., 0]), _f(xyz[..., 1]), _f(xyz[..., 2])
    return np.stack([116 * fy - 16, 500 * (fx - fy), 200 * (fy - fz)], axis=-1)


def lab_to_rgb(lab):
    L, a, b = lab[..., 0], lab[..., 1], lab[..., 2]
    fy = (L + 16) / 116
    fx = fy + a / 500
    fz = fy - b / 200
    xyz = np.stack([_f_inv(fx), _f_inv(fy), _f_inv(fz)], axis=-1) * _WHITE
    lin = xyz @ _M_INV.T
    return _linear_to_srgb(lin)


def scale_chroma(chroma, k=None, cap=None, knee=None):
    k = CHROMA_SOFT['k'] if k is None else k
    cap = CHROMA_SOFT['cap'] if cap is None else cap
    knee = CHROMA_SOFT['knee'] if knee is None else knee
    return np.where(chroma <= knee, chroma, np.minimum(knee + (chroma - knee) * k, cap))


def grade_rgb(rgb255):
    """(r,g,b) 0..255 -> 同明度、低彩度的 (r,g,b) 0..255。"""
    rgb = np.array(rgb255, dtype=np.float64) / 255.0
    lab = rgb_to_lab(rgb)
    chroma = float(np.hypot(lab[1], lab[2]))
    if chroma <= CHROMA_SOFT['knee']:
        return tuple(rgb255)
    scale = float(scale_chroma(np.array(chroma))) / max(chroma, 1e-6)
    lab[1] *= scale
    lab[2] *= scale
    out = np.clip(lab_to_rgb(lab) * 255, 0, 255)
    return tuple(int(round(v)) for v in out)


# 主按钮（button-gold.webp）的黄色偏"跳"：只压彩度（C*×0.75，软膝），
# L* 明度、色相、alpha 全部不变，所以不会像蒙了一层灰/黑，只是没那么"亮黄"。
CTA_SOFT = {'f': 0.75, 'knee': 8.0}


def soften_cta_chroma(image, f=None, knee=None):
    """只降彩度：C* 高于 knee 的部分按 f 缩放，L*/色相/alpha 不变。"""
    f = CTA_SOFT['f'] if f is None else f
    knee = CTA_SOFT['knee'] if knee is None else knee
    rgba = np.asarray(image.convert('RGBA'), dtype=np.float32) / 255
    lab = rgb_to_lab(rgba[..., :3])
    a, b = lab[..., 1], lab[..., 2]
    chroma = np.hypot(a, b)
    scale = np.where(chroma <= knee, 1.0,
                     (knee + (chroma - knee) * f) / np.maximum(chroma, 1e-6))
    lab[..., 1] = a * scale
    lab[..., 2] = b * scale
    out = rgba.copy()
    out[..., :3] = np.clip(lab_to_rgb(lab), 0, 1)
    out[rgba[..., 3] == 0, :3] = 0
    return Image.fromarray(np.round(out * 255).astype(np.uint8), 'RGBA')


def soften_chroma(image, k=None, cap=None, knee=None):
    from PIL import Image
    rgba = np.asarray(image.convert('RGBA'), dtype=np.float32) / 255
    lab = rgb_to_lab(rgba[..., :3])
    chroma = np.hypot(lab[..., 1], lab[..., 2])
    target = scale_chroma(chroma, k, cap, knee)
    scale = target / np.maximum(chroma, 1e-6)
    lab[..., 1] *= scale
    lab[..., 2] *= scale
    rgb = np.clip(lab_to_rgb(lab), 0, 1)
    out = rgba.copy()
    out[..., :3] = rgb
    out[rgba[..., 3] == 0, :3] = 0
    return Image.fromarray(np.round(out * 255).astype(np.uint8), 'RGBA')


def soften_hue_chroma(image, f, knee=6.0, hue_lo=195.0, hue_hi=292.0, feather=10.0):
    """只降指定色相带的彩度：C* 高于 knee 的部分按 f 缩放。

    L* 明度、色相与 alpha 全部不变；色相带两端各留 feather 度做线性过渡，
    避免边界出现接缝。默认参数面向蓝色玻璃（火花透镜），不动金色与紫色。
    """
    rgba = np.asarray(image.convert('RGBA'), dtype=np.float32) / 255
    lab = rgb_to_lab(rgba[..., :3])
    a, b = lab[..., 1], lab[..., 2]
    chroma = np.hypot(a, b)
    hue = (np.degrees(np.arctan2(b, a)) + 360.0) % 360.0
    weight = np.clip(
        np.minimum((hue - hue_lo) / feather, (hue_hi - hue) / feather), 0.0, 1.0
    )
    target = np.where(chroma <= knee, chroma, knee + (chroma - knee) * f)
    scale = 1.0 + (target / np.maximum(chroma, 1e-6) - 1.0) * weight
    lab[..., 1] = a * scale
    lab[..., 2] = b * scale
    out = rgba.copy()
    out[..., :3] = np.clip(lab_to_rgb(lab), 0, 1)
    out[rgba[..., 3] == 0, :3] = 0
    return Image.fromarray(np.round(out * 255).astype(np.uint8), 'RGBA')
