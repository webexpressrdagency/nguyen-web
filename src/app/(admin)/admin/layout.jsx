import '../../admin.css';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Panel de administración',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
