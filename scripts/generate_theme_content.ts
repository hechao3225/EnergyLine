/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * 生成乐园宇宙的内容层（关卡文案 + 藏品）。
 * 只跑一次；生成后的 src/content/*.ts 是正式内容，后续人工润色。
 *
 *   npx tsx scripts/generate_theme_content.ts
 */

import fs from 'node:fs';
import path from 'node:path';
import { DEFAULT_LEVELS } from '../src/data/defaultLevels';
import type { CollectionEntry, LevelContent } from '../src/types/content';
import { layoutHash } from './level_hash';

interface DistrictFacilities {
  id: string;
  name: string;
  facilities: string[];
}

const DISTRICTS: DistrictFacilities[] = [
  {
    id: 'lost',
    name: '失落乐园',
    facilities: [
      '迎宾门', '星灯柱', '售票亭', '气球摊', '中央喷泉', '长椅', '花坛', '导览牌', '糖果车', '许愿池',
      '报时钟楼', '旗杆', '检票闸', '小卖部', '照相亭', '音乐盒', '邮筒', '雨棚', '石阶', '星光门廊',
    ],
  },
  {
    id: 'garden',
    name: '星光花园',
    facilities: [
      '旋转木马', '花房', '星光拱门', '蝴蝶笼', '音乐台', '许愿树', '秋千', '蜜蜂屋', '露珠池', '藤架',
      '月光亭', '花瓣路', '风铃架', '蘑菇灯', '花钟', '种子库', '香草园', '玫瑰门', '星光泉', '蝶影舞台',
    ],
  },
  {
    id: 'cloud',
    name: '云端奇境',
    facilities: [
      '摩天轮', '缆车', '云桥', '风车', '观景台', '热气球', '飞艇', '云梯', '风铃塔', '云端列车',
      '云朵秋千', '气象站', '彩虹滑道', '云端剧场', '星图台', '风筝场', '云海灯', '飞行器', '风之门', '天际线',
    ],
  },
  {
    id: 'rainbow',
    name: '虹彩天桥',
    facilities: [
      '彩虹桥', '天梯', '棱镜塔', '天桥灯', '天空列车', '彩绘门', '光之拱', '星尘喷泉', '镜面广场', '彩虹滑梯',
      '云顶花园', '光环秋千', '极光幕', '光棱镜', '天空剧场', '彩带桥', '霞光台', '流星轨', '虹霓门', '天幕',
    ],
  },
  {
    id: 'peak',
    name: '梦幻之巅',
    facilities: [
      '城堡', '星门', '大舞台', '烟花台', '王座', '钟楼', '星光塔', '云端王座', '永恒灯', '星河门',
      '梦境池', '天穹剧场', '星冠', '庆典台', '光柱', '星桥', '天际之门', '万光台', '永恒星环',
    ],
  },
];

const STATE_RULES: { test: RegExp; states: string[] }[] = [
  { test: /门|闸|廊|拱/, states: ['开启', '接通', '归位', '落成', '长明'] },
  { test: /桥|梯|阶/, states: ['接通', '归位', '落成', '长明'] },
  { test: /灯|柱|塔/, states: ['初亮', '亮起', '闪耀', '长明'] },
  { test: /喷泉|泉|池/, states: ['复涌', '汇聚', '点亮', '长明'] },
  { test: /舞台|剧场|音乐台|庆典台|烟花台|天幕|幕/, states: ['奏响', '开场', '回响', '点亮'] },
  { test: /摩天轮|风车|缆车|列车|车|飞行器|飞艇|热气球/, states: ['复转', '启航', '运转', '归航'] },
  { test: /花|树|园|藤|种子|草|叶/, states: ['苏醒', '焕新', '亮起', '长明'] },
  { test: /钟|音乐盒/, states: ['奏响', '归位', '长明'] },
];
const FALLBACK_STATES = ['苏醒', '焕新', '复原', '点亮', '星辉', '归位'];

