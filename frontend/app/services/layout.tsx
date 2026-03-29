import PublicLayout from '@/components/layout/PublicLayout';

// --- Service routes: shared public nav + footer ---

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <PublicLayout>{children}</PublicLayout>;
}
