# Issues, Gaps & Unresolved Questions

Rule for phase 2: **do not silently "fix" original content.** Bring each item below to the client. Until they answer, reproduce the original wording as-is, or hold it back if it is factually wrong (e.g. past events).

## A. Questions for the client (decisions needed)

| # | Question | Why it matters |
|---|---|---|
| Q1 | May we correct obvious typos (list in section C), or must copy stay verbatim? | Content preservation rule |
| Q2 | Is "Salamat Datang!" intentional? (Standard Indonesian is "Selamat Datang".) | Headline on the homepage |
| Q3 | Cottage "Tempe Manis" or "Tempe Orek"? Is it 6 guests / 3 bedrooms or 4 guests / 2 bedrooms? | Conflicting facts |
| Q4 | Sate Saus and Sambal Tomat: which is 14 m² and which is 15 m²? | Conflicting facts |
| Q5 | Photos for Nasi Kuning, Pisang Goreng, Dadar Gulung, Bubur Injin? | They currently have none |
| Q6 | Yoga TTC end date "2nd January 2026": should it be 2027? | Impossible date range |
| Q7 | Remove ended retreats automatically (by date), or keep them until moved to "Past"? | Truth Based Relationships Retreat already ended |
| Q8 | EDE "Read More" links to the **2025** Gaia page. Update it to the 2026 page? | Outdated link |
| Q9 | What should "Request Brochure" do (email, PDF, form)? | Behaviour unknown |
| Q10 | Should the rebuild add a booking CTA in the header? (The live site has none; Booking.com is linked only on About Us.) | Conversion. This is a new feature, so it needs approval |
| Q11 | Is the Booking.com listing slug "dune-alaya-ecolodge" correct and current? | Booking link correctness |
| Q12 | Keep `/blog`? It has 0 posts. Redirect `/home-1-3-1-2`? | Routing / SEO |
| Q13 | May unpublished draft-page copy (Conscious Comfort, Cultural Connection, Pemuteran text, "Visit us & Join the Alaya family") or draft photos and videos be reused? | Not live content |
| Q14 | Active nav state is Wix default blue `#1A6AFF`. OK to restyle it in brand colours? | Brand consistency |
| Q15 | Substitutes for the Wix-only fonts (Madefor Text, Helvetica W01 Light) used in the footer and team cards? Proposal: Open Sans | Licensing |
| Q16 | Analytics or tracking requirements (GA4, Meta Pixel, etc.)? | Unknown current setup |
| Q17 | Exact Google Maps place link for the About Us map? | Map embed |
| Q18 | Is there a transparent or vector logo, or a dark variant? | Only a white PNG and a green-square SVG exist |
| Q19 | Should "About Us" also be reachable as "Contact" (e.g. a `/contact` redirect)? `/contact` is a 404 today | Discoverability |
| Q20 | Does the client want an Open Graph share image? (None is set.) Proposal: the logo tile or the home hero | SEO / social |

## B. Factual conflicts & outdated content (verified)

1. "Tempe Manis" (list) vs "Tempe Orek" (panel heading); capacity 6 guests / 3 bedrooms vs 4 guests / 2 bedroom.
2. Sate Saus 15 m² (list) vs 14m2 (panel); Sambal Tomat 14 m² vs 15m2.
3. Truth Based Relationships Retreat (28 Sept–4 Oct 2026) is shown as "Upcoming" after it ended. Audit date: 2026-10-16.
4. TTC "6th December - 2nd January 2026": the end date is before the start date.
5. EDE: the inline link goes to 2026, but Read More goes to the 2025 programme.
6. Tahu Berontak image alt text describes "Marigold cottage" (old name).
7. `/blog` page H1 reads "Contact to pay on arrival" (template leftover).

## C. Typos / grammar in the original (preserve unless Q1 approves fixes)
| Original | Location | Likely intended |
|---|---|---|
| Salamat Datang! | Home | Selamat Datang! (confirm) |
| Your Stay,the Natural Way | Accommodation H2 | Your Stay, the Natural Way |
| Entier Cottage (×4) | Accommodation panels | Entire Cottage |
| A raditional style cottage | Dadar Gulung | A traditional style cottage |
| over a 100 years old | Sate Saus | over 100 years old |
| ideal for or couples, or family (×2) | Jagung Perkadel, Jamur Goreng | ideal for couples or families |
| 1 guests | Sambal Tomat list | 1 guest |
| 4 guests \| 2 bedroom | Tempe Orek | 2 bedrooms |
| Complementary | Amenities heading | Complimentary |
| Accomodation | Retreat Details label | Accommodation |
| Yoga  Teacher  Training Course (double spaces) | Retreats title | single spaces |
| A carefully curated A carefully curated | Fun & Flow | remove duplicate |
| Yoga Teacher Traning Course | Past tab | Training |
| Siddha medecine | Massage Workshop | medicine |
| On thier | Journey to Community | their |
| award wining | Journey to Community | award-winning |
| View from the montain (alt) | Activities image | mountain |
| Snorking (file name) | Activities image | Snorkeling |

## D. Layout / UX issues observed on the original (do not replicate)
1. **Home, Experience Alaya (desktop 1440px):** the three image rows overlap their H3 titles and descriptions in the automated capture. This may be a scroll-animation state or a real layout bug.
2. **Active nav colour** is Wix default blue on a green bar, which is low-harmony and off-brand.
3. **No H1** on Home (all headings H2). Several pages use H6 or H3 for body-like text. Heading hierarchy needs to be rebuilt properly.
4. Accommodation detail panel: the default cottage (Nasi Kuning) shows an **empty gallery**.
5. Cottage list order differs between desktop and mobile. Retreats card order also differs on mobile (TTC first; Hold before Join).
6. Booking CTA is buried at the bottom of About Us.
7. Lower-case page titles ("accommodation | Alaya Ecolodge").
8. 28 images over 8 MB are served through Wix's optimiser today. After migration they must be pre-optimised.

## E. Audit limitations (what could not be verified)
| Limitation | Reason | Impact |
|---|---|---|
| Raw HTML/CSS could not be downloaded locally | Cloudflare challenge blocks non-browser clients; the Apify general browser scrapers need account permission approval | Theme `--color_N` variables and full computed styles come from third-party CSS parsers and pixel sampling, not a full stylesheet dump |
| Hover / focus / pressed states of buttons and links | Static captures only | Interaction states are UNCONFIRMED. Design new ones within the palette |
| Mobile menu open state | Not captured | Design anew |
| Tablet layout (768–1024px) | Not captured | Design anew |
| Scroll / entrance animations | Static captures | Original motion is unknown (GSAP will replace it anyway) |
| Third-party scripts / analytics | Script inventory unavailable | Ask the client (Q16) |
| `/search` route | Fetch tool session expired before the probe | Low impact (no search UI) |
| "Request Brochure" target | No href in rendered text | Ask the client (Q9) |
| Exact map coordinates | Map seen only visually | Ask the client (Q17) |
| Gallery slider / lightbox behaviour on Accommodation | Not exercised | Design anew |
| Sizes in the type scale | Wix fluid scaling; measured visually | Treat as estimates |
