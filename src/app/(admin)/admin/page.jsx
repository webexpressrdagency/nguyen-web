import { redirect } from 'next/navigation';
import AdminApp from '@/components/admin/AdminApp';
import { isAuthed, usingDefaultPassword } from '@/lib/auth';
import { getContent, hasBlob } from '@/lib/store';

export default async function AdminPage() {
  if (!(await isAuthed())) redirect('/admin/login');

  const content = await getContent();

  return (
    <AdminApp
      initial={content}
      storage={hasBlob() ? 'blob' : 'memory'}
      defaultPassword={usingDefaultPassword()}
    />
  );
}
