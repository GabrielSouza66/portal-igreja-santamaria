import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  Search,
  Calendar,
  BookOpen,
  Filter,
  FileText,
  PlayCircle,
  Tag,
} from 'lucide-react';
import { getContents, getContentCategories } from '@/lib/data-service';
import { formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { BreadcrumbsJsonLd } from '@/components/seo/JsonLd';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Biblioteca de Conteúdos, Pregações e Estudos Bíblicos',
  description:
    'Acesse o acervo digital de pregações expositivas, estudos bíblicos, escalas e mensagens pastorais da Igreja em Santa Maria DF.',
  alternates: {
    canonical: `${siteConfig.url}/conteudo`,
  },
};

export const revalidate = 60;

interface PageProps {
  searchParams: {
    q?: string;
    categoria?: string;
    ordem?: 'recent' | 'oldest';
  };
}

export default async function ConteudoPage({ searchParams }: PageProps) {
  const query = searchParams.q || '';
  const currentCategory = searchParams.categoria || 'all';
  const sort = searchParams.ordem || 'recent';

  const [categories, contents] = await Promise.all([
    getContentCategories(),
    getContents({
      query: query || undefined,
      category: currentCategory !== 'all' ? currentCategory : undefined,
      sort,
    }),
  ]);

  return (
    <div className="py-12 sm:py-16 bg-[#F6F8F6]">
      <BreadcrumbsJsonLd
        items={[
          { name: 'Início', url: siteConfig.url },
          { name: 'Conteúdo', url: `${siteConfig.url}/conteudo` },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <div className="max-w-3xl mb-10">
          <Badge variant="primary" className="mb-3">
            Biblioteca Digital
          </Badge>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#17231C] tracking-tight">
            Pregações, Estudos e Materiais
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#53655B] leading-relaxed">
            Consulte mensagens em áudio/vídeo, esboços, estudos temáticos e documentos pastorais para o seu crescimento bíblico e doutrinário.
          </p>
        </div>

        {/* Barra de Filtros e Pesquisa */}
        <div className="bg-white p-5 rounded-2xl border border-[#E2E9E4] shadow-sm mb-10 space-y-4">
          <form method="GET" action="/conteudo" className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Campo de Busca */}
            <div className="md:col-span-5 relative">
              <label htmlFor="search-input" className="sr-only">
                Pesquisar por título ou tema
              </label>
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                id="search-input"
                name="q"
                type="search"
                defaultValue={query}
                placeholder="Pesquisar mensagens ou estudos..."
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#F6F8F6] border border-[#E2E9E4] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0D5131] transition-colors"
              />
            </div>

            {/* Filtro por Categoria */}
            <div className="md:col-span-4 relative">
              <label htmlFor="category-select" className="sr-only">
                Filtrar por Categoria
              </label>
              <select
                id="category-select"
                name="categoria"
                defaultValue={currentCategory}
                className="w-full px-4 py-2.5 text-sm bg-[#F6F8F6] border border-[#E2E9E4] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0D5131] transition-colors"
              >
                <option value="all">Todas as Categorias</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Ordenação */}
            <div className="md:col-span-3 flex gap-2">
              <select
                name="ordem"
                defaultValue={sort}
                className="w-full px-4 py-2.5 text-sm bg-[#F6F8F6] border border-[#E2E9E4] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0D5131] transition-colors"
              >
                <option value="recent">Mais Recentes</option>
                <option value="oldest">Mais Antigos</option>
              </select>
              <Button type="submit" variant="primary" size="md">
                Filtrar
              </Button>
            </div>
          </form>

          {/* Categorias em Pílulas Rápidas */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#E2E9E4]/60 text-xs">
            <span className="font-semibold text-[#53655B] flex items-center gap-1">
              <Tag className="w-3.5 h-3.5" /> Categorias:
            </span>
            <Link
              href="/conteudo"
              className={`px-3 py-1 rounded-full font-medium transition-colors ${
                currentCategory === 'all'
                  ? 'bg-[#0D5131] text-white'
                  : 'bg-[#F6F8F6] text-[#53655B] hover:bg-[#E7F1EC]'
              }`}
            >
              Todas
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/conteudo?categoria=${cat.slug}`}
                className={`px-3 py-1 rounded-full font-medium transition-colors ${
                  currentCategory === cat.slug
                    ? 'bg-[#0D5131] text-white'
                    : 'bg-[#F6F8F6] text-[#53655B] hover:bg-[#E7F1EC]'
                }`}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Listagem de Cards de Conteúdo */}
        {contents.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-[#E2E9E4]">
            <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h2 className="font-heading font-bold text-xl text-[#17231C]">
              Nenhum material encontrado
            </h2>
            <p className="text-sm text-[#53655B] mt-1 max-w-md mx-auto">
              Tente ajustar os filtros ou a palavra-chave pesquisada para encontrar mensagens e estudos.
            </p>
            <div className="mt-6">
              <Button href="/conteudo" variant="outline" size="sm">
                Limpar Filtros
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {contents.map((content) => (
              <article
                key={content.id}
                className="flex flex-col bg-white rounded-2xl border border-[#E2E9E4] overflow-hidden hover:shadow-card-hover transition-all duration-200 group"
              >
                {/* Imagem de Capa com badge */}
                <div className="relative aspect-[16/10] bg-[#E7F1EC] overflow-hidden">
                  {content.cover_image ? (
                    <Image
                      src={content.cover_image}
                      alt={content.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#0D5131]">
                      <BookOpen className="w-10 h-10" />
                    </div>
                  )}

                  {content.category && (
                    <div className="absolute top-3 left-3">
                      <Badge variant="primary" className="bg-[#0D5131]/90 backdrop-blur-sm">
                        {content.category.name}
                      </Badge>
                    </div>
                  )}

                  {content.video_url && (
                    <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded-md text-[11px] font-semibold flex items-center gap-1">
                      <PlayCircle className="w-3.5 h-3.5 text-emerald-400" /> Vídeo
                    </div>
                  )}
                </div>

                {/* Conteúdo do Card */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-[#53655B] mb-2.5">
                      <Calendar className="w-3.5 h-3.5" />
                      <time dateTime={content.published_at || ''}>
                        {formatDate(content.published_at)}
                      </time>
                      {content.author && <span>• {content.author}</span>}
                    </div>

                    <h2 className="font-heading font-bold text-lg text-[#17231C] group-hover:text-[#0D5131] transition-colors leading-snug mb-2">
                      <Link href={`/conteudo/${content.slug}`}>
                        {content.title}
                      </Link>
                    </h2>

                    <p className="text-xs sm:text-sm text-[#53655B] line-clamp-3 leading-relaxed">
                      {content.summary}
                    </p>
                  </div>

                  <div className="pt-4 mt-6 border-t border-[#E2E9E4] flex items-center justify-between">
                    <span className="text-xs text-[#53655B] flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5 text-[#0D5131]" /> Artigo Completo
                    </span>
                    <Link
                      href={`/conteudo/${content.slug}`}
                      className="text-xs font-semibold text-[#0D5131] hover:underline"
                    >
                      Acessar →
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
