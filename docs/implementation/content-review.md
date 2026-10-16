# Content Review — unresolved issues and how the rebuild handles them

Status as of 2026-10-16. Source of truth: `docs/source-audit/` (Q-numbers refer to `08-issues-gaps-questions.md`).
Rule applied throughout: **source copy is reproduced verbatim**; conflicting or unverifiable facts are **not shown as fact**, and the original values are kept in the data files for later resolution.

## 1. Factual conflicts (need a client decision)

| # | Issue | What the site shows now | Where the original values are kept | Affected |
|---|---|---|---|---|
| 1 | **Tempe Manis vs Tempe Orek** (Q3): list name "Tempe Manis", detail-panel heading "Tempe Orek" | Name **Tempe Manis** (the list name and the original URL slug). "Tempe Orek" is not shown | `src/content/accommodation.json` → `tempe-manis.source.panelHeading` | `/accommodation#tempe-manis`, home cottage index |
| 2 | **Tempe Manis capacity** (Q3): list "6 guests \| 3 bedrooms", panel "4 guests \| 2 bedroom \| 1 bathroom"; the offers list also says "2 Attached semi-open to sky bathrooms" | Guests, Bedrooms and Bathrooms read **"To be confirmed"**. Area 88 m² is shown (list and panel agree). The "What it offers" list is verbatim | `source.listSummary`, `source.capacityLine`, `facts.* = null` | same |
| 3 | **Sate Saus / Sambal Tomat room sizes possibly swapped** (Q4): Sate Saus list 15 m² vs panel 14m2; Sambal Tomat list 14 m² vs panel 15m2 | Area reads **"To be confirmed"** for both. The "Area …" line is left out of their displayed offers lists | `source.listSummary`, `source.offers` (full original list) | `/accommodation#sate-saus`, `#sambal-tomat` |
| 4 | **Yoga Teacher Training Course dates** (Q6): "6th December - 2nd January 2026" (the end is before the start, and the start year is unclear; it could even be the Dec 2025 run listed under Past) | Listed under the **"Dates to be confirmed"** tab. The Dates row reads "To be confirmed" and no time status is claimed. The Read More link is kept | `src/content/retreats.json` → `dates` (verbatim), `start/end = null` | `/retreats#programmes` |
| 5 | **Ended retreat shown as upcoming** (Q7): Truth Based Relationships Retreat, 28 Sept – 4 Oct 2026 | Placed automatically in **"Recently ended"** with an "Ended" badge. Not shown in the home preview | `start/end` ISO dates | `/retreats` |
| 6 | Regenerative Reset Retreat (4–18 Oct 2026) is in progress | Badge **"Happening now"**. From 19 Oct 2026 (Bali time) it moves to "Recently ended" by itself. The pages revalidate daily | — | `/`, `/retreats` |
| 7 | **EDE links disagree** (Q8): Read More → 2025 programme page; inline "Gaia Education" → 2026 page | Both links kept exactly as in the source | `cta.href`, `description[].href` | `/retreats#ecovillage-design-education-ede` |
| 8 | **"Request Brochure"** (Q9): no destination captured | Interim: the button opens an **email to alayaecolodge@gmail.com** with subject "Brochure request: Fun & Flow Family Retreat". No download or form is implied | `cta._note` in retreats.json | `/retreats#fun-and-flow-family-retreat` |
| 9 | **Booking.com slug** "dune-alaya-ecolodge" (Q11) | Kept exactly as in the source | `src/content/site.json` → `booking.href` | About Us, Accommodation panel, Home contact block |
| 10 | **Map place link** (Q17): not captured | Embed query = "Alaya Ecolodge" + verified address. On 2026-10-16 it resolved to Google's own "Alaya Ecolodge" pin on Jl. Gatotkaca (checked visually). Swap in the client's exact place link if they provide one | `site.json` → `map` | `/about-us#contact`, footer location link |

## 2. Missing photographs (Q5)

**Nasi Kuning, Pisang Goreng, Dadar Gulung, Bubur Injin** have no photos in the collected assets. All four stay in the selector and in the home index. In place of their own photos they show a general **Alaya grounds** photo (the original accommodation hero panorama), always captioned "Photographs of {name} are not yet available · showing the Alaya grounds" (home preview: "Alaya grounds · cottage photos to follow"). It is never presented as the cottage itself. To add real photos: put the files in `source-assets/`, add rows to the manifest, list the media-ids under the cottage in `accommodation.json`, and run `npm run images`.

## 3. Typos and wording preserved verbatim (Q1, Q2)

