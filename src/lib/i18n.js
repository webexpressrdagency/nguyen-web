/**
 * Single-language site (English).
 *
 * The helpers keep their old signatures on purpose: they tolerate a trailing
 * `locale` argument and legacy `{ en, es }` values that may still live in
 * saved content, so nothing breaks if older data comes back from storage.
 */

export const LOCALES = ['en'];
export const DEFAULT_LOCALE = 'en';
export const LOCALE_NAMES = { en: 'English' };

/** Read a content value. Accepts plain strings and legacy { en, es } objects. */
export function t(value) {
  if (value === null || value === undefined) return '';
  if (typeof value === 'string' || typeof value === 'number') return String(value);
  if (Array.isArray(value)) return value.map((v) => t(v)).join(' ');
  if (typeof value === 'object') {
    if (typeof value.en === 'string') return value.en;
    const first = Object.values(value).find((v) => typeof v === 'string');
    return first || '';
  }
  return '';
}

export const ui = {
  bookNow: 'Book Appointment',
  callUs: 'Call us',
  readMore: 'Read More',
  continueReading: 'Continue Reading',
  viewAll: 'View All',
  exploreMore: 'Explore More',
  allServices: 'All Services',
  ourServices: 'Our Services',
  relatedServices: 'Other Services',
  ourProducts: 'Products',
  relatedProducts: 'Other Products',
  viewProduct: 'View Details',
  askAbout: 'Ask About This Product',
  inClinicPrice: 'In-clinic price',
  latestPosts: 'Recent Articles',
  home: 'Home',
  openingHours: 'Opening Hours',
  officeAddress: 'Office Address',
  getInTouch: 'Get in Touch',
  followUs: 'Follow us',
  quickLinks: 'Quick Links',
  name: 'Full name',
  email: 'Email address',
  phone: 'Phone number',
  service: 'Service of interest',
  date: 'Preferred date',
  time: 'Preferred time',
  message: 'Message',
  subject: 'Subject',
  send: 'Send Message',
  requestAppointment: 'Request Appointment',
  sending: 'Sending…',
  thanks: 'Thank you. We have received your request and will contact you shortly.',
  formError: 'Something went wrong. Please call us instead.',
  required: 'Required',
  selectOne: 'Select an option',
  notFoundTitle: 'Page not found',
  notFoundText: 'The page you are looking for does not exist or has moved.',
  backHome: 'Back to home',
  postedOn: 'Posted on',
  by: 'by',
  menu: 'Menu',
  close: 'Close',
  emergencyNote: 'In acute pain? Call us and we will find room today.',
};

export function getUi() {
  return ui;
}

export function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return iso;
  }
}

/**
 * Build a site path. Older call sites pass (locale, href); newer ones pass
 * just (href). Both work, and neither adds a language prefix any more.
 */
export function localePath(a = '/', b) {
  let href = b === undefined ? a : b;
  if (href === 'en' || href === 'es') href = '/';
  if (!href || href === '/') return '/';
  return href.startsWith('/') ? href : `/${href}`;
}
