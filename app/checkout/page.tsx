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

  // Form feedback states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successOrderNumber, setSuccessOrderNumber] = useState<string | null>(null);

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
              <form onSubmit={handleSubmit} className="bg-[#0f1311] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 text-left">
                
                <div>
                  <h3 className="font-display font-medium text-sm text-white uppercase tracking-wider border-b border-slate-800 pb-3 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" /> 1. Shipping Coordinates info
                  </h3>
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
                    <span>Shipping Handlers:</span>
                    <span className="text-green-400 font-mono font-extrabold uppercase">Free (Discreet Courier)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax Integration:</span>
                    <span className="font-mono">N/A (Theatrical Exemption)</span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-white pt-3 border-t border-slate-800/60 select-all font-mono font-extrabold">
                    <span>Grand Total:</span>
                    <span className="text-emerald-500 font-bold text-base">${totalCost} USD</span>
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
