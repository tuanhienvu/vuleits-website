import { redirect } from 'next/navigation';

export default function AdminCompanyProfileRedirectPage() {
  redirect('/admin/settings/company?tab=profile');
}
