# Alaya Ecolodge — Source Website Audit (Phase 1)

- **Site:** https://www.alayaecolodge.com/
- **Audit date:** 2026-10-16
- **Scope:** content, assets, brand, functionality, and routes, to prepare for a Next.js (App Router) + GSAP/ScrollTrigger redesign.
- **Phase-1 rule:** investigate and document only. No redesign was built.

Evidence labels: **VERIFIED** (fetched, rendered, or measured) · **OBSERVED** (seen, behaviour not exercised) · **ESTIMATE** · **UNCONFIRMED**.

---

## 1. Website overview & audit coverage

Alaya Ecolodge is a small eco bed-and-breakfast and retreat venue in Pemuteran, North-West Bali. It has 11 restored heritage wooden cottages (named after Tumpeng side dishes), a pool, and a multifunctional hall and yoga shala. It hosts yoga, wellness, and sustainability retreats (up to 25 participants) and offers on-site and nearby activities. The site is a **Wix** build (probably Wix Studio) behind Cloudflare.

| Coverage item | Result |
|---|---|
| Live pages audited | **5 of 5** (Home, Accommodation, Retreats, Activities, About Us). Verbatim content captured |
| Other reachable pages | `/blog` (empty), `/home-1-3-1-2` (unpublished draft): documented |
| Sitemap / robots | VERIFIED (6 URLs) |
| Desktop capture (1440px, full page) | All 5 + blog + draft |
| Mobile capture (390px, full page) | All 5 |
| Assets downloaded | 190 originals (≈777 MB incl. draft; 742 MB on disk) + Charmonman font |
| Fonts identified | VERIFIED via CSS and the font file |
| Colours | VERIFIED via CSS tokens and pixel sampling |
| External links | 10 / 10 reachable |

**Method:** Plain HTTP requests are blocked by a Cloudflare challenge (HTTP 429). Pages were therefore read through an unblocking headless browser (Apify web-fetch and screenshot actor), the WebFetch tool, two HTML+CSS brand extractors, and full-page screenshots. Original media came straight from the public Wix CDN. Colours were confirmed by sampling flat areas of the screenshots.

## 2. Pages & routes
See **`02-page-route-inventory.md`**.
Live: `/`, `/accommodation`, `/retreats`, `/activities`, `/about-us`. Secondary: `/blog` (0 posts), `/home-1-3-1-2` (draft; links to non-existent `/cottages`, `/blank-1/2/4`). `/contact` returns 404.

## 3. Page-by-page section inventory (summary)
| Page | Sections in order |
|---|---|
| Home | Hero (script wordmark + tagline) → Salamat Datang! intro + About Pemuteran Town → Experience Alaya (3 offering rows with "View more") → footer |
| Accommodation | Hero → "Your Stay,the Natural Way" intro + 3 images → Our Cottages (11-item list + detail panel/gallery) → Other Amenities → closing image → footer |
| Retreats | Hero → "A Quiet Green Oasis" → Join a Program / Hold a Retreat cards → Upcoming (7 programme cards) → Past (8 tabs) → closing image → footer |
| Activities | Hero → "A Place to Explore & Immerse" → At Alaya (8 cards) → Near Alaya (8 cards) → closing panorama → footer |
| About Us | Hero → welcome text → Our Team (9) → 3 photos → Contact Us (5 rows) → Google Map → footer |
Full detail with assets, interactions, and responsive notes: `02-page-route-inventory.md`. Verbatim text: `content/`.

## 4. Content preservation findings
- All live copy was captured **verbatim** (`content/01…05`), with structured data for cottages and retreats (`data/cottages.json`, `data/retreats.json`).
- Business facts: Jalan Gatot Kaca, Pemuteran, Gerokgak, Buleleng Regency, Bali 81155 · +62 813 3904 7912 · alayaecolodge@gmail.com · Instagram @alaya.ecolodge · Booking.com listing.
- **There are no prices, testimonials, FAQs, blog posts, or legal pages** on the live site. None should be invented.
- Data conflicts (Tempe Manis/Orek, two cottage areas, an impossible TTC date), an outdated retreat, and about 18 typos are listed in `08-issues-gaps-questions.md`.
- The draft page's "Landon" testimonials are **Wix placeholders**. They must not be reused.
- QA checklist: `04-content-preservation-checklist.md`.

## 5. Original assets & local availability
See **`05-asset-inventory.md`** and **`data/assets-manifest.csv`**.
- The workspace was empty before the audit. All originals are now in `source-assets/original/<page>/` (untouched, full resolution, up to 10919px / 22.8 MB).
- Brand: white logo PNG, white-on-green logo JPG, and favicon SVG. Footer aerial **video** in 4 renditions plus poster.
- Missing: photos for 4 cottages, a vector/dark logo, an OG image, and the Wix-licensed fonts.

## 6. Fonts & typography
See **`06-typography-color-reference.md`**.
| Role | Font (VERIFIED) |
|---|---|
| Script headings and hero wordmark | **Charmonman** (custom upload; Google Font, OFL) |
| Nav, subheadings, lead text | **Maitree** |
| Body | **Open Sans** |
| Footer "PEMUTERAN" | **Cormorant Garamond** |
| Footer columns, team cards (Wix-only) | Madefor Text, Helvetica W01 Light, which need substitutes |

