from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public" / "images" / "products"


def extract_first_image(pdf_path: Path) -> Image.Image:
    from io import BytesIO

    from pypdf import PdfReader

    reader = PdfReader(str(pdf_path))
    for page in reader.pages:
        for image in page.images:
            return Image.open(BytesIO(image.data)).convert("RGBA")
    raise RuntimeError(f"No image in {pdf_path.name}")


def process_product_image(src: Image.Image, dest: Path) -> None:
    px = src.load()
    w, h = src.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if r > 235 and g > 235 and b > 235:
                px[x, y] = (r, g, b, 0)
    bbox = src.getbbox()
    if bbox:
        src = src.crop(bbox)
    cw, ch = src.size
    side = max(cw, ch)
    square = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    square.paste(src, ((side - cw) // 2, (side - ch) // 2))
    square.resize((800, 800), Image.Resampling.LANCZOS).save(dest, optimize=True)
    print("saved", dest, dest.stat().st_size)


def fetch_eurocol_image() -> None:
    html_path = ROOT / "_forbo.html"
    if not html_path.exists():
        import re
        import urllib.request

        req = urllib.request.Request(
            "https://www.forbo.com/eurocol/ru/144-euromix-pu-multi/e6cdob",
            headers={"User-Agent": "Mozilla/5.0"},
        )
        html = urllib.request.urlopen(req, timeout=45).read().decode("utf-8", "ignore")
        html_path.write_text(html, encoding="utf-8")
    else:
        html = html_path.read_text(encoding="utf-8", errors="ignore")

    import re
    import urllib.request

    urls = re.findall(r'https?://[^"\'\s>]+\.(?:png|jpg|jpeg|webp)', html, re.I)
    candidates = [
        u
        for u in sorted(set(urls))
        if any(k in u.lower() for k in ["144", "euromix", "product", "packshot", "eurocol"])
    ]
    if not candidates:
        candidates = [u for u in sorted(set(urls)) if "forbo" in u.lower() or "eurocol" in u.lower()]

    if not candidates:
        fallback = "https://eurocol-market.ru/upload/iblock/0c0/eurocol_144_euromix_pu_multi_8_1_kg.jpg"
        req = urllib.request.Request(fallback, headers={"User-Agent": "Mozilla/5.0"})
        data = urllib.request.urlopen(req, timeout=45).read()
        dest = PUBLIC / "eurocol-144-euromix-pu.jpg"
        dest.write_bytes(data)
        process_product_image(Image.open(dest).convert("RGBA"), PUBLIC / "eurocol-144-euromix-pu.png")
        dest.unlink(missing_ok=True)
        return

    for url in candidates:
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
            data = urllib.request.urlopen(req, timeout=45).read()
            raw = PUBLIC / "eurocol-144-euromix-pu.raw"
            raw.write_bytes(data)
            process_product_image(Image.open(raw).convert("RGBA"), PUBLIC / "eurocol-144-euromix-pu.png")
            raw.unlink(missing_ok=True)
            return
        except Exception as e:
            print("skip", url, e)


def fetch_from_pdfs() -> None:
    homaprof_pdf = ROOT / "homaprof-797-2K-PU.pdf"
    kiilto_pdf = next(ROOT.glob("*иилто*.pdf"), None)
    if not kiilto_pdf:
        for pdf in ROOT.glob("*.pdf"):
            if "homaprof" not in pdf.name.lower() and "техническ" not in pdf.name.lower():
                kiilto_pdf = pdf
                break

    process_product_image(extract_first_image(homaprof_pdf), PUBLIC / "homaprof-797-2k-pu.png")
    if kiilto_pdf:
        process_product_image(extract_first_image(kiilto_pdf), PUBLIC / "kiilto-2k-pu.png")
        print("kiilto source", kiilto_pdf.name)


if __name__ == "__main__":
    fetch_from_pdfs()
