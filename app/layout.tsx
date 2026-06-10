import type {Metadata} from 'next';
import { Space_Grotesk, DM_Sans } from 'next/font/google';
import { OrderProvider } from '@/context/OrderContext';
import { NoticeBar, Navbar, Footer, WhatsAppFloat, OrderBuilder } from '@/components/LayoutTemplates';
import './globals.css'; // Global styles

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700'],
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '700'],
});

export const metadata: Metadata = {
  title: 'Reel Cash and Currency | Ultra-Realistic Film Props',
  description: 'The world\'s most trusted realistic currency printer. Premium motion picture banknotes and prop replicates for film, TV, and collections.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${dmSans.variable}`}>
      <body className="font-sans antialiased text-slate-200 bg-[#0A0B0E] min-h-screen flex flex-col selection:bg-emerald-500 selection:text-black" suppressHydrationWarning>
        <OrderProvider>
          <NoticeBar />
          <Navbar />
          <main className="flex-grow flex flex-col">
            {children}
          </main>
          <Footer />
          <WhatsAppFloat />
          <OrderBuilder />
        </OrderProvider>
      </body>
    </html>
  );
}