/** 1–20 的语义化标题动作；21–99 暂沿用 stateFor，等批量润色时统一。 */
const TITLE_ACTIONS: Record<number, string> = {
  3: '开窗',
  4: '开张',
  6: '歇脚',
  7: '开花',
  8: '指路',
  9: '出摊',
  11: '报时',
  12: '升旗',
  13: '开闸',
  14: '营业',
  15: '拍照',
  16: '奏响',
  17: '投递',
  18: '撑开',
  19: '通行',
  21: '启动',
  22: '开馆',
  23: '点亮',
  24: '放飞',
  25: '开场',
  26: '许愿',
  27: '荡起',
  28: '酿蜜',
  29: '聚露',
  30: '攀藤',
  31: '亮灯',
  32: '铺花',
  33: '响铃',
  34: '闪烁',
  35: '报时',
  36: '发芽',
  37: '飘香',
  38: '绽放',
  39: '复涌',
  40: '开演',
  41: '转动',
  42: '运行',
  43: '通行',
  44: '转动',
  45: '观景',
  46: '升空',
  47: '启航',
  48: '升降',
  49: '响铃',
  50: '发车',
  51: '荡起',
  52: '观测',
  53: '滑行',
  54: '开演',
  55: '观星',
  56: '放飞',
  57: '亮起',
  58: '起飞',
  59: '开启',
  60: '点亮',
  61: '通行',
  62: '攀登',
  63: '折射',
  64: '亮起',
  65: '发车',
  66: '开启',
  67: '点亮',
  68: '喷涌',
  69: '映光',
  70: '滑行',
  71: '开花',
  72: '荡起',
  73: '映彩',
  74: '折射',
  75: '开演',
  76: '通行',
  77: '观霞',
  78: '通车',
  79: '开启',
  80: '拉开',
  81: '点亮',
  82: '开启',
  83: '开演',
  84: '燃放',
  85: '落座',
  86: '报时',
  87: '亮起',
  88: '加冕',
  89: '点亮',
  90: '开启',
  91: '入梦',
  92: '开演',
  93: '加冕',
  94: '奏响',
  95: '亮起',
  96: '通行',
  97: '开启',
  98: '聚光',
  99: '旋转',
};

const ROUTES = [
  '先接{facility}，再补旁边的支路。',
  '从最近的一段管道推向{facility}。',
  '让{facility}先亮，再回头理岔路。',
  '{facility}这一段先通主路，别绕远。',
  '留一步余量，{facility}接好后再检查支路。',
  '先把{facility}周围的断头管清掉。',
  '沿着{facility}往外理，先主后次。',
  '{facility}是关键，先把它接到主干上。',
  '别急着转远端，先让{facility}运转。',
  '{facility}接好后，再分能量给旁边。',
];

const ALIASES = [
  '星光初绽', '入口第一灯', '游客的第一眼', '乐园的问候', '亮在风里', '主干节点', '迎宾之光',
  '转角惊喜', '甜蜜补给', '心愿坐标', '时间回响', '高处风景', '云上一步', '光的路径',
  '夜色里的暖', '童年的声音', '远处的星', '安静的支路', '最后一束光', '乐园的记忆',
];

const LORE_TAILS = [
  '是游客进门后看到的第一处风景。',
  '藏着一小段乐园开园时的旧记忆。',
  '在夜里会把整条路照成暖金色。',
  '被一代代修复师反复校准过角度。',
  '接上星光后，周围的管道都会轻轻发亮。',
  '是这一段能量回路的关键节点。',
  '游客喜欢在这里停下来拍照。',
  '常常被误认为只是装饰，其实责任很重。',
  '修好之后，乐园的广播会响起一小段旋律。',
  '在乐园最热闹的时候，它会亮得最久。',
];

