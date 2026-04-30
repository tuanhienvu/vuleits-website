import { redirect } from 'next/navigation';

export default function AdminCookiePolicyRedirectPage() {
  redirect('/admin/settings/site?tab=cookies');
}
