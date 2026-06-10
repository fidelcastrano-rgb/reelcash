import type { MetadataRoute } from 'next';
import { PRODUCTS, BLOG_POSTS } from '@/lib/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.APP_URL || 'https://reelbills.com';

  // Base list
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  // Dynamic Product Pages
  PRODUCTS.forEach((p) => {
    routes.push({
      url: `${baseUrl}/products/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.95,
    });
  });

  // Dynamic Blog Posts
  BLOG_POSTS.forEach((bp) => {
    routes.push({
      url: `${baseUrl}/blog/${bp.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8, // 0.75-0.8, choosing 0.8 for safe coverage
    });
  });

  return routes;
}