/** 人工润色的藏品 alias/lore；后续 1–99 改写都放这里，避免重生成回退。 */
/** 人工润色的藏品 alias/lore；后续 1–99 改写都放这里，避免重生成回退。 */
const COLLECTION_OVERRIDES: Record<number, { alias?: string; lore?: string }> = {
  1: { alias: '第一束星光', lore: '开园那天，第一束星光就是从这扇门走进来的。门楣上的星灯，还记得每个游客的脚步。' },
  2: { alias: '夜路第一盏', lore: '闭园后，它总会多亮一会儿，把最后一位游客的影子送到门口。' },
  3: { alias: '一张旧票根', lore: '窗口里还留着一张没撕完的票根，日期停在乐园停摆的那天。' },
  4: { alias: '云上一步', lore: '摊主说，气球飞得最高的那天，乐园刚好放了一整晚的烟花。' },
  5: { alias: '童年的声音', lore: '水声一响，主街就像重新有了心跳；孩子们总爱把耳朵贴在池边。' },
  6: { alias: '最后一束光', lore: '椅背上刻着一行小字：“等乐园重新亮起来。”字迹被摸得很亮。' },
  7: { alias: '花开有声', lore: '花坛里第一朵花，是修复师亲手种的；它开的那天，主街的路灯全亮了。' },
  8: { alias: '亮在风里', lore: '指针修好后，广播里响起一小段开园曲，连风都停了一下。' },
  9: { alias: '转角惊喜', lore: '最热闹的时候，糖果车会亮得最久；孩子们说那是乐园在眨眼睛。' },
  10: { alias: '时间回响', lore: '池底沉着几枚旧硬币，每一枚都许过同一个愿望：让乐园再亮一次。' },
  11: { alias: '整点的心跳', lore: '钟声修好后，先响的不是整点，而是开园那天没来得及响的那一下。' },
  12: { alias: '风的方向', lore: '旗子重新升起时，云端奇境的风车转了很久，像在向这边打招呼。' },
  13: { alias: '内街的门', lore: '这是主街中段的第二道检票闸，旧票根在这里被收起，游客的乐园才真正开始。' },
  14: { alias: '甜味补给', lore: '小卖部的灯一亮，爆米花的香味就先一步跑到了街角。' },
  15: { alias: '留住一瞬', lore: '亭子里挂着一排旧照片，最后一张是空白的，背面写着“等你们回来”。' },
  16: { alias: '盒中旋律', lore: '发条转到底，音乐盒会多唱一小节——那是修复师偷偷加进去的。' },
  17: { alias: '寄往明天', lore: '邮筒里有一封没贴邮票的信，收件人写着“乐园的每一位游客”。' },
  18: { alias: '小小的屋檐', lore: '下雨时，它替排队的人挡雨；天晴后，棚顶会积一层亮晶晶的星光。' },
  19: { alias: '向上的路', lore: '石阶通向星光门廊；每一级都被游客踩得圆润，像一串旧脚印。' },
  20: { alias: '下一幕的光', lore: '穿过它，就是星光花园；门廊上的星灯，会把每位游客的影子拉得很长。' },  21: { alias: '一圈童年', lore: '音乐一响，木马就转回很多年前；有个孩子坐了一整晚，直到乐园关灯。' },
  22: { alias: '玻璃里的春天', lore: '玻璃花房里永远是最舒服的春天；修复师把第一盆花放在窗边，说它得先看见游客。' },
  23: { alias: '花园的入口', lore: '穿过这道星门，才算真正走进花园；门上的星星会在夜里替游客引路。' },
  24: { alias: '会飞的灯笼', lore: '蝴蝶笼不关蝴蝶，只关住一团会飞的光；开笼时，花园里所有的花都抬起了头。' },
  25: { alias: '花园的节拍', lore: '音乐台一响，秋千和风铃都会跟着打拍子；连池塘的水纹也慢半拍。' },
  26: { alias: '挂满心愿', lore: '树枝上系着游客的愿望；最旧的那条已经褪色，字迹却还是“希望乐园永远亮着”。' },
  27: { alias: '荡到云边', lore: '秋千越荡越高，孩子们说能碰到云；修复师只是把铁链又擦亮了一遍。' },
  28: { alias: '一小罐甜', lore: '蜜蜂屋的灯亮着，蜂蜜的香味却先飘了出来；游客说这是花园里最甜的一盏灯。' },
  29: { alias: '早晨的镜子', lore: '露珠池只在清晨最亮；每一颗露珠里，都藏着一小片花园的倒影。' },
  30: { alias: '花的长廊', lore: '藤架上的花一年比一年密；走累了的人，总能在下面找到一片阴凉。' },
  31: { alias: '月光停靠站', lore: '月光亭的顶是弯弯的月牙；夜里灯一亮，就像月亮在花园里停了停。' },
  32: { alias: '踩着一路花', lore: '花瓣路会随着脚步轻轻发亮；游客走过时，鞋底都沾了一点花园的颜色。' },
  33: { alias: '风的留言', lore: '风铃架替花园听风；每当风经过，它就把风的声音分成一小段一小段。' },
  34: { alias: '蘑菇灯语', lore: '蘑菇灯白天像小伞，晚上像一小片发光的森林；孩子们喜欢数它们。' },
  35: { alias: '花的时间', lore: '花钟没有数字，只有花瓣；花开到哪一格，花园就到了哪个时辰。' },
  36: { alias: '明天的小屋', lore: '种子库里收着花园的明天；每一只小瓶子都贴着标签，写着还没见过的花名。' },
  37: { alias: '会香的角落', lore: '香草园是花园里最安静的角落；风一吹，连管道都像沾上了薄荷味。' },
  38: { alias: '花园深处', lore: '玫瑰门在花园最里面；走到这里的人，通常已经忘了回去的路。' },
  39: { alias: '落下来的星', lore: '星光泉接住从天上落下的星；水面一闪，像有人在池底点了一盏灯。' },
  40: { alias: '压轴的光', lore: '蝶影舞台是花园的压轴；蝴蝶不落在花上，只落在舞台的灯光里。' },
  41: { alias: '最高的一圈', lore: '摩天轮转到最高处，能看见花园的灯和云层的边；修复师说，那是乐园第一次学会抬头。' },
  42: { alias: '云间慢车', lore: '缆车走得很慢，慢到能看清每一朵云；有游客说，这是乐园里最不急的一段路。' },
  43: { alias: '踩在云上', lore: '云桥软软的，走上去会轻轻晃；修好那天，第一只鸟先落下来试了试。' },
  44: { alias: '借一点风', lore: '风车一转，云就往前走；修复师在风车下站了很久，像在等一封很远的风的信。' },
  45: { alias: '看得更远', lore: '观景台上的望远镜修好后，先看到的不是风景，而是花园里那个还没走的人。' },
  46: { alias: '离云最近', lore: '热气球升起来时，篮子里的游客都不敢说话；风把乐园的灯吹成了一串星星。' },
  47: { alias: '慢速飞艇', lore: '飞艇的螺旋桨转得很轻；它飞过云端时，会在云上留下一道短短的光。' },
  48: { alias: '一步一步', lore: '云梯的台阶是软的；每上一级，脚下的云就亮一点，像有人在前面点灯。' },
  49: { alias: '高处的风', lore: '风铃塔越高，风越急；塔顶那只铃，只有在乐园安静下来时才会响。' },
  50: { alias: '开往云里', lore: '云端列车每天只开一班；错过的人，会在站台上等下一片云。' },
  51: { alias: '荡在云里', lore: '云朵秋千没有铁链，只有两朵云托着；荡起来时，能听见云层轻轻的声音。' },
  52: { alias: '云的心情', lore: '气象站记着云的脾气；修好后，它先预报的不是雨，而是乐园第二天的晴天。' },
  53: { alias: '从云上滑下', lore: '从滑道顶端滑下，会穿过一小段彩虹；孩子们说，那是云在给他们让路。' },
  54: { alias: '云上的戏', lore: '云端剧场没有屋顶，星星就是灯；戏开场时，云会自己坐下来当观众。' },
  55: { alias: '把星星摊开', lore: '星图台把夜空摊成一张地图；修复师找很久，才发现自己也在其中一颗星旁边。' },
  56: { alias: '把愿望放上天', lore: '风筝场上，线放得越长，愿望就飞得越高；有一只风筝一直没回来，线还系在桩上。' },
  57: { alias: '云里的灯', lore: '云海灯浮在云上，像一小片会发光的岛；夜里的游客靠它找到回云桥的路。' },
  58: { alias: '第一次起飞', lore: '飞行器第一次试飞时，只飞了三步；修复师说，够了，乐园已经会飞了。' },
  59: { alias: '风的入口', lore: '穿过风之门，风会替你带走一句话；有人留下“再见”，有人留下“明天还来”。' },
  60: { alias: '云上的边', lore: '天际线是云端最远的地方；站在这里，能看见下一座桥，在彩虹那边等着。' },
  61: { alias: '桥的那一头', lore: '彩虹桥连着云端和桥心；走到一半，脚下的颜色会变，像把整座乐园踩成了光谱。' },
  62: { alias: '往光里走', lore: '天梯没有扶手，只有一级一级的光；抬头看久了，会忘了自己是从哪一层上来的。' },
  63: { alias: '把光分开', lore: '棱镜塔把一束光拆成很多颜色；塔下的人抬头时，脸上会落满细碎的彩虹。' },
  64: { alias: '桥上的星', lore: '天桥灯一串一串挂在桥边；风大的时候，整座桥像在轻轻摇一串星星。' },
  65: { alias: '追光列车', lore: '天空列车沿着光轨跑；它到站时不报站名，只在窗外放一小段彩虹。' },
  66: { alias: '颜色的门', lore: '彩绘门上的颜料是游客一笔一笔涂的；最旧的那道蓝，已经被人摸得发亮。' },
  67: { alias: '光的拱门', lore: '光之拱没有柱子，只有三束光弯成门；穿过去时，影子会先一步落到桥心。' },
  68: { alias: '落星的地方', lore: '星尘喷泉不喷水，只喷很细的星尘；落在肩上，像一场不会湿的雨。' },
  69: { alias: '踩到天空', lore: '镜面广场把天空铺在地上；游客低头时，会看见自己站在云里。' },
  70: { alias: '桥心螺旋', lore: '彩虹滑梯绕着桥心打转；滑到底的人，都说自己穿过了一整条彩虹。' },
  71: { alias: '最高一朵花', lore: '云顶花园挂在桥的上方；花从云里垂下来，像给过桥的人递了一小把春天。' },
  72: { alias: '荡一圈光', lore: '光环秋千的座位是一圈光；荡起来时，桥上的灯会跟着亮一下。' },
  73: { alias: '抓一把极光', lore: '极光幕是一小把会流动的光；修复师把它举起来时，整座桥都换了一种颜色。' },
  74: { alias: '手心的彩虹', lore: '光棱镜只有巴掌大，却能接住整座桥的光；孩子们排着队，等它落在手心里。' },
  75: { alias: '桥上的戏', lore: '天空剧场搭在桥的最高处；演员是风，观众是云，掌声是桥下亮起的灯。' },
  76: { alias: '一条彩带', lore: '彩带桥由许多条丝带编成；走上去会轻轻弹一下，像踩在一条刚系好的礼物上。' },
  77: { alias: '等一场霞', lore: '霞光台正对着落日；每天傍晚，修复师会在这里停一会儿，看乐园被染成橘粉色。' },
  78: { alias: '追一颗流星', lore: '流星轨只有短短一段；小车滑过时，桥边会亮起一颗流星，然后很快熄灭。' },
  79: { alias: '彩虹的门', lore: '虹霓门由两根彩虹柱子撑着；穿过它，桥上的颜色会停在身上一会儿。' },
  80: { alias: '最后一幕', lore: '天幕是虹彩天桥的最后一幕；幕布落下后，能看见城堡的尖顶，在更远的地方亮着。' },
  81: { alias: '最后一站', lore: '城堡是乐园中心的最后一站；它的门一直开着，像在等所有修复师回来。' },
  82: { alias: '星星的入口', lore: '星门不是一座门，是一颗落下来的星；走近时，它会为你让出一条路。' },
  83: { alias: '城堡的序曲', lore: '城堡前的大舞台，是终章的序曲；灯一亮，整座乐园都安静下来。' },
  84: { alias: '替夜空开场', lore: '烟花台只是控制台，真正的烟花要等庆典；修复师先替夜空试了一次。' },
  85: { alias: '礼堂的座位', lore: '城堡礼堂的王座一直空着；熊猫园长说，它留给把乐园重新点亮的人。' },
  86: { alias: '终章的钟', lore: '钟楼敲响时，城堡的窗户一盏盏亮起；最后一下钟声，落在乐园中心。' },
  87: { alias: '离星最近', lore: '星光塔是城堡最高的地方；塔顶的星，替整座乐园看着回家的路。' },
  88: { alias: '云上座位', lore: '云端王座在王座之上；坐在那里，能看见乐园所有的灯，像一张摊开的地图。' },
  89: { alias: '不灭的一盏', lore: '永恒灯不靠管道亮；它靠的是每个修复师离开前，轻轻许下的那个愿望。' },
  90: { alias: '过一条星河', lore: '星河门后是一条由星星汇成的河；走过的人，鞋底会亮很久。' },
  91: { alias: '乐园的梦', lore: '梦境池照不出人影，只照得出愿望；池底的月亮，是乐园做的一个梦。' },
  92: { alias: '穹顶之下', lore: '天穹剧场把整片天空当成屋顶；戏演到一半，星星会从穹顶落下来。' },
  93: { alias: '给乐园加冕', lore: '星冠是乐园最轻的一件藏品；戴上它时，城堡所有的灯都低了一下头。' },
  94: { alias: '今天开场', lore: '庆典台一搭好，乐园就有了节日；彩带从城堡顶一直垂到云桥。' },
  95: { alias: '一束归途', lore: '光柱从城堡脚下升起；远远看见它的人，就知道乐园到了最后一段路。' },
  96: { alias: '最后一座桥', lore: '星桥一块一块浮在空里；走过去时，桥下的星会跟着脚步亮起来。' },
  97: { alias: '门外的天', lore: '天际之门开在城堡最高的地方；门后不是路，是一整片还没亮的天。' },
  98: { alias: '所有光的集合', lore: '万光台收着乐园所有的光；站在中央，能听见每一盏灯轻轻响。' },
  99: { alias: '乐园的句号', lore: '永恒星环是乐园的句号，也是下一座乐园的起点；星环转过一圈，故事又重新亮起。' },

};

