'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './Footer.module.css';

/**
 * Aerial background video for the footer band.
 * - Poster image renders first (and is the permanent fallback).
 * - No video bytes are requested until the band is near the viewport.
 * - Exactly one rendition is chosen: 480p under 768px wide or on
 *   Save-Data, 720p otherwise. 1080p/360p are never shipped.
 * - Skipped entirely when the visitor prefers reduced motion.
 * - Muted, inline, looped, no audio dependency; pauses when off-screen.
 */
export default function FooterVideo({ sources, poster }) {
  const videoRef = useRef(null);
  const wrapRef = useRef(null);
  const [state, setState] = useState('idle'); // idle | playing | off

  useEffect(() => {
    const video = videoRef.current;
    const wrap = wrapRef.current;
    if (!video || !wrap) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const saveData = navigator.connection?.saveData;
    if (reduce) return; // stays 'idle': poster only, no video bytes requested

    let loaded = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!loaded) {
            loaded = true;
            video.src = window.innerWidth < 768 || saveData ? sources.mobile : sources.desktop;
            video.load();
          }
          video.play().catch(() => setState('off'));
        } else if (loaded) {
          video.pause();
        }
      },
      { rootMargin: '300px 0px' }
    );
    io.observe(wrap);

    const onPlaying = () => setState('playing');
    const onError = () => setState('off');
    video.addEventListener('playing', onPlaying);
    video.addEventListener('error', onError);
    return () => {
      io.disconnect();
      video.removeEventListener('playing', onPlaying);
      video.removeEventListener('error', onError);
    };
  }, [sources]);

  return (
    <div ref={wrapRef} className={styles.media}>
      <img
        className={styles.poster}
        src={`${poster.src}-1600.webp`}
        srcSet={poster.widths.map((w) => `${poster.src}-${w}.webp ${w}w`).join(', ')}
        sizes="100vw"
        width={poster.w}
        height={poster.h}
        alt=""
        loading="lazy"
        decoding="async"
      />
      <video
        ref={videoRef}
        className={`${styles.video} ${state === 'playing' ? styles.videoOn : ''}`}
        muted
        playsInline
        loop
        preload="none"
        aria-hidden="true"
        tabIndex={-1}
        disablePictureInPicture
      />
    </div>
  );
}
