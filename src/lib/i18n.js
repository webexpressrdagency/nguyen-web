export const LOCALES = ['en', 'es'];
export const DEFAULT_LOCALE = 'en';

export const LOCALE_NAMES = { en: 'English', es: 'Español' };

/** Pick the right string out of a { en, es } object (or a plain string). */
export function t(value, locale = DEFAULT_LOCALE) {
  if (value === null || value === undefined) return '';
  if (typeof value === 'string' || typeof value === 'number') return String(value);
  if (typeof value === 'object') return value[locale] ?? value[DEFAULT_LOCALE] ?? '';
  return '';
}

export const ui = {
  en: {
    bookNow: 'Book Appointment',
    callUs: 'Call us',
    readMore: 'Read More',
    continueReading: 'Continue Reading',
    viewAll: 'View All',
    exploreMore: 'Explore More',
    allServices: 'All Services',
    ourServices: 'Our Services',
    relatedServices: 'Other Services',
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
    searchPlaceholder: 'Search…',
    postedOn: 'Posted on',
    by: 'by',
    minRead: 'min read',
    menu: 'Menu',
    close: 'Close',
    language: 'Language',
    emergencyNote: 'In acute pain? Call us and we will find room today.',
  },
  es: {
    bookNow: 'Agendar Cita',
    callUs: 'Llámenos',
    readMore: 'Leer Más',
    continueReading: 'Seguir Leyendo',
    viewAll: 'Ver Todo',
    exploreMore: 'Ver Más',
    allServices: 'Todos los Servicios',
    ourServices: 'Nuestros Servicios',
    relatedServices: 'Otros Servicios',
    latestPosts: 'Artículos Recientes',
    home: 'Inicio',
    openingHours: 'Horario de Atención',
    officeAddress: 'Dirección de la Oficina',
    getInTouch: 'Contáctenos',
    followUs: 'Síganos',
    quickLinks: 'Enlaces',
    name: 'Nombre completo',
    email: 'Correo electrónico',
    phone: 'Teléfono',
    service: 'Servicio de interés',
    date: 'Fecha preferida',
    time: 'Hora preferida',
    message: 'Mensaje',
    subject: 'Asunto',
    send: 'Enviar Mensaje',
    requestAppointment: 'Solicitar Cita',
    sending: 'Enviando…',
    thanks: 'Gracias. Hemos recibido su solicitud y le contactaremos en breve.',
    formError: 'Ocurrió un error. Por favor llámenos directamente.',
    required: 'Obligatorio',
    selectOne: 'Seleccione una opción',
    notFoundTitle: 'Página no encontrada',
    notFoundText: 'La página que busca no existe o fue movida.',
    backHome: 'Volver al inicio',
    searchPlaceholder: 'Buscar…',
    postedOn: 'Publicado el',
    by: 'por',
    minRead: 'min de lectura',
    menu: 'Menú',
    close: 'Cerrar',
    language: 'Idioma',
    emergencyNote: '¿Dolor agudo? Llámenos y le buscamos espacio hoy mismo.',
  },
};

export function getUi(locale) {
  return ui[locale] || ui[DEFAULT_LOCALE];
}

export function formatDate(iso, locale) {
  try {
    return new Date(iso).toLocaleDateString(locale === 'es' ? 'es-ES' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return iso;
  }
}

export function localePath(locale, href = '/') {
  const clean = href === '/' ? '' : href.startsWith('/') ? href : `/${href}`;
  return `/${locale}${clean}`;
}
