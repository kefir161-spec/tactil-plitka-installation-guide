"""Нарезка пользовательских иконок инструментов."""
from pathlib import Path
from PIL import Image

ASSETS = Path(
    r"C:\Users\admin\.cursor\projects\c-Users-admin-Desktop-Programs-Instruction-PF\assets"
)
OUT = Path(r"c:\Users\admin\Desktop\Programs\Instruction_PF\public\images\tools")
OUT.mkdir(parents=True, exist_ok=True)

PAIRS = {
    "grid-3x2.png": (
        "c__Users_admin_AppData_Roaming_Cursor_User_workspaceStorage_1a1c2bf46a2f93db8082d21252f1bce9_images_ChatGPT_Image_23____._2026__.__11_27_45__1_-a2840605-ac04-494c-b0f8-47a1282c33c1.png",
        3,
        2,
    ),
    "pair-rag-solvent.png": (
        "c__Users_admin_AppData_Roaming_Cursor_User_workspaceStorage_1a1c2bf46a2f93db8082d21252f1bce9_images_ChatGPT_Image_23____._2026__.__11_27_46__4_-3753d546-4a49-4e06-b2bc-2084822b853f.png",
        2,
        1,
    ),
    "pair-mallet-roller.png": (
        "c__Users_admin_AppData_Roaming_Cursor_User_workspaceStorage_1a1c2bf46a2f93db8082d21252f1bce9_images_ChatGPT_Image_23____._2026__.__11_27_46__3_-cbc0bbb4-d7f4-43f2-ad72-03be95b1d1e9.png",
        2,
        1,
    ),
    "pair-mixer-trowel.png": (
        "c__Users_admin_AppData_Roaming_Cursor_User_workspaceStorage_1a1c2bf46a2f93db8082d21252f1bce9_images_ChatGPT_Image_23____._2026__.__11_27_45__2_-a887a1ec-d191-46c9-b02f-3449635cfaca.png",
        2,
        1,
    ),
}

GRID_NAMES = [
    ["tape-measure", "square", "pencil"],
    ["knife", "jigsaw", "template"],
]

PAIR_NAMES = {
    "pair-rag-solvent.png": ["rag", "solvent"],
    "pair-mallet-roller.png": ["mallet", "roller"],
    "pair-mixer-trowel.png": ["mixer", "trowel"],
}


def crop_grid(im: Image.Image, cols: int, rows: int, inset: float = 0.04):
    w, h = im.size
    cw, ch = w / cols, h / rows
    tiles = []
    for row in range(rows):
        row_tiles = []
        for col in range(cols):
            x0 = col * cw + cw * inset
            y0 = row * ch + ch * inset
            x1 = (col + 1) * cw - cw * inset
            y1 = (row + 1) * ch - ch * inset
            row_tiles.append(im.crop((int(x0), int(y0), int(x1), int(y1))))
        tiles.append(row_tiles)
    return tiles


def save_tile(tile: Image.Image, name: str):
    path = OUT / f"{name}.png"
    tile.save(path, optimize=True)
    print("saved", path, tile.size)


def main():
    for key, (filename, cols, rows) in PAIRS.items():
        path = ASSETS / filename
        im = Image.open(path).convert("RGBA")
        tiles = crop_grid(im, cols, rows)

        if key == "grid-3x2.png":
            for r, row in enumerate(tiles):
                for c, tile in enumerate(row):
                    save_tile(tile, GRID_NAMES[r][c])
        else:
            names = PAIR_NAMES[key]
            for i, tile in enumerate(tiles[0]):
                save_tile(tile, names[i])


if __name__ == "__main__":
    main()
