import { MetadataRoute } from 'next';
import { getContents, getNews } from '@/lib/data-service';
import { siteConfig } from '@/lib/config';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [contents, news] = await Promise.all([getContents(), getNews()]);

  // Rotas estáticas públicas institucionais
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${siteConfig.url}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${siteConfig.url}/programacao`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/conteudo`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.85,
    },
    {
      url: `${siteConfig.url}/downloads`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/noticias`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.85,
    },
    {
      url: `${siteConfig.url}/contato`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${siteConfig.url}/politica-de-privacidade`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // Rotas dinâmicas de conteúdos publicados
  const contentRoutes: MetadataRoute.Sitemap = contents.map((c) => ({
    url: `${siteConfig.url}/conteudo/${c.slug}`,
    lastModified: new Date(c.updated_at || c.published_at || new Date()),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  // Rotas dinâmicas de notícias publicadas
  const newsRoutes: MetadataRoute.Sitemap = news.map((n) => ({
    url: `${siteConfig.url}/noticias/${n.slug}`,
    lastModified: new Date(n.updated_at || n.published_at || new Date()),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...contentRoutes, ...newsRoutes];
}
