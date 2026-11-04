import React from 'react';
import Link from 'next/link';
import { Download, Plus, FileText, ExternalLink, Calendar } from 'lucide-react';
import { getDownloads } from '@/lib/data-service';
import { formatDate, formatFileSize } from '@/lib/utils';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export const revalidate = 0;

export default async function AdminDownloadsPage() {
  const downloads = await getDownloads();

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      <main className="flex-1 p-6 sm:p-10 max-w-7xl overflow-y-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 border-b border-[#E2E9E4] gap-4">
          <div>
            <h1 className="font-heading font-bold text-2xl sm:text-3xl text-[#17231C]">
              Gestão de Downloads e Arquivos Oficiais
            </h1>
            <p className="text-xs sm:text-sm text-[#53655B] mt-1">
              Disponibilize escalas, estudos em PDF, formulários em DOCX e apostilas institucionais.
            </p>
          </div>

          <Button href="/admin/downloads/novo" variant="primary">
            <Plus className="w-4 h-4 mr-1.5" /> Enviar Novo Documento
          </Button>
        </div>

        <div className="mt-8 bg-white rounded-3xl border border-[#E2E9E4] shadow-sm overflow-hidden">
          <div className="p-4 sm:p-6 border-b border-[#E2E9E4]">
            <span className="text-xs font-semibold text-[#53655B]">
              Total de {downloads.length} documento(s) cadastrado(s)
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-[#F6F8F6] border-b border-[#E2E9E4] text-[#53655B] uppercase text-[11px] font-semibold">
                  <th className="p-4">Título do Documento</th>
                  <th className="p-4">Categoria</th>
                  <th className="p-4">Formato / Tamanho</th>
                  <th className="p-4">Publicado em</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E9E4]">
                {downloads.map((doc) => (
                  <tr key={doc.id} className="hover:bg-[#F6F8F6]/60 transition-colors">
                    <td className="p-4 font-medium text-[#17231C]">
                      <div>
                        <span className="font-semibold block">{doc.title}</span>
                        <span className="text-xs text-[#53655B] font-mono">
                          {doc.file_name}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-[#53655B]">
                      <Badge variant="secondary" className="text-xs">
                        {doc.category}
                      </Badge>
                    </td>
                    <td className="p-4 text-[#53655B]">
                      {formatFileSize(doc.file_size)}
                    </td>
                    <td className="p-4 text-[#53655B] whitespace-nowrap">
                      {formatDate(doc.published_at)}
                    </td>
                    <td className="p-4">
                      <Badge variant="primary" className="text-[11px]">
                        Publicado
                      </Badge>
                    </td>
                    <td className="p-4 text-right">
                      <a
                        href={doc.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex p-1.5 text-gray-500 hover:text-[#0D5131] transition-colors"
                        title="Baixar arquivo"
                      >
                        <Download className="w-4 h-4" />
                      </a>
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

