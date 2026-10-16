# Route Verification

Checked on 2026-10-16 against a local production build (`next build` + `next start -p 3108`) and the dev server (`next dev -p 3107`). Requests were made with curl and headless Chrome 155 (puppeteer-core, run from a scratch folder outside the project).

## Route decisions

| Route | Decision | Why |
|---|---|---|
| `/` `/accommodation` `/retreats` `/activities` `/about-us` | Rebuilt, same slugs | Preserves the live URLs and SEO |
| `/blog` (and `/blog/*`) | **308 permanent redirect → `/`** | 0 posts, and its H1 was template text ("Contact to pay on arrival"). The audit recommends dropping it or redirecting (Q12). Redirecting keeps any inbound links working without a fake blog |
| `/home-1-3-1-2` | **308 permanent redirect → `/`** | Unpublished Wix draft with placeholder testimonials. It is not rebuilt and not indexed |
| `/cottages`, `/blank-1/2/4` | 404 (custom page) | Linked only from the draft. They never existed on the live site |
| `/contact` | 404 (custom page) | It returned 404 on the live site too. A redirect to `/about-us#contact` is a client decision (Q19) |
| Anything else | Custom `not-found` page, HTTP 404, `noindex` | — |

Redirects live in `next.config.mjs → redirects()`.

## HTTP results (production build)

| Path | Status |
|---|---|
| `/` | 200 |
| `/accommodation` | 200 |
| `/retreats` | 200 |
| `/activities` | 200 |
| `/about-us` | 200 |
| `/blog` | 308 → `/` |
| `/blog/x` | 308 → `/` |
| `/home-1-3-1-2` | 308 → `/` |
| `/contact` | 404 (custom page) |
| `/cottages` | 404 (custom page) |
| `/sitemap.xml` | 200 (the 5 live URLs only) |
| `/robots.txt` | 200 (allow all + sitemap) |

`/` and `/retreats` are static with `revalidate = 86400`, so the retreat "upcoming / happening now / ended" grouping refreshes daily. Every other route is fully static.

## Metadata per route (from built HTML)

| Route | `<title>` (source, verbatim) | Canonical | OG image | H1 |
|---|---|---|---|---|
| `/` | Alaya Ecolodge - Pemuteran, Bali | https://www.alayaecolodge.com | /media/og/home.jpg | 1 ("Alaya Ecolodge") |
| `/accommodation` | accommodation \| Alaya Ecolodge | …/accommodation | /media/og/accommodation.jpg | 1 |
| `/retreats` | retreats \| Alaya Ecolodge | …/retreats | /media/og/retreats.jpg | 1 |
| `/activities` | activities \| Alaya Ecolodge | …/activities | /media/og/activities.jpg | 1 |
| `/about-us` | about us \| Alaya Ecolodge | …/about-us | /media/og/about-us.jpg | 1 |

Meta descriptions are the original ones, carried over verbatim. Home also has `LodgingBusiness` JSON-LD containing verified facts only.

## Navigation and interaction checks (headless Chrome, scripted; all PASS)

**Navigation**
- Header nav and footer menu: client-side navigation to all 5 routes. The active state (`aria-current="page"`, with a peach underline) is correct on each page.
- Mobile menu (390 px): opens, focuses the first link, closes on Escape, closes after navigating, and navigates to `/activities`.

**Accommodation**
- Cottage selector: 11 tabs. Each of the 11 selections updates the panel heading, the selected tab and the URL hash.
- Keyboard: ArrowDown moves focus and selection; End selects the last cottage.
- Deep links: `/accommodation#urap-chaya` at 390 px selects Urap Chaya. `#nasi-kuning` shows the neutral "Photographs of Nasi Kuning are not yet available." panel.
- Photo counts per cottage: Nasi Kuning 0 · Tahu Berontak 23 · Tempe Manis 6 (3 × "To be confirmed") · Jamur Goreng 6 · Jagung Perkadel 6 · Pisang Goreng 0 · Dadar Gulung 0 · Bubur Injin 0 · Urap Chaya 6 · Sate Saus 3 (area TBC) · Sambal Tomat 3 (area TBC).
- Gallery: the Next button, thumbnails, the lightbox opening, ArrowRight inside the lightbox, and Escape closing it.

**Retreats**
- Programme tabs: Upcoming (5: Regenerative Reset [Happening now], Yoga & Culture, EDE, Ecovillage Tours, Fun & Flow), Dates to be confirmed (1: TTC) and Recently ended (1: Truth Based). That is 7 programmes in total.
- Past tabs: all 8 reachable by keyboard, each showing its own heading and 4 images.
- "See Upcoming Retreats below" scrolls to `#programmes`. "Request Brochure" is a `mailto:` link to the verified address.

**Footer video**
- 1440 px: nothing is requested until the footer nears the viewport, then only `footer-aerial-720p.mp4` loads and plays.
- 390 px: only `footer-aerial-480p.mp4` loads.
- Reduced motion: no video is requested and the poster is shown.

**Motion and fallbacks**
- Reduced motion: 0 elements hidden or offset on load.
- JavaScript disabled: `html.motion` is not set and revealed content is visible (opacity 1).
- ScrollTrigger count after repeated client navigation is stable per page (/ 55, /accommodation 20, /retreats 9, /activities 33, /about-us 25). No duplicates accumulate.

**About Us**
- Map embed loads and shows the "Alaya Ecolodge" pin (checked visually). The "Open in Google Maps" link and all 5 contact rows are real links: maps, `tel:`, `mailto:`, Instagram and Booking.com.

## Responsive / visual sweep

Full-page screenshots of all 5 routes at **320, 390, 768, 1024, 1440 and 1600 px**:
- Horizontal overflow: **0 px everywhere**.
- Console errors: **0**. Failed requests: **0** (the only 404 is the intentional `/nope` test).
- Issues found and fixed during the review:
  - Script headings stayed hidden (a GSAP transform conflict).
  - The circular Pemuteran image kept its clip-path.
  - "Ecolodge" collided with the descender in the hero.
  - Ascenders overlapped the cottage-name eyebrow.
  - Charmonman's narrow word spacing.
  - The mobile hero crop of the panorama.
  - The retreat details table stacked on mobile.

## Revision 2 re-check (after the spacing pass)

The production build was rebuilt, and the same 50-check suite ran against it: **50 PASS, 0 FAIL, 0 console errors**. The overflow sweep (5 pages × 320/390/768/1024/1600) again showed 0 px horizontal overflow. The only failed request was one aborted footer-video download when the harness closed the page mid-stream; it did not reproduce on re-run.

## Lint / build

- `npm run lint` (ESLint 9 + eslint-config-next 16): **0 problems**.
- `npm run build`: **success**. 5 pages, `_not-found`, `icon.svg`, `apple-icon.png`, `robots.txt` and `sitemap.xml` are all prerendered.

## Not verified

- Real devices (iOS Safari, Android Chrome). Only Chrome device emulation by viewport size was used.
- Screen readers. Semantics were checked in the markup, but no AT session was run.
- External partner URLs. The audit verified them on 2026-10-16 and they were not re-fetched.
