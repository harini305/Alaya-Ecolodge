# Functionality & Technical Dependencies

Status labels:
- **VERIFIED**: confirmed by fetching or rendering.
- **OBSERVED**: seen in screenshots or DOM text, but behaviour was not exercised.
- **UNCONFIRMED**: could not be checked.

## 1. Platform & hosting (VERIFIED)
- **Wix** site (response headers `x-wix-request-id`, assets on `static.wixstatic.com`, `static.parastorage.com`, `siteassets.parastorage.com`; sitemap `generatedBy="WIX"`). The fluid text scaling suggests Wix Studio (ESTIMATE).
- Served behind **Cloudflare**. Plain HTTP clients (curl) get **HTTP 429 + `cf-mitigated: challenge`**. Only a real or unblocked browser could read pages. This does not matter for the rebuild, but explains the audit method.
- Wix CDN media (`static.wixstatic.com/media/...`, `video.wixstatic.com/video/...`) is publicly downloadable without the challenge. All originals were fetched from there.
- `robots.txt`: Wix default (allow all; disallow `*?lightbox=`; PetalBot blocked; crawl-delay for dotbot and AhrefsBot). Sitemap index → `pages-sitemap.xml` (6 URLs, lastmod 2026-08-15).

## 2. Navigation & routing
| Item | Status | Notes |
|---|---|---|
| Desktop header nav (4 links + logo→home) | VERIFIED | Plain links. No dropdowns. |
| Active page indicator | VERIFIED | Nav text turns `#1a6aff` (Wix default blue) |
| Mobile hamburger menu | OBSERVED | 3-line icon on green bar. Accessibility labels "Menu"/"Close" exist. The open-menu overlay design was **not captured**. |
| Footer menu (Home + 4) | VERIFIED | Plain links |
| Skip to Main Content | VERIFIED | Wix default a11y link |
| Sticky / transparent header on scroll | UNCONFIRMED | Full-page captures show the header at the top only |
| 404 page | VERIFIED | `/contact` → Wix "404 Error: Page Not Found" |

## 3. Interactive components
| Component | Page | Status | Rebuild note |
|---|---|---|---|
| **Cottage selector** (list of 11 names → one detail panel with gallery) | Accommodation | OBSERVED (all 11 panels exist in the DOM; list + one panel visible; default appears to be Nasi Kuning) | Rebuild as client-side tabs/selector or separate cottage routes. Keep all 11 entries. |
| **Cottage image galleries** (3–23 images each, Wix gallery) | Accommodation | OBSERVED (images present; slider/lightbox behaviour UNCONFIRMED) | Need a gallery with keyboard support and a lightbox |
| **Past retreats tabs** (8 pill tabs → content panel with 4 images) | Retreats | VERIFIED (tabs + default active tab in screenshot) | Accessible tabs (`role=tablist`) |
| "See Upcoming Retreats below" | Retreats | OBSERVED (href = same page) | Anchor-scroll to `#upcoming` |
| "Request Brochure" | Retreats (Fun & Flow) | UNCONFIRMED (no href captured; may open a Wix lightbox or form) | **Ask the client** how brochure requests should work (email, PDF download, form) |
| Entrance / scroll animations | All | UNCONFIRMED. On home desktop, the "Experience Alaya" images overlap their titles in the capture, which suggests scroll-triggered motion states or a layout bug | The rebuild will use GSAP/ScrollTrigger by design. Do not copy this overlap. |
| Lazy loading of images | All | VERIFIED (blurred low-res placeholders seen in automated captures) | Plan our own loading strategy |
| Google Map (Wix Maps widget) | About Us | VERIFIED (mobile capture) | Embed iframe, lazy-loaded, with a "Open in Google Maps" link |
| Background video | Footer (every page) | VERIFIED: Wix video `7c2410_8793da3716a340c0b3f7dca38b47fc0f` (poster `…f000.jpg`), MP4s downloaded at 1080p/720p/480p/360p | Self-host the MP4 + poster. Muted, loop, playsinline, `prefers-reduced-motion` fallback to the poster |
| Hero slideshow / videos | Draft page only | VERIFIED (2 Wix videos) | Not on live pages |

