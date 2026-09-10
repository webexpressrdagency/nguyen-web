/* Field schemas that drive every admin form. Plain data, no JSX. */

const i18n = (key, label, extra = {}) => ({ key, label, type: 'i18n', ...extra });
const i18nArea = (key, label, rows = 4, extra = {}) => ({ key, label, type: 'i18nArea', rows, ...extra });
const text = (key, label, extra = {}) => ({ key, label, type: 'text', ...extra });
const image = (key, label, extra = {}) => ({ key, label, type: 'image', ...extra });
const num = (key, label, extra = {}) => ({ key, label, type: 'number', ...extra });

export const SECTION_LABELS = {
  hero: 'Portada principal (hero)',
  welcome: 'Bienvenida / Sobre la clínica',
  services: 'Servicios destacados',
  doctor: 'Perfil del doctor',
  team: 'Equipo de terapeutas',
  counters: 'Contadores de estadísticas',
  conditions: 'Zonas de dolor (acordeón)',
  commitment: 'Compromiso con barras de progreso',
  testimonials: 'Testimonios',
  blog: 'Últimos artículos',
  map: 'Mapa y dirección',
};

export const SECTION_SCHEMAS = {
  hero: [
    i18n('sideText', 'Texto lateral vertical'),
    i18n('title', 'Título principal'),
    i18nArea('subtitle', 'Subtítulo', 3),
    i18n('ctaLabel', 'Texto del botón'),
    text('ctaHref', 'Enlace del botón', { hint: 'Ej: /appointment' }),
    image('image', 'Imagen de fondo', { hint: 'Recomendado 1920×1080 px' }),
  ],
  welcome: [
    i18n('eyebrow', 'Antetítulo'),
    i18n('title', 'Título'),
    i18nArea('lead', 'Frase destacada', 3),
    i18nArea('body', 'Texto', 6),
    image('image', 'Imagen principal'),
    image('imageSmall', 'Imagen secundaria'),
    {
      key: 'features',
      label: 'Ventajas',
      type: 'list',
      addLabel: 'Añadir ventaja',
      titleKey: 'label',
      blank: { icon: 'check', label: { en: '', es: '' } },
      fields: [{ key: 'icon', label: 'Icono', type: 'icon' }, i18n('label', 'Texto')],
    },
    i18n('callLabel', 'Texto sobre el teléfono'),
    image('doctorImage', 'Foto redonda del recuadro'),
  ],
  services: [
    i18n('eyebrow', 'Antetítulo'),
    i18n('title', 'Título'),
    i18nArea('text', 'Texto', 3),
    num('limit', 'Cantidad de servicios a mostrar', { min: 1, max: 12 }),
  ],
  doctor: [
    i18n('eyebrow', 'Antetítulo'),
    i18n('name', 'Nombre'),
    i18n('role', 'Especialidad'),
    i18nArea('body', 'Biografía', 6),
    image('image', 'Foto'),
    i18n('ctaLabel', 'Texto del botón'),
    text('ctaHref', 'Enlace del botón'),
  ],
  team: [
    i18n('eyebrow', 'Antetítulo'),
    i18n('title', 'Título'),
    i18nArea('text', 'Texto', 3),
    i18n('linkLabel', 'Texto del enlace'),
    text('linkHref', 'Enlace'),
  ],
  counters: [
    {
      key: 'items',
      label: 'Contadores',
      type: 'list',
      addLabel: 'Añadir contador',
      titleKey: 'label',
      blank: { icon: 'award', value: 0, suffix: '+', label: { en: '', es: '' } },
      fields: [
        { key: 'icon', label: 'Icono', type: 'icon' },
        num('value', 'Número'),
        text('suffix', 'Sufijo', { hint: 'Ej: + o %' }),
        i18n('label', 'Etiqueta'),
      ],
    },
  ],
  conditions: [
    i18n('eyebrow', 'Antetítulo'),
    i18n('title', 'Título'),
    i18nArea('text', 'Texto', 3),
    {
      key: 'items',
      label: 'Zonas / condiciones',
      type: 'list',
      addLabel: 'Añadir zona',
      titleKey: 'title',
      blank: { title: { en: '', es: '' }, body: { en: '', es: '' }, image: '' },
      fields: [i18n('title', 'Título'), i18nArea('body', 'Descripción', 5), image('image', 'Imagen')],
    },
  ],
  commitment: [
    i18n('eyebrow', 'Antetítulo'),
    i18n('title', 'Título'),
    i18nArea('body', 'Texto', 5),
    {
      key: 'bars',
      label: 'Barras de progreso',
      type: 'list',
      addLabel: 'Añadir barra',
      titleKey: 'label',
      blank: { label: { en: '', es: '' }, value: 80 },
      fields: [i18n('label', 'Etiqueta'), num('value', 'Porcentaje', { min: 0, max: 100 })],
    },
    image('image', 'Imagen'),
    num('badgeValue', 'Número del distintivo'),
    text('badgeSuffix', 'Sufijo del distintivo'),
    i18n('badgeLabel', 'Etiqueta del distintivo'),
    i18n('ctaLabel', 'Texto del enlace'),
    text('ctaHref', 'Enlace'),
  ],
  testimonials: [i18n('eyebrow', 'Antetítulo'), i18n('title', 'Título'), i18nArea('text', 'Texto', 3)],
  blog: [
    i18n('eyebrow', 'Antetítulo'),
    i18n('title', 'Título'),
    i18nArea('text', 'Texto', 3),
    i18n('ctaLabel', 'Texto del enlace'),
  ],
  map: [i18n('title', 'Título de la tarjeta')],
};

