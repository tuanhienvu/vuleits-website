import PublicLayout from '@/components/layout/PublicLayout';

// --- News routes: shared public nav + footer ---

export default function NewsLayout({ children }: { children: React.ReactNode }) {
  return <PublicLayout>{children}</PublicLayout>;
}
