'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  Phone, 
  Mail, 
  Menu, 
  X, 
  Trash2, 
  ChevronRight, 
  ShieldCheck, 
  Globe, 
  Truck, 
  Clock,
  ArrowRight,
  ShoppingCart,
  Lock,
  CreditCard,
  Coins,
  Building2,
  MapPin,
  User,
  Info
} from 'lucide-react';
import { useOrder } from '@/context/OrderContext';

// 1. NoticeBar/Announcement Bar with scrolling key messages marquee
export function NoticeBar() {
  return (
    <div className="bg-[#0D1117] text-emerald-400 py-2.5 text-xs font-mono select-none overflow-hidden border-b border-slate-800">
      <div className="animate-marquee whitespace-nowrap flex gap-8 justify-around items-center">
        <span>★ PREMIUM CINEMATIC GRADE REPLICAS ★</span>
        <span>★ 100% RAW COTTON-LINEN SUBSTRATE ★</span>
        <span>★ DISCREET VACUUM-SEALED GLOBAL LOGISTICS ★</span>
        <span>★ COMPLIANT FOR CAMERA AND MOTION PICTURE PURPOSES AND MOR... ★</span>
        <span>★ RATED #1 GLOBAL CURRENCY PRINTING REPLICATOR ★</span>
      </div>
    </div>
  );
}

