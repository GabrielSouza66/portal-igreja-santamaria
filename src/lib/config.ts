/**
 * Configurações Institucionais Centralizadas
 * Evita duplicação de informações de endereço, telefone e horários em múltiplos arquivos.
 */

export const siteConfig = {
  name: process.env.NEXT_PUBLIC_CHURCH_NAME || 'Igreja Presbiteriana do Brasil em Santa Maria',
  shortName: process.env.NEXT_PUBLIC_CHURCH_SHORT_NAME || 'IPB Santa Maria',
  description:
    'Um lugar para viver a fé e crescer em comunhão. Conheça nossa comunidade, participe dos nossos encontros e acompanhe as mensagens e atividades da semana.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  logo: '/logo_ipb.png',

  contact: {
    address:
      process.env.NEXT_PUBLIC_CHURCH_ADDRESS ||
      'EQ 304/307 — Santa Maria Sul — Distrito Federal — Brasil',
    phone: process.env.NEXT_PUBLIC_CHURCH_PHONE || '(61) 98299-8554',
    phoneRaw: process.env.NEXT_PUBLIC_CHURCH_PHONE_RAW || '+5561982998554',
    whatsappUrl:
      process.env.NEXT_PUBLIC_CHURCH_WHATSAPP || 'https://wa.me/5561982998554',
    telUrl: 'tel:+5561982998554',
    // Link seguro para navegação via Google Maps baseado no endereço confirmado (sem coordenadas inventadas)
    mapsRouteUrl:
      'https://www.google.com/maps/search/?api=1&query=EQ+304%2F307+Santa+Maria+Sul+DF+Brasil',
    // Embed URL baseado na busca do endereço real
    mapsEmbedUrl:
      'https://maps.google.com/maps?q=EQ%20304%2F307%20Santa%20Maria%20Sul%20DF&t=&z=15&ie=UTF8&iwloc=&output=embed',
  },

  timezone: process.env.NEXT_PUBLIC_TIMEZONE || 'America/Sao_Paulo',

  navigation: [
    { label: 'Início', href: '/' },
    { label: 'Conteúdo', href: '/conteudo' },
    { label: 'Programação', href: '/programacao' },
    { label: 'Downloads', href: '/downloads' },
    { label: 'Notícias', href: '/noticias' },
    { label: 'Contato', href: '/contato' },
  ],

  seo: {
    titleDefault: 'Igreja Presbiteriana do Brasil em Santa Maria DF',
    titleTemplate: '%s | IPB Santa Maria DF',
    locale: 'pt_BR',
    type: 'website',
  },
};
