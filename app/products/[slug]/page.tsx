import React from 'react';
import { notFound } from 'next/navigation';
import { PRODUCTS } from '@/lib/data';
import ProductDetailPageClient from '@/components/ProductDetailPageClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  // Related products (exclude current)
  const relatedProducts = PRODUCTS.filter((p) => p.slug !== slug);

  return (
    <ProductDetailPageClient 
      product={product} 
      relatedProducts={relatedProducts} 
    />
  );
}
