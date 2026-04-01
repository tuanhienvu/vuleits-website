import { redirect } from 'next/navigation';

export default function AdminTermsOfServiceRedirectPage() {
  redirect('/admin/settings/site?tab=terms');
}
