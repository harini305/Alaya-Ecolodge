"""
Build web derivatives from the untouched originals in source-assets/.

- Reads docs/source-audit/data/assets-manifest.csv (the audit's media map).
- Skips the unpublished draft page (reuse needs client approval).
- Applies EXIF orientation, resizes (never upscales), encodes WebP.
- Writes public/media/<page>/<semantic-name>-<width>.webp
- Writes src/content/media.json: media-id -> { src, w, h, widths, alpha, original }
- Copies the 480p / 720p footer video renditions, favicon, Charmonman font,
  and renders apple-icon + Open Graph crops.

Originals are only ever opened read-only.

Run: npm run images   (python -I scripts/build-media.py)
"""
import csv
import json
import re
import shutil
import sys
from pathlib import Path

from PIL import Image, ImageOps

Image.MAX_IMAGE_PIXELS = None  # 10919x3432 panorama is legitimate

ROOT = Path(__file__).resolve().parent.parent
AUDIT = ROOT / "docs" / "source-audit" / "data"
OUT = ROOT / "public" / "media"
REGISTRY = ROOT / "src" / "content" / "media.json"

QUALITY = 74

# Width ladders per role. Values above the original width are dropped.
LADDERS = {
    "hero": [640, 1024, 1600, 2400],
    "wide": [640, 1024, 1600, 2400],
    "photo": [240, 480, 960, 1600],
    "portrait": [320, 640],
    "logo": [160, 320, 640],
}


def slugify(text):
    text = text.lower().replace("&", "and")
    text = re.sub(r"[^a-z0-9]+", "-", text)
    return text.strip("-")


