import { redirect } from 'next/navigation';
import LoginForm from '@/components/admin/LoginForm';
import { isAuthed } from '@/lib/auth';
import { getContent } from '@/lib/store';

export default async function LoginPage() {
  if (await isAuthed()) redirect('/admin');
  const content = await getContent();

  return (
    <LoginForm
      logo={content.settings?.logo}
      name={content.settings?.shortName || content.settings?.siteName}
    />
  );
}
