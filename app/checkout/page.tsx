'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  ShoppingCart, 
  ShieldCheck, 
  Trash2, 
  Lock, 
  CheckCircle,
  AlertCircle,
  Truck,
  Loader2,
  Info
} from 'lucide-react';
import { useOrder } from '@/context/OrderContext';
import { Breadcrumbs } from '@/components/LayoutTemplates';

const paymentDetails: Record<string, { name: string; notice: string }> = {
  zelle: {
    name: 'Zelle',
    notice: 'This payment option will be emailed or whatsapp to you once we recieve your order',
  },
  apple_cash: {
    name: 'Apple Cash',
    notice: 'This payment option will be emailed or whatsapp to you once we recieve your order',
  },
  chime: {
    name: 'Chime',
    notice: 'This payment option will be emailed or whatsapp to you once we recieve your order',
  },
  e_transfer: {
    name: 'Interac E-Transfer',
    notice: 'Our Interac E-Transfer request will be emailed or whatsapp to you once we receive your order.',
  },
  bank_transfer: {
    name: 'Bank Transfer',
    notice: 'Our bank account coordinates will be emailed or whatsapp to you once we receive your order.',
  },
  crypto: {
    name: 'Crypto (Bitcoin, USDT, USDC, Ether)',
    notice: '★ RECOMMENDED FOR 100% DISCREET ORDERING & MAXIMUM SECURITY. Crypto wallet addresses (BTC, USDT-TRC20, USDC, ETH) will be sent to your email or whatsapp once we receive your order. Highly secure, immediate verification, and leaves no digital audit trails on your banking cards.',
  },
  credit_card: {
    name: 'Credit Card',
    notice: 'Our card payment link will be emailed or whatsapp to you once we recieve your order.',
  },
};

