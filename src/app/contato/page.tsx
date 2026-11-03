import React from 'react';
import type { Metadata } from 'next';
import {
  MapPin,
  Phone,
  MessageCircle,
  Clock,
  ExternalLink,
  Mail,
  ShieldCheck,
} from 'lucide-react';
import { siteConfig } from '@/lib/config';
import { getWeeklySchedule, getSiteSettings } from '@/lib/data-service';
import { getWeekdayName } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { BreadcrumbsJsonLd } from '@/components/seo/JsonLd';
import { ContactForm } from '@/components/forms/ContactForm';

export const metadata: Metadata = {
  title: 'Contato e Localização — Venha nos Conhecer',
  description:
    'Endereço, telefone, WhatsApp e mapa para visitar a Igreja em Santa Maria Sul DF. Envie uma mensagem para nossa equipe pastoral.',
  alternates: {
    canonical: `${siteConfig.url}/contato`,
  },
};

export const revalidate = 60;

export default async function ContatoPage() {
  const [schedule, settings] = await Promise.all([
    getWeeklySchedule(),
    getSiteSettings(),
  ]);

  return (
    <div className="py-12 sm:py-16 bg-[#F6F8F6]">
      <BreadcrumbsJsonLd
        items={[
          { name: 'Início', url: siteConfig.url },
          { name: 'Contato', url: `${siteConfig.url}/contato` },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <div className="max-w-3xl mb-12">
          <Badge variant="primary" className="mb-3">
            Fale Conosco
          </Badge>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#17231C] tracking-tight">
            Contato e Localização
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#53655B] leading-relaxed">
            Estamos prontos para acolher você e sua família. Entre em contato pelos canais oficiais ou visite nosso templo em Santa Maria Sul.
          </p>
        </div>

        {/* Grade de Informações de Contato e Ações */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Card de Informações Diretas */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E2E9E4] shadow-sm space-y-6">
              <h2 className="font-heading font-bold text-xl text-[#17231C]">
                Canais de Atendimento
              </h2>

              <div className="space-y-5">
                {/* Endereço */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#E7F1EC] text-[#0D5131] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#53655B] block">
                      Endereço do Templo
                    </span>
                    <p className="text-sm font-medium text-[#17231C] mt-0.5">
                      {settings.address}
                    </p>
                    <a
                      href={siteConfig.contact.mapsRouteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[#0D5131] font-semibold hover:underline inline-flex items-center gap-1 mt-1.5"
                    >
                      Como chegar pelo Google Maps <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* Telefone */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#E7F1EC] text-[#0D5131] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#53655B] block">
                      Telefone da Igreja
                    </span>
                    <a
                      href={siteConfig.contact.telUrl}
                      className="text-sm font-medium text-[#17231C] hover:text-[#0D5131] hover:underline mt-0.5 block"
                    >
                      {settings.phone}
                    </a>
                    <span className="text-xs text-[#53655B]">
                      Ligação direta via celular ou fixo
                    </span>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#E7F1EC] text-[#0D5131] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#53655B] block">
                      Mensagem no WhatsApp
                    </span>
                    <p className="text-sm font-medium text-[#17231C] mt-0.5">
                      {settings.phone}
                    </p>
                    <a
                      href={siteConfig.contact.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[#0D5131] font-semibold hover:underline inline-flex items-center gap-1 mt-1"
                    >
                      Iniciar conversa imediata →
                    </a>
                  </div>
                </div>
              </div>

              {/* Botões de Ação Imediata */}
              <div className="pt-4 border-t border-[#E2E9E4] flex flex-col gap-3">
                <Button
                  href={siteConfig.contact.whatsappUrl}
                  external
                  variant="primary"
                  size="lg"
                  className="w-full"
                >
                  <MessageCircle className="w-4 h-4 mr-2" /> Conversar pelo WhatsApp
                </Button>
                <Button
                  href={siteConfig.contact.mapsRouteUrl}
                  external
                  variant="outline"
                  size="md"
                  className="w-full"
                >
                  <MapPin className="w-4 h-4 mr-2" /> Como chegar (Rotas)
                </Button>
              </div>
            </div>

            {/* Resumo da Programação na Página de Contato */}
            <div className="bg-white p-6 rounded-3xl border border-[#E2E9E4] shadow-sm">
              <h3 className="font-heading font-bold text-base text-[#17231C] flex items-center gap-2 mb-4">
                <Clock className="w-4 h-4 text-[#0D5131]" /> Horários dos Cultos e Reuniões
              </h3>
              <ul className="space-y-2 text-xs text-[#53655B]">
                {schedule.slice(0, 5).map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center justify-between py-1.5 border-b border-[#E2E9E4]/60 last:border-b-0"
                  >
                    <span>
                      <strong className="text-[#17231C]">{getWeekdayName(item.weekday)}:</strong>{' '}
                      {item.title}
                    </span>
                    <span className="font-semibold text-[#0D5131]">{item.starts_at}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Formulário Real e Validado de Contato */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#E2E9E4] shadow-sm">
              <div className="mb-6">
                <h2 className="font-heading font-bold text-2xl text-[#17231C]">
                  Envie uma Mensagem
                </h2>
                <p className="text-xs sm:text-sm text-[#53655B] mt-1">
                  Preencha o formulário abaixo para tirar dúvidas, solicitar uma visita ou pedir oração.
                </p>
              </div>

              <ContactForm />
            </div>
          </div>
        </div>

        {/* Mapa Interativo Oficial Baseado no Endereço Confirmado */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E9E4] shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
            <div>
              <h2 className="font-heading font-bold text-xl text-[#17231C]">
                Localização no Mapa
              </h2>
              <p className="text-xs text-[#53655B]">
                EQ 304/307 — Santa Maria Sul, Distrito Federal — Brasil
              </p>
            </div>
            <a
              href={siteConfig.contact.mapsRouteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-[#0D5131] hover:underline inline-flex items-center gap-1"
            >
              Abrir no aplicativo do Google Maps <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="relative aspect-[21/9] min-h-[300px] w-full rounded-2xl overflow-hidden border border-[#E2E9E4]">
            <iframe
              src={siteConfig.contact.mapsEmbedUrl}
              title="Mapa de localização da igreja em Santa Maria Sul DF"
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>
      </div>
    </div>
  );
}
