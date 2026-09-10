const STROKE = {
  phone:
    'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z',
  mail: 'M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z|M22 6l-10 7L2 6',
  pin: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z',
  clock: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z|M12 6v6l4 2',
  check: 'M22 11.08V12a10 10 0 1 1-5.93-9.14|M22 4 12 14.01l-3-3',
  shield: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z|M9 11.5l2 2 4-4',
  user: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2|M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
  people:
    'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2|M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z|M23 21v-2a4 4 0 0 0-3-3.87|M16 3.13a4 4 0 0 1 0 7.75',
  award: 'M12 15a7 7 0 1 0 0-14 7 7 0 0 0 0 14z|M8.2 13.9 7 23l5-3 5 3-1.2-9.1',
  smile: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z|M8 14s1.5 2 4 2 4-2 4-2|M9 9h.01|M15 9h.01',
  wallet: 'M2 6h20v12H2z|M2 10h20|M16 14h3',
  heart:
    'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l8.84 8.84 8.84-8.84a5.5 5.5 0 0 0 0-7.78z',
  leaf: 'M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z|M2 21c0-3 1.85-5.36 5.08-6',
  bolt: 'M13 2 3 14h9l-1 8 10-12h-9l1-8z',
  stethoscope: 'M4 3v7a6 6 0 0 0 12 0V3|M10 16v1a5 5 0 0 0 10 0v-2|M20 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
  spine: 'M12 2v20|M8 5h8|M7.4 9h9.2|M8 13h8|M8.6 17h6.8',
  acupuncture: 'M7 20a3 3 0 1 0 0-6 3 3 0 0 0 0 6z|M9.4 14.6 21 3|M17.5 3H21v3.5',
  hand:
    'M18 11V6a2 2 0 0 0-4 0v5|M14 10V4a2 2 0 0 0-4 0v6|M10 10.5V7a2 2 0 0 0-4 0v7a7 7 0 0 0 7 7h1a7 7 0 0 0 7-7v-3a2 2 0 0 0-4 0',
  calendar: 'M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z|M16 2v4|M8 2v4|M3 10h18',
  arrowRight: 'M4 12h16|M14 6l6 6-6 6',
  arrowLeft: 'M20 12H4|M10 18l-6-6 6-6',
  arrowUp: 'M12 20V4|M6 10l6-6 6 6',
  chevronRight: 'M9 4l8 8-8 8',
  chevronLeft: 'M15 4l-8 8 8 8',
  chevronDown: 'M4 8l8 8 8-8',
  plus: 'M12 5v14|M5 12h14',
  minus: 'M5 12h14',
  instagram: 'M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5z|M16 11.4A4 4 0 1 1 12.6 8 4 4 0 0 1 16 11.4z|M17.5 6.5h.01',
  twitter: 'M4 4l7.5 9.5L4.5 20h2.2l5.7-5.3L16.8 20H20l-7.7-9.8L19.3 4h-2.2l-5.3 5-3.8-5H4z',
  linkedin: 'M6 9v11|M6 5.5h.01|M11 20v-6a3 3 0 0 1 6 0v6|M11 9v11',
  whatsapp:
    'M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2z|M8.5 8.5c0 4 3 7 7 7 1.5 0 1.5-2 1.5-2l-2-1-1 1c-1.5-.6-2.9-2-3.5-3.5l1-1-1-2s-2 0-2 1.5z',
};

const FILL = {
  star: 'M12 2l3 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.9 21l1.2-6.8-5-4.9 6.9-1L12 2z',
  quote:
    'M7.5 5C4.9 5 3 7 3 9.5S4.9 14 7.4 14c0 2.6-1.3 4.4-3.7 5.7 4.9-.9 8.8-4.9 8.8-10.2C12.5 6.9 10.4 5 7.5 5zm11 0C15.9 5 14 7 14 9.5s1.9 4.5 4.4 4.5c0 2.6-1.3 4.4-3.7 5.7 4.9-.9 8.8-4.9 8.8-10.2C23.5 6.9 21.4 5 18.5 5z',
  facebook:
    'M17.5 2H15a5 5 0 0 0-5 5v3H7.5v4H10v8h4v-8h2.8l.7-4H14V7.5c0-.8.5-1.5 1.3-1.5h2.2V2z',
  youtube:
    'M22.5 6.4a2.8 2.8 0 0 0-2-2C18.9 4 12 4 12 4s-6.9 0-8.6.4a2.8 2.8 0 0 0-1.9 2A29 29 0 0 0 1 11.8c0 1.8.2 3.6.5 5.3a2.8 2.8 0 0 0 2 2c1.7.4 8.5.4 8.5.4s6.9 0 8.6-.4a2.8 2.8 0 0 0 1.9-2c.3-1.7.5-3.5.5-5.3s-.2-3.6-.5-5.4zM9.8 15V8.5l5.7 3.3-5.7 3.2z',
};

export default function Icon({ name, size = 24, className = '', style }) {
  const key = name || 'check';
  const stroke = STROKE[key];
  const fill = FILL[key];
  if (!stroke && !fill) return null;

  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    className,
    style,
    'aria-hidden': 'true',
    focusable: 'false',
  };

  if (fill) {
    return (
      <svg {...common} fill="currentColor">
        {fill.split('|').map((d, i) => (
          <path key={i} d={d} />
        ))}
      </svg>
    );
  }

  return (
    <svg
      {...common}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {stroke.split('|').map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}

export const SOCIAL_ICONS = ['facebook', 'instagram', 'youtube', 'twitter', 'linkedin', 'whatsapp'];
export const ICON_NAMES = [...Object.keys(STROKE), ...Object.keys(FILL)];
