import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import {
  Clock,
  Calendar,
  MapPin,
  Users,
  BookOpen,
  Compass,
  Sparkles,
  HeartHandshake,
  ArrowRight,
} from 'lucide-react';
import { getWeeklySchedule, getUpcomingEvents } from '@/lib/data-service';
import {
  formatDate,
  formatDateShort,
  getCurrentBrasiliaWeekday,
  getWeekdayName,
} from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { BreadcrumbsJsonLd } from '@/components/seo/JsonLd';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Programação Semanal e Eventos',
  description:
    'Confira os horários dos nossos cultos dominicais, Escola Dominical, reuniões de oração, pequenos grupos e estudos bíblicos em Santa Maria Sul DF.',
  alternates: {
    canonical: `${siteConfig.url}/programacao`,
  },
};

export const revalidate = 60;

export default async function ProgramacaoPage() {
  const [schedule, events] = await Promise.all([
    getWeeklySchedule(),
    getUpcomingEvents(),
  ]);

  const currentWeekday = getCurrentBrasiliaWeekday();

  const getActivityIcon = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes('pequeno') || t.includes('grupo')) return Users;
    if (t.includes('estudo') || t.includes('bíblico')) return BookOpen;
    if (t.includes('discipulado')) return Compass;
    if (t.includes('vigília') || t.includes('oração')) return Sparkles;
    if (t.includes('escola')) return BookOpen;
    return HeartHandshake;
  };

  // Agrupa os dias da semana ordenados: Domingo (0), Segunda (1) ... Sexta (5)
  // Preserva os horários oficiais
  const sortedSchedule = [...schedule].sort((a, b) => {
    const orderA = a.weekday === 0 ? 7 : a.weekday;
    const orderB = b.weekday === 0 ? 7 : b.weekday;
    return orderA - orderB || a.display_order - b.display_order;
  });

  return (
    <div className="py-12 sm:py-16 bg-[#F6F8F6]">
      <BreadcrumbsJsonLd
        items={[
          { name: 'Início', url: siteConfig.url },
          { name: 'Programação', url: `${siteConfig.url}/programacao` },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho da Página */}
        <div className="max-w-3xl mb-12">
          <Badge variant="primary" className="mb-3">
            Agenda Oficial
          </Badge>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#17231C] tracking-tight">
            Programação Semanal
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#53655B] leading-relaxed">
            Nossos encontros são momentos especiais de adoração, aprendizado das Escrituras e comunhão fraterna. Todos são muito bem-vindos.
          </p>
        </div>

        {/* Grade de Encontros Semanais Recorrentes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {sortedSchedule.map((item) => {
            const isToday = item.weekday === currentWeekday;
            const Icon = getActivityIcon(item.title);

            return (
              <div
                key={item.id}
                className={`p-6 rounded-2xl bg-white border transition-all duration-200 flex flex-col justify-between ${
                  isToday
                    ? 'border-[#0D5131] ring-2 ring-[#0D5131]/20 shadow-md'
                    : 'border-[#E2E9E4] hover:shadow-card-hover'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#0D5131] bg-[#E7F1EC] px-3 py-1 rounded-full">
                      {getWeekdayName(item.weekday)}
                    </span>
                    {isToday && (
                      <Badge variant="primary" className="bg-[#0D5131] text-[11px]">
                        Hoje
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        isToday
                          ? 'bg-[#0D5131] text-white'
                          : 'bg-[#F6F8F6] text-[#0D5131] border border-[#E2E9E4]'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="font-heading font-bold text-lg text-[#17231C]">
                        {item.title}
                      </h2>
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-[#0D5131]">
                        <Clock className="w-3.5 h-3.5" /> {item.starts_at}
                      </div>
                    </div>
                  </div>

                  {item.description && (
                    <p className="text-xs sm:text-sm text-[#53655B] leading-relaxed mt-2">
                      {item.description}
                    </p>
                  )}
                </div>

                <div className="pt-4 mt-6 border-t border-[#E2E9E4]/60 flex items-center justify-between text-xs text-[#53655B]">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#0D5131]" /> EQ 304/307 Santa Maria Sul
                  </span>
                  <span className="text-[#0D5131] font-semibold">Presencial</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Seção de Eventos Especiais Futuros */}
        {events.length > 0 && (
          <section className="mt-12 bg-white rounded-3xl p-8 sm:p-10 border border-[#E2E9E4] shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#0D5131]">
                  Acontecimentos Especiais
                </span>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#17231C] mt-1">
                  Eventos e Conferências
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="rounded-2xl border border-[#E2E9E4] overflow-hidden flex flex-col bg-[#F6F8F6] hover:shadow-card-hover transition-all duration-200"
                >
                  {event.cover_image && (
                    <div className="relative aspect-[16/9] w-full bg-[#E7F1EC]">
                      <Image
                        src={event.cover_image}
                        alt={event.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                      />
                    </div>
                  )}

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 text-xs text-[#0D5131] font-semibold mb-2">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {formatDateShort(event.starts_at)}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {new Intl.DateTimeFormat('pt-BR', {
                            hour: '2-digit',
                            minute: '2-digit',
                            timeZone: 'America/Sao_Paulo',
                          }).format(new Date(event.starts_at))}
                        </span>
                      </div>

                      <h3 className="font-heading font-bold text-xl text-[#17231C] mb-2">
                        {event.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-[#53655B] leading-relaxed">
                        {event.description}
                      </p>
                    </div>

                    <div className="pt-4 mt-6 border-t border-[#E2E9E4] flex items-center justify-between">
                      <span className="text-xs text-[#53655B] flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#0D5131]" />
                        {event.location}
                      </span>
                      <Button
                        href="/contato"
                        size="sm"
                        variant="secondary"
                      >
                        Como Participar
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Card de Informações Adicionais */}
        <div className="mt-12 bg-[#E7F1EC] rounded-2xl p-6 sm:p-8 border border-[#CAD6CF] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="font-heading font-bold text-lg text-[#0D5131]">
              Dúvidas sobre os horários ou grupos nos lares?
            </h3>
            <p className="text-xs sm:text-sm text-[#4A5B51]">
              Entre em contato com nossa equipe pastoral pelo WhatsApp ou telefone institucional.
            </p>
          </div>
          <Button
            href={siteConfig.contact.whatsappUrl}
            external
            variant="primary"
          >
            Falar com a Igreja
          </Button>
        </div>
      </div>
    </div>
  );
}