def build_names():
    """media-id -> (page, semantic name, role)."""
    names = {}

    def add(mid, page, name, role="photo"):
        names[mid] = (page, name, role)

    # Global / brand
    add("7c2410_6ae78648ee9a42db9eed6ddc2477e3fa~mv2.png", "brand", "logo-white", "logo")
    add("7c2410_89d7dacc803240879d46f5a2444334d7~mv2.jpg", "brand", "logo-tile", "logo")
    add("7c2410_8793da3716a340c0b3f7dca38b47fc0ff000.jpg", "global", "footer-aerial-poster", "hero")

    # Home
    add("7c2410_2b99bc4a737e44868d87bdabcbd392d5~mv2.jpg", "home", "hero-pool-garden", "hero")
    home_rows = {
        "cottages": ["7c2410_04ba3a0f62b34288b0927d579d255c2b~mv2.jpg", "7c2410_d6340f2999db4fb9a7ed38fde10227ea~mv2.jpg", "7c2410_faa960a73a61448688aa3505351a9b54~mv2.jpg"],
        "retreats": ["7c2410_b42b66df03bf4c4aa9ccf7e45eb729fe~mv2.jpg", "7c2410_31bec048d0be4bab812f2ebd48341dad~mv2.jpg", "7c2410_296204b8831e4aea8ef6b476580e75e6~mv2.jpeg"],
        "activities": ["7c2410_287a13890f834f6a9c2e940498a53b0c~mv2.jpg", "7c2410_421f7cfde2a8421f8802beb0c02e2233~mv2.jpeg", "7c2410_398569683994414d860fc4153285ca24~mv2.jpg"],
    }
    for row, ids in home_rows.items():
        for i, mid in enumerate(ids, 1):
            add(mid, "home", f"experience-{row}-{i}")

    # Accommodation
    add("7c2410_c4d680db455648249dbea29d2ef4b6f1~mv2.jpg", "accommodation", "hero-garden-panorama", "hero")
    add("7c2410_dd177c0add804841aeb9b336bd658751~mv2.jpeg", "accommodation", "intro-breakfast")
    add("7c2410_c4f3d7605f564276a61967e52916f53b~mv2.jpg", "accommodation", "intro-tumpeng")
    add("7c2410_32d5b6c7214c4ef588dc2f40a6881efb~mv2.jpg", "accommodation", "intro-queen-bed")
    add("7c2410_c54c4c86130d404cb6a96fc769f4bd46~mv2.jpg", "accommodation", "closing-mountain-view", "wide")
    cottages = json.loads((AUDIT / "cottages.json").read_text(encoding="utf-8"))
    for c in cottages["cottages"]:
        for i, mid in enumerate(c["images"], 1):
            add(mid, "accommodation", f"{c['slug']}-{i:02d}")

    # Retreats
    add("7c2410_d4ac898d5465449e9718d75ff812c15d~mv2.jpg", "retreats", "hero-group-garden", "hero")
    add("7c2410_dec15f811a2841ee91fd9932bb92ed43~mv2.jpg", "retreats", "closing", "hero")
    retreats = json.loads((AUDIT / "retreats.json").read_text(encoding="utf-8"))
    for r in retreats["upcoming"]:
        s = slugify(r["title"])
        for i, mid in enumerate(r["images"], 1):
            add(mid, "retreats", f"{s}-{i:02d}")
        if r.get("partnerLogo"):
            add(r["partnerLogo"], "retreats", f"{s}-partner-logo", "logo")
    for p in retreats["past"]["items"]:
        s = "past-" + slugify(p["tab"])
        for i, mid in enumerate(p["images"], 1):
            add(mid, "retreats", f"{s}-{i:02d}")

    # Activities
    add("7c2410_1946b45a735c43679c487ff5b88a89b5~mv2.png", "activities", "hero-aerial-pool", "hero")
    add("7c2410_755d9a4c1b6a42e592f16ee08bf58807~mv2.jpg", "activities", "closing-panorama", "wide")
    at = {
        "yoga-meditation": "7c2410_a8cb91031b884bffaf3b6017347528f9~mv2.jpg",
        "balinese-cooking": "7c2410_c93302cdbd4443f5b656f30873e9d708~mv2.jpg",
        "massage-bodywork": "7c2410_eb426f58a7b04771a9e1eec349c63c6e~mv2.jpg",
        "martial-arts": "7c2410_73d669f7b70f41a59b721955ccfad43f~mv2.jpg",
        "acupuncture-watsu": "7c2410_94d3d91a21a344d1949cd1850287e6f1~mv2.jpg",
        "cultural-experiences": "7c2410_5d24f88a4c514bbaa571bceeae5c2c5c~mv2.jpg",
        "games-movies-bonfires": "7c2410_898e56a890a148cd800e66b8a5130333~mv2.jpg",
        "health-workshops": "7c2410_854636a2959a4918b64bebb367121394~mv2.jpg",
    }
    near = {
        "hiking-temples": "7c2410_0875ccd58a334b9f9d2ca4333a6d81a4~mv2.jpg",
        "waterfalls-hot-springs": "7c2410_7f2fa3a075ef4704bc0733317b19a312~mv2.jpg",
        "turtle-release-reef": "7c2410_9f862ca015fd4050b0e4e94fc886422a~mv2.jpg",
        "national-park-village": "7c2410_86152cae4b5b42babc637f206593e1d6~mv2.jpg",
        "dolphins-mangrove": "7c2410_6ce5e9098ddb4aea82ea645cbe3d8453~mv2.jpg",
        "snorkeling-diving": "7c2410_2100f5ba3ca64ebdb08edac3effd313a~mv2.jpeg",
        "farming-forestry": "7c2410_2aeb24baf8ff4794978699ee28eb4ef6~mv2.jpg",
        "community-clean-ups": "7c2410_c6dac31697d841ec9edd45c85df8a523~mv2.jpg",
    }
    for k, mid in at.items():
        add(mid, "activities", f"at-alaya-{k}")
    for k, mid in near.items():
        add(mid, "activities", f"near-alaya-{k}")

    # About us
    add("7c2410_5ec59ad23ba346b5b0a3bd78ff7e879e~mv2.jpeg", "about-us", "hero-mountains", "hero")
    team = {
        "ketut-sudarta": "7c2410_4eeb6a0056bb40a5b791d317d8cbe1c5~mv2.jpg",
        "ketut-sarka": "7c2410_8d20bfd0d56545429b2c124ccd378117~mv2.jpg",
        "ketut-wiyasni": "7c2410_a9fbd1e143934e30aeebcf52392880f0~mv2.jpg",
        "michael-marco": "7c2410_547994cb463546cca1040c5d82fe0a44~mv2.jpg",
        "kavitha-selvaraj": "7c2410_2b72edaa31f042318e6e3ff48812186c~mv2.jpg",
        "ibu-masiti": "7c2410_fba652456d22487cabe3d38a514e5fbb~mv2.jpg",
        "kadek-suartika": "7c2410_5aba396ff9254b99900368c6e84fa793~mv2.jpg",
        "kadek-wati": "7c2410_83293925efd44adba7a1689b3ec9e80c~mv2.jpg",
        "putu-pastika": "7c2410_17633af8648441c2987d092b8fcc43c3~mv2.jpg",
    }
    for k, mid in team.items():
        add(mid, "about-us", f"team-{k}", "portrait")
    add("7c2410_4f111ce012b945b18b1cf9fc460cd2ce~mv2.jpg", "about-us", "photo-temple")
    add("7c2410_2d10e9e320bb473b8e4d1d5553eed795~mv2.png", "about-us", "photo-ceremony")
    add("7c2410_a1fc3ef30d7d4f29aee99b29713aa449~mv2.jpeg", "about-us", "photo-masiti")
    return names


