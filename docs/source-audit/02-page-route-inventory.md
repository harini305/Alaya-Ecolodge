# Page & Route Inventory

Captured 2026-10-16. Verbatim copy is in `content/`. Screenshots are in `screenshots/desktop` (1440px) and `screenshots/mobile` (390px). Asset rows are in `data/assets-manifest.csv` (filter by `page`).

## Route map

| Route | Title tag | In nav | In sitemap | Status | Rebuild? |
|---|---|---|---|---|---|
| `/` | Alaya Ecolodge - Pemuteran, Bali | logo + footer "Home" | ✓ | 200 | **Yes** |
| `/accommodation` | accommodation \| Alaya Ecolodge | ✓ | ✓ | 200 | **Yes** |
| `/retreats` | retreats \| Alaya Ecolodge | ✓ | ✓ | 200 | **Yes** |
| `/activities` | activities \| Alaya Ecolodge | ✓ | ✓ | 200 | **Yes** |
| `/about-us` | about us \| Alaya Ecolodge | ✓ | ✓ | 200 | **Yes** (also serves as Contact) |
| `/blog` | Blog \| Alaya Ecolodge | ✗ | ✓ | 200, empty (0 posts) | Ask client (recommend: omit or 301 → `/`) |
| `/home-1-3-1-2` | Alaya Ecolodge \| Sustainable hotel \| … | ✗ | ✗ | 200, unpublished draft | No (reference only; recommend 301 → `/`) |
| `/cottages`, `/blank-1`, `/blank-2`, `/blank-4` | — | linked only from the draft page | ✗ | not verified (likely 404) | No |
| `/contact` | 404 Error: Page Not Found | ✗ | ✗ | 404 | — |
| `/search` | (JSON-LD SearchAction target) | ✗ | ✗ | UNCONFIRMED | No (no search UI) |

## Shared components (all live pages)
1. **Header**: green bar (`#44A774` desktop / `#60A578` mobile), white logo PNG left, nav (Accommodation · Retreats · Activities · About Us) in Maitree bold white; hamburger on mobile.
2. **Page hero**: full-bleed photograph directly under the header. Text overlay on Home only.
3. **Script section heading** (Charmonman, `#4A412A`), used on every page.
4. **Rounded image tile** (radius about 16–24px).
5. **Pill buttons**: filled emerald (Home "View more") and outlined black (Retreats).
6. **Footer**: cream `#EDE7D1` rounded panel (logo tile + Menu / Location / Contact Us) and an aerial background-video band ("PEMUTERAN / Alaya's Home - A Land of Renewal and Return").

---

## 1. Home — `/`
**Purpose:** introduce Alaya (meaning, ethos, location) and route visitors to the three offerings.

| # | Section (original order) | Key content | Assets |
|---|---|---|---|
| 1 | Hero | "Alaya" (script) + "Ecolodge" + "Welcome back home to nature" over photo | `7c2410_2b99bc4a…` Pool & Garden (14) — portrait original 3072×4096, displayed as a landscape crop with Wix focal point 50%/43% |
| 2 | Welcome | "Salamat Datang!" + lead + 4 paragraphs + "About Pemuteran Town" (4 paragraphs) | — |
| 3 | Experience Alaya | 3 rows: Eco-Friendly Cottages / Rejuvenating Retreats / Activities & Adventures. Each has text, "View more", and 3 images | 9 images (see `content/01-home.md`) |
| 4 | Divider + Footer | — | footer video |

- Typography: hero script about 190px; body Open Sans in brown; welcome lead in Maitree.
- Interactions: 3 "View more" links. Scroll-motion state unconfirmed.
- Responsive: mobile hero is shorter, with the wordmark scaled down. Welcome text is centred in a single column. Each Experience row shows title, text, one large image and two small images, then a centred "View more" pill. The footer stacks and is centred.
- Special: **no H1** on the page. The desktop capture shows the Experience images overlapping their titles and text (see issues). The "About Pemuteran Town" story is long; keep the full text.

## 2. Accommodation — `/accommodation`
**Purpose:** present the cottages and amenities. Booking is not on this page.

| # | Section | Key content | Assets |
|---|---|---|---|
| 1 | Hero | image only | `7c2410_c4d680db…` Accomodation Top |
| 2 | Intro | "Your Stay,the Natural Way" + 4 paragraphs (Tumpeng naming) | 3 rounded squares: Breakfast, Tumpeng, Queen Bed |
| 3 | Our Cottages | List of 11 cottages (name + capacity line) beside a detail panel (gallery, type, capacity, description, "What it offers") | 58 gallery images across 7 cottages. **4 cottages have no images** (Nasi Kuning, Pisang Goreng, Dadar Gulung, Bubur Injin) |
| 4 | Other Amenities | Complementary (9 items in 3 groups) / Additional Charge (3) | — |
| 5 | Closing image | rounded sunset landscape | `7c2410_c54c4c86…` Mountain View |

