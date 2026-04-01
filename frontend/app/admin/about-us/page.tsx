import { redirect } from 'next/navigation';

export default function AdminAboutUsRedirectPage() {
  redirect('/admin/settings/about?tab=intro');
}