function stateFor(facility: string, id: number): string {
  for (const rule of STATE_RULES) {
    if (rule.test.test(facility)) return rule.states[id % rule.states.length];
  }
  return FALLBACK_STATES[id % FALLBACK_STATES.length];
}

/** id → facility 映射：按 1–99 顺序平铺 */
const FLAT: { facility: string; district: string; districtId: string }[] = DISTRICTS.flatMap((d) =>
  d.facilities.map((facility) => ({ facility, district: d.name, districtId: d.id })),
);

function mechanicClauses(level: (typeof DEFAULT_LEVELS)[number]): string[] {
  const clauses: string[] = [];
  const switches = level.tiles.filter((t) => t.type === 'switch').length;
  const diodes = level.tiles.filter((t) => t.type === 'diode').length;
  const crosses = level.tiles.filter((t) => t.type === 'cross').length;
  const locked = level.tiles.filter(
    (t) => t.locked && t.type !== 'battery' && t.type !== 'bulb',
  ).length;
  const batteries = level.tiles.filter((t) => t.type === 'battery').length;
  const bulbs = level.tiles.filter((t) => t.type === 'bulb').length;
  if (switches > 0) clauses.push('闸要扳通');
  if (diodes > 0) clauses.push('单向阀看箭头');
  if (crosses > 0) clauses.push('十字管不用转');
  if (locked > 0) clauses.push('固定管道不能转');
  if (batteries > 1) clauses.push('多源分片接');
  if (bulbs >= 5) clauses.push('先主干后支路');
  return clauses;
}

