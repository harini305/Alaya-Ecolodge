# Asset Inventory & Mapping

**Full row-level list:** `data/assets-manifest.csv`. It has 190 rows with columns `page, section, media_id, label_or_alt, width, height, bytes, local_path, original_url`.
**Local copies:** `source-assets/` at the project root (about 742 MB). These are the **untouched originals** downloaded from the Wix CDN on 2026-10-16. Do not edit them in place; generate web derivatives into a separate folder during implementation.

## 1. Workspace status before the audit
The project folder `D:\alayaecolodge7` was **empty**. No assets, code, or configuration existed. Everything under `source-assets/` was downloaded during this audit.

## 2. Summary by page

| Page | Files | Size | Largest | Notes |
|---|---|---|---|---|
| global (header / footer) | 2 logos + footer video poster + 4 video renditions | 33 MB | 16.7 MB (1080p video) | `source-assets/original/global/` |
| brand | favicon SVG | 45 KB | — | `source-assets/original/brand/` |
| home | 10 images | 48 MB | 11.6 MB (hero) | |
| accommodation | 58 images | 406 MB | 22.6 MB (hero, 10919×3432 panorama) | 23 Tahu Berontak gallery images |
| retreats | 62 images (incl. partner logos) | 76 MB | 22.8 MB (closing image) | many WhatsApp / phone photos |
| activities | 18 images | 48 MB | 17.1 MB | |
| about-us | 13 images | 38 MB | 19.3 MB (hero, 8064×6048) | 9 staff portraits |
| draft (unpublished page) | 17 images + 4 video files | 128 MB | 19.3 MB | optional; reuse needs client approval |
| **Total** | **190 entries** | **≈777 MB** | | 171 JPG/JPEG, 9 PNG, 1 AVIF, 1 SVG, 8 MP4 |

Fonts: `source-assets/fonts/charmonman/Charmonman-Regular.ttf` + `.woff2` (OFL). The other brand fonts are Google Fonts and load via `next/font`.

## 3. Brand assets

| Asset | Local path | Use |
|---|---|---|
| Logo, white on transparent (PNG 2181×2122) | `source-assets/original/global/7c2410_6ae78648ee9a42db9eed6ddc2477e3fa~mv2.png` | Header on green |
| Logo, white on green square (JPG 2929×2868) | `source-assets/original/global/7c2410_89d7dacc803240879d46f5a2444334d7~mv2.jpg` | Footer tile; social / OG image candidate |
| Favicon (SVG, green square + white mark) | `source-assets/original/brand/7c2410_ea8e6b84dece43099f6b96f2ddd881fb.svg` | favicon, apple-touch-icon |
| Charmonman font | `source-assets/fonts/charmonman/` | Script headings |

## 4. Hero / banner images (with Wix display crops)

Wix serves crops using focal points (`fp_x_y`). Reuse these focal points as `object-position` to keep the same framing.

| Page | media-id | Original px | Wix display crop at 1425w | Focal point |
|---|---|---|---|---|
| Home | `7c2410_2b99bc4a737e44868d87bdabcbd392d5~mv2.jpg` | 3072×4096 (portrait) | 1425×708 | 50% 43% |
| Accommodation | `7c2410_c4d680db455648249dbea29d2ef4b6f1~mv2.jpg` | 10919×3432 | 1425×497 | centre |
| Retreats | `7c2410_d4ac898d5465449e9718d75ff812c15d~mv2.jpg` | see manifest | 1425×601 | 49% 56% |
| Activities | `7c2410_1946b45a735c43679c487ff5b88a89b5~mv2.png` | see manifest | 1425×515 | 47% 44% |
| About Us | `7c2410_5ec59ad23ba346b5b0a3bd78ff7e879e~mv2.jpeg` | 8064×6048 | 1425×556 | 72% 33% |
| Footer band (all) | video `7c2410_8793da3716a340c0b3f7dca38b47fc0f` + poster `…f000.jpg` | 1080p/720p/480p/360p MP4 | full width | — |

## 5. Section imagery (counts; IDs in content files and the manifest)
- Home: 9 (3 per Experience row)
- Accommodation: 3 intro + 58 cottage gallery + 1 closing
- Retreats: 28 upcoming (7×4) + 32 past (8×4) + 1 closing. These include **partner logos**: Gaia Education ×2, Ecovillage Tours ×2, Bala Yoga School, and "The Bali Retreat". The mobile capture also shows logo graphics for An Art of Delight, Authentic Self Relationships Model, and Raj Yoga School inside the collage images. There are also 2 **screenshots** (PNG, from the Truth Based Relationships card)
- Activities: 16 cards + 1 closing
- About Us: 9 portraits + 3 photos

## 6. Icons, illustrations, textures
- **No icon set or illustrations** on the live pages. The only icons are Wix UI glyphs: the hamburger, the arrows inside "See Upcoming Retreats below ↓" and "Get in Touch →", and the map controls. Recreate them as simple inline SVGs.
- **No background textures or patterns.**
- Decorative PNGs on the draft page (`6533c5_…` "Rectangle 5001", "yellow", "pink", "Slide 16") are **Wix template assets**, not brand assets. They were not downloaded.

## 7. Video & animation
- Footer aerial video (live, every page): downloaded in 4 renditions plus poster.
- Two draft-page videos (unpublished): downloaded at 1080p and 720p, for optional reuse with approval.
- No Lottie or animated SVGs found.

## 8. Downloadable resources
None. There are no PDFs or brochures on the live site. "Request Brochure" has no file behind it (unresolved).

## 9. Missing / unavailable assets
| Item | Status |
|---|---|
| Gallery images for **Nasi Kuning, Pisang Goreng, Dadar Gulung, Bubur Injin** | **Do not exist on the live site.** Ask the client for photos. Do not substitute stock images. |
| Dark or colour logo variant for light backgrounds | Not available |
| Vector (SVG) version of the full logo | Only the favicon SVG (square, with green background) exists. A clean transparent SVG would need the client or a careful extraction from the favicon paths (approval needed) |
| OG / social share image | None set on the site |
| Wix-licensed fonts (Madefor Text, Helvetica W01 Light) | Not redistributable; substitutes needed |
| Exact Google Maps place / embed URL | Not captured (map seen visually only) |
| Image for the open mobile-menu state | Not captured |

## 10. Naming notes (to avoid confusion during implementation)
- Original Wix file names are inconsistent ("Accomodation", "Acitvities", "Imagel", "Retreats Top/Bottom" swapped). Use the **media-id** as the stable key and assign clean semantic names in phase 2, for example `accommodation/tahu-berontak-01.jpg`.
- Tahu Berontak images carry alt text describing **"Marigold cottage"** (a former name). A "Rose -1- Front.jpg" also exists on the draft page. Write new, accurate alt text using the current cottage names.
- Media-id prefixes come from different Wix uploader accounts: `7c2410_` (main site), `4490f9_` (recent retreat uploads), `2d34a4_` (cottage photo set / draft), `6533c5_` (template).
