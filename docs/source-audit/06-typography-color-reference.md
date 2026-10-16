# Typography & Color Reference — Alaya Ecolodge brand identity

Evidence labels used in this file:
- **VERIFIED-CSS**: read from the live site's CSS (@font-face rules, CSS custom properties) by an HTML+CSS parser.
- **VERIFIED-PIXEL**: sampled from browser screenshots of the live site (exact rendered RGB on a flat area).
- **VERIFIED-FILE**: read from the original asset file (font name table, SVG fill values).
- **ESTIMATE**: measured visually from screenshots. Treat as approximate.

The site is built with **Wix (likely Wix Studio / fluid scaling)**. Rendered font sizes scale with viewport width, so pixel sizes below are given at a 1440px desktop viewport.

---

## 1. Font families

| Role | Font | Evidence | Source / licence | Where it's used |
|---|---|---|---|---|
| **Script display / section headings** | **Charmonman** (Regular 400) | VERIFIED-FILE: the custom uploaded Wix font `wfont_0995b4_d04062c6…` has name-table family "Charmonman", "Charmonman-Regular", © 2018 The Charmonman Project Authors, SIL OFL 1.1 | Google Fonts (OFL). Original file saved to `source-assets/fonts/charmonman/` | Hero "Alaya" wordmark; all script section titles: "Salamat Datang!", "Experience Alaya", "Your Stay,the Natural Way", "Our Cottages", "Other Amenities", "A Quiet Green Oasis", "Upcoming", "Past", "A Place to Explore & Immerse", "At Alaya", "Near Alaya", "Our Team", "Contact Us", retreat card titles, cottage panel titles, Past tab labels |
| **Serif — subheadings, nav, lead text** | **Maitree** (Google; 400 and 700 seen; family loaded 200–700) | VERIFIED-CSS: @font-face `maitree` 400/700 + Google CSS `Maitree:wght@200;300;400;500;600;700` | Google Fonts (OFL) | Header nav (bold, white); hero "Ecolodge" + "Welcome back home to nature"; H3 feature titles ("Eco-Friendly Cottages"…); welcome lead ("Close your eyes…"); cottage names in list; "Join a Program"/"Hold a Retreat"; About-Us intro paragraph; amenity sub-headings |
| **Sans — body copy** | **Open Sans** (Wix id `open-sans-v2`; 400/700, normal + italic) | VERIFIED-CSS | Google Fonts (OFL) | All paragraph text, cottage specs, retreat descriptions, card subtitles |
| **Serif caps — footer band** | **Cormorant Garamond** (Wix ids `cormorantgaramond`, `cormorantgaramond-semibold`) | VERIFIED-CSS (@font-face present); visual match on "PEMUTERAN" | Google Fonts (OFL) | Footer "PEMUTERAN" (uppercase, large) |
| Footer band subtitle | Helvetica Light (Wix `helvetica-w01-light`) | VERIFIED-CSS + visual | Wix-licensed web font, **not redistributable**. Use a system Helvetica/Arial stack, or ask about a licensed alternative | "Alaya's Home - A Land of Renewal and Return" |
| UI / footer columns / team cards | **Madefor Text** (Wix's own font, `madefor-text`) | VERIFIED-CSS + visual (footer "Menu/Location/Contact Us", team names) | **Wix proprietary, not redistributable** | Footer column headings and links; team card names and roles; contact rows |
| Also declared, minor or unused | `helveticaneuew01-45ligh`, `din-next-w01-light`, Arial | VERIFIED-CSS | Wix system fonts | Wix widget defaults; no clear visible brand use |

**Rebuild guidance (needs approval):** the brand-carrying fonts are **Charmonman + Maitree + Open Sans** (plus Cormorant Garamond for the footer caps). All four are on Google Fonts and can be self-hosted via `next/font/google`. Madefor Text and Helvetica W01 belong to Wix and cannot be carried over. Picking substitutes for those two UI roles is a decision for the client (a reasonable proposal is Open Sans, which is already part of the system).

## 2. Type scale & treatment (desktop 1440px; ESTIMATE unless marked)

| Element | Font | Size | Weight | Other |
|---|---|---|---|---|
| Hero wordmark "Alaya" | Charmonman | ~180–200px | 400 | White, centred over photo, slight shadow or overlay |
| Hero "Ecolodge" | Maitree | ~26px | 700 | White, tucked under the right end of "Alaya" |
| Hero tagline | Maitree | ~18px | 400 | White |
| Script section headings (H2) | Charmonman | ~48–64px (home "Salamat Datang!" largest) | 400 | Colour `#4a412a`; often centred |
| Feature subheadings (H3) | Maitree | ~26–30px | 400 | `#4a412a` |
| Header nav | Maitree | ~15–16px | 700 | White on green; active item `#1a6aff` (Wix default) |
| Body paragraphs | Open Sans | ~14–15px | 400 | `#4a412a`; letter-spacing about −0.03em (VERIFIED-CSS: −0.72px at a 24px computed size); line-height about 1.6 |
| Lead text ("Close your eyes…") | Maitree | ~17px | 400 | `#4a412a`, centred |
| Footer "PEMUTERAN" | Cormorant Garamond | ~64px at 1440 (VERIFIED-CSS computed 107px at a larger viewport) | 400 | White, uppercase |
| Footer subtitle | Helvetica Light | ~22px | 300 | White |
| Footer column headings | Madefor Text | ~13px | 700 | `#000000` |
| Footer links/text | Madefor Text | ~12px | 400 | `#000000` |
| Buttons ("View more", "Read More") | Open Sans / Madefor | ~12–14px | 400 | See section 4 |

Text alignment: mostly **centred** (intro blocks, About text, amenity panel, mobile). The exceptions are the home welcome section (left script heading, right left-aligned body), the Experience Alaya rows, and the cottage list.

## 3. Color palette

### Core brand
| Token (proposed name) | Hex | Evidence | Usage |
|---|---|---|---|
| `--alaya-green` (primary) | **#44A774** | VERIFIED-PIXEL (desktop header), VERIFIED-FILE (favicon SVG fill, logo tile `#45a774`), VERIFIED-CSS (`--bg-overlay-color: #44a774`) | Desktop header background, logo tile, favicon |
| `--alaya-green-soft` | **#60A578** | VERIFIED-PIXEL (mobile header), VERIFIED-CSS (`--item-color: #60a578`) | Mobile header background |
| `--alaya-emerald` (accent / button) | **#49796B** | VERIFIED-CSS (button background in computed styles); VERIFIED-PIXEL as `#7fa197` = #49796B at 70% opacity on white | "View more" pill buttons (rendered at ~70% opacity) |
| `--alaya-earth` (text) | **#4A412A** | VERIFIED-CSS (`--fill`, text token) + VERIFIED-PIXEL (body and script headings) | All headings and body copy |
| `--white` | #FFFFFF | VERIFIED | Page background; text on green |
| `--black` | #000000 | VERIFIED-PIXEL | Footer text; outlined button borders and text |

### Section / surface colors
| Token (proposed) | Hex | Evidence | Usage |
|---|---|---|---|
| `--alaya-cream` | **#EDE7D1** | VERIFIED-PIXEL | Footer panel background (rounded, inset) |
| `--alaya-sage` | **#C4CDB7** | VERIFIED-PIXEL | Retreat program cards (Upcoming) |
| `--alaya-sage-light` | **#D9DFD1** (alt rows #CDD5C2) | VERIFIED-PIXEL | "Details" mini-table inside retreat cards |
| `--alaya-peach-light` | **#FFEED9** | VERIFIED-PIXEL | "Join a Program" card |
| `--alaya-peach` | **#F0D9C2** | VERIFIED-PIXEL | "Hold a Retreat" card |
| `--alaya-sky` | **#B2D4EA** | VERIFIED-PIXEL | About-Us contact rows |
| `--alaya-sky-line` | #CBDCE9 | VERIFIED-CSS (`--item-divider`, container borders) | Dividers and borders in Wix menu/containers |
| `--neutral-card` | #EEEEEE (CSS also #F0F0F0) | VERIFIED-PIXEL / CSS | Team cards |
| Divider line | ~#4A412A at low opacity / grey | ESTIMATE | Horizontal rules (home before footer, About intro, cottage panels) |

### Wix system colors (NOT brand; do not carry over)
`#116DFF`, `#1A6AFF` (focus ring, selected menu item, active nav link) · `#ED1566` (stroke default) · `#8F8F8F`, `#6E6E6E`, `#5F6360` (widget greys).

> The **active navigation link shows in Wix blue `#1A6AFF`** on the live site. This looks like an unstyled theme default. Recommendation: in the rebuild, mark the active state with the brand palette (for example an underline or opacity change in white). **Needs client approval.**

### Draft-page colors (unpublished `/home-1-3-1-2` only; NOT brand)
Dark forest green band (~#1F4D42, ESTIMATE) and terracotta-orange pills (~#C8603E, ESTIMATE). These colors are not used on the live pages.

## 4. Components & visual treatment

| Element | Treatment (observed) |
|---|---|
| Header | Full-width solid green bar (~105px tall desktop, ~118px mobile). White logo on the left (~80px). Nav right of centre on desktop. Hamburger (3 white lines) on mobile. Not observed to be sticky. |
| Hero | Full-bleed photo, no rounding. Home has a text overlay; other pages have image only. Desktop heights about 500–700px. |
| Image corners | Rounded, about **16–24px** radius on content images, cards and panels (VERIFIED-CSS radius tokens 29px and 37px at the larger viewport). Heroes are square-cornered. |
| Retreat cards | Large rounded (~24px) sage panels with internal padding. Title centred in Charmonman. |
| Outlined pill buttons | "Read More", "See Upcoming Retreats below ↓", "Get in Touch →", "Request Brochure": transparent background, 1px black border, fully rounded, small text, optional arrow icon. |
| Filled pill buttons | "View more" (home): emerald `#49796B` at about 70% opacity, white text, small. VERIFIED-CSS computed: radius 29px, padding about 12×22px, min-height 56px at the larger viewport. |
| Tabs (Past) | Rounded pill tabs with a pale sage fill and thin border, labels in Charmonman. Active tab is darker or underlined. |
| Activity cards | Square-ish rounded photo cards. Bottom label on a **frosted / translucent light panel** (title + small subtitle, centred). |
| Team cards | Light grey rounded rectangles. Circular photo on the left, name (bold) and role. |
| Contact rows | Light-blue rounded bars; bold label with an underlined value beneath. |
| Amenities panel | White panel with a 1px dark outline and large radius (~24px). |
| Footer | Inset cream panel with large top radius. Green rounded logo tile on the left. Three text columns. Below it, a full-width aerial **background video** band with bottom radius and centred white "PEMUTERAN" title. |
| Shadows | None noticeable. The design is flat. |
| Decorative motifs | Mostly photographic. The logo motif (leaf, joglo house, dragonfly, cupped hands in a brush circle) is the main brand mark. No textures or patterns on the live pages. |

## 5. Logo

| Variant | File | Notes |
|---|---|---|
| White logo, transparent PNG | `source-assets/original/global/7c2410_6ae78648ee9a42db9eed6ddc2477e3fa~mv2.png` (2181×2122) | Used on the green header. Contains the leaf, Javanese joglo house, dragonfly, cupped hands, and script wordmark "Alaya EcoLodge" |
| White logo on green square | `source-assets/original/global/7c2410_89d7dacc803240879d46f5a2444334d7~mv2.jpg` (2929×2868) | Footer logo tile (displayed with rounded corners) |
| Favicon / touch icon (SVG) | `source-assets/original/brand/7c2410_ea8e6b84dece43099f6b96f2ddd881fb.svg` | Green `#44a774` square + white logo paths. Vector, so it can be reused at any size. |

There is no dark-on-light logo variant and no standalone vector wordmark. If one is needed (e.g. for a white header), ask the client. Do not recolour or redraw the logo without approval.

## 6. Tone & personality (observed)
Calm, earthy, spiritual and community-oriented. It uses warm brown text instead of black, organic greens, handwritten script headings, generous white space, and large nature photography. The copy is invitational and gentle ("Close your eyes… inhale deeply…", "Stay gently, tread lightly."). It also uses Balinese/Indonesian terms (Salamat Datang, Tumpeng dish names, Pemuteran folklore).