function hintFor(level: (typeof DEFAULT_LEVELS)[number], facility: string, id: number): string {
  const clauses = mechanicClauses(level);
  const route = ROUTES[id % ROUTES.length].replaceAll('{facility}', facility);
  return clauses.length > 0 ? `${clauses.join('·')}。${route}` : route;
}

function artKeyFor(facility: string, levelId: number): string {
  if (levelId <= 20) return `exhibit-${String(levelId).padStart(3, "0")}`;
  const rules: [RegExp, string][] = [
    [/旋转木马|秋千|滑梯|滑道|旋转杯|光环/, 'exhibit-carousel'],
    [/摩天轮|风车|缆车|观景台|棱镜|星图台|气象站/, 'exhibit-wheel'],
    [/喷泉|泉|池|露珠|梦境池|星尘/, 'exhibit-fountain'],
    [/灯|柱|塔/, 'exhibit-lamp'],
    [/门|闸|廊|拱|桥|梯|阶|幕/, 'exhibit-arch'],
    [/舞台|剧场|音乐台|庆典台|烟花台/, 'exhibit-stage'],
    [/气球|飞艇|风筝|飞行器/, 'exhibit-balloon'],
    [/列车|流星轨/, 'exhibit-train'],
    [/蝴蝶笼|蜜蜂屋|种子库|花房|香草园|花园|花坛|藤架|花瓣路/, 'exhibit-aquarium'],
    [/星冠|星门|星河|天际|星桥|星环|万光|望远镜/, 'exhibit-telescope'],
    [/玩具|发条|积木|糖果车|小卖部|照相亭|音乐盒/, 'exhibit-toy'],
    [/钟|时钟/, 'exhibit-clock'],
  ];
  for (const [test, key] of rules) if (test.test(facility)) return key;
  return 'exhibit-lamp';
}

