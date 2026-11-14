# 展品图标原图投放目录

把生图工具产出的 12 张原图放在这里（PNG/WebP 均可，建议 1024×1024、透明底或纯绿底）。

命名随意，推荐直接用目标名：

- exhibit-carousel.png（可跳过：直接用 ../carousel.webp）
- exhibit-wheel.png
- exhibit-fountain.png
- exhibit-arch.png
- exhibit-lamp.png
- exhibit-stage.png
- exhibit-balloon.png
- exhibit-train.png
- exhibit-aquarium.png
- exhibit-telescope.png
- exhibit-toy.png
- exhibit-clock.png

我会负责：抠图/去绿底、裁边、留 8% 边距、缩放到 512×512、转 WebP、写入 manifest、把 `ParkArt.tsx` 的 `EXHIBIT_ART_READY` 打开，并跑运行时截图验收。

风格与 prompt 见 `docs/QA/park-universe-2026-11-12/exhibit-icons-spec.md`。
