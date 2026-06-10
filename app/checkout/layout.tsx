import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Secure Checkout - Reel Cash & Currency',
  description: 'Provide your details to securely dispatch your theatrical replica order.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