function rarityFor(id: number): CollectionEntry['rarity'] {
  if (id === 99) return 'legendary';
  if ([20, 40, 60, 80].includes(id)) return 'epic';
  if (id % 10 === 0) return 'epic';
  if (id % 3 === 0) return 'rare';
  return 'common';
}

const levels: LevelContent[] = [];
const collection: CollectionEntry[] = [];

for (const level of DEFAULT_LEVELS) {
  const entry = FLAT[level.id - 1];
  if (!entry) throw new Error(`缺少设施词条：L${level.id}`);
  const state = TITLE_ACTIONS[level.id] ?? stateFor(entry.facility, level.id);
  const title = `${entry.facility}·${state}`;
  const hint = hintFor(level, entry.facility, level.id);
  levels.push({
    levelId: level.id,
    zoneId: 'center',
    district: entry.district,
    title,
    hint,
  });
  collection.push({
    id: level.id,
    levelId: level.id,
    zoneId: 'center',
    name: entry.facility,
    alias: COLLECTION_OVERRIDES[level.id]?.alias ?? ALIASES[(level.id * 3) % ALIASES.length],
    rarity: rarityFor(level.id),
    artKey: artKeyFor(entry.facility, level.id),
    lore: COLLECTION_OVERRIDES[level.id]?.lore ?? `位于${entry.district}的${entry.facility}，${LORE_TAILS[level.id % LORE_TAILS.length]}`,
    blessing: `星光 +1 · ${entry.district}`,
  });
}

