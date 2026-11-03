import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Calendar,
  Clock,
  ArrowRight,
  MapPin,
  MessageCircle,
  BookOpen,
  Users,
  Compass,
  HeartHandshake,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import {
  getWeeklySchedule,
  getRecentContents,
  getRecentNews,
  getSiteSettings,
} from '@/lib/data-service';
import {
  formatDate,
  getCurrentBrasiliaWeekday,
  getWeekdayName,
} from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { siteConfig } from '@/lib/config';

export const revalidate = 60; // Revalidação estática a cada 60s

export default async function HomePage() {
  const [schedule, recentContents, recentNews, settings] = await Promise.all([
    getWeeklySchedule(),
    getRecentContents(3),
    getRecentNews(3),
    getSiteSettings(),
  ]);

  const currentWeekday = getCurrentBrasiliaWeekday();

  // Mapeia ícones adequados para as atividades
  const getActivityIcon = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes('pequeno') || t.includes('grupo')) return Users;
    if (t.includes('estudo') || t.includes('bíblico')) return BookOpen;
    if (t.includes('discipulado')) return Compass;
    if (t.includes('vigília') || t.includes('oração')) return Sparkles;
    if (t.includes('escola')) return BookOpen;
    return HeartHandshake;
  };

  return (
    <div className="flex flex-col w-full">
      {/* ====================================================================
          5.1 HERO PRINCIPAL
          ==================================================================== */}
      <section
        className="relative min-h-[580px] lg:min-h-[640px] flex items-center justify-center bg-[#0D5131] text-white overflow-hidden"
        aria-labelledby="hero-title"
      >
        {/* Imagem de Fundo com Overlay Institucional Confortável */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1548625361-1959779df3bb?auto=format&fit=crop&w=2000&q=80"
            alt="Interior acolhedor do templo da igreja com luz natural e bancos de madeira"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          {/* Overlay gradiente com as cores oficiais #0D5131 e #19593B */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D5131]/95 via-[#0D5131]/85 to-[#19593B]/75" />
        </div>

        {/* Conteúdo Central do Hero */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-emerald-100 text-xs sm:text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Igreja Presbiteriana do Brasil • Santa Maria Sul DF
          </div>

          <h1
            id="hero-title"
            className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight max-w-4xl mx-auto"
          >
            Um lugar para viver a fé e crescer em comunhão.
          </h1>

          <p className="mt-6 text-base sm:text-lg md:text-xl text-emerald-100 max-w-2xl mx-auto leading-relaxed">
            Conheça nossa comunidade, participe dos nossos encontros e acompanhe as mensagens e atividades da semana.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              href="/programacao"
              variant="white"
              size="lg"
              className="w-full sm:w-auto shadow-lg"
            >
              Nossa Programação
            </Button>
            <Button
              href="#boas-vindas"
              variant="outline"
              size="lg"
              className="w-full sm:w-auto text-white border-white hover:bg-white/15"
            >
              Conheça a Igreja
            </Button>
          </div>
        </div>
      </section>

      {/* ====================================================================
          5.2 SEÇÃO DE BOAS-VINDAS
          ==================================================================== */}
      <section
        id="boas-vindas"
        className="py-16 sm:py-24 bg-white"
        aria-labelledby="welcome-title"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Texto Institucional */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0D5131]">
                <span className="w-8 h-0.5 bg-[#0D5131]" />
                Comunidade e Propósito
              </div>

              <h2
                id="welcome-title"
                className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-[#17231C] tracking-tight leading-snug"
              >
                Seja bem-vindo à nossa comunidade
              </h2>

              <p className="text-base sm:text-lg text-[#4A5B51] leading-relaxed">
                Somos uma família de fé alicerçada na Palavra de Deus, comprometida em proclamar o Evangelho de Cristo com fidelidade e acolher cada pessoa com amor fraterno.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-[#F6F8F6] border border-[#E2E9E4]">
                  <h3 className="font-semibold text-[#0D5131] text-sm flex items-center gap-2">
                    <BookOpen className="w-4 h-4" /> Ensino Fiel
                  </h3>
                  <p className="text-xs text-[#4A5B51] mt-1.5 leading-relaxed">
                    Pregações expositivas e estudos bíblicos focados na edificação sólida de todas as idades.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#F6F8F6] border border-[#E2E9E4]">
                  <h3 className="font-semibold text-[#0D5131] text-sm flex items-center gap-2">
                    <HeartHandshake className="w-4 h-4" /> Comunhão e Acolhimento
                  </h3>
                  <p className="text-xs text-[#4A5B51] mt-1.5 leading-relaxed">
                    Pequenos grupos e momentos de oração para estreitar laços de cuidado e fraternidade.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <Button href="/contato" variant="primary">
                  Venha nos conhecer pessoalmente →
                </Button>
              </div>
            </div>

            {/* Fotografia Institucional da Congregação / Templo */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white aspect-[4/3] bg-[#E7F1EC]">
                <Image
                  src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=1200&q=80"
                  alt="Membros da comunidade reunidos em comunhão e oração no templo"
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
                  <div className="text-white text-xs">
                    <p className="font-semibold">{settings.church_name}</p>
                    <p className="text-emerald-200">Santa Maria Sul — DF</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          5.3 PRÓXIMAS ATIVIDADES (COM DESTAQUE DINÂMICO DE HORÁRIO BRASÍLIA)
          ==================================================================== */}
      <section
        className="py-16 bg-[#F6F8F6] border-y border-[#E2E9E4]"
        aria-labelledby="schedule-section-title"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#0D5131]">
                Encontros Regulares
              </span>
              <h2
                id="schedule-section-title"
                className="font-heading text-2xl sm:text-3xl font-bold text-[#17231C] mt-1"
              >
                Próximas Atividades da Semana
              </h2>
            </div>
            <Link
              href="/programacao"
              className="text-sm font-semibold text-[#0D5131] hover:underline inline-flex items-center gap-1 self-start sm:self-auto"
            >
              Ver agenda completa <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Grid de Cards de Atividades */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {schedule.map((item) => {
              const isToday = item.weekday === currentWeekday;
              const Icon = getActivityIcon(item.title);

              return (
                <div
                  key={item.id}
                  className={`relative p-6 rounded-2xl bg-white border transition-all duration-200 flex flex-col justify-between ${
                    isToday
                      ? 'border-[#0D5131] ring-2 ring-[#0D5131]/20 shadow-md'
                      : 'border-[#E2E9E4] hover:shadow-card-hover'
                  }`}
                >
                  {isToday && (
                    <div className="absolute top-4 right-4">
                      <Badge variant="primary" className="bg-[#0D5131] text-[11px]">
                        Hoje
                      </Badge>
                    </div>
                  )}

                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                          isToday
                            ? 'bg-[#0D5131] text-white'
                            : 'bg-[#E7F1EC] text-[#0D5131]'
                        }`}
                      >
                        <Icon className="w-5 h-5" aria-hidden="true" />
                      </div>
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-[#53655B]">
                          {getWeekdayName(item.weekday)}
                        </span>
                        <div className="flex items-center gap-1.5 text-xs text-[#0D5131] font-semibold mt-0.5">
                          <Clock className="w-3.5 h-3.5" /> {item.starts_at}
                        </div>
                      </div>
                    </div>

                    <h3 className="font-heading font-bold text-lg text-[#17231C] mb-2">
                      {item.title}
                    </h3>

                    {item.description && (
                      <p className="text-xs sm:text-sm text-[#53655B] leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#E2E9E4]/60 text-xs text-[#53655B] flex items-center justify-between">
                    <span>EQ 304/307 Santa Maria Sul</span>
                    <Link
                      href="/programacao"
                      className="text-[#0D5131] font-semibold hover:underline"
                    >
                      Detalhes
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================================================================
          5.4 MENSAGENS E ESTUDOS RECENTES
          ==================================================================== */}
      <section className="py-16 sm:py-24 bg-white" aria-labelledby="messages-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#0D5131]">
                Biblioteca Digital
              </span>
              <h2
                id="messages-title"
                className="font-heading text-2xl sm:text-3xl font-bold text-[#17231C] mt-1"
              >
                Mensagens e Estudos Recentes
              </h2>
            </div>
            <Link
              href="/conteudo"
              className="text-sm font-semibold text-[#0D5131] hover:underline inline-flex items-center gap-1"
            >
              Explorar todo o acervo <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentContents.map((content) => (
              <article
                key={content.id}
                className="flex flex-col bg-white rounded-2xl border border-[#E2E9E4] overflow-hidden hover:shadow-card-hover transition-all duration-200 group"
              >
                {/* Capa */}
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
                </div>

                {/* Detalhes */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-[#53655B] mb-2.5">
                      <Calendar className="w-3.5 h-3.5" />
                      <time dateTime={content.published_at || ''}>
                        {formatDate(content.published_at)}
                      </time>
                      {content.author && <span>• Por {content.author}</span>}
                    </div>

                    <h3 className="font-heading font-bold text-lg text-[#17231C] group-hover:text-[#0D5131] transition-colors leading-snug mb-2">
                      <Link href={`/conteudo/${content.slug}`}>
                        {content.title}
                      </Link>
                    </h3>

                    <p className="text-xs sm:text-sm text-[#53655B] line-clamp-3 leading-relaxed">
                      {content.summary}
                    </p>
                  </div>

                  <div className="pt-4 mt-6 border-t border-[#E2E9E4]">
                    <Link
                      href={`/conteudo/${content.slug}`}
                      className="text-xs font-semibold text-[#0D5131] hover:underline inline-flex items-center gap-1"
                    >
                      Ler mensagem completa →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          5.5 NOTÍCIAS RECENTES
          ==================================================================== */}
      <section
        className="py-16 bg-[#F6F8F6] border-t border-[#E2E9E4]"
        aria-labelledby="news-title"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#0D5131]">
                Vida Comunitária
              </span>
              <h2
                id="news-title"
                className="font-heading text-2xl sm:text-3xl font-bold text-[#17231C] mt-1"
              >
                Notícias e Comunicados
              </h2>
            </div>
            <Link
              href="/noticias"
              className="text-sm font-semibold text-[#0D5131] hover:underline inline-flex items-center gap-1"
            >
              Todas as notícias <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {recentNews.map((article) => (
              <article
                key={article.id}
                className="bg-white rounded-2xl border border-[#E2E9E4] p-6 hover:shadow-card-hover transition-all duration-200 flex flex-col sm:flex-row gap-6"
              >
                {article.cover_image && (
                  <div className="relative w-full sm:w-44 h-40 sm:h-auto rounded-xl overflow-hidden flex-shrink-0 bg-[#E7F1EC]">
                    <Image
                      src={article.cover_image}
                      alt={article.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 176px"
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-xs text-[#53655B] mb-2 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      <time dateTime={article.published_at}>
                        {formatDate(article.published_at)}
                      </time>
                    </div>
                    <h3 className="font-heading font-bold text-base sm:text-lg text-[#17231C] hover:text-[#0D5131] transition-colors leading-snug mb-2">
                      <Link href={`/noticias/${article.slug}`}>
                        {article.title}
                      </Link>
                    </h3>
                    <p className="text-xs sm:text-sm text-[#53655B] line-clamp-2 leading-relaxed">
                      {article.summary}
                    </p>
                  </div>
                  <div className="pt-3 mt-3 border-t border-[#E2E9E4]/60">
                    <Link
                      href={`/noticias/${article.slug}`}
                      className="text-xs font-semibold text-[#0D5131] hover:underline"
                    >
                      Ler comunicado →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          5.6 CONVITE PARA VISITAR
          ==================================================================== */}
      <section
        className="py-16 sm:py-20 bg-[#0D5131] text-white relative overflow-hidden"
        aria-labelledby="visit-title"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-200 text-xs uppercase tracking-wider font-semibold">
              <MapPin className="w-3.5 h-3.5" /> Seja Muito Bem-vindo
            </span>

            <h2
              id="visit-title"
              className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight"
            >
              Venha nos visitar
            </h2>

            <p className="text-base sm:text-lg text-emerald-100 leading-relaxed">
              Será uma grande alegria receber você e sua família em nossos cultos e encontros comunitários.
            </p>

            <div className="p-4 sm:p-6 rounded-2xl bg-[#19593B]/70 border border-emerald-400/20 text-emerald-50 text-sm max-w-xl mx-auto space-y-1">
              <p className="font-semibold text-white">{settings.church_name}</p>
              <p className="flex items-center justify-center gap-1.5 text-xs sm:text-sm">
                <MapPin className="w-4 h-4 text-emerald-300 flex-shrink-0" />
                {settings.address}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Button
                href={siteConfig.contact.whatsappUrl}
                external
                variant="white"
                size="lg"
                className="w-full sm:w-auto"
              >
                <MessageCircle className="w-4 h-4 text-emerald-700" />
                Conversar pelo WhatsApp
              </Button>

              <Button
                href={siteConfig.contact.mapsRouteUrl}
                external
                variant="outline"
                size="lg"
                className="w-full sm:w-auto text-white border-white hover:bg-white/10"
              >
                Como Chegar (Google Maps) <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
