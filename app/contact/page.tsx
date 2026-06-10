'use client';

import React from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  AlertTriangle, 
  ShieldCheck, 
  Info,
  Clock,
  Send,
  HelpCircle
} from 'lucide-react';
import { useOrder } from '@/context/OrderContext';
import { Breadcrumbs } from '@/components/LayoutTemplates';

export default function ContactPage() {
  const { sendWA } = useOrder();

  const responseTimes = [
    { zone: 'United States & Canada', hours: '8:00 AM - 10:00 PM EST', response: '&lt; 5 mins' },
    { zone: 'United Kingdom & Europe', hours: '9:00 AM - 9:00 PM GMT', response: '&lt; 10 mins' },
    { zone: 'Australia & New Zealand', hours: '9:00 AM - 6:00 PM AEST', response: '&lt; 15 mins' },
    { zone: 'SEC Signal/Telegram Desk', hours: '24/7 Mon - Sun', response: '&lt; 15 mins' }
  ];

  const orderFlowSteps = [
    { num: '1', title: 'Assemble Draft', desc: 'Select banknote quantities and variant formats on our product catalog and click "Add to Order".' },
    { num: '2', title: 'Transmit Summary', desc: 'Click "WhatsApp Order" or "Email Order" to transmit your formatted invoice details instantly.' },
    { num: '3', title: 'Configure Payment', desc: 'Our specialist will confirm the payment routing via encryption blocks on WhatsApp or Email.' },
    { num: '4', title: 'Secure Dispatch', desc: 'Your bricks are vacuum packet-sealed and dispatched within 24 hours with an encrypted tracking log.' }
  ];



  const logisticsData = [
    { region: 'United States', standard: '2 - 3 Days (Free)', express: 'Next Day ($35)' },
    { region: 'Canada', standard: '3 - 4 Days ($15)', express: '2 Days ($40)' },
    { region: 'Europe / UK', standard: '3 - 5 Days ($20)', express: '2 Days ($50)' },
    { region: 'Australia', standard: '3 - 5 Days ($20)', express: '2 Working Days ($55)' }
  ];

  return (
    <div className="flex flex-col gap-0 bg-[#070908] text-white">
      
      {/* Page Header splash */}
      <section className="bg-gradient-to-b from-[#090d0b] to-[#070908] py-16 border-b border-gray-900 select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs paths={[{ name: 'Contact support' }]} />
          
          <div className="max-w-3xl mt-4">
            <span className="text-[10px] font-mono text-[#c59b27] uppercase tracking-widest">
              Secure Communications Hub
            </span>
            <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white mt-3 mb-6">
              Connect With Reel Cash Printing Specialists
            </h1>
            <p className="font-sans text-xs sm:text-sm text-gray-400 leading-relaxed">
              We stand prepared to clarify secure logistics schedules, custom sequential serialization requests, and coordinate payment configurations. Contact our team via secure digital platforms.
            </p>
          </div>
        </div>
      </section>

      {/* Main 2-column contact interface as required */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 select-none">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* LEFT COLUMN: WhatsApp card (recommended, green border) + Email Card + 4-Step Order Flow */}
          <div className="flex flex-col gap-8">
            
            {/* WhatsApp Card (Recommended, Green Border, Response Times table) */}
            <div className="border-2 border-[#25D366] bg-[#0f1311] rounded-2xl p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-[#25D366]/10 text-[#25D366] text-[9px] font-mono font-bold uppercase tracking-widest px-2 py-1 rounded border border-[#25D366]/30 animate-pulse">
                RECOMMENDED &amp; FASTEST
              </div>
              
              <div className="flex items-center gap-3.5 pb-5 border-b border-gray-800">
                <div className="w-10 h-10 rounded-full bg-[#25D366]/10 border border-[#25D366]/35 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-[#25D366]" />
                </div>
                <div className="flex flex-col text-left">
                  <h4 className="font-display font-extrabold text-white text-sm uppercase tracking-wide">
                    Live Encryption Chat Line
                  </h4>
                  <span className="text-[10px] font-mono text-gray-400">Secure Remote Messaging Desk</span>
                </div>
              </div>

              <p className="font-sans text-xs text-gray-400 leading-relaxed my-5">
                Our secure messaging channels operate 24/7. Transmit your Order Builder summary directly to double-check customized layout choices with a consultant.
              </p>

              {/* Response Times Table */}
              <div className="bg-black/35 rounded-xl border border-gray-900 overflow-hidden mb-6">
                <div className="p-3 bg-green-500/5 border-b border-gray-900 border-green-500/10 text-left">
                  <span className="font-display font-bold text-[9px] uppercase tracking-widest text-[#25D366]">
                    Global Response Timelines Schedule
                  </span>
                </div>
                <table className="w-full text-left border-collapse font-sans text-[10px] text-gray-400">
                  <thead>
                    <tr className="border-b border-gray-900 bg-black/20 text-gray-500 font-bold">
                      <th className="p-2.5">Region</th>
                      <th className="p-2.5">Operational Hours</th>
                      <th className="p-2.5 text-right">Avg Response</th>
                    </tr>
                  </thead>
                  <tbody>
                    {responseTimes.map((item, idx) => (
                      <tr key={idx} className="border-b border-gray-900/40">
                        <td className="p-2.5 font-semibold text-white">{item.zone}</td>
                        <td className="p-2.5 font-mono">{item.hours}</td>
                        <td className="p-2.5 font-mono text-right font-bold text-[#25D366]" dangerouslySetInnerHTML={{ __html: item.response }}></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <button
                onClick={sendWA}
                id="contact-whatsapp-btn"
                className="w-full py-3.5 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <Phone className="w-4 h-4 fill-current" />
                <span>Transmit Secure Order Via WhatsApp</span>
              </button>
            </div>

            {/* Email Support Card */}
            <div className="bg-[#0f1311] border border-gray-800 rounded-2xl p-6 shadow-xl text-left">
              <div className="flex items-center gap-3 pb-5 border-b border-gray-800">
                <div className="w-10 h-10 rounded-full bg-[#042918] border border-[#c59b27]/25 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-[#c59b27]" />
                </div>
                <div className="flex flex-col">
                  <h4 className="font-display font-bold text-white text-xs uppercase tracking-wider">
                    Official Email Support Desk
                  </h4>
                  <span className="text-[10px] font-mono text-gray-500">Corporate Inquiries</span>
                </div>
              </div>

              <p className="font-sans text-xs text-gray-400 leading-relaxed my-5">
                For film production agencies seeking tax-compliant purchase logs or dynamic sequence serial invoices, dispatch details directly to our mail coordinator.
              </p>

              <div className="bg-[#141816] rounded-xl border border-gray-800 p-4 font-mono text-xs flex justify-between items-center">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[9px] text-gray-500 uppercase">Support Email:</span>
                  <span className="text-white font-bold select-all">sales@reelbills.com</span>
                </div>
                <a 
                  href="mailto:sales@reelbills.com?subject=Inquiry to Reel Cash Printing Lab"
                  className="px-4 py-2 bg-transparent text-gray-300 hover:text-white border border-gray-700 hover:border-gray-500 rounded text-[10px] font-mono font-bold uppercase transition-colors"
                >
                  Draft Mail
                </a>
              </div>
            </div>

            {/* 4-Step Order Flow Board */}
            <div className="bg-[#0f1311] border border-gray-800 rounded-2xl p-6 shadow-xl text-left">
              <h4 className="font-display font-bold text-xs uppercase tracking-widest text-[#eadaad] mb-6 pb-2 border-b border-gray-800">
                Our 4-Step Order &amp; Dispatch Flow
              </h4>
              
              <div className="grid grid-cols-1 gap-6">
                {orderFlowSteps.map((step) => (
                  <div key={step.num} className="flex gap-4 items-start">
                    <div className="w-6 h-6 rounded-full bg-[#042918] border border-[#c59b27]/30 text-[#eadaad] text-[10px] font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {step.num}
                    </div>
                    <div className="flex flex-col">
                      <h5 className="font-display font-bold text-xs uppercase text-white tracking-wide">
                        {step.title}
                      </h5>
                      <p className="font-sans text-[11px] text-gray-400 mt-1 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: No in-store banner (red) + Safety Rules List + Locations Cards + Shipping table */}
          <div className="flex flex-col gap-8">
            
            {/* No In-Store Banner (Red) */}
            <div className="bg-red-950/20 border-2 border-red-500/30 rounded-2xl p-6 text-center select-none shadow-xl">
              <div className="flex justify-center mb-4">
                <div className="w-10 h-10 rounded-full bg-red-500/15 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                </div>
              </div>
              <h4 className="font-display font-bold text-red-400 text-sm uppercase tracking-widest mb-2.5">
                CRITICAL NOTICE: PRIVATE DELIVERY ONLY
              </h4>
              <p className="font-sans text-xs text-gray-400 leading-relaxed max-w-sm mx-auto">
                NOTICE: NO COURIER/IN-STORE PICKUPS ALLOWED. ALL REPLICATIONS DISTRIBUTED SECURELY VIA DISCREET MAIL ONLY TO SECURED LOCATION CHANNELS FOR EXECUTIVE SAFETY.
              </p>
            </div>



            {/* Locations Cards (2 cities) */}
            <div className="bg-[#0f1311] border border-gray-800 rounded-2xl p-6 shadow-xl text-left">
              <h4 className="font-display font-bold text-xs uppercase tracking-widest text-[#eadaad] mb-6 pb-2 border-b border-gray-800">
                Official Administrative Locations
              </h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Location 1 */}
                <div className="bg-black/30 border border-gray-900 rounded-xl p-4 flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#c59b27]" />
                    <span className="font-display font-bold text-xs text-white">United States Headquarters</span>
                  </div>
                  <div className="font-mono text-[10px] text-gray-500">
                    <p>Reel Cash Labs Inc</p>
                    <p>Wilmington, DE 19801</p>
                    <p className="text-red-500 font-bold mt-2 uppercase text-[9px]">Strictly No Walk-ins Allowed</p>
                  </div>
                </div>

                {/* Location 2 */}
                <div className="bg-black/30 border border-gray-900 rounded-xl p-4 flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#c59b27]" />
                    <span className="font-display font-bold text-xs text-white">Australia Logistics Node</span>
                  </div>
                  <div className="font-mono text-[10px] text-gray-500">
                    <p>Reel Transport Syndicate</p>
                    <p>Sydney, NSW 2000</p>
                    <p className="text-[#c59b27] font-bold mt-2 uppercase text-[9px]">Customs Brokerage Clear node</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Shipping & Delivery Logistics Table */}
            <div className="bg-[#0f1311] border border-gray-800 rounded-2xl p-6 shadow-xl text-left">
              <div className="flex items-center gap-2 pb-4 border-b border-gray-800 mb-5">
                <Clock className="w-4 h-4 text-[#c59b27]" />
                <h4 className="font-display font-bold text-xs uppercase tracking-widest text-white">
                  International Transit Tariffs Table
                </h4>
              </div>

              <div className="bg-black/35 rounded-xl border border-gray-900 overflow-hidden">
                <table className="w-full text-left border-collapse font-sans text-[10px] text-gray-400">
                  <thead>
                    <tr className="border-b border-gray-900 bg-black/20 text-gray-500 font-bold uppercase">
                      <th className="p-2.5">Target Destination</th>
                      <th className="p-2.5">Standard Direct</th>
                      <th className="p-2.5 text-right">Express Armored</th>
                    </tr>
                  </thead>
                  <tbody>
                    {logisticsData.map((item, idx) => (
                      <tr key={idx} className="border-b border-gray-900/40 font-mono text-[9px]">
                        <td className="p-2.5 font-bold font-sans text-xs text-white uppercase">{item.region}</td>
                        <td className="p-2.5">{item.standard}</td>
                        <td className="p-2.5 text-right font-bold text-[#FF6B1A]">{item.express}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 flex items-start gap-1.5 font-mono text-[8px] text-gray-500 leading-normal uppercase">
                <Info className="w-3.5 h-3.5 text-[#c59b27] shrink-0 mt-0.5" />
                <span>Every delivery incorporates dual vacuum seal armor-pack sheets protecting banknotes against moisture and pressure variations during transit.</span>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
