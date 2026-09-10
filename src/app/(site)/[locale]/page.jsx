import Section from '@/components/Sections';
import { getContent } from '@/lib/store';

export default async function HomePage({ params }) {
  const { locale } = await params;
  const content = await getContent();
  const sections = (content.home?.sections || []).filter((s) => s.enabled !== false);

  return (
    <>
      {sections.map((section) => (
        <Section key={section.id} section={section} content={content} locale={locale} />
      ))}
    </>
  );
}
