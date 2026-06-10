'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Search, 
  HelpCircle, 
  ChevronRight, 
  ChevronDown, 
  MessageSquare, 
  ShieldCheck, 
  Truck, 
  Scale, 
  Zap, 
  Tag
} from 'lucide-react';
import { Breadcrumbs } from '@/components/LayoutTemplates';

interface FAQItem {
  id: string;
  category: string;
  q: string;
  a: string;
}

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [expandedFaqs, setExpandedFaqs] = useState<Record<string, boolean>>({});

  const categories = [
    { id: 'all', name: 'All Departments', icon: <HelpCircle className="w-4 h-4" /> },
    { id: 'buying', name: 'Buying & Ordering', icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'pricing', name: 'Pricing', icon: <Tag className="w-4 h-4" /> },
    { id: 'products', name: 'Products', icon: <Zap className="w-4 h-4" /> },
    { id: 'quality', name: 'Quality', icon: <ShieldCheck className="w-4 h-4" /> },
    { id: 'delivery', name: 'Delivery', icon: <Truck className="w-4 h-4" /> },
    { id: 'usage', name: 'Usage', icon: <HelpCircle className="w-4 h-4" /> },
  ];

  const faqItems: FAQItem[] = [
    // Category: Buying & Ordering
    {
      id: 'buy-1',
      category: 'buying',
      q: "How do I place an order for custom banknote blocks?",
      a: "Placing an order is simple: configure your package or add files/items directly to the Order Builder on our Products or Details screens. Once ready, click 'Send via WhatsApp' or 'Send via Email'. This compiles a ciphered summary and drafts it to our support desks. An specialist will confirm your payment choice and coordinates."
    },
    {
      id: "buy-2",
      category: "buying",
      q: "What payment systems do you accept?",
      a: "To protect client identity, we accept secure vouchers, digital store codes, and cryptographic assets (BTC, USDT). Once our support desks confirm your summary, a temporary instruction token is generated."
    },
    {
      id: "buy-3",
      category: "buying",
      q: "Can I edit my order once submitted?",
      a: "Yes. Simply notify your verified specialist through our continuous direct WhatsApp line so we can make adjustments to raw printing sheets before dispatch."
    },

    // Category: Pricing
    {
      id: 'price-1',
      category: 'pricing',
      q: "Are there any wholesale or production studio pricing discounts?",
      a: "Absolutely. Our base rates start at $75 for a starter pack of 50 banknotes. However, our high-volume Studio Vault Pack (500 notes) drops the cost of each replication block by over 50%. Free courier dispatch is applied automatically on select packages."
    },
    {
      id: "price-2",
      category: "pricing",
      q: "Why do $100 and $50 notes cost slightly more than smaller notes?",
      a: "Authentic $100 and $50 banknotes contain unique hot-stamp metallic foils, specialized gold portraits, and physical interwoven elements like the blue 3D ribbon. These require multi-stage production presses, raising manufacturing expenses."
    },
    {
      id: "price-3",
      category: "pricing",
      q: "Are shipping and customs brokerage processing included in the prices?",
      a: "Yes. All products listed on Reel Cash include standard handling, envelope seals, and customs documentation at zero additional cost."
    },

    // Category: Products
    {
      id: 'prod-1',
      category: 'products',
      q: "Do you supply currencies other than US Dollar banknotes?",
      a: "Currently, our website exclusively serves the fully scraped US Dollar products catalog ($100, $50, $20, $10, and $5 notes). We strictly refrain from listing unverified dummy items to keep our platform completely professional and accurate."
    },
    {
      id: "prod-2",
      category: "products",
      q: "Can I order custom serial numbering?",
      a: "Yes. For television productions requiring unique serial registers, we can configure specific sequential matrices. Standard orders are packed with randomized serial records to mirror street patterns."
    },
    {
      id: "prod-3",
      category: "products",
      q: "Are the notes single-sided or double-sided?",
      a: "Every product in our catalog features double-sided micro-engraving, printed back-to-back to match facial and rear configurations perfectly on cameras."
    },

    // Category: Quality
    {
      id: 'qual-1',
      category: 'quality',
      q: "Do your replica banknotes pass iodine pen tests?",
      a: "Yes. Our natural cotton-linen composite paper contains zero wood pulp starch, preventing negative iodine reactions. When marked with a standard detector pen, the marker line remains amber/yellow instead of tuning dark brown/black."
    },
    {
      id: "qual-2",
      category: "quality",
      q: "How do your props reflect studio lighting arrays?",
      a: "Standard printing papers have glossy finishes that white-out under filming spot lights. Our products are pressed with anti-glare matte seal coats, absorbing light vectors to match actual circulating bills."
    },
    {
      id: "qual-3",
      category: "quality",
      q: "How heavy are your cash props?",
      a: "We calibrate density weight from 80gsm to 90gsm, matching the natural lightness and flexibility of circulated currency notes."
    },

    // Category: Delivery
    {
      id: 'del-1',
      category: 'delivery',
      q: "How do you pack and package these currency props?",
      a: "Protection against moisture and discovery is our highest priority. All note blocks are stacked flat, sealed under heavy vacuum plastic, and placed inside generic, unmarked brown cardboard mailers. Invoices label assets as educational materials."
    },
    {
      id: "del-2",
      category: "delivery",
      q: "What is the average international delivery timeline?",
      a: "Standard shipping clears within 2 to 4 business days for major US, Canada, UK, and Australian cities. Express routes (scheduled upon contact) complete delivery inside 48 hours."
    },
    {
      id: "del-3",
      category: "delivery",
      q: "Do you require signatures upon delivery?",
      a: "No. Standard delivery drops inside standard mailbox boxes or secure steps to avoid human contact prerequisites, securing our buyer’s peace of mind."
    },



    // Category: Usage
    {
      id: 'use-1',
      category: 'usage',
      q: "How do I age or wear down crisp prop bills?",
      a: "To simulate heavily worn bills, prop master teams soak notes in black tea blocks to add brownish shades, crumple them manually, or tumble them inside dry cylinders with small smooth rocks to soften cotton fibers."
    },
    {
      id: "use-2",
      category: "usage",
      q: "Can I wash or iron these banknotes?",
      a: "Because they are crafted on cotton-linen composite sheets, they can withstand mild water splashes. Avoid using household dryers since they may distort foil stamps."
    },
    {
      id: "use-3",
      category: "usage",
      q: "Are these props safe for baking/finance simulations?",
      a: "Yes. Standard banking teller trainees use our USD $100 and $50 packs to configure count balances during visual cashier exercises safely."
    }
  ];

  // Logic to filter FAQs based on search input and active category sidebar
  const filteredFaqs = faqItems.filter((item) => {
    const matchSearch = 
      item.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.a.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchCategory = activeCategory === 'all' || item.category === activeCategory;
    
    return matchSearch && matchCategory;
  });

  const toggleExpand = (id: string) => {
    setExpandedFaqs(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Pre-generate Schema JSON-LD representation (FAQPage type)
  const schemaJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.slice(0, 8).map(item => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a
      }
    }))
  };

  return (
    <div className="flex flex-col gap-0 bg-[#070908] text-white">
      
      {/* Schema Block for crawling engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
      />

      {/* Header board */}
      <section className="bg-gradient-to-b from-[#090d0b] to-[#070908] py-16 border-b border-gray-900 select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs paths={[{ name: 'FAQ Matrix' }]} />
          
          <div className="max-w-3xl mt-4">
            <span className="text-[10px] font-mono text-[#c59b27] uppercase tracking-widest">
              Comprehensive Support Board
            </span>
            <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white mt-3 mb-6">
              Frequently Answered Knowledge Base
            </h1>
            <p className="font-sans text-xs sm:text-sm text-gray-400 leading-relaxed">
              Find instant, detailed responses referencing delivery security, substrate materials, and secure WhatsApp orders.
            </p>
          </div>
        </div>
      </section>

      {/* Main interactive directory workspace */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 items-start">
          
          {/* Left Column: Sticky Sidebar Category Menu */}
          <aside className="lg:col-span-1 sticky top-36 bg-[#0f1311] border border-gray-800 rounded-xl p-4 select-none">
            <h3 className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#c59b27] mb-4 pb-2 border-b border-gray-800/60 pl-2">
              Browse Categories
            </h3>
            <div className="flex flex-col gap-1">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    // clear search when category is clicked to keep filters clean
                    setSearchQuery('');
                  }}
                  className={`flex items-center gap-2.5 text-xs font-sans font-semibold tracking-wide py-2 px-3 rounded text-left transition-colors ${
                    activeCategory === cat.id
                      ? 'bg-[#042918] text-[#eadaad] border border-[#c59b27]/30'
                      : 'text-gray-400 hover:text-white hover:bg-[#141816]'
                  }`}
                >
                  <span className={activeCategory === cat.id ? 'text-[#c59b27]' : 'text-gray-500'}>
                    {cat.icon}
                  </span>
                  <span>{cat.name}</span>
                </button>
              ))}
            </div>
          </aside>

          {/* Right Column: Search + FAQ Accordion Listing */}
          <div className="lg:col-span-3 flex flex-col gap-8">
            
            {/* Search Input Bar */}
            <div className="relative bg-[#0f1311] border border-gray-800 rounded-xl p-3 flex items-center">
              <Search className="w-5 h-5 text-gray-500 ml-2" />
              <input
                type="text"
                placeholder="Search queries across our printing lab..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none text-white text-xs font-sans placeholder-gray-500 font-semibold focus:outline-none pl-3 self-stretch"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="text-xs font-mono font-bold text-gray-500 hover:text-white pr-2"
                >
                  [ CLEAR ]
                </button>
              )}
            </div>

            {/* Answer Board */}
            <div className="bg-[#0f1311] border border-gray-800 rounded-xl p-6">
              <div className="pb-4 border-b border-gray-800 flex justify-between items-center select-none mb-6">
                <span className="text-[10px] font-mono text-[#c59b27] uppercase font-bold tracking-widest">
                  Showing {filteredFaqs.length} Answers
                </span>
                <span className="text-[10px] font-mono text-gray-500">
                  Total Questions: {faqItems.length}
                </span>
              </div>

              {filteredFaqs.length > 0 ? (
                <div className="divide-y divide-gray-800/80">
                  {filteredFaqs.map((faq) => {
                    const isExpanded = !!expandedFaqs[faq.id];
                    return (
                      <div key={faq.id} className="py-4">
                        <button
                          onClick={() => toggleExpand(faq.id)}
                          className="w-full flex justify-between items-center text-left py-2 font-display text-sm font-bold text-white hover:text-[#c59b27] transition-all focus:outline-none"
                        >
                          <span className="flex items-center gap-2.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B1A] shrink-0"></span>
                            <span>{faq.q}</span>
                          </span>
                          <ChevronDown className={`w-4 h-4 text-gray-500 transform transition-transform duration-300 ${isExpanded ? 'rotate-180 text-[#c59b27]' : ''}`} />
                        </button>
                        
                        <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-96 mt-3 opacity-100' : 'max-h-0 opacity-0'}`}>
                          <p className="font-sans text-xs text-gray-400 leading-relaxed font-normal p-3 bg-black/20 rounded border border-gray-900">
                            {faq.a}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="py-12 text-center text-gray-500 font-sans select-none flex flex-col items-center gap-3">
                  <HelpCircle className="w-8 h-8 text-gray-700 animate-bounce" />
                  <p className="text-xs">No matching answers found inside our printing databases.</p>
                  <button 
                    onClick={() => { setSearchQuery(''); setActiveCategory('all'); }} 
                    className="text-xs text-[#FF6B1A] uppercase tracking-wider font-bold mt-2 font-mono hover:text-white"
                  >
                    Reset Filter Search
                  </button>
                </div>
              )}
            </div>

            {/* CTA warning banner at the bottom as requested */}
            <div className="bg-gradient-to-r from-[#042918] to-transparent border border-[#c59b27]/20 rounded-xl p-8 flex flex-col md:flex-row justify-between items-center gap-6 mt-6">
              <div className="flex flex-col text-left max-w-xl">
                <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-2">
                  Unresolved Concerns? Discuss With Specialists
                </h4>
                <p className="font-sans text-[11px] text-gray-400 leading-relaxed">
                  Our custom support channels are open 24/7. Connect directly via encrypted WhatsApp messaging for answers regarding payment schedules, custom volumes, or tracking protocols.
                </p>
              </div>
              <Link
                href="/contact"
                className="px-6 py-3 bg-[#FF6B1A] text-white hover:bg-[#e05610] text-[10px] font-mono font-bold tracking-widest uppercase rounded whitespace-nowrap"
              >
                Connect to Support Desk
              </Link>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
