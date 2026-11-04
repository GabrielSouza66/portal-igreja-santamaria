import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Download,
  Search,
  FileText,
  Filter,
  FileCheck,
  FolderOpen,
  Calendar,
} from 'lucide-react';
import { getDownloads } from '@/lib/data-service';
import { formatDate, formatFileSize } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { BreadcrumbsJsonLd } from '@/components/seo/JsonLd';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Downloads e Documentos Oficiais',
  description:
    'Biblioteca oficial de documentos da igreja: escalas ministeriais, apostilas de estudo, formulários de membros e materiais institucionais.',
  alternates: {
    canonical: `${siteConfig.url}/downloads`,
  },
};

export const revalidate = 60;

interface PageProps {
  searchParams: {
    q?: string;
    categoria?: string;
  };
}

const CATEGORIES = [
  'Escalas',
  'Estudos',
  'Apostilas',
  'Formulários',
  'Materiais institucionais',
  'Outros',
];

export default async function DownloadsPage({ searchParams }: PageProps) {
  const query = searchParams.q || '';
  const currentCategory = searchParams.categoria || 'all';

  const downloads = await getDownloads({
    query: query || undefined,
    category: currentCategory !== 'all' ? currentCategory : undefined,
  });

  return (
    <div className="py-12 sm:py-16 bg-[#F6F8F6]">
      <BreadcrumbsJsonLd
        items={[
          { name: 'Início', url: siteConfig.url },
          { name: 'Downloads', url: `${siteConfig.url}/downloads` },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <div className="max-w-3xl mb-10">
          <Badge variant="primary" className="mb-3">
            Acervo de Arquivos
          </Badge>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#17231C] tracking-tight">
            Downloads e Documentos
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#53655B] leading-relaxed">
            Acesse escalas de ministérios, apostilas da Escola Dominical, formulários de atualização cadastral e comunicados da instituição.
          </p>
        </div>

        {/* Barra de Filtros e Busca */}
        <div className="bg-white p-5 rounded-2xl border border-[#E2E9E4] shadow-sm mb-10 space-y-4">
          <form method="GET" action="/downloads" className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-6 relative">
              <label htmlFor="search-download" className="sr-only">
                Pesquisar documentos
              </label>
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                id="search-download"
                name="q"
                type="search"
                defaultValue={query}
                placeholder="Pesquisar por título ou descrição..."
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#F6F8F6] border border-[#E2E9E4] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0D5131] transition-colors"
              />
            </div>

            <div className="md:col-span-4">
              <label htmlFor="category-download" className="sr-only">
                Categoria
              </label>
              <select
                id="category-download"
                name="categoria"
                defaultValue={currentCategory}
                className="w-full px-4 py-2.5 text-sm bg-[#F6F8F6] border border-[#E2E9E4] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0D5131] transition-colors"
              >
                <option value="all">Todas as Categorias</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <Button type="submit" variant="primary" size="md" className="w-full">
                Filtrar
              </Button>
            </div>
          </form>

          {/* Atalhos Rápidos por Categoria */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#E2E9E4]/60 text-xs">
            <span className="font-semibold text-[#53655B] flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Categorias:
            </span>
            <Link
              href="/downloads"
              className={`px-3 py-1 rounded-full font-medium transition-colors ${
                currentCategory === 'all'
                  ? 'bg-[#0D5131] text-white'
                  : 'bg-[#F6F8F6] text-[#53655B] hover:bg-[#E7F1EC]'
              }`}
            >
              Todas
            </Link>
            {CATEGORIES.map((cat) => (
              <Link
                key={cat}
                href={`/downloads?categoria=${encodeURIComponent(cat)}`}
                className={`px-3 py-1 rounded-full font-medium transition-colors ${
                  currentCategory === cat
                    ? 'bg-[#0D5131] text-white'
                    : 'bg-[#F6F8F6] text-[#53655B] hover:bg-[#E7F1EC]'
                }`}
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>

        {/* Lista de Documentos */}
        {downloads.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-[#E2E9E4]">
            <FolderOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h2 className="font-heading font-bold text-xl text-[#17231C]">
              Nenhum documento encontrado
            </h2>
            <p className="text-sm text-[#53655B] mt-1 max-w-md mx-auto">
              Não encontramos arquivos correspondentes aos critérios de pesquisa informados.
            </p>
            <div className="mt-6">
              <Button href="/downloads" variant="outline" size="sm">
                Limpar Filtros
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {downloads.map((doc) => {
              const isPdf =
                doc.mime_type?.includes('pdf') || doc.file_name.endsWith('.pdf');
              const isDocx =
                doc.mime_type?.includes('word') ||
                doc.file_name.endsWith('.docx') ||
                doc.file_name.endsWith('.doc');

              return (
                <div
                  key={doc.id}
                  className="p-6 rounded-2xl bg-white border border-[#E2E9E4] hover:shadow-card-hover transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="secondary" className="text-xs">
                        {doc.category}
                      </Badge>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#0D5131] bg-[#E7F1EC] px-2 py-0.5 rounded">
                        {isPdf ? 'PDF' : isDocx ? 'DOCX' : 'ARQUIVO'}
                      </span>
                    </div>

                    <h2 className="font-heading font-bold text-lg text-[#17231C] mb-2 leading-snug">
                      {doc.title}
                    </h2>

                    {doc.description && (
                      <p className="text-xs sm:text-sm text-[#53655B] leading-relaxed mb-4">
                        {doc.description}
                      </p>
                    )}
                  </div>

                  <div>
                    <div className="text-xs text-[#53655B] space-y-1 pb-4 pt-3 border-t border-[#E2E9E4]/60">
                      <div className="flex items-center justify-between">
                        <span>Tamanho:</span>
                        <span className="font-medium text-[#17231C]">
                          {formatFileSize(doc.file_size)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Publicação:</span>
                        <span className="font-medium text-[#17231C]">
                          {formatDate(doc.published_at)}
                        </span>
                      </div>
                    </div>

                    <Button
                      href={doc.file_url}
                      external
                      variant="primary"
                      size="sm"
                      className="w-full"
                    >
                      <Download className="w-4 h-4" /> Baixar Documento
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

