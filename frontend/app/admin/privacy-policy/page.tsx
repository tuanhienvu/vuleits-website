import { redirect } from 'next/navigation';

export default function AdminPrivacyPolicyRedirectPage() {
  redirect('/admin/settings/site?tab=privacy');
}