## 4. Forms, search, booking, accounts
| Feature | Status | Detail |
|---|---|---|
| Contact form | **None on live pages** (VERIFIED) | Contact is via phone, email, Instagram and Booking.com links only |
| Newsletter / lead form | None on live pages | The draft page has a Wix Form "Contact to pay on arrival" (First name, Last name, Email, Submit). Its backend is Wix Forms and will **not** work outside Wix |
| Booking | External link (VERIFIED) | "Book on Booking.com" → https://www.booking.com/hotel/id/dune-alaya-ecolodge (resolves; Booking returns a 202 bot challenge to curl). **No on-site booking engine, availability, or prices.** Note the Booking.com slug reads "dune-alaya-ecolodge" |
| Site search | UNCONFIRMED | JSON-LD declares `SearchAction` → `/search?q=` (Wix auto-markup). There is no visible search UI. The route was not checked because the fetch tool session expired |
| Blog | Wix Blog installed, **0 posts** (VERIFIED) | `/blog` shows the empty state |
| Login / member area | None observed | — |
| E-commerce | None | — |
| Maps | **Google Maps embed on About Us** (VERIFIED in the mobile screenshot: satellite view, "Alaya Ecolodge" pin, zoom controls). Lazy-loaded; blank in the desktop capture. Text-only fetchers do not see it | Rebuild with a Google Maps embed iframe (no API key needed for a basic embed) or a static map image linking to Google Maps. Get the exact place link from the client |
| Cookie banner / consent | None observed | — |
| Analytics / tracking | UNCONFIRMED | Script inventory could not be captured. Wix normally injects its own analytics. Ask the client which analytics (GA4, Meta Pixel…) they need |

## 5. External links (all VERIFIED reachable on 2026-10-16)
| URL | Where | HTTP |
|---|---|---|
| https://www.booking.com/hotel/id/dune-alaya-ecolodge | About Us | 202 (bot challenge, page exists) |
| http://instagram.com/alaya.ecolodge | Footer, About Us | 200 (→ https://www.instagram.com/alaya.ecolodge) |
| https://www.asrmodel.com/ and /baliretreat | Retreats | 200 |
| https://www.instagram.com/anartofdelight/ | Retreats | 200 |
| https://www.rajyogaschool.com/enroll-now/ | Retreats | 200 |
| https://www.gaiaeducation.org/ede-bali-2026 | Retreats | 200 |
| https://www.programmes.gaiaeducation.uk/ede-bali-2025 | Retreats | 200 (outdated year) |
| http://www.ecovillagetours.com/bali | Retreats | 200 (→ https) |
| https://www.balaganeshsiva.com/ | Retreats | 200 |
| https://genoaecovillage.org/ | Retreats | 200 |
| mailto:alayaecolodge@gmail.com | Footer, About Us | n/a |

## 6. Backend / integration items needing special treatment in a frontend rebuild
1. **Booking**: keep it as an external Booking.com link unless the client wants a booking widget (that would be a new feature and needs approval).
2. **Request Brochure**: undefined behaviour. Needs a decision: a `mailto:`, a PDF, or a form backend (e.g. Formspree, Resend, or a Next.js Route Handler plus an email provider).
3. **Any form**: Wix Forms does not transfer. A new form needs a backend service and spam protection.
4. **Retreat schedule**: currently hand-edited in Wix and already out of date. Store it as structured data (`data/retreats.json`) and filter or sort by date at build or request time. The client may later want a CMS.
5. **Media hosting**: all assets currently live on the Wix CDN. They must be self-hosted (downloaded to `source-assets/`), because Wix may revoke access after migration.
6. **Image optimisation**: the brief requires `images: { unoptimized: true }` in Next.js. Originals are up to 11.6 MB / 4096px (28 files over 8 MB), so **resized web derivatives must be generated ahead of time** (e.g. a one-off sharp script producing 640/1280/1920/2560 AVIF/WebP plus `srcset`). Shipping originals would be very slow.
7. **Fonts**: Charmonman, Maitree, Open Sans and Cormorant Garamond via `next/font` (self-hosted). Madefor Text and Helvetica W01 are Wix-licensed and need substitutes.
8. **Domain / SEO continuity**: keep the same paths (`/accommodation`, `/retreats`, `/activities`, `/about-us`) to preserve rankings. Decide what to do with `/blog` and `/home-1-3-1-2` (recommended: drop, or 301 to `/`).
