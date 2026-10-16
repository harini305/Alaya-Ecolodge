import './globals.css';
import { fontVariables } from '@/lib/fonts';
import site from '@/content/site.json';
import { media } from '@/lib/media';
import SiteHeader from '@/components/layout/SiteHeader';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/layout/ScrollToTop';
import SmoothScroll from '@/components/layout/SmoothScroll';

export const metadata = {
  metadataBase: new URL(site.url),
  title: { default: 'Alaya Ecolodge - Pemuteran, Bali', template: '%s' },
  applicationName: site.name,
  formatDetection: { telephone: false },
};

export const viewport = {
  themeColor: '#2e7a53',
  width: 'device-width',
  initialScale: 1,
};

// Sets html.motion before first paint, only for visitors who have not asked
// for reduced motion. All "hidden until revealed" CSS is scoped to it.
const motionScript =
  "try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('motion')}catch(e){}";

export default function RootLayout({ children }) {
  const logo = media(site.logos.white);
  return (
    <html lang="en" className={fontVariables} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionScript }} />
      </head>
      <body>
        <SmoothScroll />
        <ScrollToTop />
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <SiteHeader
          nav={site.nav}
          logo={logo}
          contact={{ phone: site.phone, email: site.email, instagram: site.instagram }}
        />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
