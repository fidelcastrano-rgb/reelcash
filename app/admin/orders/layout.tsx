import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Secure Admin Dashboard - Reel Cash & Currency',
  description: 'Review system checkout registers, edit statuses, and track logistics logs.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
