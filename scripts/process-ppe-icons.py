"""Remove white tile background and border from PPE icon PNGs."""
from __future__ import annotations

from collections import deque
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
PPE_DIR = ROOT / "public" / "images" / "ppe"

ASSET_DIR = Path(
    r"C:\Users\admin\.cursor\projects\c-Users-admin-Desktop-Programs-Instruction-PF\assets"
)
ASSET_MAP = {
    "gloves.png": "c__Users_admin_AppData_Roaming_Cursor_User_workspaceStorage_1a1c2bf46a2f93db8082d21252f1bce9_images_ChatGPT_Image_23____._2026__.__14_45_20__1_-afde8907-7737-44b1-9c25-a8ee94aa474e.png",
    "goggles.png": "c__Users_admin_AppData_Roaming_Cursor_User_workspaceStorage_1a1c2bf46a2f93db8082d21252f1bce9_images_ChatGPT_Image_23____._2026__.__14_45_20__3_-cef46408-41ef-4e76-8c37-6ae90ef78408.png",
    "respirator.png": "c__Users_admin_AppData_Roaming_Cursor_User_workspaceStorage_1a1c2bf46a2f93db8082d21252f1bce9_images_ChatGPT_Image_23____._2026__.__14_45_20__2_-a91c2d99-a9e8-49fe-91b7-f5e51f7a7884.png",
    "knee-pads.png": "c__Users_admin_AppData_Roaming_Cursor_User_workspaceStorage_1a1c2bf46a2f93db8082d21252f1bce9_images_ChatGPT_Image_23____._2026__.__14_45_21__4_-fbf2b04a-278b-4d69-810f-4d2125b01cae.png",
}


def is_background_pixel(r: int, g: int, b: int, a: int) -> bool:
    if a < 20:
        return True
    brightness = (r + g + b) / 3
    spread = max(r, g, b) - min(r, g, b)
    # White / light-gray tile, border and drop shadow
    if brightness >= 205 and spread <= 22:
        return True
    if brightness >= 190 and spread <= 10:
        return True
    return False


def flood_transparent(im: Image.Image, seeds: list[tuple[int, int]]) -> None:
    px = im.load()
    w, h = im.size
    visited: set[tuple[int, int]] = set()
    q: deque[tuple[int, int]] = deque(seeds)

    while q:
        x, y = q.popleft()
        if (x, y) in visited or x < 0 or y < 0 or x >= w or y >= h:
            continue
        visited.add((x, y))
        r, g, b, a = px[x, y]
        if not is_background_pixel(r, g, b, a):
            continue
        px[x, y] = (r, g, b, 0)
        q.extend([(x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)])


def process_icon(src: Path, dest: Path) -> None:
    im = Image.open(src).convert("RGBA")
    w, h = im.size

    seeds = []
    for x in range(0, w, max(1, w // 40)):
        seeds.extend([(x, 0), (x, h - 1)])
    for y in range(0, h, max(1, h // 40)):
        seeds.extend([(0, y), (w - 1, y)])

    inset = max(24, min(w, h) // 16)
    for x, y in [
        (inset, inset),
        (w - inset - 1, inset),
        (inset, h - inset - 1),
        (w - inset - 1, h - inset - 1),
    ]:
        seeds.append((x, y))

    flood_transparent(im, seeds)

    bbox = im.getbbox()
    if bbox:
        pad = 8
        bbox = (
            max(0, bbox[0] - pad),
            max(0, bbox[1] - pad),
            min(w, bbox[2] + pad),
            min(h, bbox[3] + pad),
        )
        im = im.crop(bbox)

    dest.parent.mkdir(parents=True, exist_ok=True)
    im.save(dest, optimize=True)
    print(f"saved {dest.name} {im.size}")


def main() -> None:
    for name, asset in ASSET_MAP.items():
        src = ASSET_DIR / asset
        if not src.exists():
            src = PPE_DIR / name
        process_icon(src, PPE_DIR / name)


if __name__ == "__main__":
    main()