/* ------------------------------------------------------------------ */
export const COLLECTIONS = {
  services: {
    label: 'Servicios',
    titleKey: 'title',
    blank: {
      slug: 'nuevo-servicio',
      icon: 'spine',
      image: '',
      title: { en: 'New service', es: 'Nuevo servicio' },
      excerpt: { en: '', es: '' },
      body: { en: '', es: '' },
    },
    fields: [
      i18n('title', 'Nombre del servicio'),
      text('slug', 'URL (slug)', { hint: 'Solo minúsculas y guiones. Ej: acupuntura' }),
      { key: 'icon', label: 'Icono', type: 'icon' },
      image('image', 'Imagen'),
      i18nArea('excerpt', 'Resumen corto', 3),
      i18nArea('body', 'Descripción completa', 10, { hint: 'Deje una línea en blanco entre párrafos.' }),
    ],
  },
  team: {
    label: 'Equipo',
    titleKey: 'name',
    blank: {
      name: 'Nuevo miembro',
      role: { en: '', es: '' },
      bio: { en: '', es: '' },
      image: '',
      social: [],
    },
    fields: [
      text('name', 'Nombre'),
      i18n('role', 'Cargo / especialidad'),
      i18nArea('bio', 'Biografía corta', 3),
      image('image', 'Foto', { hint: 'Recomendado 600×700 px' }),
      {
        key: 'social',
        label: 'Redes sociales',
        type: 'list',
        addLabel: 'Añadir red',
        titleKey: 'network',
        blank: { network: 'facebook', url: '' },
        fields: [{ key: 'network', label: 'Red', type: 'social' }, text('url', 'Enlace')],
      },
    ],
  },
  testimonials: {
    label: 'Testimonios',
    titleKey: 'name',
    blank: { name: 'Nuevo paciente', role: { en: '', es: '' }, rating: 5, image: '', text: { en: '', es: '' } },
    fields: [
      text('name', 'Nombre del paciente'),
      i18n('role', 'Detalle', { hint: 'Ej: Paciente · Dolor lumbar' }),
      num('rating', 'Estrellas', { min: 1, max: 5 }),
      image('image', 'Foto'),
      i18nArea('text', 'Testimonio', 5),
    ],
  },
  posts: {
    label: 'Blog',
    titleKey: 'title',
    blank: {
      slug: 'nuevo-articulo',
      date: new Date().toISOString().slice(0, 10),
      author: '',
      image: '',
      title: { en: 'New article', es: 'Nuevo artículo' },
      excerpt: { en: '', es: '' },
      body: { en: '', es: '' },
    },
    fields: [
      i18n('title', 'Título'),
      text('slug', 'URL (slug)'),
      { key: 'date', label: 'Fecha', type: 'date' },
      text('author', 'Autor'),
      image('image', 'Imagen destacada'),
      i18nArea('excerpt', 'Resumen', 3),
      i18nArea('body', 'Contenido', 14, { hint: 'Deje una línea en blanco entre párrafos.' }),
    ],
  },
  faqs: {
    label: 'Preguntas frecuentes',
    titleKey: 'q',
    blank: { q: { en: '', es: '' }, a: { en: '', es: '' } },
    fields: [i18n('q', 'Pregunta'), i18nArea('a', 'Respuesta', 4)],
  },
  gallery: {
    label: 'Galería',
    titleKey: 'caption',
    blank: { image: '', caption: { en: '', es: '' } },
    fields: [image('image', 'Imagen'), i18n('caption', 'Título de la foto')],
  },
};

