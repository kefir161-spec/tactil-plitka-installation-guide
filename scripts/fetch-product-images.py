import re
import urllib.request
from pathlib import Path
from PIL import Image

ROOT = Path(r"c:\Users\admin\Desktop\Programs\Instruction_PF")
PUBLIC = ROOT / "public" / "images"


def download(url: str, dest: Path):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    data = urllib.request.urlopen(req, timeout=45).read()
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_bytes(data)
    print("downloaded", dest, len(data))


def fetch_eurocol_image():
    html_path = ROOT / "_forbo.html"
    if not html_path.exists():
        req = urllib.request.Request(
            "https://www.forbo.com/eurocol/ru/144-euromix-pu-multi/e6cdob",
            headers={"User-Agent": "Mozilla/5.0"},
        )
        html = urllib.request.urlopen(req, timeout=45).read().decode("utf-8", "ignore")
        html_path.write_text(html, encoding="utf-8")
    else:
        html = html_path.read_text(encoding="utf-8", errors="ignore")

    urls = re.findall(r'https?://[^"\'\s>]+\.(?:png|jpg|jpeg|webp)', html, re.I)
    candidates = [
        u
        for u in sorted(set(urls))
        if any(k in u.lower() for k in ["144", "euromix", "product", "packshot", "eurocol"])
    ]
    if not candidates:
        candidates = [u for u in sorted(set(urls)) if "forbo" in u.lower() or "eurocol" in u.lower()]

    print("candidates:")
    for u in candidates[:20]:
        print(u)

    if not candidates:
        # fallback from distributor
        fallback = "https://eurocol-market.ru/upload/iblock/0c0/eurocol_144_euromix_pu_multi_8_1_kg.jpg"
        try:
            download(fallback, PUBLIC / "products" / "eurocol-144-euromix-pu.jpg")
            return
        except Exception as e:
            print("fallback failed", e)
            return

    for url in candidates:
        ext = ".jpg" if ".jpg" in url.lower() or ".jpeg" in url.lower() else ".png"
        dest = PUBLIC / "products" / f"eurocol-144-euromix-pu{ext}"
        try:
            download(url, dest)
            return
        except Exception as e:
            print("skip", url, e)


def make_logo_transparent():
    src = PUBLIC / "plastfactor" / "logo.png"
    im = Image.open(src).convert("RGBA")
    pixels = im.load()
    w, h = im.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = pixels[x, y]
            # remove near-black background
            if r < 40 and g < 40 and b < 40:
                pixels[x, y] = (r, g, b, 0)
    im.save(src, optimize=True)
    print("logo transparent saved", src)


if __name__ == "__main__":
    fetch_eurocol_image()
    make_logo_transparent()