// 2. Sticky Glassmorphism Header / Navbar (Bento styled floating dark header)
export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { totalQty, setIsOpen } = useOrder();

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/products' },
    { name: 'About', href: '/about' },
    { name: 'Research', href: '/blog' },
    { name: 'FAQs', href: '/faq' },
    { name: 'Contact', href: '/contact' }
  ];

  const handleToggleCart = () => {
    setIsOpen(true);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0A0B0E]/80 backdrop-blur-md py-4 select-none transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#161B22] border border-slate-800 rounded-2xl px-6 sm:px-8 py-3 flex items-center justify-between h-16 shadow-xl">
          {/* Logo - Bento design integration */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center hover:scale-105 transition-transform duration-200 bg-black border border-slate-800">
              <Image
                src="/IMGIYUTRT.png"
                alt="Reel Cash Logo"
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-lg font-bold tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                REEL CASH<span className="text-emerald-500 text-xs align-top ml-1">®</span>
              </span>
              <span className="text-[8px] font-mono font-medium tracking-widest text-slate-500 leading-none mt-0.5 uppercase">
                &amp; Currency Group
              </span>
            </div>
          </Link>

          {/* Navigation links - Bento layout style (slate text) */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (pathname?.startsWith(item.href + '/') ?? false);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`font-sans text-sm font-semibold tracking-wide transition-colors ${
                    isActive 
                      ? 'text-emerald-400 border-b-2 border-emerald-500 pb-1' 
                      : 'text-slate-400 hover:text-white pb-1'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Call To Action Buttons (Vibrant Emerald CTA button) */}
          <div className="hidden md:flex items-center gap-4">
            {totalQty > 0 && (
              <button 
                onClick={handleToggleCart}
                className="relative p-2.5 text-slate-400 hover:text-white transition-colors"
                aria-label="Toggle Shopping Cart"
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute top-0 right-0 w-4 h-4 bg-emerald-500 text-black text-[9px] rounded-full flex items-center justify-center font-bold font-mono">
                  {totalQty}
                </span>
              </button>
            )}
            <Link 
              href="/products" 
              className="px-6 py-2.5 rounded-xl bg-emerald-500 text-black hover:bg-emerald-400 text-xs font-bold tracking-wider uppercase transition-all hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-emerald-500/10"
            >
              Order Now
            </Link>
          </div>

          {/* Hamburger Menu Toggle (Mobile) */}
          <div className="md:hidden flex items-center gap-2">
            {totalQty > 0 && (
              <button 
                onClick={handleToggleCart}
                className="relative p-2 text-slate-400 hover:text-white mr-2"
                aria-label="Toggle shopping cart drawer"
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute top-0 right-0 w-4 h-4 bg-emerald-500 text-black text-[9px] rounded-full flex items-center justify-center font-bold font-mono">
                  {totalQty}
                </span>
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 text-slate-400 hover:text-white focus:outline-none"
              aria-label="Toggle Navigation Options Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Hamburger menu Full Screen Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-[#0A0B0E] text-slate-250 flex flex-col px-6 py-8">
          <div className="flex justify-between items-center pb-8 border-b border-slate-800">
            <Link href="/" className="flex items-center gap-3" onClick={() => setMobileMenuOpen(false)}>
              <div className="relative w-9 h-9 rounded-lg overflow-hidden flex items-center justify-center bg-black border border-slate-800">
                <Image
                  src="/IMGIYUTRT.png"
                  alt="Reel Cash Logo"
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="font-display text-lg font-bold tracking-tight text-white">REEL CASH<span className="text-emerald-500 text-xs align-top ml-1">®</span></span>
            </Link>
            <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-slate-400">
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex flex-col gap-6 py-12 text-center font-display">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-2xl font-semibold tracking-wider text-slate-350 hover:text-emerald-400 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="mt-auto flex flex-col gap-4">
            <Link
              href="/products"
              className="w-full text-center py-4 rounded-xl bg-emerald-500 text-black text-sm font-bold tracking-widest uppercase hover:bg-emerald-400 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Order Now
            </Link>
            <div className="text-center text-[10px] font-mono text-slate-500">
              Reel Cash Support Services • sales@reelbills.com
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

// 3. 4-Column Footer (Brand, Products, Research, Company)
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0A0B0E] text-slate-400 border-t border-slate-800 select-none pb-8 pt-16 mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-16 border-b border-slate-800">
          
          {/* Column 1: Brand Info */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8 rounded overflow-hidden flex items-center justify-center bg-black border border-slate-800">
                <Image
                  src="/IMGIYUTRT.png"
                  alt="Reel Cash Logo"
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="font-display font-bold text-white tracking-wide">REEL CASH &amp; Co</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed font-sans">
              The world&apos;s most trusted premium currency replication organization. Fine-art engraving substrates engineered exclusively for Hollywood motion picture, broadcast, and tactical financial drill demonstrations.
            </p>
            <div className="text-xs font-mono text-slate-500 flex flex-col gap-1.5 mt-2">
              <span className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-emerald-400" /> sales@reelbills.com</span>
              <span className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-emerald-400" /> Encryption SEC Channel Only</span>
            </div>
          </div>

          {/* Column 2: Products */}
          <div>
            <h4 className="font-display font-semibold text-white tracking-wide text-xs uppercase mb-4 text-emerald-400">
              Premium Products
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><Link href="/products/buy-counterfeit-usd-100-banknotes" className="hover:text-emerald-400 transition-colors">USD $100 Banknotes (New-Gen)</Link></li>
              <li><Link href="/products/buy-counterfeit-usd-50-banknotes" className="hover:text-emerald-400 transition-colors">USD $50 Banknotes (Aged Series)</Link></li>
              <li><Link href="/products/buy-counterfeit-usd-20-banknotes" className="hover:text-emerald-400 transition-colors">USD $20 Banknotes (Street Circulated)</Link></li>
              <li><Link href="/products/buy-counterfeit-usd-10-banknotes" className="hover:text-emerald-400 transition-colors">USD $10 Banknotes (Register Filler)</Link></li>
              <li><Link href="/products/buy-counterfeit-usd-5-banknotes" className="hover:text-emerald-400 transition-colors">USD $5 Banknotes (Fringe Details)</Link></li>
            </ul>
          </div>

          {/* Column 3: Research */}
          <div>
            <h4 className="font-display font-semibold text-white tracking-wide text-xs uppercase mb-4 text-emerald-400">
              Academic Research
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><Link href="/blog/where-to-buy-prop-money-us" className="hover:text-emerald-400 transition-colors">US Cinematic Legislation</Link></li>
              <li><Link href="/blog/prop-currency-price-australia" className="hover:text-emerald-400 transition-colors">Aust Border Logistics</Link></li>
              <li><Link href="/blog/reel-cash-vs-competitors-canada" className="hover:text-emerald-400 transition-colors">Canadian Quality Showdowns</Link></li>
              <li><Link href="/blog/the-technical-guidelines-of-using-replica-banknotes" className="hover:text-emerald-400 transition-colors">Weft &amp; Loom Calibration</Link></li>
              <li><Link href="/blog/how-prop-money-is-used-by-hollywood" className="hover:text-emerald-400 transition-colors">Hollywood FX Special Aging</Link></li>
            </ul>
          </div>

          {/* Column 4: Company */}
          <div>
            <h4 className="font-display font-semibold text-white tracking-wide text-xs uppercase mb-4 text-emerald-400">
              Enterprise Info
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><Link href="/about" className="hover:text-emerald-400 transition-colors">Our Printing Heritage</Link></li>
              <li><Link href="/faq" className="hover:text-emerald-400 transition-colors">Frequently Answered Queries</Link></li>
              <li><Link href="/contact" className="hover:text-emerald-400 transition-colors">Discreet Communication Hub</Link></li>
              <li><Link href="/terms" className="hover:text-emerald-400 transition-colors">Terms of Use</Link></li>
              <li><Link href="/privacy" className="hover:text-emerald-400 transition-colors">Privacy and Vault Protocol</Link></li>
            </ul>
          </div>

        </div>

        {/* Copyright Section */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] text-slate-500 gap-4">
          <div>
            &copy; {currentYear} Reel Cash and Currency Inc. All Rights Reserved. Delivered Securely Globally.
          </div>
        </div>
      </div>
    </footer>
  );
}

// 4. Floating WhatsApp Button
// Styled as premium emerald bento active badge
export function WhatsAppFloat() {
  const { sendWA } = useOrder();
  return (
    <button
      onClick={sendWA}
      id="whatsapp-float-btn"
      aria-label="Chat with Reel Cash support team on WhatsApp"
      className="fixed bottom-6 left-6 z-30 flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white px-4 py-3 rounded-full font-sans font-bold text-sm shadow-xl hover:scale-105 active:scale-95 transition-all outline-none border border-emerald-400/20"
    >
      {/* Mini clean svg */}
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.111 1.448 4.7 1.45 5.534 0 10.04-4.507 10.044-10.05.002-2.684-1.041-5.207-2.93-7.097C16.511 1.566 14.001.524 11.996.524 6.456.524 1.95 5.03 1.947 10.574c-.001 1.702.447 3.366 1.301 4.887l-.99 3.616 3.71-.973zm13.102-7.47c-.36-.18-2.127-1.05-2.457-1.17-.33-.12-.57-.18-.81.18-.24.36-.93 1.17-1.14 1.41-.21.24-.42.27-.78.09-.36-.18-1.52-.56-2.894-1.783-1.07-.953-1.79-2.13-2-.24-.21-.36-.02-.54.16-.72.16-.16.36-.42.54-.63.18-.21.24-.36.36-.6.12-.24.06-.45-.03-.63-.09-.18-.81-1.95-1.11-2.67-.3-.72-.6-1.11-.81-1.11-.21-.01-.45-.01-.69-.01-.24 0-.63.09-.96.45-.33.36-1.26 1.23-1.26 3 .001 1.77 1.29 3.48 1.47 3.72.18.24 2.536 3.87 6.14 5.43.856.37 1.524.59 2.043.755.86.272 1.64.233 2.26.14.69-.104 2.13-.87 2.43-1.71.3-.84.3-1.56.21-1.71-.09-.15-.33-.24-.69-.42z"/>
      </svg>
      <span className="hidden sm:inline tracking-wider text-white">Chat with us</span>
    </button>
  );
}

// 5. Order Builder: Fixed bottom-right drawer slide up when items > 0, styled as modern high-contrast bento card
export function OrderBuilder() {
  const { items, removeItem, clearOrder, isOpen, setIsOpen, totalCost, totalQty } = useOrder();

  const [step, setStep] = useState(1);
  const [shippingName, setShippingName] = useState('');
  const [shippingPhone, setShippingPhone] = useState('');
  const [shippingStreet, setShippingStreet] = useState('');
  const [shippingCity, setShippingCity] = useState('');
  const [shippingZip, setShippingZip] = useState('');
  const [shippingCountry, setShippingCountry] = useState('United States');
  
  const [paymentMethod, setPaymentMethod] = useState<'crypto' | 'bank' | 'card' | ''>('');
  const [cryptoType, setCryptoType] = useState<'Bitcoin' | 'USDT' | 'USDC' | 'Ether' | ''>('');
  
  // Card inputs
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardName, setCardName] = useState('');

  // Rules enforcement
  const isCryptoEligible = true;
  const isBankEligible = totalCost > 150 && ['Australia', 'United Kingdom (UK)', 'Europe (EU)'].includes(shippingCountry);
  const isCardEligible = totalCost >= 200;

  if (items.length === 0 || !isOpen) return null;

  // Coordinate and payment formatting for outbound transmission
  const handlePlaceOrder = (channel: 'whatsapp' | 'email') => {
    let text = `═══ REEL CASH & CURRENCY ORDER ═══\n\n`;
    text += `Hello, I would like to place an order under these parameters:\n\n`;
    
    text += `📦 ORDER SPECIALTIES:\n`;
    items.forEach((item, index) => {
      text += `${index + 1}. ${item.name}\n`;
      text += `   • Variant: ${item.variant}\n`;
      text += `   • Quantity: ${item.qty} bundle(s)\n`;
      text += `   • Subtotal: $${item.price * item.qty} USD\n\n`;
    });
    
    text += `═══════════════════════════════════\n`;
    text += `Total Quantity: ${totalQty}\n`;
    text += `Total Cost: $${totalCost} USD\n\n`;
    
    text += `📍 COURIER DISPATCH COORDINATES:\n`;
    text += `• Name: ${shippingName}\n`;
    text += `• Contact Phone: ${shippingPhone}\n`;
    text += `• Delivery Street: ${shippingStreet}\n`;
    text += `• City / Postal: ${shippingCity}, ${shippingZip} \n`;
    text += `• Target Country: ${shippingCountry}\n\n`;
    
    text += `💳 SOUGHT SETTLEMENT MODE:\n`;
    if (paymentMethod === 'crypto') {
      text += `• Method: Crypto (${cryptoType || 'Bitcoin/USDT'})\n`;
      text += `• Status: Preferred Secret Clearance [ MOST DISCREET ]\n\n`;
    } else if (paymentMethod === 'bank') {
      text += `• Method: Bank Transfer / SEPA / Local Wire\n`;
      text += `• Residence Zone: ${shippingCountry}\n\n`;
    } else if (paymentMethod === 'card') {
      text += `• Method: Credit Card Payment\n`;
      text += `• Name on Card: ${cardName}\n`;
      text += `• Reference Number: **** **** **** ${cardNumber.replace(/\s?/g, '').slice(-4) || 'XXXX'}\n\n`;
    }
    
    text += `Please send me instant settlement instructions and courier logs.\n`;
    text += `═══════════════════════════════════`;

    const encoded = encodeURIComponent(text);
    if (channel === 'whatsapp') {
      const number = "447341056054"; // Luxury support placeholder
      window.open(`https://wa.me/${number}?text=${encoded}`, '_blank', 'noopener,noreferrer');
    } else {
      const mailtoUrl = `mailto:sales@reelbills.com?subject=Prop Currency Secure Order Request&body=${encoded}`;
      window.location.href = mailtoUrl;
    }
  };

  const isShippingValid = shippingName.trim() !== '' && 
                          shippingPhone.trim() !== '' && 
                          shippingStreet.trim() !== '' && 
                          shippingCity.trim() !== '' && 
                          shippingZip.trim() !== '';

  const isCCFormFilled = cardName.trim() !== '' && 
                         cardNumber.trim() !== '' && 
                         cardExpiry.trim() !== '' && 
                         cardCvv.trim() !== '';

  const isPaymentValid = (paymentMethod === 'crypto' && cryptoType !== '') ||
                         (paymentMethod === 'bank') ||
                         (paymentMethod === 'card' && isCCFormFilled);

  return (
    <div className="fixed bottom-6 right-6 z-40 w-[420px] max-w-[calc(100vw-2rem)] bg-[#0D1117] text-slate-200 border-2 border-emerald-500 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 flex flex-col max-h-[85vh]">
      
      {/* Drawer Header */}
      <div className="px-5 py-4 bg-[#161B22] border-b border-slate-800 flex justify-between items-center select-none flex-shrink-0">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <h3 className="font-display font-bold text-xs uppercase tracking-widest text-emerald-400">
            Secure Outward Dispatch ({totalQty})
          </h3>
        </div>
        <button 
          onClick={() => {
            setIsOpen(false);
            setStep(1);
          }}
          className="text-slate-500 hover:text-white text-[10px] font-mono font-bold tracking-wider"
        >
          [ HIDE ]
        </button>
      </div>

      {/* Step Indicators */}
      <div className="bg-[#0A0B0E] border-b border-slate-850 px-5 py-2.5 flex items-center justify-between text-[9px] font-mono select-none">
        <span className={`tracking-wider ${step === 1 ? 'text-emerald-400 font-bold' : 'text-slate-500'}`}>
          1. ITEM SUMMARY
        </span>
        <ChevronRight className="w-3 h-3 text-slate-700" />
        <span className={`tracking-wider ${step === 2 ? 'text-emerald-400 font-bold' : 'text-slate-500'}`}>
          2. COURIER COORDINATES
        </span>
        <ChevronRight className="w-3 h-3 text-slate-700" />
        <span className={`tracking-wider ${step === 3 ? 'text-emerald-400 font-bold' : 'text-slate-500'}`}>
          3. PAYMENT ROUTING
        </span>
      </div>

      {/* Content wrapper with scroll if overflow */}
      <div className="flex-grow overflow-y-auto p-5 custom-scroll">
        
        {/* STEP 1: ITEM REVIEW */}
        {step === 1 && (
          <div className="space-y-4">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">
              Review Selected Stock
            </span>
            
            <div className="divide-y divide-slate-800 border border-slate-800 rounded-xl overflow-hidden bg-black/20">
              {items.map((item) => (
                <div key={item.key} className="p-3.5 flex justify-between items-start gap-4 hover:bg-slate-800/10 transition-colors">
                  <div className="flex-1 min-w-0">
                    <h5 className="font-sans text-xs font-bold text-white leading-normal truncate">
                      {item.name}
                    </h5>
                    <div className="text-[10px] font-mono text-slate-400 mt-1.5 flex items-center justify-between">
                      <span className="bg-slate-850 border border-slate-8a px-2 py-0.5 rounded text-slate-300">
                        {item.variant}
                      </span>
                      <span className="text-emerald-400 font-bold">Bundles: {item.qty}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end justify-between self-stretch flex-shrink-0">
                    <span className="text-xs font-bold font-mono text-emerald-400 bg-emerald-500/5 border border-emerald-500/10 px-2 py-0.5 rounded">
                      ${item.price * item.qty}
                    </span>
                    <button
                      onClick={() => removeItem(item.key)}
                      className="text-slate-500 hover:text-rose-400 transition-colors mt-auto p-1.5 hover:bg-rose-500/5 rounded-lg"
                      aria-label="Remove item from case"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center text-xs p-4 bg-slate-900/30 border border-slate-800 rounded-xl select-none">
              <span className="text-slate-400 font-sans">Accumulated Volume:</span>
              <span className="font-bold text-white font-mono text-sm">${totalCost} USD</span>
            </div>

            <Link
              href="/checkout"
              onClick={() => setIsOpen(false)}
              className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-black text-[11px] font-bold tracking-widest uppercase rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/10 font-sans text-center cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              onClick={() => setStep(2)}
              className="w-full py-2 bg-transparent hover:bg-slate-805/40 text-slate-400 hover:text-white text-[9.5px] font-mono font-bold tracking-wider uppercase border border-slate-850 rounded-xl transition-colors cursor-pointer"
            >
              Quick Chat Dispatch Alternative
            </button>
          </div>
        )}

        {/* STEP 2: SHIPPING SHIPPING COORDINATES */}
        {step === 2 && (
          <div className="space-y-4 text-left">
            <div>
              <span className="text-[10px] font-mono text-[#c59b27] uppercase tracking-widest block">
                Deliver Logistics Profile
              </span>
              <h4 className="font-display font-bold text-sm text-white mt-1">
                Verify Safe Delivery Coordinates
              </h4>
            </div>

            <div className="space-y-3.5 font-sans text-xs">
              
              {/* Full Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-slate-500" /> Full Name / Alias
                </label>
                <input
                  type="text"
                  value={shippingName}
                  onChange={(e) => setShippingName(e.target.value)}
                  placeholder="e.g. John Doe / Studio Lead"
                  className="bg-[#0A0B0E] border border-slate-800 focus:border-emerald-500 rounded-xl px-4 py-3 placeholder:text-slate-600 focus:outline-none text-white text-xs tracking-wide transition-colors"
                />
              </div>

              {/* Delivery Phone Number */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-slate-500" /> Delivery Phone (Encrypted Channel)
                </label>
                <input
                  type="tel"
                  value={shippingPhone}
                  onChange={(e) => setShippingPhone(e.target.value)}
                  placeholder="e.g. +1 (555) 0199"
                  className="bg-[#0A0B0E] border border-slate-800 focus:border-emerald-500 rounded-xl px-4 py-3 placeholder:text-slate-600 focus:outline-none text-white text-xs tracking-wide transition-colors"
                />
                <span className="text-[9px] font-mono text-slate-500 leading-none">
                  For secure courier handoff and real-time transit status logs.
                </span>
              </div>

              {/* Country Selection Dropdown */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-slate-500" /> Destination Country
                </label>
                <select
                  value={shippingCountry}
                  onChange={(e) => setShippingCountry(e.target.value)}
                  className="bg-[#0A0B0E] border border-slate-800 focus:border-emerald-500 rounded-xl px-4 py-3 focus:outline-none text-white text-xs tracking-wide transition-colors"
                >
                  <option value="United States">United States</option>
                  <option value="Australia">Australia</option>
                  <option value="United Kingdom (UK)">United Kingdom (UK)</option>
                  <option value="Europe (EU)">Europe (EU)</option>
                  <option value="Canada">Canada</option>
                  <option value="Other">Other Global Coordinates</option>
                </select>
                <span className="text-[9px] font-mono text-slate-500 leading-none">
                  Country selection configures statutory payment routes automatically.
                </span>
              </div>

              {/* Address Street */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" /> Street Handoff Address
                </label>
                <input
                  type="text"
                  value={shippingStreet}
                  onChange={(e) => setShippingStreet(e.target.value)}
                  placeholder="e.g. 742 Evergreen Terrace"
                  className="bg-[#0A0B0E] border border-slate-800 focus:border-emerald-500 rounded-xl px-4 py-3 placeholder:text-slate-600 focus:outline-none text-white text-xs tracking-wide transition-colors"
                />
              </div>

              {/* City and Zip Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                    City / Locality
                  </label>
                  <input
                    type="text"
                    value={shippingCity}
                    onChange={(e) => setShippingCity(e.target.value)}
                    placeholder="e.g. Springfield"
                    className="bg-[#0A0B0E] border border-slate-800 focus:border-emerald-500 rounded-xl px-4 py-3 placeholder:text-slate-600 focus:outline-none text-white text-xs tracking-wide transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                    Postal / Zip Code
                  </label>
                  <input
                    type="text"
                    value={shippingZip}
                    onChange={(e) => setShippingZip(e.target.value)}
                    placeholder="e.g. 90210"
                    className="bg-[#0A0B0E] border border-slate-800 focus:border-emerald-500 rounded-xl px-4 py-3 placeholder:text-slate-600 focus:outline-none text-white text-xs tracking-wide transition-colors"
                  />
                </div>
              </div>

            </div>

            {/* Tip Banner */}
            <div className="bg-[#0f1311] border border-[#c59b27]/20 p-3 rounded-xl flex items-start gap-2.5 mt-2">
              <Info className="w-4 h-4 text-[#c59b27] flex-shrink-0 mt-0.5" />
              <p className="font-mono text-[9px] text-[#eadaad] leading-normal uppercase">
                Privacy Protection: Cartons are unmarked, vacuum-sealed, and dispatched with no identifier tags.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => setStep(1)}
                className="py-3 items-center justify-center font-mono font-bold text-[10px] uppercase border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white rounded-xl transition-all"
              >
                Back To Cart
              </button>
              <button
                disabled={!isShippingValid}
                onClick={() => {
                  if (totalCost < 100) {
                    setPaymentMethod('crypto');
                  } else {
                    if (paymentMethod === 'bank' && !isBankEligible) {
                      setPaymentMethod('');
                    } else if (paymentMethod === 'card' && !isCardEligible) {
                      setPaymentMethod('');
                    }
                  }
                  setStep(3);
                }}
                className={`py-3 flex items-center justify-center gap-1 font-sans font-bold text-xs uppercase rounded-xl transition-all ${
                  isShippingValid 
                    ? 'bg-emerald-500 text-black hover:bg-emerald-400 shadow-md shadow-emerald-500/10' 
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                <span>Settlement Mode</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: DISCREET PAYMENT OPTION PORTAL */}
        {step === 3 && (
          <div className="space-y-4 text-left">
            <div>
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest block">
                Secured Liquidity Gateway
              </span>
              <h4 className="font-display font-bold text-sm text-white mt-1">
                Select Your Routing Settlement
              </h4>
            </div>

            {/* Total Indicator */}
            <div className="flex justify-between items-center py-2.5 px-4 bg-slate-900 border border-slate-800 rounded-xl text-xs select-none">
              <span className="text-slate-400">Sum to Clear:</span>
              <span className="font-bold font-mono text-emerald-400 text-sm">${totalCost} USD</span>
            </div>

            {/* Warning Rule Callouts */}
            {totalCost < 100 && (
              <div className="bg-emerald-950/20 border border-emerald-500/20 p-3 rounded-xl flex items-start gap-2">
                <Info className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <p className="font-sans text-[10px] text-emerald-300 leading-relaxed">
                  <strong className="font-mono text-[9px] uppercase tracking-wider block mb-1 text-emerald-400">Crypto Lock Enabled</strong>
                  Orders under $100 require Crypto settlement to guarantee discreet shipping.
                </p>
              </div>
            )}

            {/* Payment Options Choices */}
            <div className="space-y-3 font-sans text-xs">
              
              {/* 1. Crypto Options block - PREFERRED ACCORDING TO USER DETAILS */}
              <div 
                className={`border rounded-xl p-3.5 transition-all cursor-pointer relative ${
                  paymentMethod === 'crypto'
                    ? 'bg-[#161B22]/60 border-emerald-500/50 shadow-md shadow-emerald-500/5'
                    : 'border-slate-800 bg-black/10 hover:border-slate-700'
                }`}
                onClick={() => setPaymentMethod('crypto')}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400 flex-shrink-0">
                      <Coins className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="font-bold text-white flex items-center gap-1.5">
                        Crypto Wallet
                        <span className="text-[8px] bg-emerald-950 text-emerald-400 border border-emerald-500/30 font-mono font-bold tracking-widest px-1.5 py-0.25 rounded-md uppercase">
                          DISCREET ★
                        </span>
                      </h5>
                      <p className="text-[10px] text-slate-400 leading-normal mt-0.5">
                        Btc, Usdt Ethereum, Usdc. Purely discreet settlement.
                      </p>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="paymethod"
                    checked={paymentMethod === 'crypto'}
                    onChange={() => setPaymentMethod('crypto')}
                    className="w-4 h-4 accent-emerald-500 cursor-pointer"
                  />
                </div>

                {/* Expanded Coins selectors if chosen */}
                {paymentMethod === 'crypto' && (
                  <div className="mt-3 pt-3 border-t border-slate-800 space-y-2 select-none">
                    <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest block">
                      Choose Your Token Account:
                    </span>
                    <div className="grid grid-cols-2 gap-1.5">
                      {['Bitcoin', 'USDT', 'USDC', 'Ether'].map((coin) => (
                        <button
                          key={coin}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setCryptoType(coin as any);
                          }}
                          className={`py-2 px-3 rounded-lg text-[10px] uppercase font-mono font-extrabold tracking-wider transition-all border ${
                            cryptoType === coin
                              ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 font-bold'
                              : 'bg-[#0D1117] text-slate-400 border-slate-800 hover:border-slate-705'
                          }`}
                        >
                          {coin}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 2. Bank Transfer Option Block */}
              <div 
                className={`border rounded-xl p-3.5 transition-all relative ${
                  !isBankEligible
                    ? 'opacity-40 border-slate-850 bg-slate-900/10 cursor-not-allowed select-none'
                    : 'cursor-pointer hover:border-slate-700 ' + (paymentMethod === 'bank' ? 'bg-[#161B22]/60 border-emerald-500/50 shadow-md shadow-emerald-500/5' : 'border-slate-800 bg-black/10')
                }`}
                onClick={() => {
                  if (isBankEligible) setPaymentMethod('bank');
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 bg-slate-800 rounded-lg text-slate-400 flex-shrink-0">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="font-bold text-white flex items-center gap-1.5">
                        Bank Transfer
                        {!isBankEligible && (
                          <Lock className="w-3 h-3 text-slate-500" />
                        )}
                      </h5>
                      <p className="text-[10px] text-slate-400 leading-normal mt-0.5">
                        AU, Europe &amp; UK Wire Transfers. (Minimum order $150).
                      </p>
                    </div>
                  </div>
                  {isBankEligible ? (
                    <input
                      type="radio"
                      name="paymethod"
                      checked={paymentMethod === 'bank'}
                      onChange={() => setPaymentMethod('bank')}
                      className="w-4 h-4 accent-emerald-500 cursor-pointer"
                    />
                  ) : (
                    <span className="text-[8px] font-mono text-slate-500 font-bold uppercase tracking-wider">
                      Locked
                    </span>
                  )}
                </div>

                {/* If selected country doesn't support or sum isn't high enough, show inline error */}
                {!isBankEligible && (
                  <div className="mt-2 text-[9px] font-mono text-[#c59b27] border-t border-slate-800/40 pt-2 flex items-center gap-1 leading-none uppercase">
                    <Info className="w-3.5 h-3.5 text-[#c59b27]" />
                    <span>
                      {totalCost <= 150 
                        ? 'Requires Order Total > $150 USD' 
                        : `Not Available in ${shippingCountry}`}
                    </span>
                  </div>
                )}
              </div>

              {/* 3. Credit Card Option */}
              <div 
                className={`border rounded-xl p-3.5 transition-all relative ${
                  !isCardEligible
                    ? 'opacity-40 border-slate-850 bg-slate-900/10 cursor-not-allowed select-none'
                    : 'cursor-pointer hover:border-slate-700 ' + (paymentMethod === 'card' ? 'bg-[#161B22]/60 border-emerald-500/50 shadow-md shadow-emerald-500/5' : 'border-slate-800 bg-black/10')
                }`}
                onClick={() => {
                  if (isCardEligible) setPaymentMethod('card');
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 bg-slate-800 rounded-lg text-slate-400 flex-shrink-0">
                      <CreditCard className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="font-bold text-white flex items-center gap-1.5">
                        Credit Card / Auth
                        {!isCardEligible && (
                          <Lock className="w-3 h-3 text-slate-500" />
                        )}
                      </h5>
                      <p className="text-[10px] text-slate-400 leading-normal mt-0.5">
                        International MasterCard/Visa. (Minimum order $200).
                      </p>
                    </div>
                  </div>
                  {isCardEligible ? (
                    <input
                      type="radio"
                      name="paymethod"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="w-4 h-4 accent-emerald-500 cursor-pointer"
                    />
                  ) : (
                    <span className="text-[8px] font-mono text-slate-500 font-bold uppercase tracking-wider">
                      Locked
                    </span>
                  )}
                </div>

                {/* If card ineligible, show why */}
                {!isCardEligible && (
                  <div className="mt-2 text-[9px] font-mono text-[#c59b27] border-t border-slate-800/40 pt-2 flex items-center gap-1 leading-none uppercase">
                    <Info className="w-3.5 h-3.5 text-[#c59b27]" />
                    <span>Requires Order Total ≥ $200 USD</span>
                  </div>
                )}

                {/* Card input forms if chosen */}
                {paymentMethod === 'card' && isCardEligible && (
                  <div className="mt-4 pt-4 border-t border-slate-800 space-y-3" onClick={(e) => e.stopPropagation()}>
                    <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest block">
                      Secured Card Details:
                    </span>
                    
                    {/* Cardholder Name */}
                    <div className="flex flex-col gap-1">
                      <label className="text-[9px] font-mono font-bold text-slate-500 uppercase">Cardholder Name</label>
                      <input
                        type="text"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        placeholder="John Doe"
                        className="bg-[#0A0B0E] border border-slate-800 focus:border-emerald-500 rounded-lg px-3 py-2 text-white text-[11px] focus:outline-none placeholder:text-slate-700"
                      />
                    </div>

                    {/* Card Number */}
                    <div className="flex flex-col gap-1">
                      <label className="text-[9px] font-mono font-bold text-slate-500 uppercase">Card Number</label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="4111 0000 0000 0000"
                        maxLength={19}
                        className="bg-[#0A0B0E] border border-slate-800 focus:border-emerald-500 rounded-lg px-3 py-2 text-white text-[11px] focus:outline-none placeholder:text-slate-700"
                      />
                    </div>

                    {/* Expiry and CVV */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex flex-col gap-1">
                        <label className="text-[9px] font-mono font-bold text-slate-500 uppercase">Expiry</label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          placeholder="MM/YY"
                          maxLength={5}
                          className="bg-[#0A0B0E] border border-slate-800 focus:border-emerald-500 rounded-lg px-3 py-2 text-white text-[11px] focus:outline-none placeholder:text-slate-700"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[9px] font-mono font-bold text-slate-500 uppercase">CVV</label>
                        <input
                          type="password"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          placeholder="***"
                          maxLength={3}
                          className="bg-[#0A0B0E] border border-slate-800 focus:border-emerald-500 rounded-lg px-3 py-2 text-white text-[11px] focus:outline-none placeholder:text-slate-700"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* Validation Callout */}
            {!isPaymentValid && paymentMethod !== '' && (
              <div className="text-[10px] text-[#c59b27] font-sans italic text-center px-2">
                * Please complete the setup inputs for your chosen method above.
              </div>
            )}

            {/* Final Dispatch Channels */}
            <div className="pt-2 space-y-2 select-none">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest text-center block mb-2">
                Handoff Dispatch Channels
              </span>

              <div className="grid grid-cols-2 gap-2">
                <button
                  disabled={!isPaymentValid}
                  onClick={() => handlePlaceOrder('whatsapp')}
                  id="order-builder-send-wa-btn-v2"
                  className={`w-full py-3 text-white text-[11px] font-bold tracking-widest uppercase rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                    isPaymentValid 
                      ? 'bg-[#25D366] hover:bg-[#20ba5a] shadow-lg shadow-[#25D366]/15'
                      : 'bg-slate-850 text-slate-600 cursor-not-allowed'
                  }`}
                >
                  <span>WhatsApp Link</span>
                </button>
                
                <button
                  disabled={!isPaymentValid}
                  onClick={() => handlePlaceOrder('email')}
                  id="order-builder-send-email-btn-v2"
                  className={`w-full py-3 text-[11px] font-bold tracking-widest uppercase rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                    isPaymentValid 
                      ? 'bg-emerald-500 text-black hover:bg-emerald-400 shadow-lg shadow-emerald-500/10'
                      : 'bg-slate-850 text-slate-600 cursor-not-allowed'
                  }`}
                >
                  <span>E-mail direct</span>
                </button>
              </div>
            </div>

            {/* Back Button */}
            <button
              onClick={() => setStep(2)}
              className="w-full py-2.5 items-center justify-center font-mono font-bold text-[10px] uppercase border border-slate-850 hover:border-slate-800 text-slate-500 hover:text-white rounded-xl transition-all block text-center"
            >
              Back to Coordinates
            </button>
          </div>
        )}

        {/* Clear draft option standard */}
        <div className="flex justify-between items-center pt-5 border-t border-slate-850 select-none mt-4 flex-shrink-0">
          <button
            onClick={() => {
              clearOrder();
              setStep(1);
            }}
            className="text-[10px] text-slate-500 hover:text-rose-400 transition-colors uppercase tracking-widest font-bold"
          >
            Clear Draft
          </button>
          <div className="text-[9px] font-mono text-slate-500 leading-none flex items-center gap-1">
            <Lock className="w-3 h-3 text-slate-600" /> Secure Encryption Active
          </div>
        </div>

      </div>

    </div>
  );
}

// 6. Breadcrumb navigation component for subpages
export function Breadcrumbs({ paths }: { paths: { name: string; href?: string }[] }) {
  return (
    <nav className="flex items-center gap-2 text-[10px] font-mono text-slate-500 uppercase tracking-widest select-none py-6">
      <Link href="/" className="hover:text-white transition-colors">
        Home
      </Link>
      {paths.map((p, idx) => (
        <React.Fragment key={idx}>
          <ChevronRight className="w-3.5 h-3.5 text-slate-700" />
          {p.href ? (
            <Link href={p.href} className="hover:text-white transition-colors">
              {p.name}
            </Link>
          ) : (
            <span className="text-slate-350 truncate max-w-[200px]">{p.name}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}

// 7. Dynamic Trust badging band (4 trust items structured in responsive beautiful bento card blocks)
export function TrustBar() {
  const trustItems = [
    {
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
      title: 'Ultra-HD Resolution',
      desc: 'Tested under 4K camera resolution & intensive studio light arrays.'
    },
    {
      icon: <Globe className="w-5 h-5 text-emerald-400" />,
      title: 'Tactile Calibration',
      desc: 'Formulated cotton-linen texture providing appropriate counting friction.'
    },
    {
      icon: <Truck className="w-5 h-5 text-emerald-400" />,
      title: 'Discreet Dispensing',
      desc: 'Vacuum sealed unmarked armor-packs dispatch within 24 hours.'
    },
    {
      icon: <Clock className="w-5 h-5 text-emerald-400" />,
      title: 'Real-Time Updates',
      desc: 'Continuous live order status routing directly through WhatsApp.'
    }
  ];

  return (
    <section className="py-12 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustItems.map((item, idx) => (
            <div key={idx} className="bg-[#161B22] border border-slate-800 rounded-2xl p-6 flex flex-col gap-4 hover:border-slate-705 hover:shadow-lg transition-all group">
              <div className="p-2.5 bg-emerald-500/10 rounded-xl border border-emerald-500/20 flex-shrink-0 h-11 w-11 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                {item.icon}
              </div>
              <div className="flex flex-col">
                <h5 className="font-sans text-sm font-bold text-slate-100 tracking-tight">
                  {item.title}
                </h5>
                <p className="text-xs text-slate-400 leading-relaxed mt-2">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
