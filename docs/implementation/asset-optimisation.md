# Asset Optimisation

## Summary

| | Count | Size |
|---|---|---|
| Original collection (`source-assets/`, untouched) | 192 files on disk (190 manifest rows + 2 Charmonman font files) | **742 MB** |
| Originals used by the live pages and processed | 164 images | 619.5 MB |
| Generated WebP derivatives (`public/media/<page>/`) | 594 files | ≈ 80 MB in total, all widths |
| Footer video shipped (`public/media/video/`) | 2 renditions | 11.0 MB (only one is ever requested) |
| Open Graph crops (`public/media/og/`) | 5 JPEG, 1200×630 | 1.3 MB |
| **`public/media` total** | | **≈ 93 MB** |

The 93 MB is the *whole* derivative library across every width. No page loads more than a small, viewport-appropriate subset (see measurements below). The raw 742 MB is never copied into `public/` and never enters the bundle.

## Next.js image configuration

`next.config.mjs` contains:

```js
images: {
  unoptimized: true,
},
```

This is confirmed active: no `/_next/image` requests appear in any capture. Images are rendered with a small component (`src/components/ui/Img.jsx`) that outputs `<img srcset sizes width height loading decoding>` pointing at the pre-built WebP files. Its width/height attributes reserve the aspect ratio, and measured CLS is 0.000 on every page. Long-lived cache headers (`max-age=31536000, immutable`) are set for `/media/*`.

## Pipeline

`npm run images` runs `scripts/build-media.py` (Python 3.13 + Pillow 12, already installed on this machine, so no new project dependency). It:

1. reads `docs/source-audit/data/assets-manifest.csv`, the audit's media-id → page/section/local-path map;
2. **skips the unpublished draft page** (reusing it needs client approval);
3. opens each original read-only, applies the EXIF orientation (many are phone photos), and keeps alpha only where an image actually has transparent pixels (logos);
4. resizes with Lanczos and **never upscales**: widths above the original are dropped, and the original width is used as the top rung when it is smaller;
5. encodes WebP at q74 (q86 for images with alpha), method 5;
6. writes semantic file names, e.g. `accommodation/tahu-berontak-03-960.webp`;
7. writes **`src/content/media.json`**, which maps media-id → `{ src, w, h, widths, original }`. Every derivative is traceable to its original file and the Wix media-id used in the audit;
8. creates a **16:10 art-directed crop** of the portrait home hero (3072×4096, Wix focal point 50%/43%) so landscape screens don't download a tall image;
9. copies the 480p/720p video, the favicon SVG and the Charmonman font, and renders `apple-icon.png` and the OG crops.

The script is idempotent: existing derivatives are skipped. Re-run it after adding photos.

### Width ladders

| Role | Widths (px, capped at the original) | Used for |
|---|---|---|
| hero / wide | 640 · 1024 · 1600 · 2400 | page heroes, closing images, footer poster |
| photo | 240 · 480 · 960 · 1600 | content, galleries, cards. 240 = gallery/index thumbnails, 1600 = lightbox |
| portrait | 320 · 640 | team portraits |
| logo | 160 · 320 · 640 | logos, partner logos |

Each `<img>` declares `sizes` for its actual layout slot. Everything below the fold uses `loading="lazy"`. Heroes are `loading="eager"` and wrapped in `<picture>`: React hoists plain eager `<img>`s into `<link rel=preload>` hints, and Next applies the hints of *every prefetched route*. Before this fix, each page downloaded all the other pages' heroes (+1.2–2 MB).

## The 28 originals over 8 MB

The audit counted 28 images over 8 MB. The manifest has 32 entries over 8 MB once video files and draft images are included. **All 24 that appear on live pages were downsized.** The other 8 are 6 draft-page files plus the 1080p and 720p videos.

| Example original | Size | Original px | Largest derivative shipped |
|---|---|---|---|
| Accommodation hero panorama | 22.6 MB | 10919×3432 | 2400w, 713 KB (1600w: 292 KB) |
| Retreats closing image | 22.8 MB | 6408×3568 | 2400w, 1.15 MB |
| About hero (mountains) | 19.3 MB | 8064×6048 | 2400w (1600w: 296 KB) |
| Snorkeling & Diving | 17.1 MB | 8064×6048 | 1600w (displayed at ~220 px → 240/480w) |
| Home hero | 11.6 MB | 3072×4096 | portrait capped at 1600w; landscape crop 1600w = 514 KB |

## Footer video

| Rendition | Size | Shipped? | When it loads |
|---|---|---|---|
| 1080p | 16.7 MB | no | never (overkill behind a dark overlay) |
| 720p | 8.2 MB | yes | viewport ≥ 768 px |
| 480p | 3.3 MB | yes | viewport < 768 px, or Save-Data |
| 360p | 1.6 MB | no | — |

The `<video>` has no `src` in the HTML (`preload="none"`). An IntersectionObserver assigns **one** rendition once the footer is within 300 px of the viewport, plays it muted, inline and looped, and pauses it when it scrolls out of view. Under `prefers-reduced-motion` no video is requested and the poster (WebP, 640–2400w) stays. A visible pause/play button is provided. No re-encoding was done because ffmpeg is not installed. The 480p file is a reasonable mobile size, so this is acceptable.

## Measured initial load (production build, cache disabled, no scrolling)

| Page | 390 px: total / images | 1440 px: total / images | CLS | LCP element |
|---|---|---|---|---|
| `/` | 773 KB / 321 KB | 1174 KB / 731 KB | 0.000 | hero (640w / wide-1600w) |
| `/accommodation` | 1020 KB / 611 KB* | 1856 KB / 1415 KB* | 0.000 | hero panorama |
| `/retreats` | 513 KB / 95 KB | 943 KB / 492 KB | 0.000 | hero |
| `/activities` | 566 KB / 162 KB | 1088 KB / 649 KB | 0.000 | hero |
| `/about-us` | 645 KB / 243 KB | 1005 KB / 568 KB | 0.000 | hero |

JS ≈ 190 KB and fonts ≈ 176 KB (4 families, self-hosted) are included in the totals. Video 0 KB on load.
\* Measured before the 240w thumbnail rung was added. The 23 gallery thumbnails now use the 240w files instead of 480w.

## Still worth attention

- A few 1600w gallery derivatives are 1.0–1.4 MB (dense foliage and interior photos, e.g. `jamur-goreng-06`, `sambal-tomat-03`, `about-us/photo-temple`). They only load in the lightbox or on high-DPR large screens. q65 or AVIF would roughly halve them if needed.
- Several "Near Alaya" originals are small (512–600 px wide). They are shown at ~220 px, so not upscaled. Higher-resolution originals from the client would help if those images are ever shown larger.
- The four cottages without photographs (see content-review.md).

## Git

`source-assets/` is listed in **`.gitignore`**, and the raw 742 MB stays local only. Traceability is kept through `docs/source-audit/data/assets-manifest.csv` plus `src/content/media.json`. The derivatives in `public/media` (≈ 93 MB, mostly many small files) are intended to be committed. Nothing has been committed, pushed or deployed. This folder is not yet a git repository.
