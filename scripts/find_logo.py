import re
import urllib.request
from pathlib import Path

OUT = Path(r"c:\Users\admin\Desktop\Programs\Instruction_PF\public\images\plastfactor")
OUT.mkdir(parents=True, exist_ok=True)

req = urllib.request.Request("https://plastfactor.com/", headers={"User-Agent": "Mozilla/5.0"})
html = urllib.request.urlopen(req, timeout=30).read().decode("utf-8", "ignore")
imgs = re.findall(r'https?://[^"\'\s>]+\.(?:png|jpg|jpeg|svg|webp)', html, re.I)

for url in sorted(set(imgs)):
  print(url)
