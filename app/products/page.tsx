'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Search, 
  Award, 
  FileCheck, 
  Info, 
  Plus, 
  CheckCircle,
  HelpCircle,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { PRODUCTS } from '@/lib/data';
import { useOrder } from '@/context/OrderContext';
import { Breadcrumbs, TrustBar } from '@/components/LayoutTemplates';

interface ProductCardProps {
  product: typeof PRODUCTS[0];
}

function ProductGridCard({ product }: ProductCardProps) {
  const { addToOrder } = useOrder();
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [isAdded, setIsAdded] = useState(false);
  const activeVariant = product.variants[selectedVariantIdx];

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

  return (
    <div 
      className="bg-[#0f1311] border border-gray-800 rounded-xl overflow-hidden shadow-lg hover:border-[#c59b27]/50 transition-all hover:scale-[1.01] flex flex-col h-full"
      data-sp={activeVariant.price}
      data-sv={activeVariant.name}
    >
      {/* Product Image & Badges */}
      <div className="relative h-60 bg-[#070908] overflow-hidden group">
        <Image 
          src={product.image} 
          alt={product.name} 
          fill
          sizes="(max-width: 1024px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="strict-origin-when-cross-origin"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1311] via-transparent to-transparent"></div>
        
        {/* Category badge */}
        <span className="absolute top-4 left-4 bg-[#FF6B1A] text-white text-[9px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded">
          {product.tag}
        </span>
        
        {/* Certificate of Authenticity (COA) visual strip overlay as required */}
        <div className="absolute top-4 right-4 bg-[#042918]/90 text-[#eadaad] text-[9px] font-mono border border-[#c59b27]/40 px-2.5 py-1 rounded flex items-center gap-1">
          <Award className="w-3 h-3 text-[#c59b27]" />
          <span>COA SECURED</span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start gap-4 mb-3">
          <span className="text-[10px] font-mono text-[#c59b27] uppercase tracking-wider">
            Replication Class-A
          </span>
          <span className="text-[10px] font-mono text-green-500/90 font-bold bg-green-500/10 px-2 py-0.5 rounded">
            IN STOCK
          </span>
        </div>

        <h3 className="font-display text-base sm:text-lg font-bold text-white tracking-wide mb-3 hover:text-emerald-400 transition-colors">
          <Link href={`/products/${product.slug}`}>
            {product.name}
          </Link>
        </h3>

        <p className="font-sans text-xs text-gray-400 leading-relaxed mb-6 flex-grow line-clamp-3">
          {product.description}
        </p>

        {/* COA verification physical details strip as requested */}
        <div className="bg-[#141816] rounded-lg p-3 border border-gray-800/85 mb-6 text-[10px] font-mono text-gray-400 flex items-center gap-2">
          <FileCheck className="w-4 h-4 text-[#c59b27] flex-shrink-0" />
          <div className="truncate">
            <span className="text-white font-bold">COA Strip:</span> Hologram gold-foiled serial verification block active.
          </div>
        </div>

        {/* Variant selector buttons with savings labels as requested */}
        <div className="space-y-2 mb-6">
          <span className="text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest block">
            Select Pack Format:
          </span>
          <div className="flex flex-col gap-1.5">
            {product.variants.map((v, idx) => (
              <button
                key={v.name}
                onClick={() => setSelectedVariantIdx(idx)}
                className={`flex justify-between items-center text-left text-[10px] px-3 py-2.5 rounded font-mono font-bold tracking-tight transition-all ${
                  selectedVariantIdx === idx
                    ? 'bg-[#042918] text-[#eadaad] border border-[#c59b27]'
                    : 'bg-[#141816] text-gray-400 border border-transparent hover:border-gray-800'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full border ${selectedVariantIdx === idx ? 'bg-[#FF6B1A] border-[#FF6B1A]' : 'border-gray-600'}`}></div>
                  <span className="truncate max-w-[140px] text-white">{v.name}</span>
                </div>
                <div className="flex items-center gap-2 text-right">
                  <span className="text-gray-500 line-through">${v.originalPrice}</span>
                  <span className="text-[#FF6B1A] font-extrabold">${v.price}</span>
                  <span className="bg-green-500/10 text-green-400 px-1 py-0.5 rounded text-[8px]">{v.savings}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Price & Primary Buttons */}
        <div className="pt-5 border-t border-gray-800/60 mt-auto flex items-center justify-between gap-4">
          <div className="flex flex-col select-none">
            <span className="text-[9px] font-mono text-gray-500 uppercase">Selected Rate:</span>
            <span className="font-display font-extrabold text-white text-md mt-0.5">
              ${activeVariant.price} USD
            </span>
          </div>

          <div className="flex items-center gap-2 flex-grow">
            <Link 
              href={`/products/${product.slug}`}
              className="flex-1 text-center py-2.5 text-[10px] font-mono font-bold tracking-widest uppercase border border-gray-800 hover:border-gray-600 text-gray-300 hover:text-white rounded transition-colors"
            >
              Details
            </Link>

            <button
              onClick={handleAdd}
              id={`prod-list-add-${product.id}`}
              className={`flex-1 py-2.5 text-[10px] font-bold tracking-widest uppercase rounded transition-all duration-300 ${
                isAdded
                  ? 'bg-green-600 text-white'
                  : 'bg-[#FF6B1A] hover:bg-[#e05610] text-[#070908] hover:text-white'
              }`}
            >
              {isAdded ? '✓ Added' : 'Add to Order'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'aud' | 'usd' | 'gbp' | 'eur' | 'cad'>('all');

  const filteredProducts = PRODUCTS.filter((prod) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'aud') return prod.id.startsWith('aud');
    if (activeCategory === 'usd') return prod.id.startsWith('usd');
    if (activeCategory === 'gbp') return prod.id.startsWith('gbp');
    if (activeCategory === 'eur') return prod.id.startsWith('eur');
    if (activeCategory === 'cad') return prod.id.startsWith('cad');
    return true;
  });

  return (
    <div className="flex flex-col gap-0 bg-[#070908] text-white">
      
      {/* Header Splash */}
      <section className="bg-gradient-to-b from-[#090d0b] to-[#070908] py-16 border-b border-gray-900 select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs paths={[{ name: 'Products' }]} />
          
          <div className="max-w-3xl mt-4">
            <span className="text-[10px] font-mono text-[#c59b27] uppercase tracking-widest">
              Secured Vault Stockpile
            </span>
            <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white mt-3 mb-6">
              Buy Premium Theatrical Prop Money Replicas Online
            </h1>
            <p className="font-sans text-xs sm:text-sm text-gray-400 leading-relaxed">
              Explore the gold standard of theatrical cash blocks. From the intricate holographic windows of our Australian Dollars and Canadian Dollars to the New Style US Dollars, British Pounds, and Euros, check out our scraped physical specifications.
            </p>
          </div>
        </div>
      </section>

      {/* Sticky Category Selection Filter Bar as requested */}
      <div className="sticky top-20 z-25 bg-[#0f1311]/95 backdrop-blur-md border-b border-gray-900 py-4 select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory('all')}
              className={`text-[10px] px-3.5 py-2 rounded font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-[#042918] text-[#eadaad] border border-[#c59b27]/40'
                  : 'bg-transparent text-gray-400 hover:text-white'
              }`}
            >
              All Replicas
            </button>
            <button
              onClick={() => setActiveCategory('aud')}
              className={`text-[10px] px-3.5 py-2 rounded font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeCategory === 'aud'
                  ? 'bg-[#042918] text-[#eadaad] border border-[#c59b27]/40'
                  : 'bg-transparent text-gray-400 hover:text-white'
              }`}
            >
              Australian Dollar (AUD)
            </button>
            <button
              onClick={() => setActiveCategory('usd')}
              className={`text-[10px] px-3.5 py-2 rounded font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeCategory === 'usd'
                  ? 'bg-[#042918] text-[#eadaad] border border-[#c59b27]/40'
                  : 'bg-transparent text-gray-400 hover:text-white'
              }`}
            >
              US Dollar (USD)
            </button>
            <button
              onClick={() => setActiveCategory('gbp')}
              className={`text-[10px] px-3.5 py-2 rounded font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeCategory === 'gbp'
                  ? 'bg-[#042918] text-[#eadaad] border border-[#c59b27]/40'
                  : 'bg-transparent text-gray-400 hover:text-white'
              }`}
            >
              British Pound (GBP)
            </button>
            <button
              onClick={() => setActiveCategory('eur')}
              className={`text-[10px] px-3.5 py-2 rounded font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeCategory === 'eur'
                  ? 'bg-[#042918] text-[#eadaad] border border-[#c59b27]/40'
                  : 'bg-transparent text-gray-400 hover:text-white'
              }`}
            >
              Euro (EUR)
            </button>
            <button
              onClick={() => setActiveCategory('cad')}
              className={`text-[10px] px-3.5 py-2 rounded font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeCategory === 'cad'
                  ? 'bg-[#042918] text-[#eadaad] border border-[#c59b27]/40'
                  : 'bg-transparent text-gray-400 hover:text-white'
              }`}
            >
              Canadian Dollar (CAD)
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-1.5 font-mono text-[10px] text-gray-500 uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
            <span>All Blocks Verified Secure ({filteredProducts.length} Items)</span>
          </div>

        </div>
      </div>

      {/* Main Product Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((prod) => (
            <ProductGridCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>



      {/* Trust Bar Block as requested */}
      <TrustBar />

    </div>
  );
}
