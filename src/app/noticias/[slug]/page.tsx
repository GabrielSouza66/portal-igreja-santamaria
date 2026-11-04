import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  Calendar,
  ArrowLeft,
  Share2,
  MessageCircle,
  Newspaper,
} from 'lucide-react';
import { getNewsBySlug, getRecentNews } from '@/lib/data-service';
import { formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { BreadcrumbsJsonLd, ArticleJsonLd } from '@/components/seo/JsonLd';
import { siteConfig } from '@/lib/config';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getNewsBySlug(params.slug);
  if (!article) return { title: 'Notícia não encontrada' };

  return {
    title: article.title,
    description: article.summary,
    alternates: {
      canonical: `${siteConfig.url}/noticias/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.summary,
      url: `${siteConfig.url}/noticias/${article.slug}`,
      type: 'article',
      publishedTime: article.published_at,
      images: article.cover_image
        ? [{ url: article.cover_image, alt: article.title }]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.summary,
      images: article.cover_image ? [article.cover_image] : undefined,
    },
  };
}

export const revalidate = 60;

export default async function NewsDetailPage({ params }: Props) {
  const article = await getNewsBySlug(params.slug);
  if (!article) {
    notFound();
  }

  const related = (await getRecentNews(4)).filter(
    (item) => item.id !== article.id
  ).slice(0, 2);

  const shareUrl = `${siteConfig.url}/noticias/${article.slug}`;
  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    `${article.title} — Leia no portal da ${siteConfig.shortName}: ${shareUrl}`
  )}`;

  return (
    <article className="py-12 sm:py-16 bg-white">
      <BreadcrumbsJsonLd
        items={[
          { name: 'Início', url: siteConfig.url },
          { name: 'Notícias', url: `${siteConfig.url}/noticias` },
          { name: article.title, url: shareUrl },
        ]}
      />
      <ArticleJsonLd
        title={article.title}
        description={article.summary}
        url={shareUrl}
        datePublished={article.published_at}
        dateModified={article.updated_at}
        imageUrl={article.cover_image}
        authorName={siteConfig.name}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navegação de Retorno */}
        <div className="mb-8">
          <Link
            href="/noticias"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0D5131] hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Voltar para o mural de notícias
          </Link>
        </div>

        {/* Cabeçalho */}
        <header className="space-y-4 mb-8">
          <Badge variant="primary" className="text-xs">
            Comunicado Oficial
          </Badge>

          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#17231C] leading-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm text-[#53655B] pt-2 border-y border-[#E2E9E4] py-3">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#0D5131]" />
              Publicado em {formatDate(article.published_at)}
            </span>
            <span className="font-semibold text-[#0D5131]">
              {siteConfig.name}
            </span>
          </div>

          <p className="text-base sm:text-lg text-[#4A5B51] font-medium leading-relaxed bg-[#F6F8F6] p-4 rounded-xl border border-[#E2E9E4]">
            {article.summary}
          </p>
        </header>

        {/* Imagem de Capa */}
        {article.cover_image && (
          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-10 shadow-sm border border-[#E2E9E4] bg-[#E7F1EC]">
            <Image
              src={article.cover_image}
              alt={article.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          </div>
        )}

        {/* Texto Completo da Notícia */}
        <section className="prose prose-lg max-w-none text-[#17231C] prose-headings:font-heading prose-headings:text-[#17231C] prose-p:leading-relaxed prose-a:text-[#0D5131] mb-12">
          {article.body.split('\n\n').map((paragraph, index) => {
            if (paragraph.startsWith('- ')) {
              return (
                <ul key={index} className="list-disc pl-5 my-3 space-y-1">
                  {paragraph.split('\n').map((line, liIdx) => (
                    <li key={liIdx}>{line.replace('- ', '')}</li>
                  ))}
                </ul>
              );
            }
            if (paragraph.startsWith('1. ')) {
              return (
                <ol key={index} className="list-decimal pl-5 my-3 space-y-1">
                  {paragraph.split('\n').map((line, liIdx) => (
                    <li key={liIdx}>{line.replace(/^\d+\.\s*/, '')}</li>
                  ))}
                </ol>
              );
            }
            return (
              <p key={index} className="my-4 text-base sm:text-lg leading-relaxed">
                {paragraph}
              </p>
            );
          })}
        </section>

        {/* Compartilhamento */}
        <div className="p-6 rounded-2xl bg-[#F6F8F6] border border-[#E2E9E4] flex flex-col sm:flex-row items-center justify-between gap-4 mb-12">
          <span className="text-sm font-semibold text-[#17231C] flex items-center gap-2">
            <Share2 className="w-4 h-4 text-[#0D5131]" /> Compartilhe este comunicado:
          </span>
          <Button
            href={whatsappShareUrl}
            external
            variant="primary"
            size="sm"
          >
            <MessageCircle className="w-4 h-4" /> Enviar no WhatsApp
          </Button>
        </div>

        {/* Notícias Relacionadas */}
        {related.length > 0 && (
          <aside className="pt-10 border-t border-[#E2E9E4]">
            <h2 className="font-heading font-bold text-xl text-[#17231C] mb-6">
              Outras Notícias Recentes
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {related.map((item) => (
                <div
                  key={item.id}
                  className="p-5 rounded-2xl bg-[#F6F8F6] border border-[#E2E9E4] flex flex-col justify-between"
                >
                  <div>
                    <span className="text-xs text-[#53655B] block mb-1">
                      {formatDate(item.published_at)}
                    </span>
                    <h3 className="font-heading font-bold text-sm text-[#17231C] mb-2 leading-snug">
                      <Link
                        href={`/noticias/${item.slug}`}
                        className="hover:text-[#0D5131] hover:underline"
                      >
                        {item.title}
                      </Link>
                    </h3>
                  </div>
                  <Link
                    href={`/noticias/${item.slug}`}
                    className="text-xs font-semibold text-[#0D5131] hover:underline mt-4 inline-flex items-center gap-1"
                  >
                    Ler comunicado →
                  </Link>
                </div>
              ))}
            </div>
          </aside>
        )}
      </div>
    </article>
  );
}

