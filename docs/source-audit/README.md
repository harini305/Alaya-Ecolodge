# Source Audit — alayaecolodge.com (captured 2026-10-16)

This is the phase-1 audit of the original Wix website, kept as reference for the phase-2 Next.js rebuild. Start with `01-audit-report.md`.

| File | What it contains |
|---|---|
| `01-audit-report.md` | Master report: overview, findings summary, recommendations, confirmation of scope |
| `02-page-route-inventory.md` | Every route; per-page sections, assets, interactions, responsive notes |
| `content/00-global-header-footer.md` | Header, footer, business facts (verbatim) |
| `content/01-home.md` … `05-about-us.md` | Verbatim page copy + SEO metadata + image IDs, in original section order |
| `content/06-unlisted-pages.md` | `/blog`, draft homepage `/home-1-3-1-2`, 404 probes |
| `04-content-preservation-checklist.md` | QA checklist for the rebuild |
| `05-asset-inventory.md` | Asset summary, brand files, heroes and focal points, missing assets |
| `data/assets-manifest.csv` | 190 rows: page · section · media-id · label · size · local path · original URL |
| `data/cottages.json` | 11 cottages, structured (with conflict flags) |
| `data/retreats.json` | 7 upcoming + 8 past retreats, structured |
| `06-typography-color-reference.md` | Fonts, type scale, verified colour palette, component treatments, logo |
| `07-functionality-dependencies.md` | Navigation, interactive parts, forms/booking/maps, integrations, rebuild risks |
| `08-issues-gaps-questions.md` | Client questions, conflicts, typos, layout issues, audit limitations |
| `screenshots/desktop/*.jpg` | 1440px captures (full page + above the fold) |
| `screenshots/mobile/*.jpg` | 390px captures (full page + above the fold) |

Original media lives in **`/source-assets/`** at the project root:
- `original/<page>/<wix-media-id>`: untouched originals from `static.wixstatic.com`
- `original/global/video/`: footer background video (1080p/720p/480p/360p)
- `fonts/charmonman/`: Charmonman Regular (SIL OFL)

Note on screenshots: blurred heroes or empty boxes in some captures are Wix lazy-load placeholders, not part of the design.
