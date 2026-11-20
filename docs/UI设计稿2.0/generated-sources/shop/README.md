# 商店素材生成源

本目录只保存在本轮已生成的原始参考图，不重新调用图片模型。

| 文件 | 用途 | 尺寸 |
| --- | --- | --- |
| `icon-lens.png` | 火花透镜商店图标白底源图 | 1024×1024 |
| `icon-coil.png` | 应急线圈商店图标白底源图 | 1024×1024 |
| `shop-sample-sheep-starlight.png` | 羊伙伴星愿礼服白底源图 | 1024×1024 |
| `shop-sample-rabbit-starlight.png` | 兔子伙伴星愿礼服白底源图 | 1024×1024 |
| `shop-sample-spirit-starlight.png` | 精灵伙伴星愿礼服白底源图 | 1024×1024 |
| `theme-calm-home-390x844.png` | 宁静主题首页真实运行截图，2× 像素密度 | 780×1688 |

处理入口：

```bash
python3 scripts/prepare_shop_assets.py
python3 scripts/prepare_shop_assets.py --check
python3 scripts/audit_shop_assets.py
```

图标与礼服使用 Pillow 从边界泛洪近白背景，保留软边后裁切。主题预览裁取真实首页截图中的标题、角色与按钮区域。开心表情沿现有透明素材原尺寸整理，不重绘角色。
