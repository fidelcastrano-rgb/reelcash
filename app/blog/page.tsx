'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Calendar, 
  Clock, 
  User, 
  ArrowRight, 
  BookOpen,
  Sparkles
} from 'lucide-react';
import { BLOG_POSTS } from '@/lib/data';
import { Breadcrumbs } from '@/components/LayoutTemplates';

export default function BlogListingPage() {
  return (
    <div className="flex flex-col gap-0 bg-[#070908] text-white">
      
      {/* Header Splash */}
      <section className="bg-gradient-to-b from-[#090d0b] to-[#070908] py-16 border-b border-gray-900 select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs paths={[{ name: 'Academic Research' }]} />
          
          <div className="max-w-3xl mt-4">
            <span className="text-[10px] font-mono text-[#c59b27] uppercase tracking-widest">
              The Reel Publishing Syndicate
            </span>
            <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white mt-3 mb-6">
              Industrial Replica Currency &amp; Texture Research
            </h1>
            <p className="font-sans text-xs sm:text-sm text-gray-400 leading-relaxed">
              Maintain close track of printing details, production aging solutions, film history articles, and quality comparisons concerning premium replica currency designs.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="flex items-center gap-3.5 pb-4 border-b border-gray-800 mb-10 select-none">
          <BookOpen className="w-5 h-5 text-[#c59b27]" />
          <h2 className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#eadaad]">
            Available Research Publications ({BLOG_POSTS.length} Articles)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <article 
              key={post.slug}
              className="bg-[#0f1311] border border-gray-800 rounded-xl overflow-hidden shadow-lg hover:border-[#c59b27]/35 hover:scale-[1.01] transition-all flex flex-col h-full"
            >
              {/* Card Image */}
              <div className="relative h-48 bg-[#070908] overflow-hidden group">
                <Image 
                  src={post.image} 
                  alt={post.title} 
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
                
                {/* Category overlay */}
                <span className="absolute top-4 left-4 bg-white text-[#042918] text-[9.5px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded">
                  {post.category}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col flex-grow">
                {/* Meta details */}
                <div className="flex items-center gap-4 text-[10px] font-mono text-gray-500 mb-4 select-none">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-[#c59b27]" /> {post.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-[#c59b27]" /> {post.readTime}</span>
                </div>

                <h3 className="font-display font-bold text-md text-white mb-3 hover:text-[#c59b27] transition-colors leading-snug">
                  <Link href={`/blog/${post.slug}`} className="focus:outline-none">
                    {post.title}
                  </Link>
                </h3>

                <p className="font-sans text-xs text-gray-400 leading-relaxed mb-6 flex-grow line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Read Link */}
                <div className="pt-5 border-t border-gray-800/60 mt-auto flex items-center justify-between">
                  <span className="text-[10px] font-mono text-gray-500 flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-gray-600" /> By {post.author.split(' ').slice(-1)}
                  </span>
                  
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold text-[#FF6B1A] hover:text-white uppercase tracking-widest transition-colors"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

      </section>

      {/* Newsletter simple banner */}
      <section className="bg-gradient-to-r from-[#042918]/20 to-transparent border-t border-gray-900 py-16 select-none">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#c59b27] uppercase tracking-widest mb-3">
            <Sparkles className="w-4 h-4 text-[#c59b27]" />
            <span>Research Notifications Registry</span>
          </div>
          <h4 className="font-display font-bold text-white text-md uppercase tracking-wider mb-2">
            Stay Up to Date with Texture Innovations
          </h4>
          <p className="font-sans text-xs text-gray-400 max-w-md mx-auto leading-relaxed mb-6">
            We periodically broadcast log edits regarding printing innovations and advanced texture designs. Request registration directly via WhatsApp channels.
          </p>
          <a
            href="https://wa.me/18437320661?text=Register%20me%20for%20Reel%20Cash%20Texture%20Newsletters"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex py-2.5 px-6 font-mono font-bold text-[10px] uppercase bg-transparent text-gray-300 hover:text-white border border-gray-700 hover:border-gray-500 rounded tracking-widest transition-all"
          >
            Register via WhatsApp Support
          </a>
        </div>
      </section>

    </div>
  );
}
