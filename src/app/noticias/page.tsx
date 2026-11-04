import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Search, Newspaper, ArrowRight } from 'lucide-react';
import { getNews } from '@/lib/data-service';
import { formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { BreadcrumbsJsonLd } from '@/components/seo/JsonLd';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Notícias e Comunicados da Igreja',
  description:
    'Acompanhe os comunicados oficiais, eventos futuros, convocações de vigílias e novidades da congregação em Santa Maria Sul DF.',
  alternates: {
    canonical: `${siteConfig.url}/noticias`,
  },
};

export const revalidate = 60;

interface PageProps {
  searchParams: {
    q?: string;
  };
}

export default async function NoticiasPage({ searchParams }: PageProps) {
  const query = searchParams.q || '';
  const news = await getNews({ query: query || undefined });

  return (
    <div className="py-12 sm:py-16 bg-[#F6F8F6]">
      <BreadcrumbsJsonLd
        items={[
          { name: 'Início', url: siteConfig.url },
          { name: 'Notícias', url: `${siteConfig.url}/noticias` },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <div className="max-w-3xl mb-10">
          <Badge variant="primary" className="mb-3">
            Informativo Comunitário
          </Badge>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#17231C] tracking-tight">
            Notícias e Avisos
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#53655B] leading-relaxed">
            Fique por dentro de todas as atividades, convocações de oração e projetos desenvolvidos pela igreja.
          </p>
        </div>

        {/* Campo de Busca */}
        <div className="bg-white p-5 rounded-2xl border border-[#E2E9E4] shadow-sm mb-10">
          <form method="GET" action="/noticias" className="flex gap-3">
            <div className="relative flex-1">
              <label htmlFor="search-news" className="sr-only">
                Pesquisar notícias
              </label>
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                id="search-news"
                name="q"
                type="search"
                defaultValue={query}
                placeholder="Pesquisar comunicados e notícias..."
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#F6F8F6] border border-[#E2E9E4] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0D5131] transition-colors"
              />
            </div>
            <Button type="submit" variant="primary">
              Buscar
            </Button>
          </form>
        </div>

        {/* Grade de Notícias */}
        {news.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-[#E2E9E4]">
            <Newspaper className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h2 className="font-heading font-bold text-xl text-[#17231C]">
              Nenhum comunicado encontrado
            </h2>
            <p className="text-sm text-[#53655B] mt-1 max-w-md mx-auto">
              Não encontramos notícias com os termos pesquisados.
            </p>
            <div className="mt-6">
              <Button href="/noticias" variant="outline" size="sm">
                Ver Todas as Notícias
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {news.map((item) => (
              <article
                key={item.id}
                className="bg-white rounded-2xl border border-[#E2E9E4] overflow-hidden hover:shadow-card-hover transition-all duration-200 flex flex-col group"
              >
                {item.cover_image && (
                  <div className="relative aspect-[16/9] w-full bg-[#E7F1EC] overflow-hidden">
                    <Image
                      src={item.cover_image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-[#53655B] mb-2.5">
                      <Calendar className="w-3.5 h-3.5" />
                      <time dateTime={item.published_at}>
                        {formatDate(item.published_at)}
                      </time>
                      <span>• Comunicado Oficial</span>
                    </div>

                    <h2 className="font-heading font-bold text-xl text-[#17231C] group-hover:text-[#0D5131] transition-colors leading-snug mb-3">
                      <Link href={`/noticias/${item.slug}`}>
                        {item.title}
                      </Link>
                    </h2>

                    <p className="text-xs sm:text-sm text-[#53655B] line-clamp-3 leading-relaxed">
                      {item.summary}
                    </p>
                  </div>

                  <div className="pt-4 mt-6 border-t border-[#E2E9E4] flex items-center justify-between">
                    <span className="text-xs text-[#53655B] font-medium">
                      {siteConfig.shortName}
                    </span>
                    <Link
                      href={`/noticias/${item.slug}`}
                      className="text-xs font-semibold text-[#0D5131] hover:underline inline-flex items-center gap-1"
                    >
                      Ler matéria completa <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

