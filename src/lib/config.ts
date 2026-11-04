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
    // Link direto do Google Maps para a Igreja Presbiteriana do Brasil em Santa Maria
    mapsRouteUrl:
      process.env.NEXT_PUBLIC_MAPS_URL ||
      'https://www.google.com/maps/place/Igreja+Presbiteriana+do+Brasil+em+Santa+Maria/@-16.0307078,-48.0295031,19.04z/data=!4m9!1m2!2m1!1sEQ+304%2F307+Santa+Maria+Sul+DF+Brasil!3m5!1s0x935980e55fdb2469:0x6757b48cb5f5846a!8m2!3d-16.0309803!4d-48.0295574!16s%2Fg%2F11dyb9myvr?entry=ttu&g_ep=EgoyMDI2MTEwMS4wIKXMDSoASAFQAw%3D%3D',
    // Embed URL apontando para as coordenadas exatas da igreja (-16.0309803, -48.0295574)
    mapsEmbedUrl:
      'https://maps.google.com/maps?q=-16.0309803,-48.0295574+(Igreja+Presbiteriana+do+Brasil+em+Santa+Maria)&t=&z=17&ie=UTF8&iwloc=&output=embed',
  },

  social: {
    youtube:
      process.env.NEXT_PUBLIC_CHURCH_YOUTUBE ||
      'https://www.youtube.com/@ipbsm_DF',
    instagram:
      process.env.NEXT_PUBLIC_CHURCH_INSTAGRAM ||
      'https://www.instagram.com/ipbsm_df/',
    facebook:
      process.env.NEXT_PUBLIC_CHURCH_FACEBOOK ||
      'https://www.facebook.com/IPB.SMDF',
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

