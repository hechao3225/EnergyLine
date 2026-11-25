# L3 诱饵拓扑验收（2026-11-22 · 第二版）

## 结论

上排是一条“要玩家自己接出来”的假主路：末端弯管初始反放、断开；玩家自己转两下才接通，接通后只点亮最右上 1 盏灯。没有装饰锁。par 保持 9 步，预算 12 步；走完诱饵再回头，总步数 11/12。

## 证据（390×844 真机视口，真实点击）

| 截图 | 状态 | 目标计数 |
|---|---|---|
| `screens/l3-01-start.png` | 开局，上排末端断口 | 0/3 |
| `screens/l3-02-top-line-on-but-broken.png` | 修 (2,1)：上排通电但断口过不去 | 0/3 |
| `screens/l3-03-player-built-one-bulb.png` | 玩家自己转通 (0,4)：只亮 1 盏 | 1/3 |
| `screens/l3-04-bait-abandoned.png` | (2,2) 转 270° 放弃上排 | 0/3 |
| `screens/l3-05-solved.png` | 十字枢纽分流，3 盏同亮 | 3/3，11 步 |

## 复跑

```bash
npx tsx scripts/capture-l3-decoy.ts
npx tsx scripts/solve-min-par.ts --level=3
npx tsx scripts/test_chapter1.ts && npx tsx scripts/audit-chapter1.ts
npx tsx scripts/audit-mainline.ts && npx tsx scripts/audit-distinct.ts
```
