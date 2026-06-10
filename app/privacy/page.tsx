import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Lock, EyeOff } from 'lucide-react';
import { Breadcrumbs } from '@/components/LayoutTemplates';

export default function PrivacyPage() {
  return (
    <div className="bg-[#070908] text-white">
      
      {/* Header splash */}
      <section className="bg-gradient-to-b from-[#090d0b] to-[#070908] py-16 border-b border-gray-900 select-none">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Breadcrumbs paths={[{ name: 'Privacy Policy' }]} />
          
          <div className="max-w-3xl mt-4 text-left">
            <span className="text-[10px] font-mono text-[#c59b27] uppercase tracking-widest block">
              Cryptographic Data Covenant
            </span>
            <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white mt-2 mb-4 uppercase">
              Physical &amp; Digital Privacy Covenant
            </h1>
            <p className="font-sans text-xs text-gray-500 leading-relaxed">
              Effective Date: June 06, 2026. Settle your transaction details with absolute security. We implement strict data zero-retention rules.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16 text-left">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 select-none">
          <div className="bg-[#0f1311] border border-gray-800 p-5 rounded-xl">
            <Lock className="w-6 h-6 text-[#c59b27] mb-3" />
            <h4 className="font-display text-xs font-bold text-white uppercase tracking-wide mb-1">Zero Database Log</h4>
            <p className="font-sans text-[10px] text-gray-500 leading-relaxed">We do not preserve client coordinates, payment details, or message invoices in permanent databases.</p>
          </div>
          <div className="bg-[#0f1311] border border-gray-800 p-5 rounded-xl">
            <EyeOff className="w-6 h-6 text-[#c59b27] mb-3" />
            <h4 className="font-display text-xs font-bold text-white uppercase tracking-wide mb-1">Total Anonymity</h4>
            <p className="font-sans text-[10px] text-gray-500 leading-relaxed">External outer packing boxes retain 100% generic indicators. Zero mention of currency prop replicas.</p>
          </div>
          <div className="bg-[#0f1311] border border-gray-800 p-5 rounded-xl">
            <ShieldCheck className="w-6 h-6 text-[#c59b27] mb-3" />
            <h4 className="font-display text-xs font-bold text-white uppercase tracking-wide mb-1">Secure Clearance</h4>
            <p className="font-sans text-[10px] text-gray-500 leading-relaxed">We package inside heavy-duty moisture-proof layers to pass scanning nodes with zero exposure risks.</p>
          </div>
        </div>

        <div className="prose prose-invert prose-sm font-sans text-xs sm:text-sm text-gray-400 space-y-8 font-normal leading-relaxed">
          
          <div className="space-y-3">
            <h3 className="font-display text-xs font-bold text-white uppercase tracking-wider">
              1. Digital Communication Protocol
            </h3>
            <p>
              When initializing our Cart / Order Drawer, we do not monitor or track cookies on server nodes. Clicking WhatsApp or Mail transmits values strictly on standard browser protocol to your client application, with zero local storage retention on external web server hosts.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-display text-xs font-bold text-white uppercase tracking-wider">
              2. Transaction Information Security
            </h3>
            <p>
              All payment negotiations are organized directly on client-to-operator encrypted tunnels like WhatsApp or Signal. We never invite, monitor or handle payment logs inside standard website interfaces.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-display text-xs font-bold text-white uppercase tracking-wider">
              3. Physical Courier Privacy
            </h3>
            <p>
              Your delivery coordinates are used strictly to coordinate final package dispatch pipelines. We print simple logistics labels from non-disclosing corporate accounts with zero identifier markers and vacuum-seal the items to guarantee total visual and physical privacy.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-display text-xs font-bold text-white uppercase tracking-wider">
              4. Complete Record Purging
            </h3>
            <p>
              Once your shipment passes border operations and your support specialist receives coordinate delivery notices, we completely purge all physical, message, and digital metadata from our offline files. Your footprint is permanently deleted.
            </p>
          </div>

        </div>

      </section>

    </div>
  );
}
