import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Scale, AlertTriangle, ArrowRight } from 'lucide-react';
import { Breadcrumbs } from '@/components/LayoutTemplates';

export default function TermsPage() {
  return (
    <div className="bg-[#070908] text-white">
      
      {/* Header splash */}
      <section className="bg-gradient-to-b from-[#090d0b] to-[#070908] py-16 border-b border-gray-900 select-none">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Breadcrumbs paths={[{ name: 'Terms of Use' }]} />
          
          <div className="max-w-3xl mt-4 text-left">
            <span className="text-[10px] font-mono text-[#c59b27] uppercase tracking-widest block">
              Platform Operations Agreement
            </span>
            <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white mt-2 mb-4 uppercase">
              Terms of Use &amp; Operations Protocol
            </h1>
            <p className="font-sans text-xs text-gray-500 leading-relaxed">
              Effective Date: June 06, 2026. Please read this agreement thoroughly before placing orders with our printing facility.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16 text-left">


        <div className="prose prose-invert prose-sm font-sans text-xs sm:text-sm text-gray-400 space-y-8 font-normal leading-relaxed">
          
          <div className="space-y-3">
            <h3 className="font-display text-xs font-bold text-white uppercase tracking-wider">
              1. Quality Calibration Overview
            </h3>
            <p>
              By selecting and ordering products, you acknowledge that all items in our catalog are premium art replicas model assets. They do not possess cash value and are designed for authentic prop display, private collection, and educational simulation.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-display text-xs font-bold text-white uppercase tracking-wider">
              2. Recommended Storage Rules
            </h3>
            <p>
              Products must be stored flat in dry, temperature-controlled locations to preserve the matte surface sealers. Avoid direct exposure to liquid solutions or extreme temperature changes.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-display text-xs font-bold text-white uppercase tracking-wider">
              3. Client Coordinate Dispatch Release
            </h3>
            <p>
              Our operations desks ensure safe hand-off to premium couriers. Once tracking profiles are delivered, local administrative delays or carrier handle issues are managed directly in secure messaging networks.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-display text-xs font-bold text-white uppercase tracking-wider">
              4. Payment &amp; Encryption Safety
            </h3>
            <p>
              Payments coordinates must observe our secure encrypted WhatsApp/Signal messaging channels. Orders are verified and packages dispatched safely inside anonymous cardboard boxes within 24 hours of coordinate confirmation.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-display text-xs font-bold text-white uppercase tracking-wider">
              5. Shipping Dispatch Guidelines
            </h3>
            <p>
              Our custom packing keeps shipments safe and guarantees over 98.6% package delivery clearance. Once printing runs are active, packages cannot be recalled from active dispatch centers.
            </p>
          </div>

        </div>

        <div className="mt-12 bg-gradient-to-r from-[#042918] to-transparent border border-gray-800 rounded-xl p-6 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex flex-col">
            <span className="text-[10px] font-mono text-[#c59b27] uppercase">Require customization details?</span>
            <span className="font-display text-xs font-bold text-white uppercase mt-1">Settle custom bulk matrices securely</span>
          </div>
          <Link href="/contact" className="px-5 py-2.5 bg-[#FF6B1A] text-white hover:bg-[#e05610] text-[10px] font-mono font-bold tracking-widest uppercase rounded">
            Discuss with Operators
          </Link>
        </div>

      </section>

    </div>
  );
}
