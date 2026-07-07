from __future__ import annotations

from collections import deque
from pathlib import Path

from PIL import Image

PRODUCTS_DIR = Path(__file__).resolve().parents[1] / "public" / "images" / "products"
FILES = [
    "eurocol-042-euroblock-turbo.jpg",
    "eurocol-144-euromix-pu.jpg",
    "homafloor-001-2k-ep.png",
    "homaprof-797-2k-pu.png",
]
THRESHOLD = 238
ALPHA_CUTOFF = 24


def is_background(r: int, g: int, b: int, a: int) -> bool:
    if a <= ALPHA_CUTOFF:
        return True
    return r >= THRESHOLD and g >= THRESHOLD and b >= THRESHOLD


def remove_background(image: Image.Image) -> Image.Image:
    rgba = image.convert("RGBA")
    width, height = rgba.size
    pixels = rgba.load()
    visited = bytearray(width * height)
    queue: deque[tuple[int, int]] = deque()

    def push(x: int, y: int) -> None:
        idx = y * width + x
        if visited[idx]:
            return
        r, g, b, a = pixels[x, y]
        if not is_background(r, g, b, a):
            return
        visited[idx] = 1
        queue.append((x, y))

    for x in range(width):
        push(x, 0)
        push(x, height - 1)
    for y in range(height):
        push(0, y)
        push(width - 1, y)

    while queue:
        x, y = queue.popleft()
        r, g, b, _ = pixels[x, y]
        pixels[x, y] = (r, g, b, 0)
        if x > 0:
            push(x - 1, y)
        if x + 1 < width:
            push(x + 1, y)
        if y > 0:
            push(x, y - 1)
        if y + 1 < height:
            push(x, y + 1)

    bbox = rgba.getbbox()
    if not bbox:
        return rgba

    pad = 8
    left = max(0, bbox[0] - pad)
    top = max(0, bbox[1] - pad)
    right = min(width, bbox[2] + pad)
    bottom = min(height, bbox[3] + pad)
    return rgba.crop((left, top, right, bottom))


def main() -> None:
    for name in FILES:
        src = PRODUCTS_DIR / name
        out = PRODUCTS_DIR / f"{Path(name).stem}.png"
        result = remove_background(Image.open(src))
        result.save(out, format="PNG", optimize=True)
        opaque = sum(1 for _, _, _, a in result.get_flattened_data() if a > 0)
        total = result.size[0] * result.size[1]
        print(f"{out.name}: {result.size[0]}x{result.size[1]}, opaque={opaque}/{total}")


if __name__ == "__main__":
    main()
