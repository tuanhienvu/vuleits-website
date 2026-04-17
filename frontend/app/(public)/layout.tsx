import PublicLayout from '@/components/layout/PublicLayout';

export default function PublicSiteLayout({ children }: { children: React.ReactNode }) {
  return <PublicLayout>{children}</PublicLayout>;
}