def has_alpha(img):
    if img.mode in ("RGBA", "LA"):
        return img.getchannel("A").getextrema()[0] < 255
    if img.mode == "P" and "transparency" in img.info:
        return True
    return False


def main():
    rows = list(csv.DictReader((AUDIT / "assets-manifest.csv").open(encoding="utf-8")))
    by_id = {r["media_id"]: r for r in rows}
    names = build_names()
    registry = {}
    total_in = total_out = 0
    missing = []

    for mid, (page, name, role) in names.items():
        row = by_id.get(mid)
        if not row:
            missing.append(mid)
            continue
        src = ROOT / row["local_path"]
        if not src.exists():
            missing.append(mid)
            continue
        total_in += src.stat().st_size
        with Image.open(src) as im:
            im = ImageOps.exif_transpose(im)
            alpha = has_alpha(im)
            im = im.convert("RGBA" if alpha else "RGB")
            w, h = im.size
            widths = [x for x in LADDERS[role] if x < w]
            # include the native width when it sits below the next rung
            if not widths or (w <= LADDERS[role][-1] and w not in widths):
                widths.append(min(w, LADDERS[role][-1]))
            widths = sorted(set(widths))
            dest_dir = OUT / page
            dest_dir.mkdir(parents=True, exist_ok=True)
            for tw in widths:
                th = round(h * tw / w)
                out = dest_dir / f"{name}-{tw}.webp"
                if not out.exists():
                    im.resize((tw, th), Image.LANCZOS).save(
                        out, "WEBP", quality=QUALITY if not alpha else 86, method=5
                    )
                total_out += out.stat().st_size
        registry[mid] = {
            "src": f"/media/{page}/{name}",
            "w": w,
            "h": h,
            "widths": widths,
            "alpha": alpha,
            "original": row["local_path"],
        }
        print(f"{page}/{name}: {w}x{h} -> {widths}", flush=True)

    REGISTRY.parent.mkdir(parents=True, exist_ok=True)
    REGISTRY.write_text(json.dumps(registry, indent=1), encoding="utf-8")

    # Footer video: 480p (mobile) + 720p (desktop). 1080p/360p stay in source-assets.
    vdir = OUT / "video"
    vdir.mkdir(parents=True, exist_ok=True)
    vsrc = ROOT / "source-assets" / "original" / "global" / "video"
    for q in ("480p", "720p"):
        s = vsrc / f"7c2410_8793da3716a340c0b3f7dca38b47fc0f_{q}.mp4"
        d = vdir / f"footer-aerial-{q}.mp4"
        if not d.exists():
            shutil.copyfile(s, d)

    # Favicon (original SVG) + apple icon + font
    app = ROOT / "src" / "app"
    app.mkdir(parents=True, exist_ok=True)
    shutil.copyfile(ROOT / "source-assets/original/brand/7c2410_ea8e6b84dece43099f6b96f2ddd881fb.svg", app / "icon.svg")
    with Image.open(ROOT / "source-assets/original/global/7c2410_89d7dacc803240879d46f5a2444334d7~mv2.jpg") as im:
        ImageOps.fit(im.convert("RGB"), (180, 180), Image.LANCZOS).save(app / "apple-icon.png")
    fonts = ROOT / "src" / "fonts"
    fonts.mkdir(parents=True, exist_ok=True)
    shutil.copyfile(ROOT / "source-assets/fonts/charmonman/Charmonman-Regular.woff2", fonts / "Charmonman-Regular.woff2")

    # Art-directed landscape crop of the portrait home hero (3072x4096) so wide
    # screens don't download a tall image to fill a short frame. Wix focal 50%/43%.
    hero_id = "7c2410_2b99bc4a737e44868d87bdabcbd392d5~mv2.jpg"
    with Image.open(ROOT / by_id[hero_id]["local_path"]) as im:
        im = ImageOps.exif_transpose(im).convert("RGB")
        w, h = im.size
        ch = round(w * 10 / 16)  # 16:10
        top = max(0, min(h - ch, round(h * 0.43 - ch / 2)))
        wide = im.crop((0, top, w, top + ch))
        widths = [1024, 1600, 2400]
        for tw in widths:
            out = OUT / "home" / f"hero-pool-garden-wide-{tw}.webp"
            if not out.exists():
                wide.resize((tw, round(ch * tw / w)), Image.LANCZOS).save(out, "WEBP", quality=QUALITY, method=5)
        registry[hero_id + "#wide"] = {
            "src": "/media/home/hero-pool-garden-wide", "w": w, "h": ch, "widths": widths,
            "alpha": False, "original": by_id[hero_id]["local_path"], "crop": "16:10 at focal 50%/43%",
        }
    REGISTRY.write_text(json.dumps(registry, indent=1), encoding="utf-8")

    # Open Graph crops (1200x630 JPEG) from page heroes, honouring Wix focal points
    og = [
        ("home", "7c2410_2b99bc4a737e44868d87bdabcbd392d5~mv2.jpg", (0.5, 0.43)),
        ("accommodation", "7c2410_c4d680db455648249dbea29d2ef4b6f1~mv2.jpg", (0.5, 0.5)),
        ("retreats", "7c2410_d4ac898d5465449e9718d75ff812c15d~mv2.jpg", (0.49, 0.56)),
        ("activities", "7c2410_1946b45a735c43679c487ff5b88a89b5~mv2.png", (0.47, 0.44)),
        ("about-us", "7c2410_5ec59ad23ba346b5b0a3bd78ff7e879e~mv2.jpeg", (0.72, 0.33)),
    ]
    ogdir = OUT / "og"
    ogdir.mkdir(parents=True, exist_ok=True)
    for page, mid, (fx, fy) in og:
        with Image.open(ROOT / by_id[mid]["local_path"]) as im:
            im = ImageOps.exif_transpose(im).convert("RGB")
            fitted = ImageOps.fit(im, (1200, 630), Image.LANCZOS, centering=(fx, fy))
            fitted.save(ogdir / f"{page}.jpg", "JPEG", quality=80, optimize=True, progressive=True)

    print(f"\nImages: {len(registry)} originals ({total_in/1e6:.1f} MB) -> derivatives {total_out/1e6:.1f} MB")
    if missing:
        print("MISSING:", missing, file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
