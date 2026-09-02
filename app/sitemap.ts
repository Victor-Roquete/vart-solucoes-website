import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/constants';

const routes = ['/', '/servicos', '/projetos', '/sobre', '/contato'];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '/' ? 'weekly' : 'monthly',
    priority: route === '/' ? 1 : 0.7,
  }));
}