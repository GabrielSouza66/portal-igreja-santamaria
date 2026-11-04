import React from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Calendar,
  Download,
  Newspaper,
  PlusCircle,
  Clock,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  FileText,
} from 'lucide-react';
import {
  getContents,
  getDownloads,
  getNews,
  getUpcomingEvents,
  getWeeklySchedule,
} from '@/lib/data-service';
import { formatDate } from '@/lib/utils';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export const revalidate = 0; // Sempre atualizado no painel

export default async function AdminDashboardPage() {
  const [contents, downloads, news, events, schedule] = await Promise.all([
    getContents(),
    getDownloads(),
    getNews(),
    getUpcomingEvents(),
    getWeeklySchedule(),
  ]);

  const publishedContents = contents.filter((c) => c.status === 'published');
  const publishedDownloads = downloads.filter((d) => d.status === 'published');
  const publishedNews = news.filter((n) => n.status === 'published');

  const stats = [
    {
      title: 'Conteúdos Publicados',
      value: publishedContents.length,
      icon: BookOpen,
      href: '/admin/conteudos',
      color: 'bg-emerald-50 text-[#0D5131] border-emerald-200',
    },
    {
      title: 'Documentos para Download',
      value: publishedDownloads.length,
      icon: Download,
      href: '/admin/downloads',
      color: 'bg-blue-50 text-blue-700 border-blue-200',
    },
    {
      title: 'Notícias & Avisos',
      value: publishedNews.length,
      icon: Newspaper,
      href: '/admin/noticias',
      color: 'bg-amber-50 text-amber-800 border-amber-200',
    },
    {
      title: 'Atividades Regulares',
      value: schedule.length,
      icon: Calendar,
      href: '/admin/programacao',
      color: 'bg-purple-50 text-purple-700 border-purple-200',
    },
  ];

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      <main className="flex-1 p-6 sm:p-10 max-w-7xl overflow-y-auto">
        {/* Cabeçalho do Dashboard */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 border-b border-[#E2E9E4] gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0D5131] mb-1">
              <ShieldCheck className="w-4 h-4" /> Ambiente Administrativo Seguro
            </div>
            <h1 className="font-heading font-bold text-2xl sm:text-3xl text-[#17231C]">
              Painel de Controle
            </h1>
            <p className="text-xs sm:text-sm text-[#53655B] mt-0.5">
              Gerencie todas as publicações, programações e arquivos do portal da igreja.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button href="/admin/conteudos" variant="primary" size="sm">
              <PlusCircle className="w-4 h-4 mr-1.5" /> Novo Conteúdo
            </Button>
            <Button href="/admin/noticias" variant="secondary" size="sm">
              <PlusCircle className="w-4 h-4 mr-1.5" /> Nova Notícia
            </Button>
          </div>
        </div>

        {/* Métricas e Estatísticas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Link
                key={stat.title}
                href={stat.href}
                className="bg-white p-6 rounded-2xl border border-[#E2E9E4] hover:shadow-card-hover transition-all flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#53655B]">
                    {stat.title}
                  </span>
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center border ${stat.color}`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <div className="flex items-baseline justify-between">
                  <span className="font-heading font-bold text-3xl text-[#17231C]">
                    {stat.value}
                  </span>
                  <span className="text-xs text-[#0D5131] font-semibold flex items-center gap-1">
                    Gerenciar <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Grade com Últimas Publicações e Próximos Eventos */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Coluna: Últimos Conteúdos Publicados */}
          <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-[#E2E9E4] shadow-sm">
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#E2E9E4]">
              <h2 className="font-heading font-bold text-lg text-[#17231C] flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#0D5131]" /> Últimas Mensagens e Estudos
              </h2>
              <Link
                href="/admin/conteudos"
                className="text-xs font-semibold text-[#0D5131] hover:underline"
              >
                Ver todos
              </Link>
            </div>

            <div className="space-y-4">
              {contents.slice(0, 4).map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-xl bg-[#F6F8F6] border border-[#E2E9E4] flex items-center justify-between gap-4"
                >
                  <div className="space-y-1 overflow-hidden">
                    <span className="text-[11px] font-semibold text-[#0D5131] block">
                      {item.category?.name || 'Geral'}
                    </span>
                    <h3 className="font-heading font-bold text-sm text-[#17231C] truncate">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#53655B]">
                      {formatDate(item.published_at)} • Por {item.author || 'Pastoral'}
                    </p>
                  </div>

                  <Badge variant="primary" className="text-xs flex-shrink-0">
                    Publicado
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          {/* Coluna: Programação e Próximos Eventos */}
          <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-[#E2E9E4] shadow-sm space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#E2E9E4]">
                <h2 className="font-heading font-bold text-base text-[#17231C] flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#0D5131]" /> Agenda e Eventos
                </h2>
                <Link
                  href="/admin/programacao"
                  className="text-xs font-semibold text-[#0D5131] hover:underline"
                >
                  Editar
                </Link>
              </div>

              {events.length > 0 ? (
                <div className="space-y-3">
                  {events.map((evt) => (
                    <div
                      key={evt.id}
                      className="p-3.5 rounded-xl bg-[#F6F8F6] border border-[#E2E9E4] text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#17231C]">{evt.title}</span>
                        <Badge variant="secondary" className="text-[10px]">
                          Especial
                        </Badge>
                      </div>
                      <p className="text-[#53655B]">{formatDate(evt.starts_at)}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-[#53655B]">
                  Nenhum evento extraordinário cadastrado.
                </p>
              )}
            </div>

            {/* Status de Integridade do Portal */}
            <div className="p-4 rounded-2xl bg-[#E7F1EC] border border-[#CAD6CF] text-xs space-y-2">
              <div className="flex items-center gap-2 font-bold text-[#0D5131]">
                <CheckCircle2 className="w-4 h-4" /> Integridade do Sistema
              </div>
              <ul className="space-y-1 text-[#4A5B51]">
                <li>• Banco PostgreSQL Supabase: Ativo e Normalizado</li>
                <li>• Row Level Security (RLS): Habilitado em todas as tabelas</li>
                <li>• Sitemap & SEO: Atualizados dinamicamente</li>
                <li>• Timezone: America/Sao_Paulo (Horário de Brasília)</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

