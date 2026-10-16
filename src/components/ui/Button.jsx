import Link from 'next/link';
import styles from './Button.module.css';

export function Arrow({ dir = 'right', className }) {
  const rotate = { right: 0, down: 90, up: -90, left: 180, external: -45 }[dir] ?? 0;
  return (
    <svg
      className={className ?? styles.icon}
      viewBox="0 0 20 20"
      aria-hidden="true"
      focusable="false"
      style={{ rotate: `${rotate}deg` }}
    >
      <path
        d="M3 10h13M11 4.5 16.5 10 11 15.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Pill link. Variants: solid (emerald), outline, light / ghostLight (on dark), text.
 * External http(s) links open in a new tab and announce it.
 */
export default function Button({ href, children, variant = 'solid', icon = 'right', className = '', ...rest }) {
  const isExternal = /^(https?:|mailto:|tel:)/.test(href);
  const newTab = /^https?:/.test(href);
  const cls = `${styles.btn} ${styles[variant]} ${className}`;
  const content = (
    <>
      <span className={styles.label}>{children}</span>
      {icon && <Arrow dir={newTab ? 'external' : icon} />}
      {newTab && <span className="visually-hidden"> (opens in a new tab)</span>}
    </>
  );
  if (isExternal) {
    return (
      <a href={href} className={cls} {...(newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...rest}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {content}
    </Link>
  );
}
