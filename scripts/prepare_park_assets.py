from pathlib import Path
from PIL import Image, ImageDraw
import json, hashlib, shutil
import numpy as np

ROOT = Path(__file__).resolve().parents[1]
SOURCE = Path(r'C:/Users/Admin/.codex/generated_images/01a1c543-32fd-7f61-8468-80427f89b210')
ORIGINAL = ROOT/'docs/UI设计稿2.0/generated-sources'
DEST = ROOT/'public/assets/park'
REPORT = ROOT/'docs/QA/ui2-2026-11-10'
for folder in [ORIGINAL,DEST,REPORT]: folder.mkdir(parents=True,exist_ok=True)
previous = {item['name']:item for item in json.loads((DEST/'manifest.json').read_text(encoding='utf-8'))} if (DEST/'manifest.json').exists() else {}
extra_file=REPORT/'extra-sources.json'
extra_sources=json.loads(extra_file.read_text(encoding='utf-8-sig')) if extra_file.exists() else []
overrides={item['name'] for item in extra_sources}
manifest=[]
def asset(image,name,source,rect=None,trim=True,square=False,rotate=0):
    manifest[:]=[item for item in manifest if item['name']!=name]
    if name in previous and (DEST/f'{name}.webp').exists() and name != 'background' and previous[name]['source']==source and tuple(previous[name]['crop'] or ()) == tuple(rect or ()):
        manifest.append(previous[name]); return
    im=image.convert('RGBA')
    if rect: im=im.crop(rect)
    a=np.array(im)
    a[:,:,3][a[:,:,3]<=4]=0
    im=Image.fromarray(a)
    bbox=im.getchannel('A').point(lambda v:255 if v>28 else 0).getbbox()
    if trim and bbox:
        im=im.crop((max(0,bbox[0]-8),max(0,bbox[1]-8),min(im.width,bbox[2]+8),min(im.height,bbox[3]+8)))
    if rotate: im=im.rotate(rotate,expand=True)
    if square:
        canvas=Image.new('RGBA',(max(im.size),)*2)
        canvas.alpha_composite(im,((canvas.width-im.width)//2,(canvas.height-im.height)//2))
        im=canvas
    limit=1100 if name in ['island','carousel','logo'] else 1800 if name=='background' else 400
    im.thumbnail((limit,limit),Image.Resampling.LANCZOS)
    path=DEST/f'{name}.webp'
    im.save(path,'WEBP',quality=92,method=4)
    alpha=im.getchannel('A'); visible=alpha.point(lambda v:255 if v>28 else 0).getbbox()
    manifest.append({'name':name,'file':str(path.relative_to(ROOT)).replace('\\','/'),'source':source,'crop':rect,'rotation_ccw':rotate,'size':im.size,'alpha_bbox':visible,'corner_alpha':[alpha.getpixel(x) for x in [(0,0),(im.width-1,0),(0,im.height-1),(im.width-1,im.height-1)]],'sha256':hashlib.sha256(path.read_bytes()).hexdigest(),'bytes':path.stat().st_size,'route':'image_gen built-in','processing':'alpha-aware atlas slicing; alpha <=4 cleared; original retained'})

def source(filename,label):
    dest=ORIGINAL/f'{label}.png'
    if dest.exists(): return Image.open(dest)
    path=SOURCE/filename
    if not path.exists():
        raise FileNotFoundError(f'缺少美术原件：{dest}；请先将生成图保存到仓库。')
    shutil.copy2(path,dest)
    return Image.open(dest)

im=source('exec-01ec92a1-66b3-4513-a772-38a9e1032f2f.png','background');asset(im,'background','background.png',trim=False)
im=source('exec-67e0c2d0-1c89-4a13-9d81-be314270c6d7.png','characters')
for name,col,row in [('sheep',1,0),('rabbit',0,1),('spirit',1,1)]:
    w,h=im.size;asset(im,name,'characters.png',(col*w//2,row*h//2,(col+1)*w//2,(row+1)*h//2))
im=source('exec-b16775f4-738c-4593-b3f7-5ffda2b8b951.png','pipes')
names=['line-off','corner-off','t_shape-off','cross-off','line-on','corner-on','t_shape-on','cross-on','source','switch-on','switch-off','diode']
for i,name in enumerate(names):
    if 'pipe-'+name in overrides:continue
    w,h=im.size;col,row=i%4,i//4
    asset(im,'pipe-'+name,'pipes.png',(col*w//4,row*h//3,(col+1)*w//4,(row+1)*h//3),square=True,rotate=90 if name.startswith('corner') else 0)
im=source('exec-12cacbd3-43f7-4ded-9f7a-4fb9e3d810d2.png','icons')
for i,name in enumerate(['star','coin','gem','gift','settings','mail','task','bag','castle','map','hint','undo','reset','play','crown','lock']):
    w,h=im.size;col,row=i%4,i//4
    asset(im,'icon-'+name,'icons.png',(col*w//4,row*h//4,(col+1)*w//4,(row+1)*h//4),square=True)
im=source('exec-8ddb76ac-f6a2-4c3a-ab13-979b74fda308.png','carousel');asset(im,'carousel','carousel.png')
im=source('exec-83e59338-5e46-472c-9bd0-581cdf404494.png','materials')
for i,name in enumerate(['button-gold','button-purple','info-card','level-sign','celebration-sign','tile']):
    w,h=im.size;col,row=i%2,i//2
    rect=(col*w//2,row*h//3,(col+1)*w//2,(row+1)*h//3)
    if name.startswith('button-'): rect=(col*w//2,0,(col+1)*w//2,303)
    if name=='level-sign':rect=(w//2,303,w,683)
    asset(im,name,'materials.png',rect)
# Extra standalone files registered in sources.json as generation completes.
im=source('exec-0e2966df-af8f-4463-8714-59872502f8b1.png','celebrate')
if im:
    for i,name in enumerate(['sheep-cheer','spirit-cheer']):
        w,h=im.size
        asset(im,name,'celebrate.png',(i*w//2,0,(i+1)*w//2,h))
im=source('exec-ca09cb10-b288-40fb-abbc-e6b94e530701.png','tools')
if im:
    for i,name in enumerate(['tool-ivory','tool-gold','icon-paw','icon-back','icon-check','chapter-ribbon']):
        w,h=im.size;col,row=i%2,i//2
        rect=(col*w//2,row*h//3,(col+1)*w//2,(row+1)*h//3)
        if name=='icon-check':rect=(65,1103,407,1445)
        if name=='chapter-ribbon':rect=(466,1154,1000,1390)
        asset(im,name,'tools.png',rect)
im=source('exec-6467f655-a3cb-46d8-a217-7a6a7f28da83.png','flowers')
for i in range(12):
    w,h=im.size;col,row=i%4,i//4
    asset(im,f'flower-{i}','flowers.png',(col*w//4,row*h//3,(col+1)*w//4,(row+1)*h//3),square=True)
if extra_sources:
    for item in extra_sources:
        im=source(item['file'],item['name'])
        if im:asset(im,item['name'],item['name']+'.png')
# 补充加工脚本拥有的正式资产也保留在统一清单中。
manifest.extend(item for name,item in previous.items() if name not in {entry['name'] for entry in manifest})
(DEST/'manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf-8')
cols=6;cell=180
sheet=Image.new('RGB',(cols*cell,((len(manifest)+cols-1)//cols)*cell*2),'#2f1b54');draw=ImageDraw.Draw(sheet)
for i,item in enumerate(manifest):
    im=Image.open(ROOT/item['file']).convert('RGBA');im.thumbnail((156,140))
    x=(i%cols)*cell;y=(i//cols)*cell*2
    for j,color in enumerate(['#2f1b54','#fff2de']):
        box=Image.new('RGBA',(cell,cell),color);box.alpha_composite(im,((cell-im.width)//2,8+(140-im.height)//2));sheet.paste(box.convert('RGB'),(x,y+j*cell))
        draw.text((x+6,y+j*cell+153),item['name'],fill='#ffffff' if j==0 else '#572641')
sheet.save(REPORT/'asset-contact.png')
print(json.dumps({'assets':len(manifest),'total_bytes':sum(item['bytes'] for item in manifest),'manifest':str(DEST/'manifest.json')},ensure_ascii=False))

# 从正式生成资产派生同主题 PWA/Android 图标与启动画面。
from PIL import ImageOps
platform=[]
for filename,size in [('pwa-192x192.png',192),('pwa-512x512.png',512),('pwa-maskable-512x512.png',512),('apple-touch-icon.png',180)]:
    canvas=Image.new('RGBA',(size,size),'#874edd');draw=ImageDraw.Draw(canvas);m=int(size*.035)
    draw.rounded_rectangle((m,m,size-m,size-m),radius=size*.21,outline='#ffdf7c',width=max(2,int(size*.035)))
    subject=Image.open(DEST/'sheep.webp').convert('RGBA');subject.thumbnail((int(size*.78),int(size*.8)))
    canvas.alpha_composite(subject,((size-subject.width)//2,(size-subject.height)//2));canvas.convert('RGB').save(ROOT/'public'/filename)
    platform.append({'file':'public/'+filename,'source':'sheep.webp','size':[size,size]})
for target in (ROOT/'android/app/src/main/res').rglob('*.png'):
    original=Image.open(target);size=original.size
    if target.name.startswith('ic_launcher'):
        if 'foreground' in target.name:
            canvas=Image.new('RGBA',size)
            subject=Image.open(DEST/'sheep.webp').convert('RGBA');subject.thumbnail((int(size[0]*.62),int(size[1]*.62)))
            canvas.alpha_composite(subject,((size[0]-subject.width)//2,(size[1]-subject.height)//2))
        else:
            canvas=Image.open(ROOT/'public/pwa-512x512.png').convert('RGBA').resize(size,Image.Resampling.LANCZOS)
            if 'round' in target.name:
                mask=Image.new('L',size);ImageDraw.Draw(mask).ellipse((0,0,size[0],size[1]),fill=255);canvas.putalpha(mask)
        canvas.save(target)
        platform.append({'file':str(target.relative_to(ROOT)).replace('\\','/'),'source':'sheep.webp','size':size})
    elif target.name=='splash.png':
        canvas=ImageOps.fit(Image.open(DEST/'background.webp').convert('RGBA'),size)
        for name,width,height,y in [('logo',.78,.22,.1),('island',.78,.53,.33)]:
            subject=Image.open(DEST/f'{name}.webp').convert('RGBA');subject.thumbnail((int(size[0]*width),int(size[1]*height)))
            canvas.alpha_composite(subject,((size[0]-subject.width)//2,int(size[1]*y)))
        canvas.convert('RGB').save(target)
        platform.append({'file':str(target.relative_to(ROOT)).replace('\\','/'),'source':'background.webp + logo.webp + island.webp','size':size})
(REPORT/'platform-art-manifest.json').write_text(json.dumps(platform,ensure_ascii=False,indent=2),encoding='utf-8')