Nothing has been corrected. Visible means the text appears on the site.

| Original | Where | Visible? |
|---|---|---|
| Salamat Datang! (vs "Selamat") | Home heading | yes |
| Your Stay,the Natural Way | Accommodation heading | yes |
| Entier Cottage (×4) | Jamur Goreng, Tempe Manis, Dadar Gulung, Urap Chaya type | yes |
| A raditional style cottage | Dadar Gulung description | yes |
| over a 100 years old | Sate Saus description | yes |
| ideal for or couples, or family (×2) | Jamur Goreng, Jagung Perkadel | yes |
| 1 guests | Sambal Tomat list line | no (the stats use the panel value "1 guest") |
| 4 guests \| 2 bedroom | Tempe Orek panel | no (conflict, see #2) |
| Complementary | Amenities heading | yes |
| Accomodation | Retreat details label | yes |
| Yoga  Teacher  Training Course (double spaces) | TTC title | stored verbatim; browsers collapse the spaces |
| A carefully curated A carefully curated | Fun & Flow description | yes |
| Yoga Teacher Traning Course | Past tab + panel heading | yes |
| Siddha medecine | Massage Workshop | yes |
| On thier | Journey to Community | yes |
| award wining | Journey to Community | yes |
| View from the montain | Activities closing image alt text | yes (alt) |
| Snorking (file name) | Activities image file | no (derivatives use clean names) |

**Fixing them later:** edit the strings in `src/content/*.json`. No component changes are needed.

## 4. Presentation decisions that need client approval

| Item | Decision taken | Q |
|---|---|---|
| Active nav colour | Wix blue replaced by a peach-light underline and text on a deeper header green | Q14 |
| Header green | `#2E7A53` (a darker shade of `#44A774`). White text on the original green is 2.99:1, which fails WCAG even for large text. The original green stays on the logo tile and accents | Q14 |
| Fonts for Wix-only Madefor Text / Helvetica W01 | Open Sans (footer columns, team cards, footer subtitle) | Q15 |
| Page `<title>` capitalisation | Kept lower-case as in the source ("accommodation \| Alaya Ecolodge") | D7 |
| Open Graph images | 1200×630 crops of each page's own hero. None existed before | Q20 |
| Booking.com link placement | Also shown in the accommodation detail panel and the home contact block (same verified URL). **Not** added to the header | Q10 |
| `/blog`, `/home-1-3-1-2` | 308 (permanent) redirect to `/` | Q12 |
| `/contact` | Left as 404 (no redirect added) | Q19 |
| Analytics | None added | Q16 |
| Default cottage on load | Tahu Berontak (the first cottage with photos), rather than Nasi Kuning's empty gallery | D4 |

## 5. Rewritten alt text

- Tahu Berontak gallery: the original alt text names the cottage "Marigold" (its former name). "Marigold cottage" is replaced with "Tahu Berontak cottage". Everything else is unchanged.
- Images with no or meaningless alt text (e.g. "Accom 1.jpg") were given short factual descriptions. Original labels remain in `assets-manifest.csv`.
- Partner logos are labelled "Gaia Education logo", "Ecovillage Tours logo" and "Bala Yoga School logo".

## 6. Interface text added by the rebuild (not factual claims)

Wayfinding and status labels only. None of it states facts about the business:
"Pemuteran · Bali", "Scroll", "Continue to …", "Cottage 02 / 11", "Previous / Next", "Guests / Bedrooms / Bathrooms / Area", "To be confirmed", "Photographs of … are not yet available.", "11 cottages · select one to see its photographs and details", "Upcoming / Happening now / Ended / Dates to be confirmed / Recently ended", "Open in Google Maps", "Pause / Play background video", "Get in Touch" / "Contact Us" buttons (they link to the real contact section), and the 404 page wording.
The rotating ring on the home page repeats phrases from the source paragraph: "the turning point", "to come back to you", "putar", "to rotate or return".

**Inner-page hero leads:** the lead line under each inner page title is that page's original meta description, reproduced verbatim (`content/*.json → meta.description`). It is source copy, not new text.

## 7. Confirmed not used

- Draft-page (`/home-1-3-1-2`) copy, photos, videos, the "Contact to pay on arrival" form, and the **"Landon" placeholder testimonials**.
- Any prices, ratings, reviews, testimonials, FAQs, policies, legal pages, awards or availability.
- Structured data is limited to `LodgingBusiness` with verified name, address, phone, email, URL and Instagram. There is no rating, price or offer markup.
