# Nguyen Chiropractic and Acupuncture Wellness

Sitio web en inglés con panel de administración propio, construido con Next.js 15
(App Router) + React 19. Sin CMS externo: todo el contenido vive en un único documento JSON.

---

## 1. Estructura

```
data/content.json        Contenido inicial (semilla) de todo el sitio
public/img/              Logo (las demás imágenes son marcadores SVG generados)
src/app/(site)/          Sitio público
src/app/(admin)/admin/   Panel de administración
src/app/api/             API: login, contenido, subida de imágenes, formularios
src/app/placeholder/     Generador de imágenes de relleno con los colores de marca
src/components/          Componentes de UI y del panel
src/lib/                 Textos de interfaz, almacenamiento y autenticación
```

Rutas públicas: `/`, `/about`, `/services`, `/services/[slug]`, `/products`,
`/products/[slug]`, `/therapists`, `/gallery`, `/blog`, `/blog/[slug]`, `/faqs`,
`/testimonials`, `/appointment`, `/contact`, más `sitemap.xml` y `robots.txt`.

El sitio fue bilingüe en su primera versión. Ahora es solo inglés y cualquier URL con
`/en/...` o `/es/...` redirige (308) a la dirección limpia equivalente, así que ningún
enlace antiguo se rompe.

---

## 2. Variables de entorno (Vercel → Settings → Environment Variables)

| Variable | Obligatoria | Para qué sirve |
|---|---|---|
| `ADMIN_PASSWORD` | **Sí** | Contraseña del panel. Sin ella se usa `nguyen2026` (insegura). |
| `ADMIN_SECRET` | Recomendada | Cadena aleatoria larga para firmar la sesión del panel. |
| `BLOB_READ_WRITE_TOKEN` | **Sí** | La añade Vercel al crear un Blob store. Sin ella los cambios del panel no se guardan de forma permanente y no se pueden subir imágenes. |
| `NEXT_PUBLIC_SITE_URL` | Opcional | URL final del sitio, para sitemap y SEO. Ej: `https://nguyenchiro.com` |
| `RESEND_API_KEY` + `NOTIFY_EMAIL` | Opcional | Envía por email cada solicitud de cita o mensaje de contacto. |

### Activar el almacenamiento (una vez, 2 minutos)

1. En Vercel abra el proyecto → pestaña **Storage** → **Create Database** → **Blob**.
2. Conéctelo al proyecto (Vercel crea `BLOB_READ_WRITE_TOKEN` solo).
3. **Redeploy**.

---

## 3. Panel de administración

Entrar en `/admin` (hay un enlace **Admin** al final del sitio) con la contraseña de
`ADMIN_PASSWORD`. La sesión dura 12 horas.

Se puede editar:

- **Secciones de la home**: portada, bienvenida, servicios, **productos**, doctor, equipo,
  contadores, zonas de dolor, compromiso, testimonios, blog y mapa. Se pueden **reordenar**
  con las flechas y **ocultar** con el interruptor, sin borrar nada.
- **Páginas internas**: cabeceras y textos de Nosotros, Servicios, Productos, Terapeutas,
  Galería, Blog, FAQs, Testimonios, Cita y Contacto.
- **Colecciones**: servicios, **productos**, equipo, testimonios, artículos del blog,
  preguntas frecuentes y galería (crear, editar, ordenar y borrar).
- **Menú y footer**: enlaces, títulos de columnas y copyright.
- **Bandeja de entrada**: solicitudes de cita y mensajes de contacto, con exportación a CSV.
- **Ajustes generales**: logo, colores de marca, teléfono, email, dirección, mapa, horario,
  redes sociales y SEO. Incluye **Descargar copia / Restaurar copia** en JSON.

El panel está en español pero el sitio es en inglés: los textos que escriba ahí se publican
tal cual, así que escríbalos en inglés.

---

## 4. Productos

Cada producto tiene nombre, URL, **precio como texto libre** (`$49`, `From $49`,
`Ask in clinic`), categoría, etiqueta destacada opcional (`Most recommended`, `New`…),
foto, resumen y descripción.

No hay carrito ni pagos: el botón **Ask About This Product** lleva al formulario de
contacto con el asunto ya rellenado con el nombre del producto, y al lado queda el teléfono
de la clínica. Si más adelante quiere cobrar en línea, el paso natural es añadir Stripe
Checkout sobre esta misma colección.

---

## 5. Desarrollo local

```bash
npm install
npm run dev      # http://localhost:3000
```

Sin `BLOB_READ_WRITE_TOKEN` el sitio lee `data/content.json` y los cambios del panel quedan
solo en memoria (útil para probar sin tocar producción).

---

## 6. Despliegue

El repositorio `webexpressrdagency/nguyen-web` está conectado al proyecto **nguyen-web** de
Vercel: cada `git push` a `main` publica automáticamente.

```bash
cd ~/Documents/nguyen-web
git push
```

Los cambios de **contenido** no necesitan despliegue: se guardan desde `/admin`.

---

## 7. Imágenes

Las imágenes son marcadores SVG generados en `/placeholder/<clave>` con los colores del
logo. Sustitúyalas por fotos reales desde el panel (botón **Subir imagen** en cada campo),
que requiere el Blob store activo.

Tamaños recomendados: portada 1920×1080 · servicios 860×600 · productos 800×800 (cuadrada) ·
equipo 600×700 · galería 900×680 · blog 900×570 · logo 512×512 PNG transparente.
