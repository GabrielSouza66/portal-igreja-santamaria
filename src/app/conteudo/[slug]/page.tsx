import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  Calendar,
  User,
  ArrowLeft,
  Share2,
  Download,
  FileText,
  PlayCircle,
  ExternalLink,
} from 'lucide-react';
import { getContentBySlug, getRecentContents } from '@/lib/data-service';
import { formatDate, getYouTubeEmbedUrl, formatFileSize } from '@/lib/utils';
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
  const content = await getContentBySlug(params.slug);
  if (!content) return { title: 'Conteúdo não encontrado' };

  return {
    title: content.title,
    description: content.summary,
    alternates: {
      canonical: `${siteConfig.url}/conteudo/${content.slug}`,
    },
    openGraph: {
      title: content.title,
      description: content.summary,
      url: `${siteConfig.url}/conteudo/${content.slug}`,
      type: 'article',
      publishedTime: content.published_at || undefined,
      images: content.cover_image
        ? [{ url: content.cover_image, alt: content.title }]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: content.title,
      description: content.summary,
      images: content.cover_image ? [content.cover_image] : undefined,
    },
  };
}

export const revalidate = 60;

export default async function ContentDetailPage({ params }: Props) {
  const content = await getContentBySlug(params.slug);
  if (!content) {
    notFound();
  }

  const related = (await getRecentContents(4)).filter(
    (item) => item.id !== content.id
  ).slice(0, 3);

  const videoEmbedUrl = getYouTubeEmbedUrl(content.video_url);

  return (
    <article className="py-12 sm:py-16 bg-white">
      <BreadcrumbsJsonLd
        items={[
          { name: 'Início', url: siteConfig.url },
          { name: 'Conteúdo', url: `${siteConfig.url}/conteudo` },
          { name: content.title, url: `${siteConfig.url}/conteudo/${content.slug}` },
        ]}
      />
      <ArticleJsonLd
        title={content.title}
        description={content.summary}
        url={`${siteConfig.url}/conteudo/${content.slug}`}
        datePublished={content.published_at || content.created_at}
        dateModified={content.updated_at}
        imageUrl={content.cover_image}
        authorName={content.author || siteConfig.shortName}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navegação de Retorno */}
        <div className="mb-8">
          <Link
            href="/conteudo"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0D5131] hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Voltar para o acervo de conteúdos
          </Link>
        </div>

        {/* Cabeçalho do Conteúdo */}
        <header className="space-y-4 mb-8">
          {content.category && (
            <Badge variant="primary" className="text-xs">
              {content.category.name}
            </Badge>
          )}

          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#17231C] leading-tight">
            {content.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-[#53655B] pt-2 border-y border-[#E2E9E4] py-3">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#0D5131]" />
              Publicado em {formatDate(content.published_at)}
            </span>
            {content.author && (
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-[#0D5131]" />
                {content.author}
              </span>
            )}
            <span className="text-[#0D5131] font-semibold">
              {siteConfig.shortName}
            </span>
          </div>

          <p className="text-base sm:text-lg text-[#4A5B51] font-medium leading-relaxed italic bg-[#F6F8F6] p-4 rounded-xl border border-[#E2E9E4]">
            {content.summary}
          </p>
        </header>

        {/* Imagem de Capa em Alta Resolução */}
        {content.cover_image && (
          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-10 shadow-sm border border-[#E2E9E4] bg-[#E7F1EC]">
            <Image
              src={content.cover_image}
              alt={content.title}
              fill
              priority
              sizes="(max-width: 896px) 100vw, 896px"
              className="object-cover"
            />
          </div>
        )}

        {/* Player de Vídeo Incorporado do YouTube (se cadastrado) */}
        {videoEmbedUrl && (
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-3 text-sm font-semibold text-[#0D5131]">
              <PlayCircle className="w-4 h-4" /> Vídeo da Mensagem
            </div>
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-md bg-black border border-[#E2E9E4]">
              <iframe
                src={videoEmbedUrl}
                title={`Vídeo: ${content.title}`}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}

        {/* Corpo Textual Completo (HTML Semântico Acessível para Indexação) */}
        <section className="prose prose-lg max-w-none text-[#17231C] prose-headings:font-heading prose-headings:text-[#17231C] prose-p:leading-relaxed prose-a:text-[#0D5131] mb-12">
          {content.body.split('\n\n').map((paragraph, index) => {
            if (paragraph.startsWith('### ')) {
              return (
                <h3 key={index} className="text-xl font-bold mt-6 mb-3">
                  {paragraph.replace('### ', '')}
                </h3>
              );
            }
            if (paragraph.startsWith('1. ') || paragraph.startsWith('- ')) {
              return (
                <div key={index} className="my-3 pl-4 border-l-2 border-[#0D5131] space-y-1 text-sm sm:text-base">
                  {paragraph.split('\n').map((line, liIdx) => (
                    <p key={liIdx} className="my-1">
                      {line}
                    </p>
                  ))}
                </div>
              );
            }
            return (
              <p key={index} className="my-4 text-base sm:text-lg leading-relaxed">
                {paragraph}
              </p>
            );
          })}
        </section>

        {/* Seção de Arquivos e Documentos Anexos */}
        {content.attachments && content.attachments.length > 0 && (
          <section className="p-6 rounded-2xl bg-[#F6F8F6] border border-[#E2E9E4] mb-12 space-y-4">
            <h3 className="font-heading font-bold text-lg text-[#17231C] flex items-center gap-2">
              <Download className="w-5 h-5 text-[#0D5131]" /> Documentos e Anexos Relacionados
            </h3>
            <p className="text-xs text-[#53655B]">
              Baixe materiais de apoio, esboços e apostilas associados a este estudo:
            </p>

            <div className="space-y-3 pt-2">
              {content.attachments.map((att) => {
                const isPdf = att.mime_type.includes('pdf');
                const isDocx = att.mime_type.includes('word') || att.original_filename.endsWith('.docx') || att.original_filename.endsWith('.doc');

                return (
                  <div
                    key={att.id}
                    className="p-4 rounded-xl bg-white border border-[#E2E9E4] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#E7F1EC] text-[#0D5131] flex items-center justify-center font-bold text-xs uppercase">
                        {isPdf ? 'PDF' : isDocx ? 'DOC' : 'ARQ'}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#17231C]">
                          {att.original_filename}
                        </p>
                        <span className="text-xs text-[#53655B]">
                          {formatFileSize(att.file_size)} • {isDocx ? 'Documento Word' : 'PDF'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        href={att.public_url || '#'}
                        external
                        size="sm"
                        variant="primary"
                        className="w-full sm:w-auto"
                      >
                        <Download className="w-3.5 h-3.5" /> Baixar Anexo
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Conteúdos Relacionados */}
        {related.length > 0 && (
          <aside className="pt-10 border-t border-[#E2E9E4]">
            <h3 className="font-heading font-bold text-xl text-[#17231C] mb-6">
              Conteúdos Relacionados
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((item) => (
                <div
                  key={item.id}
                  className="p-5 rounded-2xl bg-[#F6F8F6] border border-[#E2E9E4] flex flex-col justify-between hover:shadow-card transition-all"
                >
                  <div>
                    <span className="text-xs text-[#0D5131] font-semibold block mb-1">
                      {item.category?.name || 'Estudo'}
                    </span>
                    <h4 className="font-heading font-bold text-sm text-[#17231C] line-clamp-2 mb-2">
                      <Link
                        href={`/conteudo/${item.slug}`}
                        className="hover:text-[#0D5131] hover:underline"
                      >
                        {item.title}
                      </Link>
                    </h4>
                  </div>
                  <Link
                    href={`/conteudo/${item.slug}`}
                    className="text-xs font-semibold text-[#0D5131] hover:underline mt-4 inline-flex items-center gap-1"
                  >
                    Ler mais →
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
