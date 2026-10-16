/**
 * Retreat status from ISO dates. Only records with confirmed start/end dates
 * get a time status; anything else is "unconfirmed" (never guessed).
 * "Today" is evaluated in Bali time (WITA, UTC+8).
 */
export function todayInBali(now = new Date()) {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Makassar',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(now);
}

export function retreatStatus(p, today = todayInBali()) {
  if (!p.start || !p.end) return 'unconfirmed';
  if (today > p.end) return 'ended';
  if (today >= p.start) return 'current';
  return 'upcoming';
}

export const STATUS_LABEL = {
  upcoming: 'Upcoming',
  current: 'Happening now',
  ended: 'Ended',
  unconfirmed: 'Dates to be confirmed',
};

export function groupProgrammes(programmes, today = todayInBali()) {
  const withStatus = programmes.map((p) => ({ ...p, status: retreatStatus(p, today) }));
  return {
    open: withStatus
      .filter((p) => p.status === 'upcoming' || p.status === 'current')
      .sort((a, b) => a.start.localeCompare(b.start)),
    unconfirmed: withStatus.filter((p) => p.status === 'unconfirmed'),
    ended: withStatus
      .filter((p) => p.status === 'ended')
      .sort((a, b) => b.end.localeCompare(a.end)),
  };
}
