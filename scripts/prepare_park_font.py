from pathlib import Path
from fontTools import subset
from fontTools.ttLib import TTFont
import urllib.request,io,json,hashlib,argparse
root=Path(__file__).resolve().parents[1]
parser=argparse.ArgumentParser();parser.add_argument('--source');args=parser.parse_args()
url='https://raw.githubusercontent.com/google/fonts/main/ofl/notosanssc/NotoSansSC%5Bwght%5D.ttf'
raw=Path(args.source).read_bytes() if args.source else urllib.request.urlopen(url).read()
text='能量管道乐园0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz.,!? /+-×∞·，。！？、：；（）《》%'
for p in (root/'src').rglob('*'):
    if p.suffix in ['.tsx','.ts']:text+=p.read_text(encoding='utf-8-sig')
options=subset.Options();options.flavor='woff2';options.desubroutinize=True
font=TTFont(io.BytesIO(raw));ss=subset.Subsetter(options=options);ss.populate(text=text);ss.subset(font)
output=root/'src/assets/park-font.woff2';subset.save_font(font,str(output),options)
cmap=TTFont(output).getBestCmap();missing=sorted(set(c for c in text if '\u4e00'<=c<='\u9fff' and ord(c) not in cmap))
audit={'source':url,'source_sha256':hashlib.sha256(raw).hexdigest(),'license':'SIL Open Font License 1.1','chinese_characters':len(set(c for c in text if '\u4e00'<=c<='\u9fff')),'missing':missing,'output_bytes':output.stat().st_size}
(root/'docs/QA/ui2-2026-11-10/font-audit.json').write_text(json.dumps(audit,ensure_ascii=False,indent=2),encoding='utf-8')
assert not missing,missing
print(json.dumps(audit,ensure_ascii=False))
