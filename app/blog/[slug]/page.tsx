import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  User, 
  BookOpen, 
  Phone, 
  ShoppingBag,
  Info,
  ShieldCheck,
  TrendingUp
} from 'lucide-react';
import { BLOG_POSTS, PRODUCTS } from '@/lib/data';
import { Breadcrumbs } from '@/components/LayoutTemplates';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // Find 3 relative blog articles for recommendations
  const relatedPosts = BLOG_POSTS
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  // Find 2 recommendation products to present internally
  const featuredProducts = PRODUCTS.slice(0, 2);

  return (
    <div className="flex flex-col bg-[#070908] text-white">
      
      {/* Header section (breadcrumb + back link) */}
      <section className="bg-gradient-to-b from-[#090d0b] to-[#070908] py-8 border-b border-gray-900 select-none">
        <div className="max-w-4xl mx-auto px-4 sm:px-6"> 
          <Breadcrumbs paths={[{ name: 'Research', href: '/blog' }, { name: post.title }]} />
          
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-[10px] font-mono font-bold text-[#FF6B1A] uppercase tracking-widest hover:text-white transition-colors mt-4"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Research Listing</span>
          </Link>
        </div>
      </section>

      {/* Main post layout */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <article className="flex flex-col">
          
          {/* Post Header tags */}
          <div className="flex flex-wrap items-center gap-3.5 mb-6">
            <span className="bg-[#042918] text-[#eadaad] border border-[#c59b27]/30 text-[9.5px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded">
              {post.category}
            </span>
            <div className="flex items-center gap-4 text-[10px] font-mono text-gray-500">
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-[#c59b27]" /> {post.date}</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-[#c59b27]" /> {post.readTime}</span>
              <span className="flex items-center gap-1"><User className="w-3.5 h-3.5 text-gray-600" /> By {post.author}</span>
            </div>
          </div>

          {/* H1 Title */}
          <h1 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-6 leading-tight text-left">
            {post.title}
          </h1>



          {/* Hero Image */}
          <div className="relative h-60 sm:h-[400px] w-full bg-black rounded-2xl overflow-hidden mb-10 border border-gray-800 shadow-xl select-none">
            <Image 
              src={post.image} 
              alt={post.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 800px"
              className="object-cover opacity-85"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>

          {/* Long-form body content parsed cleanly */}
          <div className="prose prose-invert max-w-none font-sans text-xs sm:text-sm leading-relaxed text-gray-300 space-y-6 text-left">
            <ReactMarkdown
              components={{
                h2: ({ ...props }) => (
                  <h2 className="font-display text-lg sm:text-xl font-bold text-white uppercase tracking-wide border-b border-gray-800 pb-3 mt-10 mb-5" {...props} />
                ),
                h3: ({ ...props }) => (
                  <h3 className="font-display text-base font-bold text-[#c51b27] uppercase tracking-wide mt-8 mb-4 text-[#eadaad]" {...props} />
                ),
                p: ({ ...props }) => (
                  <p className="mb-6 leading-relaxed text-gray-300 text-left font-normal" {...props} />
                ),
                ul: ({ ...props }) => (
                  <ul className="list-disc list-outside pl-6 space-y-2 mb-6" {...props} />
                ),
                ol: ({ ...props }) => (
                  <ol className="list-decimal list-outside pl-6 space-y-2 mb-6" {...props} />
                ),
                li: ({ ...props }) => <li className="text-gray-300 font-normal" {...props} />,
                th: ({ ...props }) => (
                  <th className="p-3 bg-black/30 border border-gray-800 font-display text-[10px] uppercase font-bold text-white tracking-widest" {...props} />
                ),
                td: ({ ...props }) => (
                  <td className="p-3 border border-gray-800 font-sans text-[11px] text-gray-400 font-normal" {...props} />
                ),
                blockquote: ({ ...props }) => (
                  <blockquote className="border-l-4 border-[#FF6B1A] bg-black/25 px-4 py-3 rounded-r-lg my-6 italic text-[#eadaad] text-xs sm:text-sm" {...props} />
                ),
                table: ({ ...props }) => (
                  <div className="overflow-x-auto my-6 border border-gray-800 rounded-xl bg-[#0f1311]/40">
                    <table className="w-full text-left border-collapse" {...props} />
                  </div>
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>

          {/* Internal links to related products (2 items) */}
          <div className="mt-16 pt-12 border-t border-gray-800 select-none">
            <h4 className="font-display font-bold text-xs uppercase tracking-widest text-[#eadaad] mb-6 text-left">
              Featured Physical Currency Assets Referenced
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {featuredProducts.map((prod) => (
                <div key={prod.id} className="bg-[#0f1311] border border-gray-800 rounded-xl p-5 flex gap-4 items-center">
                  <div className="relative w-20 h-20 rounded bg-[#070908] overflow-hidden border border-gray-800/60 grow-0 shrink-0">
                    <Image 
                      src={prod.image} 
                      alt={prod.name} 
                      fill
                      sizes="80px"
                      className="object-cover"
                      referrerPolicy="strict-origin-when-cross-origin"
                    />
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <span className="text-[9px] font-mono text-[#c59b27] uppercase block">{prod.tag}</span>
                    <h5 className="font-display font-bold text-xs text-white truncate mt-1">{prod.name}</h5>
                    <p className="text-[10px] text-gray-400 line-clamp-1 mt-1 font-sans">{prod.description}</p>
                    <Link 
                      href={`/products/${prod.slug}`}
                      className="text-[9px] font-mono font-bold text-[#FF6B1A] hover:text-white uppercase tracking-widest inline-flex items-center gap-1 mt-2.5"
                    >
                      Configure Stack
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Related articles box (3 links to other blog posts) as requested */}
          <div className="mt-12 bg-[#0f1311] border border-gray-800 rounded-xl p-6 select-none text-left">
            <h4 className="font-display font-bold text-xs uppercase tracking-widest text-[#eadaad] mb-6 pb-2 border-b border-gray-800">
              Related Research Publications Panel
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((rpost) => (
                <div key={rpost.slug} className="flex flex-col">
                  <span className="text-[9px] font-mono text-gray-500">{rpost.category}</span>
                  <h5 className="font-display font-bold text-xs text-white hover:text-[#c59b27] transition-colors mt-2 line-clamp-2">
                    <Link href={`/blog/${rpost.slug}`}>
                      {rpost.title}
                    </Link>
                  </h5>
                  <Link 
                    href={`/blog/${rpost.slug}`}
                    className="text-[9px] font-mono font-bold text-[#FF6B1A] uppercase tracking-widest mt-4 inline-flex items-center gap-1 mt-auto"
                  >
                    <span>Read Article</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Box with WhatsApp + Shop Buttons */}
          <div className="mt-12 bg-gradient-to-r from-[#042918] to-[#070908] border border-[#c59b27]/20 rounded-xl p-8 text-center select-none">
            <h4 className="font-display font-bold text-white text-md uppercase tracking-wider mb-2">
              Settle Your Cinematic Requirements Flawlessly
            </h4>
            <p className="font-sans text-xs text-gray-400 max-w-md mx-auto leading-relaxed mb-6">
              Ensure unmatched visual authenticity on your filmmaking timelines today with our natural cotton banknotes.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <a
                href={`https://wa.me/18437320661?text=Hello%20I%20read%20your%20article%20on%20${encodeURIComponent(post.title)}%20and%20want%20to%20discuss%20pricing`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-2.5 bg-[#25D366] text-white hover:bg-[#20ba5a] text-[10px] font-mono font-bold tracking-widest uppercase rounded flex items-center justify-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 fill-current" />
                <span>Discuss via WhatsApp</span>
              </a>
              <Link
                href="/products"
                className="w-full sm:w-auto px-6 py-2.5 bg-[#FF6B1A] text-white hover:bg-[#e05610] text-[10px] font-mono font-bold tracking-widest uppercase rounded flex items-center justify-center gap-1.5"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Browse Products</span>
              </Link>
            </div>
          </div>

        </article>
      </section>

    </div>
  );
}
