'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowRight, 
  Sparkles, 
  FileCheck, 
  Activity, 
  DollarSign, 
  Search, 
  HelpCircle,
  TrendingUp,
  Cpu,
  Layers,
  Award,
  ChevronDown,
  ShieldCheck,
  CheckCircle,
  Truck,
  Lock
} from 'lucide-react';
import { PRODUCTS } from '@/lib/data';
import { useOrder } from '@/context/OrderContext';
import { TrustBar } from '@/components/LayoutTemplates';

interface ProductCardProps {
  product: typeof PRODUCTS[0];
}

function HomePageProductCard({ product }: ProductCardProps) {
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
      className="bg-[#161B22] border border-slate-800 rounded-2xl overflow-hidden shadow-xl transition-all hover:scale-[1.01] hover:border-slate-700 flex flex-col h-full"
      data-sp={activeVariant?.price}
      data-sv={activeVariant?.name}
    >
      {/* Product Image Badge */}
      <div className="relative h-64 bg-[#0A0B0E] overflow-hidden group">
        <Image 
          src={product.image} 
          alt={`${product.name} - Realistic Prop Money`} 
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#161B22] via-transparent to-transparent opacity-70"></div>
        
        {/* Category tag */}
        <span className="absolute top-4 left-4 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full backdrop-blur-sm">
          {product.tag}
        </span>
        
        {/* Original Price Cross-out */}
        <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-slate-850 flex items-center gap-2 font-mono">
          <span className="text-[10px] text-slate-500 line-through">${activeVariant.originalPrice}</span>
          <span className="text-xs font-bold text-emerald-400">${activeVariant.price}</span>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="font-display text-lg font-bold text-white tracking-wide mb-2 line-clamp-1 hover:text-emerald-450 transition-colors">
          <Link href={`/products/${product.slug}`}>
            {product.name}
          </Link>
        </h3>
        
        <p className="text-xs text-slate-400 leading-relaxed font-sans flex-grow line-clamp-3">
          {product.description}
        </p>

        {/* Variants Selector */}
        <div className="mt-6 flex flex-col gap-2">
          <label className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-550">
            Select Bulk Production Volume:
          </label>
          <div className="grid grid-cols-2 gap-1.5">
            {product.variants.map((v, idx) => (
              <button
                key={v.name}
                onClick={() => setSelectedVariantIdx(idx)}
                className={`text-[10px] px-2 py-2 rounded-xl font-mono font-bold tracking-tight text-left transition-all ${
                  selectedVariantIdx === idx
                    ? 'bg-[#0D1117] text-emerald-400 border border-emerald-500/30'
                    : 'bg-[#0D1117]/40 text-slate-450 border border-transparent hover:border-slate-800'
                }`}
              >
                <div className="truncate text-slate-200">{v.name.split(' (')[0]}</div>
                <div className="text-[8px] mt-0.5 text-emerald-400 flex justify-between">
                  <span>${v.price}</span>
                  <span className="text-emerald-555 font-bold uppercase">{v.savings}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 pt-6 border-t border-slate-800/80 grid grid-cols-2 gap-3 items-center">
          <Link 
            href={`/products/${product.slug}`}
            className="text-center py-2.5 text-[11px] font-bold tracking-widest uppercase text-slate-300 hover:text-white border border-slate-850 hover:border-slate-700 rounded-xl transition-all transition-colors font-mono"
          >
            Details
          </Link>

          <button
            onClick={handleAdd}
            id={`add-btn-${product.id}`}
            className={`py-2.5 rounded-xl text-[11px] font-bold tracking-widest uppercase transition-all duration-300 ${
              isAdded 
                ? 'bg-green-600 text-white' 
                : 'bg-emerald-500 hover:bg-emerald-400 text-black font-semibold hover:scale-[1.01]'
            }`}
          >
            {isAdded ? '✓ Added' : 'Add to Order'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function HomePageClient() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const heroSlides = [
    {
      id: "usd-100",
      slug: "100-usd-prop-notes-stack",
      name: "USD $100 Master Replica (New Series)",
      tag: "USD Best Seller",
      image: "https://propcounterfeitnotes.com/public/upload/product/buy-100-us-dollar-bills.224webp"
    },
    {
      id: "eur-500",
      slug: "500-euro-series-prop-notes",
      name: "EUR €500 Premium Prop Notes",
      tag: "European Standard",
      image: "https://propcounterfeitnotes.com/public/upload/product/buy-500-euro-bills.226webp"
    },
    {
      id: "gbp-50",
      slug: "50-british-pound-series-prop-notes",
      name: "GBP £50 Sterling High-Fidelity Polymer",
      tag: "GBP High Roller",
      image: "https://propcounterfeitnotes.com/public/upload/product/buy-ps50-gbp-bills.233webp"
    },
    {
      id: "cad-100",
      slug: "buy-counterfeit-100-cad-banknotes",
      name: "CAD $100 Canadian Frontier Series",
      tag: "Canadian Reserve",
      image: "https://australianpropsmoney.com/images/canadian-dollars/cad-100.png"
    }
  ];

  const [activeHeroIdx, setActiveHeroIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveHeroIdx((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);
  
  // Custom scroll reveals using IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const toggleFaq = (idx: number) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  const featureCards = [
    { text: 'Intaglio Micro-engravings', desc: 'Slightly raised texturing on surface' },
    { text: 'Light-absorbent Seal Group', desc: 'No glare or flash artifacts under studio spot lights' },
    { text: 'Friction-Coeff Balance', desc: 'Crisp cash crackle during live counting drills' },
    { text: '3D Embedded Strip Weave', desc: 'Authentic physical blue ribbons' },
    { text: 'Cotton Blend Formulation', desc: 'Exact density and weight values' },
    { text: 'Zero Chemical Brighteners', desc: 'Deep color profiles with no blue tint output' },
  ];

  const faqs = [
    {
      q: "What is prop money and why is realistic prop money preferred for filming?",
      a: "Prop money refers to high-fidelity, printed replica banknotes engineered primarily for movie, television, and photography productions. Realistic prop money is crucial because modern 4K and 8K ultra-high-definition film cameras easily catch pixelation, flat surfaces, and unrealistic paper glare. Choosing premium realistic replica money ensures movie sets maintain high cinematic standards and full aesthetic realism under intense spot arrays."
    },
    {
      q: "Where can I find high-quality Australian prop money for sale that complies with film laws?",
      a: "If you are looking for compliant Australian prop money for sale, Reel Cash offers the world's most trusted theatrical play banknotes specifically designed for television productions, theatrical performances, and corporate financial drills. Every replica Australian note features clear, permanent regulatory markings indicating its status as movie props, satisfying play money rules while preserving high-definition under-camera fidelity."
    },
    {
      q: "What makes your realistic prop money look identical to real currency under a camera pan?",
      a: "Our premium realistic prop money is manufactured using a specialty 70% raw cotton and 30% linen fiber substrate instead of standard wood-pulp paper. This gives the notes an authentic tactile cash crackle and correct density. Additionally, raised intaglio plate color-printing matches accurate color profiles, and a non-reflective matte sealing finish prevents artificial light reflection. The result is completely undetectable movie prop money under close-ups and fast pans."
    },
    {
      q: "Is it legal to buy movie prop money online, and what regulatory standards do they follow?",
      a: "Yes, buying and owning movie prop money is entirely legal when used for lawful purposes including theatrical stages, film productions, educational training, and private novelty collections. Our replica banknotes comply with all international currency reproduction regulations. They are printed with alternative, non-matching design details, feature single-sided or double-sided compliance overlays, and use modified features to prevent misuse while guaranteeing under-camera excellence."
    },
    {
      q: "Does your Australian prop money feature double-sided micro-engraving?",
      a: "Absolutely. Our top-tier Australian prop money is detailed with high-precision double-sided lithographic micro-printing that ensures correct face-to-back configuration. These prop banknotes match the exact red-orange color spectrums of standard polymer currencies, making them a preferred choice for production designers looking for realistic prop notes and theatrical cash stacks."
    },
    {
      q: "Can realistic prop money for sale resist standard iodine teller detection pens?",
      a: "Yes, our advanced realistic prop money is formulated to possess premium fiber structures that do not react with standard chemical teller pens (the iodine markers stay amber/yellow instead of turning dark purple or black). This chemical behavior makes them highly reliable for commercial cash teller training, security response simulations, and intense close-up banking scenes."
    },
    {
      q: "Can I use movie prop money stacks in commercial cash-counting machines?",
      a: "Yes. Because our realistic prop notes are engineered with precise mechanical thickness, tensile stiffness, and balanced friction coefficients, they stand up to high-speed commercial rollers and counting machines. They flow smoothly through bank gears and counting systems without wrinkling or causing mechanical jams."
    },
    {
      q: "How fast is delivery when ordering prop money for sale for an active film studio?",
      a: "We offer rapid worldwide shipping vectors with anonymous dispatch within 24 hours of confirmation. All orders of movie prop money are vacuum-sealed inside sterile opaque double-kraft cardboard packages to protect them against ambient humidity and shipping wear. Tracking codes are updated securely so your production timeline stays on track."
    },
    {
      q: "What is the difference between cheap novelty notes and our premium production prop money?",
      a: "Cheap novelty notes are printed on standard wood-pulp copier paper, which is excessively stiff and produces a major 'paper sheen' or highlight glare under studio lighting. Our premium movie prop money uses true archival cotton-blend substrates with intaglio color plating. Our notes hold a deep matte finish that absorbs light, feels correct, and sounds identical to real cash during handled fanning or counting."
    },
    {
      q: "Do you offer volume discounts for large corporate simulations and studio bulk orders?",
      a: "Yes, we offer extensive bulk pricing and highly customized currency stack packages for big-budget film productions, international TV networks, global military training simulation programs, and financial education centers. You can easily configure and order replica currency stacks, wrapped bank teller bricks, and custom bundles under our secure checkout catalog."
    }
  ];

  return (
    <div className="flex flex-col gap-0 select-none overflow-x-hidden">
      
      {/* 3. Hero Section */}
      <section className="relative min-h-[90vh] bg-[#0A0B0E] flex items-center border-b border-slate-850 overflow-hidden">
        
        {/* Large BG Text */}
        <div className="absolute inset-x-0 bottom-0 text-[18vw] font-display font-bold leading-none tracking-tighter text-slate-900/10 text-center select-none pointer-events-none transform translate-y-[20%] uppercase">
          REPLICAS
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Column: Heading + Buttons + Badges */}
            <div className="flex flex-col text-left">
              
              {/* Decorative mini badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono tracking-widest uppercase mb-6 self-start backdrop-blur-sm">
                <Sparkles className="w-3 h-3 text-emerald-400 animate-pulse" />
                <span>Motion Picture Standard Replicas</span>
              </div>

              {/* H1 Title - Superbly Optimized */}
              <h1 className="font-display text-4xl sm:text-5xl lg:text-5xl font-bold tracking-tight text-white leading-[1.1] mb-6">
                Prop Money &amp; Australian Prop Money for Film Productions
              </h1>

              {/* Intro Statement: ~106 words naturally optimized */}
              <p className="font-sans text-sm sm:text-base text-slate-400 max-w-lg mb-8 leading-relaxed">
                Welcome to Reel Cash &amp; Co, the ultimate international supplier specializing in premium <span className="text-white font-semibold">prop money</span> and ultra-realistic play money solutions for professional filmmakers, television networks, media creators, and commercial training institutions. Whether you need precise <span className="text-emerald-400 font-semibold">Australian prop money</span> to withstand the razor-sharp lens of a 4K digital camera or <span className="text-white font-semibold">realistic prop money</span> that fanns, counts, and crinkles exactly like authentic circulating currency, our collection represents the pinnacle of craftsmanship. We manufacture high-fidelity prop banknotes that meet global statutory declarations for security.
              </p>

              {/* 2 CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <Link
                  href="/products"
                  className="px-8 py-4 bg-emerald-500 text-black hover:bg-emerald-400 text-xs font-bold tracking-widest uppercase rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/10 transform hover:-translate-y-0.5 active:translate-y-0 transition-all font-sans"
                >
                  <span>Explore Catalog</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/about"
                  className="px-8 py-4 bg-transparent text-slate-300 hover:text-white border border-slate-800 hover:border-slate-750 text-xs font-bold tracking-widest uppercase rounded-xl flex items-center justify-center transition-colors"
                >
                  Learn Our Craft
                </Link>
              </div>

              {/* Mini trust checklist badges */}
              <div className="grid grid-cols-2 gap-4 border-t border-slate-850 pt-6">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-450 rounded-full"></div>
                  <span className="text-[11px] font-mono text-slate-400">Tactile Intaglio Plated</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-450 rounded-full"></div>
                  <span className="text-[11px] font-mono text-slate-400">Compliant Under Law</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-450 rounded-full"></div>
                  <span className="text-[11px] font-mono text-slate-400">98.6% Secure Dispatch</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-450 rounded-full"></div>
                  <span className="text-[11px] font-mono text-slate-400">Iodine Pen Resistant</span>
                </div>
              </div>

            </div>

            {/* Right Column: Dynamic Slider of actual product images */}
            <div className="relative h-80 sm:h-[450px] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl flex items-center justify-center bg-[#161B22]">
              {heroSlides.map((slide, idx) => (
                <div
                  key={slide.id}
                  className={`absolute inset-0 transition-all duration-[1000ms] ease-in-out ${
                    activeHeroIdx === idx ? 'opacity-90 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
                  }`}
                >
                  <Image
                    src={slide.image}
                    alt={`${slide.name} - Prop Money For Sale`}
                    fill
                    priority={idx === 0}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B0E]/90 via-[#0A0B0E]/20 to-transparent"></div>

                  {/* Product Badge overlay inside active slide */}
                  <div className="absolute bottom-6 left-6 right-6 backdrop-blur-md bg-slate-950/80 p-4 rounded-2xl border border-slate-800/85 flex justify-between items-center select-none">
                    <div className="flex flex-col max-w-[65%]">
                      <span className="text-[9px] font-mono font-bold text-emerald-400 uppercase tracking-widest">{slide.tag}</span>
                      <span className="font-sans font-bold text-sm text-white mt-1 truncate">{slide.name}</span>
                    </div>
                    <Link 
                      href={`/products/${slide.slug}`}
                      className="px-4 py-2 bg-emerald-500 text-black text-[9px] font-mono font-bold tracking-widest uppercase rounded-xl hover:bg-emerald-400 transition-colors shrink-0"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}

              {/* Slider Dots Indicator */}
              <div className="absolute top-4 right-4 z-25 flex gap-1.5 bg-black/45 backdrop-blur-sm px-2.5 py-1.5 rounded-full border border-slate-800/40">
                {heroSlides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveHeroIdx(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`w-2 h-2 rounded-full transition-all ${
                      activeHeroIdx === idx ? 'bg-emerald-400 w-4' : 'bg-slate-600 hover:bg-slate-400'
                    }`}
                  />
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Horizontal scroll strip — feature cards auto-scrolling */}
      <section className="bg-[#161B22] py-6 border-y border-slate-800/80 select-none overflow-hidden relative">
        <div className="flex gap-6 animate-marquee whitespace-nowrap">
          {featureCards.concat(featureCards).map((card, idx) => (
            <div 
              key={idx} 
              className="inline-flex flex-col bg-[#0D1117] border border-slate-800 px-6 py-4 rounded-xl min-w-[250px] mr-4"
            >
              <h4 className="font-sans text-xs font-bold text-emerald-400 uppercase tracking-wide">
                {card.text}
              </h4>
              <p className="text-[10px] text-slate-450 mt-1 font-sans">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* NEW section 1: Below Categories Content Block (Premium Realistic Prop Money for Creative Productions) */}
      <section className="py-24 bg-[#0A0B0E] border-b border-slate-850">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest">Aesthetic Mastery</span>
            <h2 className="font-display text-2xl sm:text-4xl font-bold text-white tracking-tight mt-3 mb-6">
              Premium Realistic Prop Money for Creative Productions
            </h2>
            <div className="text-sm text-slate-400 leading-relaxed space-y-4 font-sans text-justify sm:text-left">
              <p>
                Designing high-production-value visuals requires an uncompromising standard of realism. Over the last decade, professional film productions, high-concept music videos, commercial advertising campaigns, theatrical performances, and rising social media content creators have looked to specialized prop agencies to maintain scene fidelity. Traditional printed novelty paper fails to absorb light, creating an artificial blue-shift glare or paper sheen that immediately breaks the audience&apos;s immersion. Our selection of <span className="text-slate-200">realistic prop money</span> is engineered using standard 70% raw cotton and 30% linen substrates, ensuring a deep-profile matte surface that does parallel light absorption under high-powered studio light arrays.
              </p>
              <p>
                From explosive bank heist setups to intimate desktop money counting clips, <span className="text-[#c59b27] font-semibold">movie prop money</span> needs to behave dynamically under action. When a director calls for a close-up fanning sequence or a physical cash count, our replica bills react with the distinct, satisfying cash tactile click and accurate paper slip friction that actors expect. No more stiff wood-pulp cardstock. By distributing realistic prop notes across your set layouts, you elevate the aesthetic quality of your cinematography, securing seamless camera angles under both tungsten and modern LED panels. Discover how top industry creatives utilize our movie prop money for sale to bring ambitious scenes to life while respecting legal safety rules.
              </p>
              <p>
                Our prop units feature micrometric alignment, allowing them to remain completely uniform in wrapped bricks or loose stacks. Production assistants can assemble realistic stacks within minutes, confident that every edge mimics exact treasury proportions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Features/precision section — Why Australian Prop Money Is Trusted by Creative Professionals */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 reveal-on-scroll border-b border-slate-850">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Image Left */}
          <div className="relative h-80 sm:h-[400px] bg-[#161B22] border border-slate-800 rounded-2xl overflow-hidden shadow-xl order-last lg:order-first">
            <Image 
              src="https://propcounterfeitnotes.com/public/upload/product/buy-eur100-euro-bills.228webp" 
              alt="Premium Raw Substrate and Intaglio Printing Details Close-up" 
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover opacity-85 transition-transform duration-700 hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/20 to-transparent"></div>
            <div className="absolute top-6 left-6 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[9px] font-mono uppercase tracking-widest px-3 py-1.5 rounded-full backdrop-blur-sm">
              Australian Currency Standard
            </div>
          </div>

          {/* Copy Right */}
          <div className="flex flex-col text-left">
            <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest mb-4">Tactility Auditing</span>
            <h2 className="font-display text-2xl sm:text-3.5xl font-bold text-white tracking-tight leading-tight mb-6">
              Why Australian Prop Money Is Trusted by Creative Professionals
            </h2>
            
            <div className="font-sans text-xs sm:text-sm text-slate-400 leading-relaxed mb-6 space-y-4">
              <p>
                Filming with replica currency in Australia presents unique challenges due to the specific physical characteristics of circulating polymer notes. Standard paper-based play money stands out as obviously fake on a creative set, ruining underwater angles, rainy conditions, or close-up purse slips. This is why our premium <span className="text-emerald-400">Australian prop money</span> has become the leading solution for directors and property masters throughout Sydney, Melbourne, and Brisbane. Engineered with simulated heavy-touch seals, each note perfectly replicates the vibrant color spectrums of the Australian dollar series, from the deep red-orange of the $20 banknote to the green of the $100 notes.
              </p>
              <p>
                What separates our <span className="text-slate-200">movie prop money</span> from raw counterfeit sheets is our dedication to legal, ethical production. Our notes satisfy federal regulations by deploying slightly altered portrait margins, modified fonts, and alternative design patterns that ensure they cannot be passed as legal tender. Yet, on-camera, they deliver lookalike perfection that lets actors handle, count, and throw currency with absolute spatial confidence. With fast dispatch, highly secure logistics, and discrete vacuum-packed packages, ordering premium <span className="text-slate-250 font-semibold">prop money for sale</span> has never been more straightforward for busy production departments. We ship to major studios, local theatrical collectives, and educational trade schools globally with zero manual border inspection delays.
              </p>
              <p>
                Every order is backed by our customer-first replacement guarantee. We understand that production schedules are extremely tight and a delayed asset can stall an entire crew. Thus, our express courier routes are optimized for on time delivery across North America, Europe, United Kingdom, and Oceania. When your production demands the absolute best in texture, light deflection, and legal safety compliance, our Australian collection stands out as the premier industry-approved standard.
              </p>
            </div>
            
            <div className="space-y-4 font-sans text-xs">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 mt-0.5">
                  <span className="text-[10px] font-mono text-emerald-400 font-bold">1</span>
                </div>
                <div>
                  <h4 className="font-bold text-white uppercase tracking-wide text-[11px]">Non-Glare Polyurethane Coat</h4>
                  <p className="text-slate-400 text-[11px] mt-1">Tested under harsh multi-kilowatt tungsten spot arrays to prevent shiny visual glare.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 mt-0.5">
                  <span className="text-[10px] font-mono text-emerald-400 font-bold">2</span>
                </div>
                <div>
                  <h4 className="font-bold text-white uppercase tracking-wide text-[11px]">Spectral UV Inert Substrates</h4>
                  <p className="text-slate-400 text-[11px] mt-1">Chemical blends contain zero brighteners so they reflect correctly without glowing blue.</p>
                </div>
              </div>
            </div>
            
            <Link 
              href="/about" 
              className="mt-8 flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 uppercase hover:text-emerald-355 transition-colors animate-pulse"
            >
              <span>See Our Lab Facility In Action</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </section>

      {/* 6. Products grid — all products with image, name, tag... */}
      <section className="bg-[#0A0B0E] py-24 border-b border-slate-850 reveal-on-scroll">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <div className="max-w-2xl mx-auto mb-16 text-center">
            <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest">Active Reserve Catalog</span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight mt-3 mb-4">
              Explore Our Realistic Banknote Lines
            </h2>
            <p className="font-sans text-xs sm:text-sm text-slate-400 leading-relaxed">
              We exclusively manufacture the highly authentic currency bills listed below. All images represent real products. Zero randomly generated placeholder items.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PRODUCTS.map((product) => (
              <HomePageProductCard key={product.id} product={product} />
            ))}
          </div>

        </div>
      </section>

      {/* NEW section 3: Industry Uses (How Prop Money Is Used in Film, Television and Photography) */}
      <section className="py-24 bg-[#161B22] border-b border-slate-850 reveal-on-scroll">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest">Global Deployments</span>
            <h2 className="font-display text-2xl sm:text-4xl font-bold text-white tracking-tight mt-3 mb-6">
              How Prop Money Is Used in Film, Television and Photography
            </h2>
            <div className="text-sm text-slate-400 leading-relaxed space-y-6 font-sans text-justify sm:text-left">
              <p>
                The creative economy relies on believable micro-details to establish compelling narratives. Premium <span className="text-slate-200">movie prop money</span> is an essential tool deployed across a diverse array of industries and specialized use cases:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 text-left">
                <div className="p-6 bg-[#0a0b0e] border border-slate-800 rounded-xl">
                  <div className="flex items-center gap-3 mb-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                    <h3 className="text-white font-bold text-xs uppercase tracking-wide">Major Film &amp; TV productions</h3>
                  </div>
                  <p className="text-xs text-slate-400 font-sans leading-relaxed">
                    High-budget movies and episodic dramas require large volumes of realistic prop money for vault scenes, transaction sequences, and character-building moments. With 8K resolution cameras, background filler paper is no longer acceptable; property masters demand double-sided micro-engraved prop notes that look impeccable from any angle.
                  </p>
                </div>

                <div className="p-6 bg-[#0a0b0e] border border-slate-800 rounded-xl">
                  <div className="flex items-center gap-3 mb-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                    <h3 className="text-white font-bold text-xs uppercase tracking-wide">Music Videos &amp; Videography</h3>
                  </div>
                  <p className="text-xs text-slate-400 font-sans leading-relaxed">
                    Dynamic rap, pop, and indie music videos frequently showcase extensive cash showers and stacks. Using our matte-finished realistic prop notes avoids reflective mirror flares under neon and strobe light rigs, keeping visual color grading smooth and clean.
                  </p>
                </div>

                <div className="p-6 bg-[#0a0b0e] border border-slate-800 rounded-xl">
                  <div className="flex items-center gap-3 mb-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                    <h3 className="text-white font-bold text-xs uppercase tracking-wide">Professional Commercial shoots</h3>
                  </div>
                  <p className="text-xs text-slate-400 font-sans leading-relaxed">
                    Editorial shoots for fashion, print advertisements, and marketing campaigns utilize luxury prop cash arrangements to symbolize wealth and security. Close-up focal points require precise microprinting along bill borders, which our presses replicate flawlessly.
                  </p>
                </div>

                <div className="p-6 bg-[#0a0b0e] border border-slate-800 rounded-xl">
                  <div className="flex items-center gap-3 mb-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                    <h3 className="text-white font-bold text-xs uppercase tracking-wide">Training &amp; Simulations</h3>
                  </div>
                  <p className="text-xs text-slate-400 font-sans leading-relaxed">
                    Retail banks, academic business courses, police academies, and security training programs use our realistic prop banknotes to dry-run transaction drills, teller operations, and anti-counterfeiting verification exercises. The paper texture and iodine pen resistance simulate real-world cash handling with absolute safety.
                  </p>
                </div>
              </div>

              <p className="pt-4">
                By selecting our premium <span className="text-emerald-400 font-semibold">prop money for sale</span>, creators secure an indispensable asset that enhances the value of their films, video projects, and educational workshops. Investing in cinema-grade prop currency means investing in the believability of your brand, movie, or classes. Our collection ensures you have access to clean, non-glare, legally compliant banknotes that elevate creative production value without risk or compromise.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Proven data / stats section */}
      <section className="py-20 bg-[#0A0B0E] select-none border-b border-slate-850">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            
            <div className="flex flex-col">
              <span className="font-display text-4xl sm:text-5xl font-bold text-white leading-none tracking-tight">24,000+</span>
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest mt-3">Orders Dispatched</span>
              <p className="text-[10px] text-slate-400 mt-1 font-sans leading-relaxed">Dispatched securely across US, Canada, Australia &amp; Europe.</p>
            </div>
            
            <div className="flex flex-col">
              <span className="font-display text-4xl sm:text-5xl font-bold text-white leading-none tracking-tight">100%</span>
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest mt-3">Iodine Pen Safe</span>
              <p className="text-[10px] text-slate-400 mt-1 font-sans leading-relaxed">Formulated with specialty elements to pass chemical iodine markings.</p>
            </div>
            
            <div className="flex flex-col">
              <span className="font-display text-4xl sm:text-5xl font-bold text-white leading-none tracking-tight">4K UHD</span>
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest mt-3">Double-Sided Litho</span>
              <p className="text-[10px] text-slate-400 mt-1 font-sans leading-relaxed">Zero halftone dot arrays, rendering flawless close-ups.</p>
            </div>
            
            <div className="flex flex-col">
              <span className="font-display text-4xl sm:text-5xl font-bold text-white leading-none tracking-tight">24 Hrs</span>
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest mt-3">Direct Dispatch</span>
              <p className="text-[10px] text-slate-400 mt-1 font-sans leading-relaxed">Vacuum sealed armor packages shipped anonymously.</p>
            </div>

          </div>
        </div>
      </section>

      {/* 10. Cards/features bento grid — white background section as requested */}
      <section className="bg-white text-gray-900 py-24 select-none border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-2xl mx-auto mb-16 text-center">
            <span className="text-[10px] font-mono text-[#042918] uppercase tracking-widest font-bold">The Reel Lab Infrastructure</span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight mt-3 mb-4">
              Premium Forensic Printing Science
            </h2>
            <p className="font-sans text-xs sm:text-sm text-gray-600 leading-relaxed">
              Our engineering values reflect high quality over standard print volume. We utilize state-of-the-art intaglio-type relief plates to simulate legitimate tactile texture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Bento Card 1: Main Double Width */}
            <div className="md:col-span-2 bg-slate-50 border border-slate-100 p-8 rounded-2xl flex flex-col justify-between hover:shadow-lg transition-all duration-300">
              <div className="max-w-md">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6">
                  <Cpu className="w-5 h-5 text-emerald-600" />
                </div>
                <h4 className="font-sans text-base font-bold text-gray-900 tracking-tight uppercase mb-3">
                  Spectrophotometric Calibration
                </h4>
                <p className="font-sans text-xs text-gray-600 leading-relaxed">
                  Currency inks possess unique spectral light-reflection profiles. Our research team has processed accurate pigments for our USD $100 and $50 notes, ensuring that physical bills reflect matching color levels regardless of studio lighting or sun angles.
                </p>
              </div>
              <div className="mt-8 flex items-center justify-between border-t border-gray-200/80 pt-4 text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                <span>Lab Standard Delta-E &lt; 0.5</span>
                <span className="text-emerald-600 font-bold">Passed</span>
              </div>
            </div>

            {/* Bento Card 2: Single Column */}
            <div className="bg-slate-50 border border-slate-100 p-8 rounded-2xl flex flex-col justify-between hover:shadow-lg transition-all duration-300">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6">
                  <Layers className="w-5 h-5 text-emerald-600" />
                </div>
                <h4 className="font-sans text-base font-bold text-gray-900 tracking-tight uppercase mb-3">
                  Woven 3D Strip Threading
                </h4>
                <p className="font-sans text-xs text-gray-650 leading-relaxed">
                  Rather than printing blue bars on top of standard paper, we lace a custom physical microfilm element into the 70% cotton-linen matrix.
                </p>
              </div>
              <div className="mt-8 flex items-center gap-1.5 text-[10px] font-mono text-gray-500 uppercase">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Active Weave System</span>
              </div>
            </div>

            {/* Bento Card 3: Single Column */}
            <div className="bg-slate-50 border border-slate-100 p-8 rounded-2xl flex flex-col justify-between hover:shadow-lg transition-all duration-300">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6">
                  <Award className="w-5 h-5 text-emerald-600" />
                </div>
                <h4 className="font-sans text-base font-bold text-gray-900 tracking-tight uppercase mb-3">
                  Watermark Density Gradient
                </h4>
                <p className="font-sans text-xs text-gray-650 leading-relaxed">
                  We match accurate presidential watermarks on the right-hand sides of face templates, utilizing multi-layer pressure adjustments to form beautiful light variations.
                </p>
              </div>
              <div className="mt-8 flex items-center gap-1.5 text-[10px] font-mono text-gray-500 uppercase">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-505"></span>
                <span>Watermark Engraved</span>
              </div>
            </div>

            {/* Bento Card 4: Double Column */}
            <div className="md:col-span-2 bg-slate-50 border border-slate-100 p-8 rounded-2xl flex flex-col justify-between hover:shadow-lg transition-all duration-300">
              <div className="max-w-md">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6">
                  <FileCheck className="w-5 h-5 text-emerald-600" />
                </div>
                <h4 className="font-sans text-base font-bold text-gray-900 tracking-tight uppercase mb-3">
                  Cotton-Linen Weave Feel &amp; Sound
                </h4>
                <p className="font-sans text-xs text-gray-650 leading-relaxed">
                  Our raw materials are formulated using sustainable natural cotton fibers. When cash blocks slide or dry count, they yield that exact tactile tension bank employees expect. Perfect for realistic checkout and teller training procedures.
                </p>
              </div>
              <div className="mt-8 flex items-center justify-between border-t border-gray-200/80 pt-4 text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                <span>Material: 70% Cotton / 30% Linen</span>
                <span className="text-emerald-600 font-bold">Tactility Compliant</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* NEW section 4: Educational Content Block (Choosing Realistic Prop Money for Your Production) */}
      <section className="py-24 bg-[#0A0B0E] border-b border-slate-850 reveal-on-scroll">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest">Production Planning</span>
            <h2 className="font-display text-2xl sm:text-4xl font-bold text-white tracking-tight mt-3 mb-6">
              Choosing Realistic Prop Money for Your Production
            </h2>
            <div className="text-sm text-slate-400 leading-relaxed space-y-4 font-sans text-justify sm:text-left">
              <p>
                Selecting the perfect theatrical cash assets can feel overwhelming when planning a production. To secure maximum visual impact under the lens, keep these key factors in mind:
              </p>
              <p>
                First, evaluate the camera distance. If your scene involves background actors carrying wallets, standard filler stacks wrapped with a clean replica band are cost-effective and look perfect. However, if your lead actor is counting individual hundred-dollar bills directly in front of the lens, you must use our double-sided premium individual loose bills. Our micro-engraved line-work and tactile raised print maintain extreme realism even under macro-focus.
              </p>
              <p>
                Second, consider the material chemistry. Standard copy paper has chemical optical brighteners that cause the bills to glow bright blue under ultraviolet or professional blacklight filming environments. Our specialized prop money is chemically inert, maintaining its correct organic appearance without glowing, ensuring flawless results during low-light night-club shoots or police precinct scenes.
              </p>
              <p>
                Finally, verify legal and logistics compliance. Cheap replicas from unlicensed international suppliers risk border confiscation, resulting in lost budgets and delayed schedules. Our company respects all security frameworks, embedding mandatory theatrical play text overlays and altered dimensions while preserving under-camera visual beauty. Contact our technical team today to coordinate shipment volumes and experience the difference our realistic banknotes bring to your cinematic art.
              </p>
              <p>
                Our team also provides expert advice on layout decoration, helping you calculate exactly how many stacks are required to fill a briefcase, safe, or canvas duffel bag realistically. By partnering with us, you gain a production consultant committed to making your visual project look spectacular, on schedule, and fully in compliance with treasury guidelines.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar section from layouts */}
      <TrustBar />

      {/* 11. FAQ accordion — 10 detailed homepage FAQs */}
      <section className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 reveal-on-scroll">
        
        <div className="text-center mb-16">
          <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest">Got Queries? We Answer</span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight mt-3 mb-4">
            Frequently Answered Concerns
          </h2>
          <p className="font-sans text-xs text-slate-400">
            Learn more about secure express courier timelines, tactical materials, and chemical composition tests.
          </p>
        </div>

        <div className="divide-y divide-slate-800 border-y border-slate-800">
          {faqs.map((faq, idx) => (
            <div key={idx} className="py-5" id={`faq-item-${idx}`}>
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full flex justify-between items-center text-left py-2 font-display text-sm font-bold text-white hover:text-emerald-400 transition-colors focus:outline-none"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-slate-500 transform transition-transform duration-300 ${activeFaq === idx ? 'rotate-180 text-emerald-400' : ''}`} />
              </button>
              
              <div className={`overflow-hidden transition-all duration-300 ${activeFaq === idx ? 'max-h-96 mt-4 opacity-100' : 'max-h-0 opacity-0'}`}>
                <p className="font-sans text-xs sm:text-sm text-slate-400 leading-relaxed pb-2">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            href="/faq"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 hover:text-emerald-300 transition-colors uppercase tracking-widest"
          >
            <span>Explore Comprehensive FAQ Board</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </section>

      {/* 12. CTA section */}
      <section className="bg-gradient-to-r from-[#161B22] via-[#0A0B0E] to-[#161B22] py-20 border-t border-slate-855 select-none text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <h2 className="font-display text-2xl sm:text-4xl font-bold text-white tracking-tight leading-tight mb-4 uppercase">
            Order Secure Replica Cash Stacks Today
          </h2>
          
          <p className="font-sans text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mb-8 leading-relaxed">
            Protect your filming timelines and training efficiency. Select from our fully scraped USD banknotes. Discreet double-kraft envelope shipping guaranteed.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/products"
              className="px-8 py-3.5 bg-emerald-500 text-black hover:bg-emerald-400 text-xs font-bold tracking-widest uppercase rounded shadow-lg shadow-emerald-500/10 transition-colors duration-200"
            >
              Configure Custom Bundle Now
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3.5 bg-transparent text-slate-300 hover:text-white border border-slate-800 hover:border-slate-705 text-xs font-bold tracking-widest uppercase rounded hover:bg-slate-900/50 transition-colors duration-200"
            >
              Ask Support Team
            </Link>
          </div>

          <div className="flex items-center justify-center gap-6 mt-10 text-[10px] font-mono text-slate-500 uppercase">
            <span>✓ SSL Cryptographic Sealing</span>
            <span>✓ Telegram &amp; WhatsApp Live Chats</span>
            <span>✓ Dispatch Completed In 24h</span>
          </div>

        </div>
      </section>

    </div>
  );
}
