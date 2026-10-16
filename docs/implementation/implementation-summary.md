# Implementation Summary — Alaya Ecolodge (Pemuteran) rebuild

Local Next.js rebuild of https://www.alayaecolodge.com, built from the phase-1 audit (`docs/source-audit/`). Nothing has been pushed, deployed or connected to any hosting service.

**Run locally:** `npm install` → `npm run dev` (open the printed URL) · production: `npm run build && npm start`.
**Regenerate images:** `npm run images` (needs Python 3 + Pillow).

## Stack

- Next.js 16.4 (App Router, Turbopack), React 19.3, plain JavaScript (no TypeScript)
- GSAP 3.15 + ScrollTrigger + `@gsap/react` (`useGSAP`)
- CSS Modules plus one global token sheet (`src/app/globals.css`)
- Fonts via `next/font`: Charmonman is loaded from the original OFL file (`next/font/local`); Maitree, Open Sans and Cormorant Garamond come from Google and are self-hosted at build time
- ESLint 9 + `eslint-config-next`
- Node 24.13 / npm 11.6 (the machine's existing versions)

## Design direction — tropical editorial

- **Palette:** warm paper (`#F8F4EA`, a lightened tint of the brand cream) as the base, with earth-brown text throughout. Colour is assigned by content type:
  - deep emerald bands for destination content (Pemuteran, Near Alaya);
  - sage for programmes and amenity lists;
  - peach for the retreat paths and the home retreat preview;
  - sky only for the contact rows.
- **Header green:** the header uses `#2E7A53`, a darker shade of brand `#44A774`. White on `#44A774` is 2.99:1, which fails WCAG even for large text; on `#2E7A53` it is 5.22:1. The original green stays on the logo tile and in accents. All text pairings pass AA (computed ratios are in `content-review.md`).
- **Typography:** Charmonman for expressive section titles, the hero wordmark and cottage names; Maitree for headings, nav and lead text; Open Sans for body and UI (it also replaces the Wix-only Madefor and Helvetica); Cormorant Garamond for the footer's "PEMUTERAN" and the Pemuteran pull quote. Sizes use fluid `clamp()` tokens and paragraphs are capped at about 62ch.
- **Composition:** inset, rounded heroes on inner pages; asymmetric 12-column grids; three different collage layouts for "Experience Alaya"; a numbered cottage index with a live photo preview; a rotating ring on the Pemuteran band (from the source text, "putar — to rotate or return"); arched team portraits; an editorial mosaic on Activities. There is no glassmorphism, no loud gradients and almost no shadows.
- **Decoration:** a single line-drawn frond motif, drawn on scroll.

## Routes

`/`, `/accommodation`, `/retreats`, `/activities`, `/about-us` and a custom 404. `/blog` and `/home-1-3-1-2` redirect (308) to `/`. Details are in `route-verification.md`.

| Page | Sections |
|---|---|
| Home | Hero (wordmark H1, tagline) → Salamat Datang! welcome → Experience Alaya (3 offerings, each linking to its page) → Our Cottages index (all 11, deep-linking into the selector) → next 3 dated programmes → About Pemuteran Town → Contact Us invite (About Us, Booking.com, phone, email, Instagram) |
| Accommodation | Hero → "Your Stay,the Natural Way" + 3 photos + Tumpeng note → **cottage selector** (11 tabs + gallery + lightbox + facts + offers + Booking.com/Contact) → Other Amenities → closing image |
| Retreats | Hero → A Quiet Green Oasis → Join a Program / Hold a Retreat → **programme tabs** (Upcoming / Dates to be confirmed / Recently ended, by date) → **Past** (8 tabs) → closing image |
| Activities | Hero → intro → At Alaya (editorial mosaic of 8) → Near Alaya (8, dark band) → closing panorama → Get in Touch |
| About Us | Hero → welcome → Our Team (9) → photo trio → **Contact Us** (5 sky rows incl. Booking.com) + Google Map |
| All pages | Sticky 92 px header (hides on scroll down), mobile overlay menu, "Continue to" link overlaid on each closing photo, footer: one fitted aerial-video section with the cream panel (logo tile, Menu, Location, Contact Us) inside it |

## Project structure

```
scripts/build-media.py          image/video/OG pipeline (originals → public/media)
src/content/*.json              ALL copy and data (site, home, accommodation, retreats, activities, about, media registry)
src/lib/                        media() resolver, retreat status by date, fonts, metadata helper
src/app/                        routes, layout, template (motion mount), not-found, sitemap, robots, icons
src/components/
  layout/                       SiteHeader (desktop + mobile nav), Footer, FooterVideo
  motion/PageMotion.jsx         declarative GSAP layer (data-attributes)
  ui/                           Img, Button, SectionHeading, Tabs, Frond
  sections/                     PageHero, ClosingImage (+ "Continue to" overlay)
  home/                         HomeHero, Welcome, Experience, CottageIndex, RetreatPreview, Pemuteran, ContactInvite
  accommodation/                CottageSelector, CottageGallery (+ lightbox)
  retreats/                     ProgrammeEntry, PastPanel, RichText
public/media/                   generated WebP derivatives, video, OG images
```

## Data model

- **Content is separate from presentation.** Editing a cottage detail, a retreat date or a typo means editing JSON only.
- **`accommodation.json` → `cottages[]`:**
  - verbatim `name`, `type`, `description`, `offers`, `images[{id, alt}]`;
  - `facts` (guests, bedrooms, bathrooms, area), filled only where the source agrees with itself. `null` renders as "To be confirmed";
  - `source` keeps the original list line, capacity line and full offers for later resolution.
- **`retreats.json` → `programmes[]`:**
  - verbatim `dates` string plus ISO `start`/`end` where unambiguous (`null` for the TTC);
  - description as text/link segments (inline links are preserved);
  - `cta`, `partnerLogo`, and `reviewNote`.
- **Retreat status:** `lib/retreats.js` computes upcoming / happening now / ended from the ISO dates in Bali time (WITA). Pages revalidate daily, so a programme moves to "Recently ended" without anyone editing it.
- **Media:** components refer to images by their Wix media-id. `lib/media.js` resolves the id through the generated `media.json` on the server. Client components receive only the resolved objects, so the registry never ships to the browser.

## Animation approach

- **One declarative layer.** `PageMotion` is mounted from `app/template.js`, so it remounts on every navigation, and `useGSAP` / `gsap.matchMedia` revert all tweens and ScrollTriggers on unmount. Trigger counts were measured stable across repeated navigation.
- **Effects:**
  - hero image settle + masked line rise;
  - word-staggered headings;
  - batched fade/rise reveals;
  - clip-path image reveals;
  - small parallax drift on secondary collage images (desktop only);
  - SVG frond drawing;
  - slow ring rotation;
  - component-level transitions for the cottage panel, gallery images, tab panels and the mobile menu;
  - CSS for the nav underlines and the button fill sweep.
- **Restraint:** no pinning, no scroll-jacking, no horizontal scroll sections, no per-character animation.
- **Safety:**
  - Initial hidden states apply only under `html.motion`, which an inline head script sets *only* when reduced motion is not requested.
  - A CSS fallback reveals everything after 2.4 s if GSAP never initialises.
  - With JavaScript disabled, all content is visible.
  - Under reduced motion nothing animates, and the footer video is not loaded.

## Accessibility

- **Structure:** a skip link; one H1 per page; semantic landmarks; `aria-current` on nav links.
- **Widgets:**
  - WAI-ARIA tabs with roving tabindex for the cottages, programme filters and past retreats (arrow keys, Home, End);
  - gallery buttons with labels;
  - a `<dialog>` lightbox (Esc, arrow keys, swipe);
  - a mobile menu dialog with focus containment and Esc to close.
- **Visuals:** visible warm focus rings; touch targets of at least 44 px; hover effects only under `(hover: hover)`.
- **Media:** a labelled map iframe; a pause control for the background video.

## SEO

- Original titles and descriptions per route; canonical URLs; Open Graph and Twitter cards with per-page 1200×630 hero crops.
- `sitemap.xml` (5 URLs) and `robots.txt`.
- `LodgingBusiness` JSON-LD with verified facts only.
- The draft and blog routes are redirected and not indexed.

## Test results (actually run)

- `npm run lint`: 0 problems. `npm run build`: success; all routes static (`/` and `/retreats` revalidate daily).
- 50 scripted interaction checks in headless Chrome: all pass against both the dev server and the production build, 0 console or page errors.
- Visual sweep of 5 routes × 6 widths (320–1600): 0 px horizontal overflow, 0 failed requests.
- Performance (production, cache off): CLS 0.000 everywhere; initial load 0.5–1.0 MB on mobile and 0.9–1.9 MB on desktop.

Details: `route-verification.md`, `asset-optimisation.md`. Open content questions: `content-review.md`.

## Known limitations

- Not tested on physical iOS or Android devices or with a screen reader.
- Retreat statuses depend on daily revalidation, which needs a host that supports ISR (Vercel does). On a purely static export they would freeze at build time.
- The Booking.com, map-place, brochure, typo and conflict decisions await the client (see `content-review.md`).
- `AGENTS.md` at the project root is generated by `next dev` (Next 16 default) and is not part of the site.

## Revision 2 — spacing, alignment and empty-space pass (2026-10-16)

Feedback: the structure was fine, but spacing and alignment were off everywhere, sections were too far apart, the header should be bigger, the footer should fit, and empty space should be avoided.

- **Spacing tokens:** `--section` cut from 72–160 px to 52–96 px. New `--section-sm` and `--head-gap` give one consistent heading-to-content rhythm on every page.
- **Header:** 92 px tall (74 px on mobile). Logo 74 px, wordmark 1.3 rem, nav 1.2 rem.
- **Alignment:** inner-page heroes share the content container edges. Headings are left-aligned (except centred statements). Grids are repacked so columns line up.
- **Home:**
  - Welcome redesigned: heading + lead on one row, a 3-column body, and the closing line in a framed band between two fronds.
  - Experience collages repacked on a 6×9 grid with no empty cells. Big numerals anchor the text.
  - Retreat preview cards are equal height.
- **Accommodation:** the intro photos are a clean two-row mosaic with overlay captions, and the text is vertically centred.
- **Retreats:** programme photo mosaics stretch to the text height (images absolutely positioned), so no gap opens under the photos.
- **Activities:**
  - Every mosaic row shares one image height, so captions align. The staggered offset was removed. The last card is full width.
  - On phones, the middle six cards are paired two per row.
- **About Us:**
  - Lead and body side by side.
  - Team redesigned as a 3×3 grid of horizontal cards (2 columns on tablet and phone; an odd last card spans the row).
  - Photo trio at equal heights.
  - The map matches the height of the contact rows.
- **Footer:** redesigned as one fitted section. The cream panel sits inside the video band, with no overlap and no leftover strip. **Bug fixed:** "PEMUTERAN" had been invisible because its reveal attributes sat outside the page-motion scope.
- **"Continue to" strips removed:** they are now overlaid on each page's closing photo. About Us ends at Contact.
- **Motion:** shorter, earlier reveals (0.8 s, trigger at 96% of the viewport) and gentler parallax. A test that jumps straight to the bottom of each page confirms nothing stays hidden after fast scrolling.
- **Re-verified:**
  - lint clean; build OK;
  - 50/50 interaction checks on the production build;
  - 0 px overflow at 320–1600 px on all 5 pages;
  - CLS 0.000;
  - page heights about 10–30% shorter (e.g. home 10,072 → 7,993 px, About 5,225 → 3,722 px at 1440 px).
