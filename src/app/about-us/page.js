import content from '@/content/about.json';
import site from '@/content/site.json';
import { media } from '@/lib/media';
import { pageMetadata } from '@/lib/seo';
import PageHero from '@/components/sections/PageHero';
import SectionHeading from '@/components/ui/SectionHeading';
import Img from '@/components/ui/Img';
import { Arrow } from '@/components/ui/Button';
import styles from './page.module.css';

export const metadata = pageMetadata({ ...content.meta, path: '/about-us', og: 'about-us' });

const NEW_TAB = { target: '_blank', rel: 'noopener noreferrer' };

export default function AboutPage() {
  const rows = [
    { label: 'Location', value: site.addressAboutPage, href: site.map.link, external: true },
    { label: 'Phone', value: site.phone.display, href: site.phone.href },
    { label: 'Email', value: site.email.display, href: site.email.href },
    { label: 'Instagram', value: site.instagram.handle, href: site.instagram.href, external: true },
    { label: 'Booking', value: site.booking.label, href: site.booking.href, external: true, primary: true },
  ];

  return (
    <>
      <PageHero title="About Us" lead={content.meta.description} m={media(content.hero.image)} alt={content.hero.alt} focal={content.hero.focal} />

      <section className={`container ${styles.welcome}`} aria-label="Welcome">
        {content.welcome.map((p, i) => (
          <p key={i} data-reveal className={i === 0 ? styles.welcomeLead : styles.welcomeText}>
            {p}
          </p>
        ))}
      </section>

      <section className={`container ${styles.team}`} aria-labelledby="team-title">
        <SectionHeading id="team-title" title={content.teamHeading} script />
        <ul role="list" className={styles.teamGrid}>
          {content.team.map((member) => (
            <li key={member.name} className={styles.member} data-reveal>
              <div className={styles.portrait}>
                <Img m={media(member.image)} alt={`${member.name}, ${member.role.join(' ')}`} sizes="(min-width: 900px) 200px, 40vw" fallbackWidth={320} />
              </div>
              <h3 className={styles.memberName}>{member.name}</h3>
              <p className={styles.memberRole}>
                {member.role.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className={`container ${styles.photos}`} aria-label="Life at Alaya">
        {content.photos.map((ph, i) => (
          <figure key={ph.id} className={`${styles.photo} ${styles[`ph${i}`]}`}>
            <div className={styles.photoFrame} data-reveal-image>
              <Img m={media(ph.id)} alt={ph.alt} sizes="(min-width: 900px) 33vw, 100vw" />
            </div>
          </figure>
        ))}
      </section>

      <section id="contact" className={`container ${styles.contact}`} aria-labelledby="contact-title">
        <SectionHeading id="contact-title" title={content.contactHeading} script className={styles.contactHead} />
        <div className={styles.contactCol}>
          <ul role="list" className={styles.rows}>
            {rows.map((r) => (
              <li key={r.label} data-reveal>
                <a href={r.href} className={`${styles.row} ${r.primary ? styles.rowPrimary : ''}`} {...(r.external ? NEW_TAB : {})}>
                  <span className={styles.rowLabel}>{r.label}</span>
                  <span className={styles.rowValue}>{r.value}</span>
                  <Arrow dir={r.external ? 'external' : 'right'} className={styles.rowIcon} />
                  {r.external && <span className="visually-hidden"> (opens in a new tab)</span>}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.mapCol} data-reveal>
          <div className={styles.map}>
            <iframe
              title="Map showing the location of Alaya Ecolodge in Pemuteran, Bali"
              src={site.map.embed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
          <a href={site.map.link} className={styles.mapLink} {...NEW_TAB}>
            Open in Google Maps
            <Arrow dir="external" className={styles.rowIcon} />
            <span className="visually-hidden"> (opens in a new tab)</span>
          </a>
        </div>
      </section>

    </>
  );
}