/* ------------------------------------------------------------------ */
export const PAGE_LABELS = {
  about: 'Nosotros',
  services: 'Servicios (listado)',
  therapists: 'Terapeutas',
  gallery: 'Galería',
  blog: 'Blog (listado)',
  faqs: 'Preguntas frecuentes',
  testimonials: 'Testimonios',
  appointment: 'Solicitar cita',
  contact: 'Contacto',
};

export const HERO_SCHEMA = [i18n('title', 'Título de la cabecera'), i18n('subtitle', 'Subtítulo')];

export const PAGE_EXTRA_SCHEMAS = {
  about: {
    story: [
      i18n('eyebrow', 'Antetítulo'),
      i18n('title', 'Título'),
      i18nArea('body', 'Texto', 10, { hint: 'Deje una línea en blanco entre párrafos.' }),
      image('image', 'Imagen'),
    ],
    values: [
      {
        key: '__self',
        label: 'Valores / diferenciadores',
        type: 'list',
        addLabel: 'Añadir valor',
        titleKey: 'title',
        blank: { icon: 'heart', title: { en: '', es: '' }, body: { en: '', es: '' } },
        fields: [
          { key: 'icon', label: 'Icono', type: 'icon' },
          i18n('title', 'Título'),
          i18nArea('body', 'Descripción', 3),
        ],
      },
    ],
  },
  appointment: { intro: [{ key: '__self', label: 'Texto introductorio', type: 'i18nArea', rows: 4 }] },
  contact: { intro: [{ key: '__self', label: 'Texto introductorio', type: 'i18nArea', rows: 4 }] },
};

/* ------------------------------------------------------------------ */
export const SETTINGS_SCHEMA = {
  brand: [
    text('siteName', 'Nombre completo del negocio'),
    text('shortName', 'Nombre corto (cabecera)'),
    image('logo', 'Logo', { hint: 'PNG con fondo transparente, 512×512 px' }),
    i18n('tagline', 'Lema / eslogan'),
  ],
  colors: [
    { key: 'primary', label: 'Color primario (azul del logo)', type: 'color' },
    { key: 'secondary', label: 'Color secundario (verde del logo)', type: 'color' },
    { key: 'dark', label: 'Color oscuro (secciones y footer)', type: 'color' },
    { key: 'body', label: 'Color del texto', type: 'color' },
  ],
  contact: [
    text('phone', 'Teléfono visible'),
    text('phoneLink', 'Teléfono para marcar', { hint: 'Formato internacional: +18095551234' }),
    text('email', 'Correo electrónico'),
    text('address', 'Dirección'),
    text('mapEmbed', 'URL del mapa (embed)', {
      hint: 'En Google Maps: Compartir → Insertar un mapa → copie solo el enlace del src.',
    }),
  ],
  seo: [
    i18n('title', 'Título SEO'),
    i18nArea('description', 'Descripción SEO', 3, { hint: 'Máximo recomendado 160 caracteres.' }),
  ],
  hours: [
    {
      key: '__self',
      label: 'Horario de atención',
      type: 'list',
      addLabel: 'Añadir fila',
      titleKey: 'time',
      blank: { days: { en: '', es: '' }, time: { en: '', es: '' } },
      fields: [i18n('days', 'Días'), i18n('time', 'Horas')],
    },
  ],
  social: [
    {
      key: '__self',
      label: 'Redes sociales',
      type: 'list',
      addLabel: 'Añadir red',
      titleKey: 'network',
      blank: { network: 'facebook', url: '' },
      fields: [{ key: 'network', label: 'Red', type: 'social' }, text('url', 'Enlace')],
    },
  ],
};

export const NAV_SCHEMA = [
  {
    key: '__self',
    label: 'Menú principal',
    type: 'list',
    addLabel: 'Añadir enlace',
    titleKey: 'label',
    blank: { label: { en: '', es: '' }, href: '/' },
    fields: [i18n('label', 'Texto'), text('href', 'Ruta', { hint: 'Ej: /services' })],
  },
];

export const FOOTER_SCHEMA = [
  i18nArea('about', 'Texto de presentación', 4),
  i18n('linksTitle', 'Título columna de enlaces'),
  i18n('servicesTitle', 'Título columna de servicios'),
  i18n('contactTitle', 'Título columna de contacto'),
  {
    key: 'links',
    label: 'Enlaces rápidos',
    type: 'list',
    addLabel: 'Añadir enlace',
    titleKey: 'label',
    blank: { label: { en: '', es: '' }, href: '/' },
    fields: [i18n('label', 'Texto'), text('href', 'Ruta')],
  },
  i18n('copyright', 'Texto de copyright'),
];
