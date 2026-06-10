import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.APP_URL || 'https://reelbills.com';
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/terms', '/privacy', '/checkout', '/admin'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
