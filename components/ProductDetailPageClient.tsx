'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Award, 
  CheckCircle, 
  ShieldCheck, 
  Mail, 
  Phone, 
  Maximize2,
  Info,
  Layers,
  Container,
  Truck,
  Plus
} from 'lucide-react';
import { useOrder } from '@/context/OrderContext';
import { Breadcrumbs } from '@/components/LayoutTemplates';

interface ProductDetailPageClientProps {
  product: any;
  relatedProducts: any[];
}

export default function ProductDetailPageClient({ product, relatedProducts }: ProductDetailPageClientProps) {
  const { addToOrder } = useOrder();
  
  // Dynamic Currency Parsing
  const parts = (product.id || '').split('-');
  const currencyCode = (parts[0] || 'usd').toUpperCase();
  const symbols: { [key: string]: string } = {
    USD: '$',
    CAD: '$',
    AUD: '$',
    GBP: '£',
    EUR: '€'
  };
  const currencySymbol = symbols[currencyCode] || '$';

  // States
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [activeTab, setActiveTab] = useState<'contents' | 'storage' | 'supply'>('contents');
  const [isAdded, setIsAdded] = useState(false);
  const [coaExpanded, setCoaExpanded] = useState(false);

  const activeVariant = product.variants[selectedVariantIdx];

  // Action: Add to Order
  const handleAdd = () => {
    addToOrder({
      slug: product.slug,
      name: product.name,
      variant: activeVariant.name,
      price: activeVariant.price
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  // Pre-fills a message for WhatsApp with product + variant + price as requested
  const handleWAOrder = () => {
    let text = `═══ REEL CASH & CURRENCY DIRECT ORDER ═══\n\n`;
    text += `Hello! I would like to place an order immediately for:\n`;
    text += `• Product: ${product.name}\n`;
    text += `• Selected Pack: ${activeVariant.name}\n`;
    text += `• Rate Amount: ${currencySymbol}${activeVariant.price} ${currencyCode}\n\n`;
    text += `Please send me payment instructions and dispatch timeline.\n`;
    text += `══════════════════════════════════════`;
    const number = "447341056054"; // Support line
    window.open(`https://wa.me/${number}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };

  const handleEmailOrder = () => {
    let text = `Hello! I would like to place an order immediately for:\n\n`;
    text += `• Product: ${product.name}\n`;
    text += `• Selected Pack: ${activeVariant.name}\n`;
    text += `• Rate Amount: ${currencySymbol}${activeVariant.price} ${currencyCode}\n\n`;
    text += `Please send me payment instructions and dispatch timeline.\n`;
    const mailtoUrl = `mailto:sales@reelbills.com?subject=Direct Prop Order Request&body=${encodeURIComponent(text)}`;
    window.location.href = mailtoUrl;
  };

  // Trust Badges definition
  const trustBadgeGrid = [
    { label: 'Tactile Engraving', desc: 'Slightly raised texture surfaces.', icon: <Layers className="w-5 h-5 text-[#c59b27]" /> },
    { label: 'Matte Anti-Reflective', desc: 'Absorbs glare under heavy studio lamps.', icon: <Award className="w-5 h-5 text-[#c59b27]" /> },
    { label: 'Premium Substrate Weave', desc: 'Exact density and weight values for counts.', icon: <Layers className="w-5 h-5 text-[#c59b27]" /> },
    { label: 'Traceable Packaging', desc: 'Secure, generic, vacuum-sealed shipping mailers.', icon: <Truck className="w-5 h-5 text-[#c59b27]" /> }
  ];

  return (
    <div className="bg-[#070908] text-white">
      
      {/* 2-Column Grid (Image Left, Info Right) as requested */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs paths={[{ name: 'Shop', href: '/products' }, { name: product.name }]} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-6">
          
          {/* LÈFT COLUMN: Main product image + thumbnail switcher (3 images) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            
            {/* Main Image */}
            <div className="relative h-80 sm:h-[450px] w-full rounded-2xl overflow-hidden bg-[#0f1311] border border-gray-800 shadow-xl group">
              <Image 
                src={product.images[activeImageIdx] || product.image} 
                alt={`${product.name} - Angle ${activeImageIdx + 1}`} 
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 500px"
                className="object-cover transition-all duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 bg-[#042918] text-[#eadaad] text-[9px] font-mono border border-[#c59b27]/30 px-2.5 py-1 rounded">
                CLOSE-UP VIEW
              </div>
            </div>

            {/* Thumbnail Switcher (3 images) */}
            <div className="grid grid-cols-3 gap-3 select-none">
              {product.images.map((img: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`relative h-20 rounded-lg overflow-hidden bg-[#0f1311] border transition-all ${
                    activeImageIdx === idx 
                      ? 'border-[#FF6B1A] ring-1 ring-[#FF6B1A]' 
                      : 'border-gray-800 opacity-60 hover:opacity-100'
                  }`}
                  aria-label={`View banknote image angle ${idx + 1}`}
                >
                  <Image 
                    src={img} 
                    alt={`Angle viewpoint thumbnail ${idx + 1}`}
                    fill
                    sizes="100px"
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </button>
              ))}
            </div>

          </div>

          {/* RÌGHT COLUMN: Category, Title, Price, Variants, Buttons, Info box... */}
          <div className="lg:col-span-12 xl:col-span-7 flex flex-col text-left">
            
            {/* Category tag */}
            <span className="text-[10px] font-mono text-[#c59b27] uppercase tracking-widest font-extrabold mb-3 bg-[#042918] self-start px-2.5 py-1 rounded border border-[#c59b27]/25">
              Category: {product.tag}
            </span>

            {/* H1 product title */}
            <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white mb-4 line-clamp-2">
              {product.name}
            </h1>

            {/* Price display with 'from' prefix + in-stock badge */}
            <div className="flex items-center gap-4 mb-6 select-none bg-[#0f1311] border border-gray-800/80 p-4 rounded-xl self-start">
              <div className="flex flex-col">
                <span className="text-[9px] font-mono text-gray-500 uppercase">Pricing Option:</span>
                <span className="font-display font-extrabold text-white text-lg mt-0.5">
                  <span className="text-gray-500 font-normal text-xs mr-1">from</span>
                  {currencySymbol}{activeVariant.price} {currencyCode}
                </span>
              </div>
              <div className="h-8 w-[1px] bg-gray-800"></div>
              <span className="inline-flex items-center gap-1 text-[10px] font-mono text-green-500 font-bold bg-green-500/10 px-2.5 py-1 rounded">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                <span>STATE VAULT FILLED</span>
              </span>
            </div>

            {/* Product description excerpt */}
            <p className="font-sans text-xs sm:text-sm text-gray-400 leading-relaxed mb-6 font-normal whitespace-pre-line">
              {product.detailedDescription}
            </p>

            {/* Variant selector buttons (with savings labels) */}
            <div className="space-y-2 mb-6">
              <span className="text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest block">
                Select Customized Volume Pack:
              </span>
              <div className="flex flex-col gap-2">
                {product.variants.map((v: any, idx: number) => (
                  <button
                    key={v.name}
                    onClick={() => setSelectedVariantIdx(idx)}
                    className={`flex justify-between items-center text-left text-[11px] px-4 py-3 rounded-lg font-mono font-bold tracking-tight transition-all ${
                      selectedVariantIdx === idx
                        ? 'bg-[#042918] text-[#eadaad] border border-[#c59b27]'
                        : 'bg-[#0f1311] text-gray-400 border border-transparent hover:border-gray-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full border flex items-center justify-center ${selectedVariantIdx === idx ? 'border-[#FF6B1A]' : 'border-gray-600'}`}>
                        {selectedVariantIdx === idx && <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B1A]"></div>}
                      </div>
                      <span className="text-white font-bold">{v.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-gray-500 line-through text-[10px]">{currencySymbol}{v.originalPrice}</span>
                      <span className="text-[#FF6B1A] font-extrabold text-sm">{currencySymbol}{v.price}</span>
                      <span className="bg-green-500/15 text-green-400 px-1.5 py-0.5 rounded text-[9px] font-extrabold uppercase">{v.savings}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Direct Order Actions Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 select-none">
              
              {/* Order via WhatsApp pre-filled */}
              <button
                onClick={handleWAOrder}
                id="product-detail-whatsapp-btn"
                className="py-3 px-4 bg-[#25D366] hover:bg-[#20ba5a] text-white text-[11px] font-bold tracking-widest uppercase rounded flex items-center justify-center gap-1.5 transition-colors active:scale-95"
              >
                <Phone className="w-4 h-4 fill-current" />
                <span>WhatsApp Order</span>
              </button>

              {/* Email Order Button */}
              <button
                onClick={handleEmailOrder}
                id="product-detail-email-btn"
                className="py-3 px-4 bg-transparent text-gray-300 hover:text-white border border-gray-800 hover:border-gray-500 text-[11px] font-bold tracking-widest uppercase rounded flex items-center justify-center gap-1.5 transition-colors active:scale-95"
              >
                <Mail className="w-4 h-4" />
                <span>Email Invoice</span>
              </button>

              {/* Add to Draft button */}
              <button
                onClick={handleAdd}
                id="product-detail-add-btn"
                className={`py-3 px-4 rounded text-[11px] font-bold tracking-widest uppercase transition-all duration-300 ${
                  isAdded
                    ? 'bg-green-600 text-white'
                    : 'bg-[#FF6B1A] hover:bg-[#e05610] text-[#070908] hover:text-white'
                }`}
              >
                {isAdded ? '✓ Added' : 'Add to Order'}
              </button>
            </div>

            {/* How ordering works info box (orange left border) */}
            <div className="border-l-4 border-[#FF6B1A] bg-[#0f1311] rounded-r-xl p-4 mb-4 select-none">
              <div className="flex gap-2 text-[10px] font-mono font-bold text-[#eadaad] uppercase tracking-widest mb-1 items-center">
                <Info className="w-3.5 h-3.5 text-[#FF6B1A]" />
                <span>How Ordering Works</span>
              </div>
              <p className="font-sans text-[11px] text-gray-500 leading-relaxed font-normal">
                Select your localized volume pack above and click any transmission trigger. Our encrypted operators will confirm details, verify address coordinates, and deliver payment instructions directly.
              </p>
            </div>



            {/* COA/verification link button */}
            <div className="mb-8 select-none text-left">
              <button
                onClick={() => setCoaExpanded(!coaExpanded)}
                className="px-4 py-2.5 bg-black hover:bg-[#141816] text-[#eadaad] border border-gray-800 hover:border-gray-600 rounded-lg text-[10px] font-mono font-bold uppercase tracking-widest flex items-center gap-2"
                aria-label="View security certificate registry data"
              >
                <Award className="w-4 h-4 text-[#c59b27]" />
                <span>View Security COA Certificate</span>
              </button>

              {coaExpanded && (
                <div className="mt-4 p-4 bg-[#0a0d0c] border border-[#c59b27]/30 rounded-lg text-[10px] font-mono text-gray-400 leading-relaxed">
                  <p className="font-bold text-[#c59b27] uppercase text-xs mb-1">COA Registry Verification Status</p>
                  <p>CERTIFICATE NUMBER: COA-{currencyCode}-0912</p>
                  <p>STATUS: ISSUED &amp; APPROVED</p>
                  <p className="mt-2 text-gray-500 select-all font-normal">
                    MD5-HASH: fe80::5054:ff:fe00:fa12-verified-intaglio-plate-grade-cotton-blend
                  </p>
                </div>
              )}
            </div>

            {/* 3 tabs: Package Contents / Storage / Supply Chain */}
            <div className="border border-gray-800 rounded-xl overflow-hidden bg-[#0f1311] select-none mb-10">
              <div className="flex border-b border-gray-800 font-mono text-[10px] font-bold uppercase">
                <button
                  onClick={() => setActiveTab('contents')}
                  className={`flex-1 py-3 text-center transition-colors border-r border-gray-800 ${activeTab === 'contents' ? 'bg-[#042918] text-[#eadaad]' : 'text-gray-400 hover:text-white'}`}
                >
                  Package Contents
                </button>
                <button
                  onClick={() => setActiveTab('storage')}
                  className={`flex-1 py-3 text-center transition-colors border-r border-gray-800 ${activeTab === 'storage' ? 'bg-[#042918] text-[#eadaad]' : 'text-gray-400 hover:text-white'}`}
                >
                  Storage
                </button>
                <button
                  onClick={() => setActiveTab('supply')}
                  className={`flex-1 py-3 text-center transition-colors ${activeTab === 'supply' ? 'bg-[#042918] text-[#eadaad]' : 'text-gray-400 hover:text-white'}`}
                >
                  Supply Chain
                </button>
              </div>

              <div className="p-5 font-sans text-xs text-gray-400 leading-relaxed text-left font-normal">
                {activeTab === 'contents' && <p>{product.packageContents}</p>}
                {activeTab === 'storage' && <p>{product.storage}</p>}
                {activeTab === 'supply' && <p>{product.supplyChain}</p>}
              </div>
            </div>

            {/* 4 trust badges grid */}
            <div className="grid grid-cols-2 gap-4 border-t border-gray-800 pt-8 mt-4 select-none">
              {trustBadgeGrid.map((item, idx) => (
                <div key={idx} className="flex gap-2.5 text-left">
                  <div className="p-2 bg-[#042918] rounded border border-[#c59b27]/20 flex-shrink-0 w-9 h-9 flex items-center justify-center mt-0.5">
                    {item.icon}
                  </div>
                  <div className="flex flex-col">
                    <h5 className="font-display font-bold text-[10px] text-[#eadaad] uppercase tracking-wider">{item.label}</h5>
                    <p className="text-[10px] text-gray-500 font-normal leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>

      {/* Related Products Grid (4 cards) */}
      <section className="bg-[#050706] border-t border-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center select-none mb-10">
          <span className="text-[10px] font-mono text-[#c59b27] uppercase tracking-widest">Compatible Assets Portfolio</span>
          <h2 className="font-display text-lg sm:text-xl font-bold tracking-tight text-white mt-2 uppercase">
            Recommended Banknote Replicas
          </h2>
          <p className="font-sans text-xs text-gray-500 max-w-sm mx-auto leading-relaxed mt-2 font-normal">
            Secure consistent film props from our other verified banknote denominations below.
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {relatedProducts.slice(0, 4).map((rp) => (
            <div 
              key={rp.id}
              className="bg-[#0f1311] border border-gray-800 rounded-xl overflow-hidden p-4 flex flex-col justify-between hover:border-[#c59b27]/30 transition-colors"
            >
              <div className="relative h-36 bg-black rounded-lg overflow-hidden mb-3">
                <Image 
                  src={rp.image} 
                  alt={rp.name} 
                  fill
                  sizes="180px"
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              <div className="text-left flex-grow">
                <span className="text-[8px] font-mono text-[#c59b27] uppercase tracking-widest font-extrabold">{rp.tag}</span>
                <h5 className="font-display font-bold text-xs text-white mt-1 line-clamp-1">{rp.name}</h5>
                <p className="text-[10px] text-gray-500 line-clamp-2 mt-1 font-sans font-normal leading-tight">{rp.description}</p>
              </div>

              <div className="pt-3 border-t border-gray-800/60 mt-4 flex items-center justify-between">
                <span className="text-[11px] font-mono font-extrabold text-[#FF6B1A]">${rp.basePrice}</span>
                <Link 
                  href={`/products/${rp.slug}`}
                  className="px-2.5 py-1.5 bg-[#042918] hover:bg-[#c59b27] hover:text-white text-[8px] font-mono font-bold uppercase tracking-widest rounded text-[#eadaad] transition-colors"
                >
                  Configure
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