- Interactions: cottage selector (list → panel) and galleries. Lightbox unconfirmed.
- Responsive: on mobile the list becomes a single column in a different order (see content file), followed by the panel. Intro images stack at full width. The amenities panel is centred and single-column.
- Special: several **data conflicts** (Tempe Manis/Orek name, capacity, Sate Saus/Sambal Tomat areas). There are **no prices**. Structured data is in `data/cottages.json`.

## 3. Retreats — `/retreats`
**Purpose:** promote upcoming programmes, invite facilitators to host, and show the track record.

| # | Section | Key content | Assets |
|---|---|---|---|
| 1 | Hero | image only | `7c2410_d4ac898d…` group photo |
| 2 | Intro | "A Quiet Green Oasis" + paragraph | — |
| 3 | Two cards | Join a Program (light peach `#FFEED9`, "See Upcoming Retreats below ↓") / Hold a Retreat (peach `#F0D9C2`, "Get in Touch →") | — |
| 4 | Upcoming Retreats & Programs | 7 sage cards: title, Details table, description, Read More, 4-image collage (includes partner logos) | 28 images |
| 5 | Past | 8 pill tabs → panel (text, dates, 4 images) | 32 images |
| 6 | Closing image | full-bleed | `7c2410_dec15f81…` "Retreats Top" |

- Interactions: tabs, anchor button, external Read More links, and the unresolved "Request Brochure".
- Responsive: cards stack. **On mobile "Hold a Retreat" comes before "Join a Program", and the Upcoming list starts with the TTC card** (desktop starts with Truth Based Relationships). Details tables keep their 2-column label/value layout. Tabs wrap into multiple rows.
- Special: **time-sensitive** content, with one event already past. Partner logos (Bala Yoga School, An Art of Delight, Authentic Self Relationships Model, Raj Yoga School, Gaia Education, Ecovillage Tours) are third-party marks; keep them only next to the relevant partner. Structured data is in `data/retreats.json`.

## 4. Activities — `/activities`
**Purpose:** list on-site and nearby experiences.

| # | Section | Key content | Assets |
|---|---|---|---|
| 1 | Hero | aerial pool image | `7c2410_1946b45a…` Activities Top (PNG) |
| 2 | Intro | "A Place to Explore & Immerse" + paragraph | — |
| 3 | At Alaya | 8 cards (title + subtitle on frosted label) | 8 images |
| 4 | Near Alaya | 8 cards | 8 images |
| 5 | Closing panorama | rounded | `7c2410_755d9a4c…` |

- Interactions: none. The cards are not links.
- Responsive: desktop has a 4-column grid; mobile has single full-width cards, taller (portrait) crops, and the frosted label inset at the bottom.
- Special: no detail pages, schedules or prices. The "Community Clean-ups" image is a "Plastic Free Bali" badge graphic, not a photo.

## 5. About Us — `/about-us` (doubles as Contact)
**Purpose:** introduce the team and give contact and booking options.

| # | Section | Key content | Assets |
|---|---|---|---|
| 1 | Hero | mountain range | `7c2410_5ec59ad2…` |
| 2 | Welcome text + divider | 2 short paragraphs (Maitree, centred) | — |
| 3 | Our Team | 9 cards (photo, name, role) | 9 portraits |
| 4 | Photo trio | temple / ceremony / Masiti | 3 images |
| 5 | Contact Us | 5 light-blue rows: Location, Phone, Email, Instagram, Booking | — |
| 6 | Google Map | satellite embed with pin | Google Maps (Wix widget) |

- Interactions: mailto, booking link, map.
- Responsive: team cards go from 3×3 to a single column; photos stack; contact rows are full width; the map sits below the rows.
- Special: this is the **only booking CTA** on the site. Staff photos are of real people.

---

## Cross-page responsive summary
- Breakpoint behaviour: desktop (≥1024) multi-column grids; mobile (≤~750) single column with centred text. Tablet layout was not captured (UNCONFIRMED).
- Mobile header grows slightly taller (about 118px at 390px) with a larger logo, and its green is lighter.
- No horizontal scrolling was observed at 390px.
- Wix fluid scaling means type and spacing grow with viewport width on desktop.
