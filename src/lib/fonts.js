import localFont from 'next/font/local';
import { Maitree, Open_Sans, Cormorant_Garamond } from 'next/font/google';

// Original Charmonman file from source-assets/fonts (SIL OFL).
export const charmonman = localFont({
  src: '../fonts/Charmonman-Regular.woff2',
  weight: '400',
  display: 'swap',
  variable: '--font-script',
  fallback: ['Brush Script MT', 'cursive'],
});

export const maitree = Maitree({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-serif',
});

// Body + UI. Also stands in for the Wix-only Madefor Text / Helvetica W01.
export const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

export const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-display',
});

export const fontVariables = [charmonman, maitree, openSans, cormorant]
  .map((f) => f.variable)
  .join(' ');
