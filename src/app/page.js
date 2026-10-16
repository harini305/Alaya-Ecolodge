import home from '@/content/home.json';
import accommodation from '@/content/accommodation.json';
import retreats from '@/content/retreats.json';
import site from '@/content/site.json';
import { media } from '@/lib/media';
import { pageMetadata } from '@/lib/seo';
import { groupProgrammes } from '@/lib/retreats';
import HomeHero from '@/components/home/HomeHero';
import Welcome from '@/components/home/Welcome';
import Experience from '@/components/home/Experience';
import CottageIndex from '@/components/home/CottageIndex';
import RetreatPreview from '@/components/home/RetreatPreview';
import Pemuteran from '@/components/home/Pemuteran';
import SectionHeading from '@/components/ui/SectionHeading';
import styles from '@/components/home/Home.module.css';

// Retreat status depends on today's date: re-render at most daily.
export const revalidate = 86400;

export const metadata = pageMetadata({ ...home.meta, path: '/', og: 'home' });

// Only verified business facts (no ratings, prices or availability).
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LodgingBusiness',
  name: site.name,
  url: site.url,
  telephone: site.phone.display,
  email: site.email.display,
  image: `${site.url}/media/og/home.jpg`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.address.street,
    addressLocality: `${site.address.locality}, ${site.address.district}`,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  },
  sameAs: ['https://www.instagram.com/alaya.ecolodge'],
};

export default function HomePage() {
  const experienceImages = home.experience.rows.map((row) => row.images.map((img) => media(img.id)));

  const cottages = accommodation.cottages.map((c) => ({
    slug: c.slug,
    name: c.name,
    type: c.type,
    facts: c.facts,
    thumb: c.images[0] ? media(c.images[0].id) : null,
  }));

  const { open } = groupProgrammes(retreats.programmes);
  const nextRetreats = open.slice(0, 4).map((p) => ({
    slug: p.slug,
    title: p.title,
    dates: p.dates,
    groupSize: p.groupSize,
    start: p.start,
    end: p.end,
    status: p.status,
    cover: media(p.images[0].id),
  }));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HomeHero
        hero={home.hero}
        // Portrait original serves portrait screens only; cap at 1600w (the 2400w file is 2.4 MB).
        m={{ ...media(home.hero.image), widths: media(home.hero.image).widths.filter((w) => w <= 1600) }}
        wide={media(`${home.hero.image}#wide`)}
      />
      <Welcome welcome={home.welcome} />
      <Experience experience={home.experience} images={experienceImages} />

      <section className={`container ${styles.cottages}`} aria-labelledby="home-cottages-title">
        <div className={styles.cottagesHead}>
          <SectionHeading id="home-cottages-title" title={accommodation.cottagesHeading} script />
          <p className={styles.cottagesIntro} data-reveal>
            {accommodation.intro.paragraphs[3]}
          </p>
        </div>
        <CottageIndex cottages={cottages} />
      </section>

      <RetreatPreview heading={retreats.programmesHeading} labels={retreats.detailLabels} items={nextRetreats} />
      <Pemuteran pemuteran={home.pemuteran} m={media(accommodation.closing.image)} />
    </>
  );
}
