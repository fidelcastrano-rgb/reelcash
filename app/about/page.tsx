'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  FileCheck, 
  MapPin, 
  Users, 
  Award, 
  Layers, 
  ShieldCheck, 
  Cpu, 
  Globe, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  HelpCircle
} from 'lucide-react';
import { Breadcrumbs } from '@/components/LayoutTemplates';

export default function AboutPage() {
  const stats = [
    { num: '40+', label: 'Engraving Engineers', desc: 'Specialist press operators calibrating intaglio plates.' },
    { num: '14K', label: 'Registered Clients', desc: 'Sourced by premier studio hubs and banking schools.' },
    { num: '5', label: 'Global Dispatch Hubs', desc: 'Distributed logistics across USA, CAN, UK, and AUS.' },
    { num: '98.6%', label: 'Transit Pass Count', desc: 'Consistently cleared border controls with zero delays.' }
  ];

  const values = [
    { title: 'Substrate Integrity', desc: 'We only weave 70% raw cotton with 30% linen substrates, avoiding brittle wood-pulp copy paper.', icon: <Layers className="w-5 h-5 text-[#c59b27]" /> },
    { title: 'Micro-Engraving Fidelity', desc: 'Every model undergoes micro-engraving fidelity checks, securing perfect face-to-camera accuracy.', icon: <ShieldCheck className="w-5 h-5 text-[#c59b27]" /> },
    { title: 'Offset Engraving', desc: 'No cheap inkjets. We print our banknotes utilizing custom-milled relief offsets.', icon: <Cpu className="w-5 h-5 text-[#c59b27]" /> },
    { title: 'Color Calibration', desc: 'Pigments are modeled under spectrophotometer scans to remain identical under sunny or neon lights.', icon: <Award className="w-5 h-5 text-[#c59b27]" /> },
    { title: 'Discreet Dispensing', desc: 'Vacuum packing secures cash blocks against humidity blocks. Unmarked security packets protect coordinate privacy completely.', icon: <Globe className="w-5 h-5 text-[#c59b27]" /> },
    { title: 'Order Accountability', desc: 'Customer routing is fully synchronized, letting buyers trace assets easily from packing to delivery.', icon: <FileCheck className="w-5 h-5 text-[#c59b27]" /> },
  ];

  const timeline = [
    { year: '2016', title: 'The Lab Foundation', desc: 'Formed in Wilmington, DE by special fx technicians looking to overcome reflective lighting glare.' },
    { year: '2019', title: 'Intaglio Plate Adaptation', desc: 'Invested in high-pressure intaglio presses, achieving the textured garment weave on presidential coats.' },
    { year: '2021', title: 'Cotton Blend Formulation', desc: 'Sourced natural eco-cotton textile blends to replicate the distinct cash crackle sound during counts.' },
    { year: '2023', title: 'Iodine Defense Integration', desc: 'Chemical components adjusted within the pulp state to bypass standard iodine screening pens.' },
    { year: '2025', title: 'Global Dispatch Syndicate', desc: 'Deployed dedicated vacuum packaging lines across Canada, Australia, and Western Europe.' }
  ];

  const scamTypes = [
    { title: 'Fake Escrow Shops', desc: 'Websites that offer impossible promises and fake tracking, requesting direct wire transfers like Western Union.', icon: <XCircle className="w-6 h-6 text-red-500" /> },
    { title: 'Telegram/Social Scams', desc: 'Vague messaging accounts demanding dynamic digital gift-cards or unregistered crypto codes with zero support.', icon: <XCircle className="w-6 h-6 text-red-500" /> },
    { title: 'Low Novelty Prorates', desc: 'Cheap stores offering thousands of bills for $10. They deliver slick, shiny copy paper that triggers security alerts.', icon: <XCircle className="w-6 h-6 text-red-500" /> }
  ];

  const steps = [
    { title: 'Examine Cotton Composition', desc: 'Standard fake bills emit a white glow under UV bars due to standard starch wood pulp. Real props are silent.' },
    { title: 'Look for the 3D Weave', desc: 'The blue security ribbon must look woven inside the sheet, not printed flat on the surface.' },
    { title: 'Verify Gold Seal Shine', desc: 'Our gold treasury seals utilize luxury hot-stamp metallic coatings rather than flat yellow inks.' },
    { title: 'Test Count Audibility', desc: 'Ruffling or counting should yield a solid, crisp crackle rather than a paper whisper.' },
    { title: 'Confirm Intaglio Texture', desc: 'Slide an index finger over the president’s portrait; you should experience raised fine-line texturing.' }
  ];

  return (
    <div className="flex flex-col gap-0 bg-[#070908] text-white select-none">
      
      {/* 1. Hero with large bg text */}
      <section className="relative py-24 bg-gradient-to-b from-[#090d0b] to-[#070908] border-b border-gray-900 overflow-hidden text-center">
        {/* Large BG Text */}
        <div className="absolute inset-x-0 bottom-0 text-[16vw] font-display font-black leading-none tracking-tighter text-[#042918]/20 select-none pointer-events-none transform translate-y-[20%] uppercase">
          LAB CRAFT
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Breadcrumbs paths={[{ name: 'About Our Lab' }]} />
          
          <div className="max-w-3xl mx-auto mt-6">
            <span className="text-[10px] font-mono text-[#c59b27] uppercase tracking-widest">
              Our Heritage and Capabilities
            </span>
            <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white mt-3 mb-6 leading-tight">
              A Legacy of Forensic Premium Currency Synthesis
            </h1>
            <p className="font-sans text-xs sm:text-sm text-gray-400 leading-relaxed max-w-2xl mx-auto">
              We started with a simple objective: to build prop money that looks flawless in high-definition movies. Today, we supply custom-engineered visual replicas to elite directors and banking instruction systems worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Stats row (4 key numbers) */}
      <section className="py-16 bg-[#0f1311] border-b border-gray-900 select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="font-display text-4xl sm:text-5xl font-bold text-white tracking-tight">
                  {stat.num}
                </span>
                <span className="text-[10px] font-mono text-[#c59b27] uppercase tracking-widest mt-2">
                  {stat.label}
                </span>
                <p className="text-[10px] text-gray-500 font-sans mt-1 max-w-[200px] mx-auto leading-relaxed">
                  {stat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Our Story — 2-column: copy left, COA data card right */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Copy Left */}
          <div className="flex flex-col text-left">
            <span className="text-[10px] font-mono text-[#c59b27] uppercase tracking-widest mb-4">Our Chronology</span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight mb-6">
              When Screen Representation Demanded Raw Tactility
            </h2>
            <p className="font-sans text-xs sm:text-sm text-gray-400 leading-relaxed mb-4">
              Prior to our lab&apos;s research, prop masters faced massive hurdles. Under production spot lighting, typical polymer overlays and plain printing papers reflected massive glares. Standard props felt lightweight and flat, forcing actors to look unconvincing while counting money in heist scenes.
            </p>
            <p className="font-sans text-xs sm:text-sm text-gray-400 leading-relaxed mb-6">
              We adjusted our approach by formulating an exact 70% organic cotton and 30% linen blend. This was paired with specialized anti-glare polyurethane seals to resolve reflection glare entirely. When special effects teams requested bills that could withstand physical inspection, our offset engraving system was integrated.
            </p>
            <div className="flex items-center gap-4 border-t border-gray-800 pt-6 mt-2">
              <div className="text-center bg-[#042918] rounded px-3 py-1 text-[#eadaad] border border-[#c59b27]/30 text-xs font-mono font-bold uppercase tracking-wider">
                4K Studio Certified
              </div>
              <span className="text-[11px] font-sans text-gray-500 leading-normal">
                Engineered perfectly for motion picture close-ups under intense lighting arrays.
              </span>
            </div>
          </div>

          {/* COA Data Card Right */}
          <div className="bg-[#0f1311] border border-gray-800 rounded-2xl p-8 relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#c59b27]/5 rounded-full blur-2xl"></div>
            
            <div className="flex items-center gap-3 pb-6 border-b border-gray-800 select-none">
              <Award className="w-8 h-8 text-[#c59b27]" />
              <div className="flex flex-col">
                <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider">
                  COA Verification Matrix
                </h4>
                <span className="text-[9px] font-mono text-gray-500">Security Certificate Serial #0912-US</span>
              </div>
            </div>

            <div className="mt-6 space-y-4 font-mono text-[11px] text-gray-400">
              <div className="flex justify-between py-1.5 border-b border-gray-800/40">
                <span className="text-gray-500">Substrate Class:</span>
                <span className="text-white font-bold">Cotton-Linen Composite</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-800/40">
                <span className="text-gray-500">Plating Density:</span>
                <span className="text-white font-bold">Intaglio Line relief (&gt;10μ)</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-800/40">
                <span className="text-gray-500">Iodine Pen Test:</span>
                <span className="text-green-400 font-bold">Amber (Safe/Resistant)</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-800/40">
                <span className="text-gray-500">UV Reflection Profile:</span>
                <span className="text-white font-bold">Spectral Absorbi Inert</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-800/40">
                <span className="text-gray-500">Texture Integrity Check:</span>
                <span className="text-[#c59b27] font-bold">Engraved face &amp; rear templates</span>
              </div>
            </div>

            <div className="mt-8 bg-[#042918] border border-[#c59b27]/30 rounded-lg p-4 text-center">
              <span className="text-[10px] font-mono font-bold text-[#eadaad] uppercase tracking-widest block mb-1">
                Authentic Visual Assets
              </span>
              <p className="text-[9px] text-gray-400 font-sans leading-relaxed">
                Tested to pass deep scanning close-ups under 4K macro lenses with zero resolution drop off.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Our Values — 6-card grid */}
      <section className="bg-[#050706] py-24 border-y border-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16 select-none">
            <span className="text-[10px] font-mono text-[#c59b27] uppercase tracking-widest">Our Engineering Values</span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight mt-3 mb-4">
              Commitment To Ultimate Synthesis Quality
            </h2>
            <p className="font-sans text-xs text-gray-400">
              We never cut corners. Our focus remains centered on supplying professional products that represent true craft.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((v, idx) => (
              <div key={idx} className="bg-[#0f1311] border border-gray-800/80 p-6 rounded-xl hover:border-[#c59b27]/35 transition-colors">
                <div className="p-2.5 bg-[#042918] rounded-lg border border-[#c59b27]/10 w-10 h-10 flex items-center justify-center mb-4">
                  {v.icon}
                </div>
                <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-2">
                  {v.title}
                </h4>
                <p className="font-sans text-xs text-gray-400 leading-relaxed font-normal">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. Company Timeline — 5 milestone items */}
      <section className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 select-none">
        <div className="text-center mb-16">
          <span className="text-[10px] font-mono text-[#c59b27] uppercase tracking-widest">Growth Strategy</span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight mt-3 mb-4">
            Development Landmarks &amp; Milestones
          </h2>
          <p className="font-sans text-xs text-gray-400">
            A look back at how we matured from structural VFX experiments to an industry-standard print organization.
          </p>
        </div>

        <div className="relative border-l-2 border-[#042918] ml-4 md:ml-32 space-y-12 py-4">
          {timeline.map((m, idx) => (
            <div key={idx} className="relative pl-8">
              {/* Timeline dot */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#070908] border-2 border-[#FF6B1A] flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B1A]"></div>
              </div>
              
              {/* Year label left side positioning for desktops */}
              <div className="hidden md:block absolute -left-32 top-1 w-24 text-right font-display font-extrabold text-[#c59b27] text-md">
                {m.year}
              </div>

              <div className="flex flex-col">
                <span className="md:hidden font-display font-extrabold text-[#c59b27] text-sm mb-1">{m.year}</span>
                <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider">
                  {m.title}
                </h4>
                <p className="font-sans text-xs text-gray-500 mt-1 max-w-xl leading-relaxed">
                  {m.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Scam Warning section (red themed) as requested */}
      <section className="bg-red-950/20 border-y border-red-900/30 py-24 select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Warning Banner */}
          <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-8 max-w-4xl mx-auto text-center mb-16">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-400" />
              </div>
            </div>
            <h3 className="font-display text-lg sm:text-xl font-bold text-red-400 uppercase tracking-widest mb-3">
              CRITICAL NOTICE: BEWARE OF COUNTERFEIT MONEY SCAMMERS
            </h3>
            <p className="font-sans text-xs text-gray-400 leading-relaxed max-w-2xl mx-auto">
              Scammers on message networks (like Instagram and Telegram) continuously advertise undetectable fake bills that they claim pass every test, promising real currency in return for small crypto payments or gift cards. These are 100% fraudulent rings. Learn how we preserve high quality visual prop integrity safely.
            </p>
          </div>

          {/* 3 Scam type cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
            {scamTypes.map((scam, idx) => (
              <div key={idx} className="bg-black/40 border border-red-900/25 p-6 rounded-xl text-center">
                <div className="flex justify-center mb-4">{scam.icon}</div>
                <h4 className="font-display font-bold text-sm text-red-400 uppercase tracking-wider mb-2">
                  {scam.title}
                </h4>
                <p className="font-sans text-xs text-gray-500 leading-relaxed font-normal">
                  {scam.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Price comparison table */}
          <div className="max-w-4xl mx-auto mb-20 overflow-hidden border border-red-900/25 rounded-2xl bg-black/30">
            <div className="p-5 bg-red-950/40 border-b border-red-900/30 select-none">
              <h4 className="font-display font-bold text-xs uppercase tracking-widest text-red-400">
                Market Comparison: Fraudulent Claims vs Legitimate Props
              </h4>
            </div>
            
            <table className="w-full text-left border-collapse font-sans text-xs">
              <thead>
                <tr className="border-b border-gray-900 bg-black/20 text-gray-400">
                  <th className="p-4 uppercase tracking-wider text-[10px]">Parameter</th>
                  <th className="p-4 uppercase tracking-wider text-[10px] text-red-400">Scam Sites / Channels</th>
                  <th className="p-4 uppercase tracking-wider text-[10px] text-green-400">Genuine Reel Cash Props</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-900/40 text-gray-300">
                <tr>
                  <td className="p-4 font-bold text-white">Asserted Claim</td>
                  <td className="p-4 text-red-400/95">&quot;100% undetectable money for spending&quot;</td>
                  <td className="p-4 text-green-400/95">&quot;UHD-grade cinematic or educational props&quot;</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-white">Pricing Model</td>
                  <td className="p-4">Extremely cheap ($1,000 face value for $50 USD)</td>
                  <td className="p-4">Standard fair value ($75 for a bundle stack of 50 notes)</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-white">Delivery Mode</td>
                  <td className="p-4 text-red-400/80">Requested via untraceable vouchers (never ships)</td>
                  <td className="p-4 text-green-400/90">Trackable international courier dispatch within 24h</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-white">Design Details</td>
                  <td className="p-4">Crude photocopies on simple gloss copy sheet</td>
                  <td className="p-4 font-mono">Cotton-linen composite with raised micro-lines</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 5-step verification guide */}
          <div className="max-w-3xl mx-auto select-none">
            <h4 className="font-display font-bold text-white text-center uppercase tracking-widest text-sm mb-10">
              Our 5-Step Integrity Verification Process
            </h4>
            
            <div className="grid grid-cols-1 gap-6">
              {steps.map((s, idx) => (
                <div key={idx} className="bg-black/30 border border-[#c59b27]/25 rounded-xl p-5 flex gap-4 items-start">
                  <div className="w-6 h-6 rounded-full bg-[#042918] border border-[#c59b27]/40 text-[#eadaad] flex items-center justify-center font-mono font-bold text-[11px] shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <div className="flex flex-col text-left">
                    <h5 className="font-display font-bold text-xs uppercase text-white tracking-wide">
                      {s.title}
                    </h5>
                    <p className="font-sans text-[11px] text-gray-400 mt-1.5 leading-relaxed font-normal">
                      {s.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
