# Nguyen Chiropractic and Acupuncture Wellness

Sitio web bilingüe (inglés principal / español secundario) con panel de administración propio.
Construido con Next.js 15 (App Router) + React 19, sin dependencias de CMS externo.

---

## 1. Estructura

```
data/content.json        Contenido inicial (semilla) de todo el sitio, en EN y ES
public/img/              Logo e imágenes (reemplazables desde el panel)
src/app/(site)/[locale]/ Sitio público: /en y /es
src/app/(admin)/admin/   Panel de administración
src/app/api/             API: login, contenido, subida de imágenes, formularios
src/components/          Componentes de UI y del panel
src/lib/                 i18n, almacenamiento y autenticación
```

Rutas públicas: `/en`, `/es`, `/{locale}/about`, `/services`, `/services/[slug]`,
`/therapists`, `/gallery`, `/blog`, `/blog/[slug]`, `/faqs`, `/testimonials`,
`/appointment`, `/contact`. La raíz `/` redirige a `/en`.

---

## 2. Variables de entorno (Vercel → Settings → Environment Variables)

| Variable | Obligatoria | Para qué sirve |
|---|---|---|
| `ADMIN_PASSWORD` | **Sí** | Contraseña del panel. Sin ella se usa `nguyen2026` (insegura). |
| `ADMIN_SECRET` | Recomendada | Cadena aleatoria larga para firmar la sesión del panel. |
| `BLOB_READ_WRITE_TOKEN` | **Sí** | La añade Vercel automáticamente al crear un Blob store. Sin ella los cambios del panel no se guardan de forma permanente y no se pueden subir imágenes. |
| `NEXT_PUBLIC_SITE_URL` | Opcional | URL final del sitio (para sitemap y SEO). Ej: `https://nguyenchiro.com` |
| `RESEND_API_KEY` + `NOTIFY_EMAIL` | Opcional | Envía por email cada solicitud de cita o mensaje de contacto. |

### Activar el almacenamiento (1 vez, 2 minutos)

1. En Vercel abra el proyecto → pestaña **Storage** → **Create Database** → **Blob**.
2. Conéctelo al proyecto (Vercel crea `BLOB_READ_WRITE_TOKEN` solo).
3. **Redeploy** el proyecto.

A partir de ese momento el panel guarda cambios permanentes y permite subir imágenes.

---

## 3. Panel de administración

Entrar en `/admin` (enlace también al final del sitio) con la contraseña de `ADMIN_PASSWORD`.

Se puede editar:

- **Secciones de la home**: cada bloque (portada, bienvenida, servicios, doctor, equipo,
  contadores, zonas de dolor, compromiso, testimonios, blog, mapa). Se pueden **reordenar**
  con las flechas y **ocultar** con el interruptor.
- **Páginas internas**: cabeceras y textos de Nosotros, Servicios, Terapeutas, Galería,
  Blog, FAQs, Testimonios, Cita y Contacto.
- **Colecciones**: servicios, equipo, testimonios, artículos del blog, preguntas frecuentes
  y galería (crear, editar, ordenar y borrar).
- **Menú y footer**: enlaces, títulos de columnas y copyright.
- **Bandeja de entrada**: solicitudes de cita y mensajes de contacto, con exportación a CSV.
- **Ajustes generales**: logo, colores de marca, teléfono, email, dirección, mapa, horario,
  redes sociales, SEO e idiomas activos.

Cada campo de texto tiene dos casillas: **EN** (inglés) y **ES** (español).
Los cambios se aplican al pulsar **Guardar cambios**.

También hay **Descargar copia / Restaurar copia** (JSON) en Ajustes generales.

---

## 4. Desarrollo local

```bash
npm install
npm run dev      # http://localhost:3000
```

Sin `BLOB_READ_WRITE_TOKEN` el sitio lee `data/content.json` y los cambios del panel
quedan solo en memoria (útil para probar).

---

## 5. Imágenes

Las imágenes incluidas en `public/img` son marcadores de posición generados con los colores
del logo. Sustitúyalas con fotos reales de la clínica desde el panel (botón **Subir imagen**
en cada campo) o reemplazando los archivos con el mismo nombre.

Tamaños recomendados: portada 1920×1080 · servicios 860×600 · equipo 600×700 ·
galería 900×680 · blog 900×570 · logo 512×512 PNG transparente.

---

## 6. Publicar en Vercel (primera vez)

En la Terminal de su Mac:

```bash
cd ~/Documents/nguyen-web
npx vercel@latest login      # solo la primera vez
npx vercel@latest --prod
```

Acepte las opciones por defecto (Vercel detecta Next.js automáticamente). Al terminar
imprime la URL del sitio. Después:

1. Vercel → proyecto → **Storage** → **Create Database** → **Blob** → conectar.
2. Vercel → proyecto → **Settings** → **Environment Variables**: añada `ADMIN_PASSWORD`
   y `ADMIN_SECRET`.
3. **Redeploy** (o `npx vercel@latest --prod` otra vez).

Para publicar cambios de código en el futuro, repita `npx vercel@latest --prod`.
Los cambios de **contenido** no necesitan redeploy: se guardan desde `/admin`.
