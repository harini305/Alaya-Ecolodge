import Link from 'next/link';
import site from '@/content/site.json';
import { media } from '@/lib/media';
import Img from '@/components/ui/Img';
import FooterVideo from './FooterVideo';
import styles from './Footer.module.css';

export default function Footer() {
  const tile = media(site.logos.tile);
  const poster = media(site.footerVideo.poster);

  return (
    <footer className={styles.footer}>
      <div className={styles.band}>
        <FooterVideo sources={{ mobile: site.footerVideo.mobile, desktop: site.footerVideo.desktop }} poster={poster} />
        <div className={styles.bandShade} aria-hidden="true" />

        <div className={`container ${styles.inner}`}>
          <div className={styles.bandText}>
            {/* logo-style script; source text is "PEMUTERAN", shown in title case for the script face */}
            <p className={styles.place} lang="id" aria-label={site.footerBand.title}>
              {site.footerBand.title.charAt(0) + site.footerBand.title.slice(1).toLowerCase()}
            </p>
            <p className={styles.bandSub}>
              {site.footerBand.subtitle}
            </p>
          </div>

          <div className={styles.panel}>
            <Link href="/" className={styles.tile} aria-label="Alaya Ecolodge — home">
              <Img m={tile} alt="" sizes="128px" fallbackWidth={320} />
            </Link>

            <nav className={styles.col} aria-labelledby="footer-menu">
              <h2 id="footer-menu" className={styles.colTitle}>
                Menu
              </h2>
              <ul role="list">
                {site.footerMenu.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={styles.link}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className={styles.col}>
              <h2 className={styles.colTitle}>Location</h2>
              <address className={styles.address}>
                <a href={site.map.link} target="_blank" rel="noopener noreferrer" className={styles.link}>
                  {site.locationLines.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                  <span className="visually-hidden"> (open in Google Maps, new tab)</span>
                </a>
              </address>
            </div>

            <div className={styles.col}>
              <h2 className={styles.colTitle}>Contact Us</h2>
              <ul role="list" className={styles.contactList}>
                <li>
                  <span className={styles.k}>Phone</span>{' '}
                  <a href={site.phone.href} className={styles.link}>
                    {site.phone.display}
                  </a>
                </li>
                <li>
                  <span className={styles.k}>Email</span>{' '}
                  <a href={site.email.href} className={styles.link}>
                    {site.email.display}
                  </a>
                </li>
                <li>
                  <span className={styles.k}>Instagram</span>{' '}
                  <a href={site.instagram.href} target="_blank" rel="noopener noreferrer" className={styles.link}>
                    {site.instagram.display}
                    <span className="visually-hidden"> (opens in a new tab)</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