## 7. Brand colour palette
| Role | Hex | Evidence |
|---|---|---|
| Primary green (desktop header, logo tile, favicon) | **#44A774** | VERIFIED (pixel + CSS + SVG) |
| Soft green (mobile header) | **#60A578** | VERIFIED |
| Emerald accent (buttons, shown at ~70% opacity) | **#49796B** | VERIFIED |
| Earth brown (all text) | **#4A412A** | VERIFIED |
| Cream (footer panel) | **#EDE7D1** | VERIFIED |
| Sage (retreat cards) / light sage | **#C4CDB7** / **#D9DFD1** | VERIFIED |
| Peach light / peach | **#FFEED9** / **#F0D9C2** | VERIFIED |
| Sky (contact rows) | **#B2D4EA** | VERIFIED |
| Neutral card | #EEEEEE | VERIFIED |
| White / black | #FFFFFF / #000000 | VERIFIED |
| *Not brand:* active nav Wix blue | #1A6AFF | VERIFIED (default; recommend restyling) |

## 8. Navigation & interactive behaviour
Plain 4-item header nav with a mobile hamburger. Footer menu. Cottage selector with galleries (Accommodation). Pill tabs for past retreats. Anchor and external "Read More" buttons. Google Map embed. Muted background video in the footer. **No forms, search UI, login, e-commerce, or on-site booking.** "Request Brochure" behaviour is unconfirmed. Details: `07-functionality-dependencies.md`.

## 9. Responsive observations
Desktop uses multi-column grids (4-column activity cards, 3×3 team, side-by-side cottage list and panel). Mobile collapses everything to one column with centred text, a lighter-green taller header, and a hamburger. Mobile **reorders** some content (cottage list; Retreats cards). The footer stacks and is centred. No horizontal overflow at 390px. Tablet was not captured. Wix fluid scaling enlarges type on wide screens.

## 10. Technical dependencies & integrations
- Wix CDN media → must be self-hosted (done for originals).
- Booking.com external link (keep).
- Google Maps embed (rebuild with an iframe; get the place link).
- Wix Forms (draft only) and Wix Blog (empty) do not transfer.
- Instagram link only (no feed widget).
- Analytics unknown.
- **Next.js `images.unoptimized = true`** is required, so responsive derivatives must be generated ahead of time from the oversized originals.

## 11. Missing assets, inaccessible pages, unresolved questions
20 client questions, conflicts, typos, layout issues, and audit limitations are listed in **`08-issues-gaps-questions.md`**. Highlights: Tempe Manis/Orek; cottage photos; TTC date; ended retreat; Request Brochure; blog/draft routing; font substitutes; active-nav colour; analytics; map link.

## 12. Recommended implementation considerations (for phase 2; direction not chosen)
1. **Content as data:** drive Cottages, Retreats (upcoming/past, date-filtered), Activities, Team, and contact details from JSON/MDX (starting from `data/*.json`), so updates don't require code edits.
2. **Image pipeline:** with `images: { unoptimized: true }`, run a one-off build script (e.g. `sharp`) to create AVIF/WebP widths (about 640/1280/1920/2560) into `public/images/...`. Use `<img srcset sizes>` or `next/image` with explicit `src` variants. Keep Wix focal points as `object-position`. Lazy-load everything below the fold. Use the poster plus 720p/480p MP4 for the footer video.
3. **Fonts:** `next/font/google` for Charmonman, Maitree, Open Sans, and Cormorant Garamond (self-hosted, `display: swap`). Subset Latin. The Charmonman original is kept in `source-assets/fonts`.
4. **Tokens:** define the verified palette as CSS variables (names proposed in `06-…`). Keep earth-brown text instead of black.
5. **Semantics & accessibility:** one H1 per page, proper heading order, accessible tabs and gallery and lightbox, focus states in brand colours, `prefers-reduced-motion` for GSAP and the video, alt text rewritten with current cottage names, and sufficient contrast. #44A774 with white text is about 3:1, which passes only for large or bold text. Check the nav size.
6. **GSAP/ScrollTrigger:** register on the client only (`"use client"`), clean up on route change (`gsap.context()` / `useGSAP`), avoid layout shift, and respect reduced motion.
7. **SEO continuity:** keep the existing slugs. Carry over titles and descriptions (case fixes need approval). Add a sitemap, robots, canonical URLs, and an OG image (pending approval). Add `LodgingBusiness` JSON-LD using only verified facts. 301 `/home-1-3-1-2` (and `/blog` if dropped).
8. **Booking UX:** consider surfacing the Booking.com link more prominently (needs approval). There is no booking engine to rebuild.
9. **Forms:** only if approved (e.g. Request Brochure). This needs a backend (Route Handler + email provider) and spam protection.
10. **Do not** carry over the Wix default blue, template placeholders, or draft-only content without approval.

## 13. Confirmation
- ✅ No redesign, UI components, or application code were created.
- ✅ No packages were installed. No project configuration was created or changed.
- ✅ Nothing was pushed to GitHub, and nothing was deployed to Vercel.
- ✅ No existing files were modified or deleted. The workspace was empty. The only additions are `docs/source-audit/**` (documentation, data extracts, screenshots) and `source-assets/**` (untouched original media and font downloads).
- ✅ Information that could not be obtained is labelled UNCONFIRMED or ESTIMATE instead of guessed.