function writeArray<T>(file: string, exportName: string, typeName: string, items: T[]) {
  const body = items
    .map((item) => `  ${JSON.stringify(item, null, 2).split('\n').join('\n  ')},`)
    .join('\n');
  const content = `/**\n * @license\n * SPDX-License-Identifier: Apache-2.0\n *\n * 由 scripts/generate_theme_content.ts 生成；可直接人工润色。\n */\n\nimport type { ${typeName} } from '../types/content';\n\nexport const ${exportName}: ${typeName}[] = [\n${body}\n];\n`;
  fs.writeFileSync(path.resolve(process.cwd(), file), content, 'utf8');
}

writeArray('src/content/levels.ts', 'LEVEL_CONTENT', 'LevelContent', levels);
writeArray('src/content/collection.ts', 'COLLECTION', 'CollectionEntry', collection);

const fixtureDir = path.resolve(process.cwd(), 'scripts/fixtures');
fs.mkdirSync(fixtureDir, { recursive: true });
const hashes = Object.fromEntries(DEFAULT_LEVELS.map((level) => [String(level.id), layoutHash(level)]));
fs.writeFileSync(
  path.join(fixtureDir, 'level-layout-hash.json'),
  `${JSON.stringify(hashes, null, 2)}\n`,
  'utf8',
);

const duplicates = levels.filter((l, i) => levels.findIndex((x) => x.title === l.title) !== i);
console.log(`生成 ${levels.length} 条关卡文案、${collection.length} 条藏品、${Object.keys(hashes).length} 个布局指纹`);
if (duplicates.length) {
  console.log('重复标题：', duplicates.map((l) => `${l.levelId} ${l.title}`).join(', '));
  process.exitCode = 1;
}