function getPaymentLogo(id: string) {
  switch (id) {
    case 'zelle':
      return (
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-[#7414CA] flex items-center justify-center shadow">
            <span className="font-extrabold text-[#fff] text-xs select-none">z</span>
          </div>
          <span className="font-bold text-xs tracking-tight text-[#aa75ff] font-mono">Zelle</span>
        </div>
      );
    case 'apple_cash':
      return (
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center shadow">
            <svg viewBox="0 0 32 32" className="w-4 h-4 text-black" fill="currentColor">
              <path d="M16 .5C7.4.5.5 7.4.5 16s6.9 15.5 15.5 15.5 15.5-6.9 15.5-15.5S24.6.5 16.5.5zm5.5 17.5c-.1 2-1.6 3.4-3.5 3.5-1 0-1.8-.4-2.5-.4s-1.5.4-2.5.4c-2.4 0-4.4-1.9-4.5-4.4v-.1c-.1-2.5 1.8-4.5 4.3-4.6 1 0 1.8.4 2.5.4s1.5-.4 2.5-.4c1.8.1 3.2 1.3 3.6 3-1.6.7-2.6 2.3-2.6 4-.1 1.7.9 3.2 2.7 4.1zm-3-8c0-1.2.9-2.2 2.1-2.4.1 1.2-.9 2.2-2.1 2.4z"/>
            </svg>
          </div>
          <span className="font-bold text-xs tracking-tight text-white font-mono">Apple Cash</span>
        </div>
      );
    case 'chime':
      return (
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#25C974] flex items-center justify-center font-black text-black text-[9px] font-mono">
            ch
          </div>
          <span className="font-bold text-xs tracking-tight text-[#25C974] font-mono">Chime</span>
        </div>
      );
    case 'e_transfer':
      return (
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#FFB800] to-[#FF8A00] flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-4 h-4 text-black" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="font-bold text-xs tracking-tight text-white flex flex-col items-start leading-none font-mono">
            <span>Interac</span>
            <span className="text-[8px] text-amber-400 mt-0.5">e-Transfer</span>
          </span>
        </div>
      );
    case 'bank_transfer':
      return (
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center text-amber-500">
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="19" width="18" height="2" />
              <path d="M5 19v-9M9 19v-9M15 19v-9M19 19v-9M3 10l9-7 9 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="font-bold text-xs tracking-tight text-white font-mono">Bank Transfer</span>
        </div>
      );
    case 'crypto':
      return (
        <div className="flex items-center gap-2">
          <div className="flex -space-x-1">
            <div className="w-6 h-6 rounded-full bg-[#f2a900] flex items-center justify-center text-[9px] font-bold text-white shadow">
              ₿
            </div>
            <div className="w-6 h-6 rounded-full bg-[#26a17b] flex items-center justify-center text-[8px] font-bold text-white shadow">
              ₮
            </div>
          </div>
          <span className="font-bold text-xs tracking-tight text-white flex flex-col items-start leading-none font-mono">
            <span>Crypto</span>
            <span className="text-[8px] text-teal-400 mt-0.5">USDT/BTC/USDC</span>
          </span>
        </div>
      );
    case 'credit_card':
      return (
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400">
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="5" width="20" height="14" rx="2" />
              <line x1="2" y1="10" x2="22" y2="10" />
            </svg>
          </div>
          <span className="font-bold text-xs tracking-tight text-white font-mono">Credit Card</span>
        </div>
      );
    default:
      return null;
  }
}

export default function CheckoutPage() {
  const { items, totalCost, totalQty, removeItem, clearOrder } = useOrder();

  // Form states
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [honeypot, setHoneypot] = useState(''); // Spam protection honeypot

  const [country, setCountry] = useState('US');
  const [selectedPayment, setSelectedPayment] = useState('crypto');

  // Shipping states
  const [shippingOption, setShippingOption] = useState<'normal' | 'international' | 'sameday'>('normal');

  const getShippingCost = () => {
    if (shippingOption === 'sameday') return 40;
    if (shippingOption === 'international') return 30;
    return 20;
  };

  const getShippingName = () => {
    if (shippingOption === 'sameday') return 'Same Day Shipping';
    if (shippingOption === 'international') return 'International Shipping (7-14 days)';
    return 'Normal Shipping (3-5 days)';
  };

  // Form feedback states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successOrderNumber, setSuccessOrderNumber] = useState<string | null>(null);

  const handleCountryChange = (countryCode: string) => {
    setCountry(countryCode);
    setSelectedPayment('crypto'); // Default to crypto as preferred/discreet!
    
    // Auto shift shipping option if ineligible
    const isSDEligible = ['US', 'CA', 'AU', 'UK', 'IE'].includes(countryCode);
    if (!isSDEligible && shippingOption === 'sameday') {
      setShippingOption('normal');
    }
  };

  // Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Basic Validation
    if (!firstName.trim() || !lastName.trim()) {
      setErrorMsg('First Name and Last Name are required.');
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMsg('Please provide a valid email address.');
      return;
    }
    if (!phone.trim() || phone.trim().length < 5) {
      setErrorMsg('Please specify a valid phone number.');
      return;
    }
    if (!shippingAddress.trim() || shippingAddress.trim().length < 10) {
      setErrorMsg('Please enter a complete shipping address (with city, state/region, and zip).');
      return;
    }
    if (items.length === 0) {
      setErrorMsg('Your order review is empty. Please add items before checking out.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          shippingAddress,
          orderNotes,
          items,
          honeypot, // Spam honeypot
          paymentMethod: paymentDetails[selectedPayment]?.name || selectedPayment,
          country: country === 'US' ? 'United States' : country === 'CA' ? 'Canada' : country === 'AU' ? 'Australia' : country === 'UK' ? 'United Kingdom' : country === 'IE' ? 'Ireland' : 'International',
          shippingCost: getShippingCost(),
          shippingOption: getShippingName(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to place order.');
      }

      // Success
      setSuccessOrderNumber(data.orderNumber);
      clearOrder(); // Clear cart items on success
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'An unexpected connection error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // If order was placed successfully, render success screen
  if (successOrderNumber) {
    return (
      <div className="bg-[#070908] min-h-screen text-white py-16 px-4 sm:px-6 lg:px-8 select-none">
        <div className="max-w-xl mx-auto text-center mt-12 bg-[#161B22] border border-[#10b981]/30 rounded-2xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#10b981]/5 rounded-full blur-2xl"></div>
          
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-[#10b981]/10 flex items-center justify-center border border-[#10b981]/30">
              <CheckCircle className="w-10 h-10 text-[#10b981]" />
            </div>
          </div>

          <span className="text-[10px] font-mono text-[#10b981] uppercase tracking-widest block mb-2">Order Confirmed</span>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-4">
            Rebellion Secured Under #{successOrderNumber}
          </h1>
          <p className="font-sans text-xs sm:text-sm text-gray-400 leading-relaxed explanation mb-8">
            Thank you for shopping with us! Your order package has been stored securely. We sent confirmations to <strong>{email}</strong> and alerted our dispatch specialists.
          </p>

          <div className="bg-black/40 border border-slate-800 rounded-xl p-5 mb-8 text-left space-y-3 font-sans text-xs text-gray-300">
            <h4 className="font-display font-medium text-white uppercase tracking-wider text-[11px] pb-1.5 border-b border-slate-800 flex items-center gap-2">
              <Truck className="w-4 h-4 text-emerald-400" /> Next Handoff Steps
            </h4>
            <p>1. Our specialists are verifying your selected printing templates.</p>
            <p>2. We package your items under high-pressure flat-pack vacuum compression seals.</p>
            <p>3. Packages are dispatched within 24 hours under complete coordinate privacy.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link 
              href="/products"
              className="flex-1 py-3 bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold uppercase tracking-widest rounded-xl transition-all block text-center"
            >
              Continue Browsing
            </Link>
            <a 
              href={`https://wa.me/447341056054?text=Hello%20Support,%20I%20just%2520placed%20order%20%23${successOrderNumber}%20and%20wanted%20to%20verify%20payment.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 bg-transparent text-gray-300 border border-slate-700 hover:border-slate-500 text-xs font-bold uppercase tracking-widest rounded-xl transition-all block text-center"
            >
              Connect to Support
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#070908] min-h-screen text-white select-none">
      
      {/* Header Splash */}
      <section className="bg-gradient-to-b from-[#090d0b] to-[#070908] py-12 border-b border-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs paths={[{ name: 'Secure System Checkout' }]} />
          
          <div className="max-w-3xl mt-4">
            <Link 
              href="/products" 
              className="inline-flex items-center gap-2 text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest hover:text-white transition-colors mb-4"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Store Catalog</span>
            </Link>
            
            <span className="text-[10px] font-mono text-[#c59b27] uppercase tracking-widest block">
              100% Encrypted Order Terminal
            </span>
            <h1 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight text-white mt-1 leading-tight">
              Proceed With Outward Dispatch Profile
            </h1>
          </div>
        </div>
      </section>

      {/* Main Form Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {items.length === 0 ? (
          <div className="text-center py-16 bg-[#0f1311] border border-slate-800 rounded-2xl max-w-xl mx-auto">
            <ShoppingCart className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h3 className="font-display font-bold text-lg text-white mb-2">Your Cart is Empty</h3>
            <p className="text-slate-400 text-xs max-w-sm mx-auto leading-relaxed mb-6 font-sans">
              You must add premium banknotes assets to your cart builder before accessing the secure checkout terminal.
            </p>
            <Link 
              href="/products"
              className="px-6 py-2.5 bg-emerald-500 text-black rounded-lg text-xs font-bold uppercase tracking-widest transition-colors inline-block"
            >
              Configure Bill Packs
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT COLUMN: Customer Coordinates Form (7 cols) */}
            <div className="lg:col-span-7">
              <form onSubmit={handleSubmit} className="bg-[#0f1311] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 text-left animate-fade-in">
                
                <div>
                  <h3 className="font-display font-medium text-sm text-white uppercase tracking-wider border-b border-slate-800 pb-3 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" /> 1. Shipping Coordinates Info
                  </h3>
                </div>

                {/* Country Selection */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">
                    Country / Region
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      { code: 'US', name: 'United States', flag: '🇺🇸' },
                      { code: 'CA', name: 'Canada', flag: '🇨🇦' },
                      { code: 'AU', name: 'Australia', flag: '🇦🇺' },
                      { code: 'UK', name: 'United Kingdom', flag: '🇬🇧' },
                      { code: 'IE', name: 'Ireland', flag: '🇮🇪' },
                      { code: 'OTHER', name: 'International', flag: '🌐' },
                    ].map((item) => (
                      <button
                        key={item.code}
                        type="button"
                        onClick={() => handleCountryChange(item.code)}
                        className={`flex flex-col sm:flex-row items-center justify-center gap-2 px-3 py-3 rounded-xl border text-xs font-bold transition-all duration-200 cursor-pointer ${
                          country === item.code
                            ? 'bg-emerald-500/10 border-emerald-500 text-white shadow-md shadow-emerald-500/5'
                            : 'bg-[#070908] border-slate-850 text-slate-400 hover:text-white hover:border-slate-700'
                        }`}
                      >
                        <span className="text-base leading-none">{item.flag}</span>
                        <span>{item.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">
                      First Name / Alias
                    </label>
                    <input
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="First Name"
                      className="bg-[#070908] border border-slate-800 focus:border-emerald-500 rounded-xl px-4 py-3 placeholder:text-slate-600 focus:outline-none text-white text-xs tracking-wide transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">
                      Last Name
                    </label>
                    <input
                      type="text"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Last Name"
                      className="bg-[#070908] border border-slate-800 focus:border-emerald-500 rounded-xl px-4 py-3 placeholder:text-slate-600 focus:outline-none text-white text-xs tracking-wide transition-colors"
                    />
                  </div>
                </div>

                {/* Email and Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="details@example.com"
                      className="bg-[#070908] border border-slate-800 focus:border-emerald-500 rounded-xl px-4 py-3 placeholder:text-slate-600 focus:outline-none text-white text-xs tracking-wide transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">
                      Phone Number (Secured Chat)
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +1 (555) 0122"
                      className="bg-[#070908] border border-slate-800 focus:border-emerald-500 rounded-xl px-4 py-3 placeholder:text-slate-600 focus:outline-none text-white text-xs tracking-wide transition-colors"
                    />
                  </div>
                </div>

                {/* Shipping Full Address */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">
                    Complete Shipping Address / Drop Location
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    placeholder="Provide Street, City, State/Province, Postal Code, and Country."
                    className="bg-[#070908] border border-slate-800 focus:border-emerald-500 rounded-xl px-4 py-3 placeholder:text-slate-600 focus:outline-none text-white text-xs tracking-wide transition-colors resize-none font-sans"
                  />
                  <span className="text-[9px] font-mono text-slate-500 leading-none">
                    Unbranded plain bubble packages are posted safely. Zero reference keys to inside banknotes.
                  </span>
                </div>

                {/* Shipping Method Selector */}
                <div className="space-y-3 pt-2">
                  <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest block">
                    3. Choose Secure Courier Speed Selection
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { id: 'normal', name: 'Normal Shipping', desc: 'Dispatched in 3-5 days', cost: 20, eligible: true },
                      { id: 'international', name: 'International', desc: 'Dispatched in 7-14 days', cost: 30, eligible: true },
                      { 
                        id: 'sameday', 
                        name: 'Same Day Shipping', 
                        desc: 'Dispatched immediately', 
                        cost: 40, 
                        eligible: ['US', 'CA', 'AU', 'UK', 'IE'].includes(country),
                        disabledDesc: 'Unsupported in'
                      },
                    ].map((opt) => {
                      const isOptionEligible = opt.eligible;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          disabled={!isOptionEligible}
                          onClick={() => setShippingOption(opt.id as any)}
                          className={`p-3.5 rounded-xl border text-left flex flex-col justify-between transition-all duration-200 relative cursor-pointer ${
                            !isOptionEligible
                              ? 'bg-black/10 border-slate-900 opacity-40 cursor-not-allowed'
                              : shippingOption === opt.id
                              ? 'bg-emerald-500/10 border-emerald-500 text-white shadow-lg shadow-emerald-500/5'
                              : 'bg-[#070908] border-slate-850 text-slate-400 hover:border-slate-700 hover:text-white'
                          }`}
                        >
                          <div className="flex justify-between items-center w-full mb-1">
                            <span className={`font-bold text-xs font-mono ${!isOptionEligible ? 'text-slate-600' : 'text-white'}`}>{opt.name}</span>
                            <span className={`text-[11px] font-mono font-extrabold ${!isOptionEligible ? 'text-slate-600' : shippingOption === opt.id ? 'text-emerald-400' : 'text-slate-300'}`}>
                              ${opt.cost}
                            </span>
                          </div>
                          <span className="text-[10px] text-slate-500 font-sans leading-none mt-1">
                            {isOptionEligible ? opt.desc : `${opt.disabledDesc} ${country}`}
                          </span>
                          {shippingOption === opt.id && isOptionEligible && (
                            <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                  {country && !['US', 'CA', 'AU', 'UK', 'IE'].includes(country) && (
                    <p className="text-[9.5px] font-mono text-amber-500/80 flex items-center gap-1.5 pt-0.5">
                      <Info className="w-3.5 h-3.5 flex-shrink-0 text-amber-500" /> Note: Same Day shipping is only available for Australia, US, Canada, UK, and Ireland.
                    </p>
                  )}
                </div>

                {/* Order Notes */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">
                    Custom Order Notes / Instructions (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    placeholder="Specify sequential numbering patterns, color calibration or film production needs."
                    className="bg-[#070908] border border-slate-800 focus:border-emerald-500 rounded-xl px-4 py-3 placeholder:text-slate-600 focus:outline-none text-white text-xs tracking-wide transition-colors resize-none font-sans"
                  />
                </div>

                <div>
                  <h3 className="font-display font-medium text-sm text-white uppercase tracking-wider border-b border-slate-800 pb-3 flex items-center gap-2 mt-2">
                    <Lock className="w-4 h-4 text-emerald-400" /> 2. Secure Transfer Option
                  </h3>
                </div>

                {/* Dynamic Payment Option selection based on selected Country */}
                <div className="space-y-4">
                  <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest block">
                    Choose Settlement Method
                  </label>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {(() => {
                      let methods: string[] = [];
                      if (country === 'US') {
                        methods = ['crypto', 'zelle', 'apple_cash', 'chime', 'credit_card'];
                      } else if (country === 'CA') {
                        methods = ['crypto', 'e_transfer', 'credit_card'];
                      } else if (country === 'AU') {
                        methods = ['crypto', 'bank_transfer', 'credit_card'];
                      } else {
                        methods = ['crypto', 'bank_transfer', 'credit_card'];
                      }

                      return methods.map((methodId) => (
                        <button
                          key={methodId}
                          type="button"
                          onClick={() => setSelectedPayment(methodId)}
                          className={`p-4 rounded-xl border text-left flex items-center justify-between transition-all duration-200 cursor-pointer relative ${
                            selectedPayment === methodId
                              ? 'bg-emerald-500/10 border-emerald-500 text-white shadow-lg shadow-emerald-500/5'
                              : 'bg-[#070908] border-slate-850 text-slate-400 hover:border-slate-700'
                          } ${methodId === 'crypto' ? 'border-amber-500/30' : ''}`}
                        >
                          <div className="flex items-center gap-2">
                            {getPaymentLogo(methodId)}
                            {methodId === 'crypto' && (
                              <span className="bg-amber-500/10 text-amber-400 text-[8px] font-mono px-1.5 py-0.5 rounded font-extrabold flex items-center gap-0.5 animate-pulse uppercase tracking-wider">
                                ★ Best Discreet Option
                              </span>
                            )}
                          </div>
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            selectedPayment === methodId ? 'border-emerald-500 bg-emerald-500' : 'border-slate-600'
                          }`}>
                            {selectedPayment === methodId && (
                              <div className="w-1.5 h-1.5 rounded-full bg-black" />
                            )}
                          </div>
                        </button>
                      ));
                    })()}
                  </div>

                  {/* Dynamic Settlement Instructions Notice Box */}
                  {selectedPayment && paymentDetails[selectedPayment] && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-[#c59b27]/5 border border-[#c59b27]/20 p-4 rounded-xl flex items-start gap-3 mt-3.5"
                    >
                      <Info className="w-4 h-4 text-[#c59b27] flex-shrink-0 mt-0.5" />
                      <div className="text-left">
                        <span className="text-[10px] font-mono text-[#c59b27] uppercase tracking-wider font-extrabold block mb-0.5">
                          {paymentDetails[selectedPayment].name} Instructions
                        </span>
                        <p className="font-sans text-[11px] text-gray-300 leading-relaxed explanation">
                          {paymentDetails[selectedPayment].notice}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Anti-Spam protection Honeypot (Visually hidden to humans, bot bait) */}
                <div className="absolute left-[-9999px] top-[-9999px] opacity-0 select-none pointer-events-none">
                  <input
                    type="text"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    placeholder="Leave empty"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {/* Errors display */}
                {errorMsg && (
                  <div className="bg-rose-950/20 border border-rose-500/30 p-4 rounded-xl flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
                    <p className="font-sans text-[11px] text-rose-400 leading-relaxed explanation">
                      {errorMsg}
                    </p>
                  </div>
                )}

                {/* Submitting Actions */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-800 disabled:text-slate-500 text-black text-xs font-bold uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/10 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Verifying Ledger Systems...</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        <span>Submit Secure Order Profile</span>
                      </>
                    )}
                  </button>
                  <p className="text-center font-mono text-[9px] text-slate-500 mt-3 flex items-center justify-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Safe SSL Terminal Encryption Active.
                  </p>
                </div>

              </form>
            </div>

            {/* RIGHT COLUMN: Order Review Panel (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Order summary container */}
              <div className="bg-[#161B22] border border-slate-800 rounded-2xl p-6 text-left relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl"></div>
                
                <h3 className="font-display font-medium text-sm text-white uppercase tracking-wider border-b border-slate-800 pb-3 flex items-center justify-between">
                  <span>Order Review</span>
                  <span className="font-mono text-xs text-slate-500 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded">
                    {totalQty} Items
                  </span>
                </h3>

                {/* Items loop */}
                <div className="divide-y divide-slate-800 border border-slate-800 rounded-xl overflow-hidden bg-black/20 my-4 max-h-[300px] overflow-y-auto custom-scroll">
                  {items.map((item) => (
                    <div key={item.key} className="p-3.5 flex justify-between items-start gap-4 hover:bg-slate-800/10 transition-colors">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-sans text-xs font-bold text-white leading-normal truncate">
                          {item.name}
                        </h4>
                        <div className="text-[10px] font-mono text-slate-400 mt-1 flex items-center gap-4">
                          <span className="bg-slate-850 px-1.5 py-0.25 rounded text-slate-300">
                            {item.variant}
                          </span>
                          <span className="text-emerald-400/80">Qty: {item.qty}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end self-stretch justify-between flex-shrink-0">
                        <span className="text-[11px] font-bold font-mono text-emerald-400 font-bold">
                          ${item.price * item.qty}
                        </span>
                        <button
                          onClick={() => removeItem(item.key)}
                          className="text-slate-600 hover:text-rose-400 transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Sub totals */}
                <div className="space-y-2 pt-2 border-t border-slate-800 text-xs font-sans text-slate-400">
                  <div className="flex justify-between">
                    <span>Items Subtotal:</span>
                    <span className="font-mono text-slate-350 font-extrabold">${totalCost} USD</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Secure Courier (Shipping):</span>
                    <span className="text-emerald-400 font-mono font-bold uppercase">
                      {getShippingName()} (${getShippingCost()})
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax Integration:</span>
                    <span className="font-mono">N/A (Theatrical Exemption)</span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-white pt-3 border-t border-slate-800/60 select-all font-mono font-extrabold">
                    <span>Grand Total:</span>
                    <span className="text-emerald-500 font-bold text-base">${totalCost + getShippingCost()} USD</span>
                  </div>
                </div>

              </div>

              {/* Secure logistics guarantee callout */}
              <div className="bg-[#0f1311] border border-emerald-500/15 rounded-2xl p-6 text-left space-y-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-400">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-xs uppercase tracking-wider text-white">
                      Professional Packing Policy
                    </h4>
                    <span className="text-[9px] font-mono text-emerald-500 leading-none">Safe Film Props Production Standards</span>
                  </div>
                </div>
                <p className="font-sans text-[11px] text-gray-400 leading-relaxed py-1">
                  Our raw cotton-milled replicas are vacuum compressed flat under heavy plastics, securing sheets against moisture spikes during long transit routes. Outer mailers carry no tracking references to prop assets, keeping your coordinate address clean.
                </p>
                <div className="text-[9.5px] font-mono text-[#c59b27] bg-[#c59b27]/5 border border-[#c59b27]/10 p-3 rounded-lg flex items-start gap-1.5 uppercase leading-normal">
                  <Info className="w-4 h-4 flex-shrink-0" />
                  <span>Iodine test pen resistant: cellulose blend avoids typical chemical pen darkening, leaving markers bright.</span>
                </div>
              </div>

            </div>

          </div>
        )}
      </section>

    </div>
  );
}
