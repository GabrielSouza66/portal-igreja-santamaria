import React from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Plus,
  Calendar,
  Edit2,
  Trash2,
  ExternalLink,
  Search,
} from 'lucide-react';
import { getContents, getContentCategories } from '@/lib/data-service';
import { formatDate } from '@/lib/utils';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export const revalidate = 0;

export default async function AdminConteudosPage() {
  const [contents, categories] = await Promise.all([
    getContents(),
    getContentCategories(),
  ]);

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      <main className="flex-1 p-6 sm:p-10 max-w-7xl overflow-y-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 border-b border-[#E2E9E4] gap-4">
          <div>
            <h1 className="font-heading font-bold text-2xl sm:text-3xl text-[#17231C]">
              Gestão de Conteúdos
            </h1>
            <p className="text-xs sm:text-sm text-[#53655B] mt-1">
              Publique e gerencie pregações, estudos bíblicos, escalas e mensagens semanais.
            </p>
          </div>

          <Button href="/admin/conteudos/novo" variant="primary">
            <Plus className="w-4 h-4 mr-1.5" /> Adicionar Conteúdo
          </Button>
        </div>

        {/* Tabela de Conteúdos */}
        <div className="mt-8 bg-white rounded-3xl border border-[#E2E9E4] shadow-sm overflow-hidden">
          <div className="p-4 sm:p-6 border-b border-[#E2E9E4] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <span className="text-xs font-semibold text-[#53655B]">
              Total de {contents.length} itens cadastrados
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-[#F6F8F6] border-b border-[#E2E9E4] text-[#53655B] uppercase text-[11px] font-semibold">
                  <th className="p-4">Título</th>
                  <th className="p-4">Categoria</th>
                  <th className="p-4">Data</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E9E4]">
                {contents.map((item) => (
                  <tr key={item.id} className="hover:bg-[#F6F8F6]/60 transition-colors">
                    <td className="p-4 font-medium text-[#17231C]">
                      <div>
                        <span className="block font-semibold">{item.title}</span>
                        <span className="text-xs text-[#53655B] font-mono">
                          /conteudo/{item.slug}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-[#53655B]">
                      {item.category?.name || 'Geral'}
                    </td>
                    <td className="p-4 text-[#53655B] whitespace-nowrap">
                      {formatDate(item.published_at)}
                    </td>
                    <td className="p-4">
                      <Badge
                        variant={item.status === 'published' ? 'primary' : 'secondary'}
                        className="text-[11px]"
                      >
                        {item.status === 'published' ? 'Publicado' : 'Rascunho'}
                      </Badge>
                    </td>
                    <td className="p-4 text-right space-x-2 whitespace-nowrap">
                      <Link
                        href={`/conteudo/${item.slug}`}
                        target="_blank"
                        className="inline-flex p-1.5 text-gray-500 hover:text-[#0D5131] transition-colors"
                        title="Ver página pública"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

