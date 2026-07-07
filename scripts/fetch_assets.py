import re
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "images" / "plastfactor"
OUT.mkdir(parents=True, exist_ok=True)

req = urllib.request.Request(
    "https://plastfactor.com/",
    headers={"User-Agent": "Mozilla/5.0"},
)
html = urllib.request.urlopen(req, timeout=30).read().decode("utf-8", "ignore")
imgs = re.findall(r'https?://[^"\'\s>]+\.(?:png|jpg|jpeg|svg|webp)', html, re.I)
seen = set()
for url in imgs:
    if url in seen:
        continue
    seen.add(url)
    name = url.split("/")[-1].split("?")[0]
    if "logo" in url.lower() or "plast" in name.lower():
        try:
            dest = OUT / name
            urllib.request.urlretrieve(url, dest)
            print("saved", dest)
        except Exception as e:
            print("skip", url, e)
