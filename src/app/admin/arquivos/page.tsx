import React from 'react';
import Image from 'next/image';
import {
  FolderOpen,
  Upload,
  FileText,
  Image as ImageIcon,
  CheckCircle,
  Copy,
  AlertTriangle,
} from 'lucide-react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export const revalidate = 0;

export default function AdminArquivosPage() {
  const allowedFormats = [
    { ext: 'PDF', mime: 'application/pdf', type: 'Documentos' },
    { ext: 'DOC / DOCX', mime: 'application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document', type: 'Documentos Word' },
    { ext: 'PNG', mime: 'image/png', type: 'Imagens' },
    { ext: 'JPG / JPEG', mime: 'image/jpeg', type: 'Fotografias' },
    { ext: 'WebP', mime: 'image/webp', type: 'Imagens Otimizadas' },
  ];

  const currentFiles = [
    {
      name: 'logo_ipb.png',
      path: '/logo_ipb.png',
      size: '22.5 KB',
      type: 'image/png',
      date: 'Novembro 2026',
    },
    {
      name: 'escala-mensal-diaconia.pdf',
      path: '/downloads/escala-mensal-diaconia.pdf',
      size: '240 KB',
      type: 'application/pdf',
      date: 'Novembro 2026',
    },
    {
      name: 'ficha-atualizacao-membros.docx',
      path: '/downloads/ficha-atualizacao-membros.docx',
      size: '512 KB',
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      date: 'Outubro 2026',
    },
  ];

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      <main className="flex-1 p-6 sm:p-10 max-w-7xl overflow-y-auto space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 border-b border-[#E2E9E4] gap-4">
          <div>
            <h1 className="font-heading font-bold text-2xl sm:text-3xl text-[#17231C]">
              Gestão de Arquivos e Mídia
            </h1>
            <p className="text-xs sm:text-sm text-[#53655B] mt-1">
              Gerencie uploads seguros para o Supabase Storage com validação de extensão e MIME types.
            </p>
          </div>
        </div>

        {/* Card de Regras e Formatos Permitidos */}
        <div className="bg-[#E7F1EC] p-6 rounded-3xl border border-[#CAD6CF]">
          <h2 className="font-heading font-bold text-sm text-[#0D5131] flex items-center gap-2 mb-3">
            <CheckCircle className="w-4 h-4" /> Diretrizes de Segurança para Armazenamento
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs text-[#4A5B51]">
            {allowedFormats.map((fmt) => (
              <div key={fmt.ext} className="p-3 bg-white rounded-xl border border-[#CAD6CF]">
                <strong className="text-[#0D5131] block">{fmt.ext}</strong>
                <span className="text-[11px] text-gray-500">{fmt.type}</span>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-[#53655B] mt-3">
            • Limite recomendado por arquivo: 10 MB. Nomes de objetos gerados de forma única para evitar colisões acidentais.
          </p>
        </div>

        {/* Arquivos do Sistema */}
        <div className="bg-white rounded-3xl border border-[#E2E9E4] shadow-sm p-6 space-y-4">
          <h2 className="font-heading font-bold text-lg text-[#17231C] flex items-center gap-2">
            <FolderOpen className="w-5 h-5 text-[#0D5131]" /> Arquivos Ativos
          </h2>

          <div className="divide-y divide-[#E2E9E4]">
            {currentFiles.map((file) => (
              <div
                key={file.name}
                className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#F6F8F6] border border-[#E2E9E4] flex items-center justify-center text-[#0D5131]">
                    {file.type.includes('image') ? (
                      <ImageIcon className="w-5 h-5" />
                    ) : (
                      <FileText className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <span className="font-semibold text-sm text-[#17231C] block">
                      {file.name}
                    </span>
                    <span className="text-xs text-[#53655B]">
                      {file.size} • {file.type}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono bg-[#F6F8F6] px-3 py-1.5 rounded-lg border border-[#E2E9E4] text-[#53655B]">
                    {file.path}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

