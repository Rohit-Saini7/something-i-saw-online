import { MetadataRoute } from 'next';
import { projects } from '@/data/projects';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const routes = ['', '/lab'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 1,
  }));

  const labRoutes = projects
    .filter((p) => p.type === 'experiment')
    .map((project) => ({
      url: `${baseUrl}/lab/${project.slug}`,
      lastModified: new Date(project.date),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }));

  return [...routes, ...labRoutes];
}
