import {
  ContentCategory,
  ContentItem,
  DownloadItem,
  NewsArticle,
  SiteSettings,
  WeeklyScheduleItem,
  ChurchEvent,
} from '@/types';
import { siteConfig } from './config';

// Dados em memória resilientes (alinhados com a migração e seed SQL)
const defaultSettings: SiteSettings = {
  id: '00000000-0000-0000-0000-000000000001',
  church_name: siteConfig.name,
  church_short_name: siteConfig.shortName,
  description: siteConfig.description,
  logo_url: siteConfig.logo,
  address: siteConfig.contact.address,
  phone: siteConfig.contact.phone,
  whatsapp: siteConfig.contact.whatsappUrl,
  social_links: {
    instagram: siteConfig.social.instagram,
    youtube: siteConfig.social.youtube,
    facebook: siteConfig.social.facebook,
  },
  seo_defaults: {
    title_suffix: 'IPB Santa Maria DF',
    description: 'Portal oficial da Igreja em Santa Maria Sul DF. Mensagens, estudos bíblicos, programação semanal e comunidade de fé.',
  },
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const defaultCategories: ContentCategory[] = [
  { id: '10000000-0000-0000-0000-000000000001', name: 'Pregações', slug: 'pregacoes', created_at: new Date().toISOString() },
  { id: '10000000-0000-0000-0000-000000000002', name: 'Estudos Bíblicos', slug: 'estudos-biblicos', created_at: new Date().toISOString() },
  { id: '10000000-0000-0000-0000-000000000003', name: 'Mensagens Semanais', slug: 'mensagens-semanais', created_at: new Date().toISOString() },
  { id: '10000000-0000-0000-0000-000000000004', name: 'Escalas', slug: 'escalas', created_at: new Date().toISOString() },
];

const defaultSchedule: WeeklyScheduleItem[] = [
  {
    id: 's-1',
    weekday: 1, // Segunda-feira
    title: 'Pequenos Grupos',
    starts_at: '20:00',
    description: 'Encontro nos lares para oração, comunhão fraterna e compartilhamento da Palavra de Deus.',
    display_order: 1,
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 's-2',
    weekday: 2, // Terça-feira
    title: 'Estudo Bíblico',
    starts_at: '20:00',
    description: 'Reunião doutrinária e aprofundamento das Escrituras Sagradas no templo.',
    display_order: 2,
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 's-3',
    weekday: 3, // Quarta-feira
    title: 'Discipulado',
    starts_at: '20:00',
    description: 'Formação cristã contínua, mentoria bíblica e crescimento espiritual.',
    display_order: 3,
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 's-4',
    weekday: 4, // Quinta-feira
    title: 'Discipulado',
    starts_at: '20:00',
    description: 'Turma de acompanhamento bíblico e fortalecimento da fé na comunidade.',
    display_order: 4,
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 's-5',
    weekday: 5, // Sexta-feira
    title: 'Vigília',
    starts_at: '20:00',
    description: 'Tempo especial de intercessão coletiva, clamor e busca pela presença do Senhor.',
    display_order: 5,
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 's-6',
    weekday: 0, // Domingo
    title: 'Escola Dominical',
    starts_at: '09:00',
    description: 'Classes de ensino bíblico por faixas etárias para toda a família.',
    display_order: 6,
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 's-7',
    weekday: 0, // Domingo
    title: 'Culto',
    starts_at: '19:00',
    description: 'Culto dominical comunitário de louvor, oração e pregação expositiva da Palavra.',
    display_order: 7,
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

const defaultContents: ContentItem[] = [
  {
    id: '20000000-0000-0000-0000-000000000001',
    title: 'A Fidelidade de Deus em Meio às Provações',
    slug: 'a-fidelidade-de-deus-em-meio-as-provacoes',
    summary: 'Uma reflexão expositiva sobre o Salmo 46 e a certeza do refúgio e fortaleza que encontramos em Cristo Jesus.',
    body: `Neste estudo meditamos no Salmo 46, lembrando que "Deus é o nosso refúgio e fortaleza, socorro bem presente nas tribulações". 
    
Em tempos de incertezas e mudanças no mundo ao nosso redor, a soberania e a graça imutável de Deus nos sustentam com profunda paz e esperança viva.

### Pontos Principais da Mensagem:
1. **Deus é Refúgio Pessoal e Comunitário**: Não dependemos de circunstâncias favoráveis, mas da presença viva de Deus.
2. **A Voz Soberana que Acalma a Tempestade**: "Aquietai-vos e sabei que eu sou Deus". O convite bíblico é para o descanso da alma em Sua providência.
3. **Aplicação Prática no Dia a Dia**: Como viver sem ansiedade desmedida no trabalho, na família e em nossa rotina diária em Santa Maria.`,
    category_id: '10000000-0000-0000-0000-000000000001',
    category: {
      id: '10000000-0000-0000-0000-000000000001',
      name: 'Pregações',
      slug: 'pregacoes',
      created_at: new Date().toISOString(),
    },
    event_date: '2026-11-01',
    published_at: '2026-11-01T10:00:00Z',
    cover_image: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=1200&q=80',
    video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    author: 'Pastor da Comunidade',
    status: 'published',
    created_at: '2026-11-01T10:00:00Z',
    updated_at: '2026-11-01T10:00:00Z',
    attachments: [
      {
        id: 'att-1',
        original_filename: 'esboco-salmo-46.pdf',
        storage_path: 'public/esboco-salmo-46.pdf',
        public_url: '/logo_ipb.png',
        mime_type: 'application/pdf',
        file_size: 145000,
        visibility: 'public',
        created_at: '2026-11-01T10:00:00Z',
      },
    ],
  },
  {
    id: '20000000-0000-0000-0000-000000000002',
    title: 'Fundamentos da Oração Bíblica',
    slug: 'fundamentos-da-oracao-biblica',
    summary: 'Guia de estudo prático para cultivar uma vida de oração alinhada ao modelo bíblico deixado por Jesus.',
    body: `A oração não é apenas a apresentação de petições a Deus, mas um diálogo filial e humilde com o Pai Celeste.

Este estudo aprofunda a oração do Pai Nosso, examinando cada uma das petições e sua aplicação prática para a vida diária:
- A santificação do nome de Deus como prioridade.
- A submissão à vontade soberana de Deus.
- O pedido pelo pão cotidiano e o perdão sincero das ofensas.
- O livramento do mal e a dependência contínua do Espírito Santo.`,
    category_id: '10000000-0000-0000-0000-000000000002',
    category: {
      id: '10000000-0000-0000-0000-000000000002',
      name: 'Estudos Bíblicos',
      slug: 'estudos-biblicos',
      created_at: new Date().toISOString(),
    },
    event_date: '2026-10-27',
    published_at: '2026-10-27T19:30:00Z',
    cover_image: 'https://images.unsplash.com/photo-1544427920-c49ccfb85579?auto=format&fit=crop&w=1200&q=80',
    video_url: null,
    author: 'Equipe Pastoral',
    status: 'published',
    created_at: '2026-10-27T19:30:00Z',
    updated_at: '2026-10-27T19:30:00Z',
  },
  {
    id: '20000000-0000-0000-0000-000000000003',
    title: 'Comunhão e Cuidado Mútuo no Corpo de Cristo',
    slug: 'comunhao-e-cuidado-mutuo-no-corpo-de-cristo',
    summary: 'Como os Pequenos Grupos fortalecem os laços de fraternidade, acolhimento e discipulado em nossa comunidade.',
    body: `A vida cristã bíblica foi projetada por Deus para ser vivenciada em comunhão fraterna e generosa.

Nos Pequenos Grupos que se reúnem nas casas em Santa Maria às segundas-feiras, experimentamos:
- Oração intercessória mútua.
- Acolhimento caloroso de visitantes e novos membros.
- Apoio prático em momentos de necessidade familiar.
- Edificação na Palavra em ambiente acolhedor e participativo.`,
    category_id: '10000000-0000-0000-0000-000000000003',
    category: {
      id: '10000000-0000-0000-0000-000000000003',
      name: 'Mensagens Semanais',
      slug: 'mensagens-semanais',
      created_at: new Date().toISOString(),
    },
    event_date: '2026-10-20',
    published_at: '2026-10-20T20:00:00Z',
    cover_image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=80',
    video_url: null,
    author: 'Ministério de Pequenos Grupos',
    status: 'published',
    created_at: '2026-10-20T20:00:00Z',
    updated_at: '2026-10-20T20:00:00Z',
  },
];

const defaultDownloads: DownloadItem[] = [
  {
    id: '30000000-0000-0000-0000-000000000001',
    title: 'Escala Mensal de Diaconia e Recepção',
    description: 'Escala oficial das equipes de recepção e apoio para os cultos dominicais e encontros regulares.',
    category: 'Escalas',
    file_url: '/logo_ipb.png',
    file_name: 'escala-mensal-diaconia.pdf',
    file_size: 245760,
    mime_type: 'application/pdf',
    status: 'published',
    published_at: '2026-11-01T08:00:00Z',
    created_at: '2026-11-01T08:00:00Z',
    updated_at: '2026-11-01T08:00:00Z',
  },
  {
    id: '30000000-0000-0000-0000-000000000002',
    title: 'Apostila do Estudo Panorâmico do Novo Testamento',
    description: 'Material de apoio pedagógico para as classes da Escola Bíblica Dominical.',
    category: 'Estudos',
    file_url: '/logo_ipb.png',
    file_name: 'estudo-novo-testamento.pdf',
    file_size: 1048576,
    mime_type: 'application/pdf',
    status: 'published',
    published_at: '2026-10-25T10:00:00Z',
    created_at: '2026-10-25T10:00:00Z',
    updated_at: '2026-10-25T10:00:00Z',
  },
  {
    id: '30000000-0000-0000-0000-000000000003',
    title: 'Ficha Cadastral e Atualização de Membros',
    description: 'Documento institucional em Word (DOCX) para cadastro de novas famílias e atualização de contatos.',
    category: 'Formulários',
    file_url: '/logo_ipb.png',
    file_name: 'ficha-atualizacao-membros.docx',
    file_size: 524288,
    mime_type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    status: 'published',
    published_at: '2026-10-15T14:00:00Z',
    created_at: '2026-10-15T14:00:00Z',
    updated_at: '2026-10-15T14:00:00Z',
  },
];

const defaultNews: NewsArticle[] = [
  {
    id: '40000000-0000-0000-0000-000000000001',
    title: 'Inscrições Abertas para as Classes da Escola Bíblica Dominical',
    slug: 'inscricoes-abertas-escola-biblica-dominical',
    summary: 'Participe dos novos módulos temáticos que terão início neste trimestre para crianças, jovens e adultos.',
    body: `Convidamos todas as famílias da congregação e os visitantes a participarem das classes da Escola Dominical aos domingos, às 09h da manhã.

Teremos turmas especialmente estruturadas:
- Berçário e Maternal (0 a 3 anos).
- Primários e Juniores (4 a 11 anos).
- Adolescentes e Jovens (12 a 25 anos).
- Classe de Adultos: Estudo Expositivo das Epístolas Paulinas.

A Escola Dominical é uma oportunidade de comunhão e aprofundamento das verdades que sustentam a nossa caminhada cristã. Esperamos você e sua família!`,
    cover_image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80',
    status: 'published',
    published_at: '2026-11-02T14:00:00Z',
    created_at: '2026-11-02T14:00:00Z',
    updated_at: '2026-11-02T14:00:00Z',
  },
  {
    id: '40000000-0000-0000-0000-000000000002',
    title: 'Convocação para a Noite de Vigília e Oração Comunitária',
    slug: 'convocacao-noite-de-vigilia-e-oracao',
    summary: 'Nesta sexta-feira às 20h, estaremos reunidos no templo para um tempo especial de intercessão pela igreja e pela cidade.',
    body: `A oração congregacional é o fundamento dos nossos ministérios e ações. Convidamos todos os irmãos a estarem juntos nesta sexta-feira às 20h em nosso templo em Santa Maria Sul.

Estaremos orando especialmente por:
1. Nossas famílias e a criação dos filhos nos caminhos do Senhor.
2. Os enfermos e aqueles que passam por lutas e luto.
3. A expansão do Reino de Deus em nossa comunidade local no Distrito Federal.
4. Fortalecimento da comunhão e fidelidade nas Escrituras.

Venha participar deste momento de clamor e louvor.`,
    cover_image: 'https://images.unsplash.com/photo-1445445290350-18a3b86e0b5b?auto=format&fit=crop&w=1200&q=80',
    status: 'published',
    published_at: '2026-10-30T18:00:00Z',
    created_at: '2026-10-30T18:00:00Z',
    updated_at: '2026-10-30T18:00:00Z',
  },
];

const defaultEvents: ChurchEvent[] = [
  {
    id: 'e-1',
    title: 'Culto de Ação de Graças e Comunhão',
    slug: 'culto-de-acao-de-gracas-e-comunhao',
    description: 'Celebração comunitária especial em louvor a Deus pelas bênçãos recebidas, seguida de confraternização fraterna.',
    starts_at: '2026-11-15T19:00:00Z',
    ends_at: '2026-11-15T21:00:00Z',
    location: 'Templo da Igreja — EQ 304/307 Santa Maria Sul DF',
    cover_image: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=1200&q=80',
    status: 'published',
    created_at: '2026-11-01T12:00:00Z',
    updated_at: '2026-11-01T12:00:00Z',
  },
];

function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return Boolean(url && key && !url.includes('placeholder') && !key.includes('placeholder'));
}

export async function getSiteSettings(): Promise<SiteSettings> {
  if (!isSupabaseConfigured()) {
    return defaultSettings;
  }
  try {
    const { createServerSupabaseClient } = await import('./supabase/server');
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase.from('site_settings').select('*').limit(1).maybeSingle();
    if (error || !data) return defaultSettings;
    return data as SiteSettings;
  } catch {
    return defaultSettings;
  }
}

export async function getContentCategories(): Promise<ContentCategory[]> {
  if (!isSupabaseConfigured()) {
    return defaultCategories;
  }
  try {
    const { createServerSupabaseClient } = await import('./supabase/server');
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase.from('content_categories').select('*').order('name');
    if (error || !data || data.length === 0) return defaultCategories;
    return data as ContentCategory[];
  } catch {
    return defaultCategories;
  }
}

export async function getWeeklySchedule(): Promise<WeeklyScheduleItem[]> {
  if (!isSupabaseConfigured()) {
    return defaultSchedule;
  }
  try {
    const { createServerSupabaseClient } = await import('./supabase/server');
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from('weekly_schedule')
      .select('*')
      .eq('active', true)
      .order('display_order', { ascending: true });
    if (error || !data || data.length === 0) return defaultSchedule;
    return data as WeeklyScheduleItem[];
  } catch {
    return defaultSchedule;
  }
}

export async function getRecentContents(limit = 3): Promise<ContentItem[]> {
  const contents = await getContents();
  return contents.slice(0, limit);
}

export async function getContents(params?: {
  query?: string;
  category?: string;
  period?: string;
  sort?: 'recent' | 'oldest';
}): Promise<ContentItem[]> {
  let list = [...defaultContents];

  if (isSupabaseConfigured()) {
    try {
      const { createServerSupabaseClient } = await import('./supabase/server');
      const supabase = createServerSupabaseClient();
      let query = supabase
        .from('contents')
        .select('*, category:content_categories(*)')
        .eq('status', 'published');

      if (params?.sort === 'oldest') {
        query = query.order('published_at', { ascending: true });
      } else {
        query = query.order('published_at', { ascending: false });
      }

      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        list = data as ContentItem[];
      }
    } catch {
      // Usa fallback
    }
  }

  // Filtragem
  if (params?.query) {
    const q = params.query.toLowerCase();
    list = list.filter(
      (item) => item.title.toLowerCase().includes(q) || item.summary.toLowerCase().includes(q)
    );
  }

  if (params?.category && params.category !== 'all') {
    list = list.filter((item) => item.category?.slug === params.category || item.category_id === params.category);
  }

  if (params?.sort === 'oldest') {
    list.sort((a, b) => new Date(a.published_at || '').getTime() - new Date(b.published_at || '').getTime());
  } else {
    list.sort((a, b) => new Date(b.published_at || '').getTime() - new Date(a.published_at || '').getTime());
  }

  return list;
}

export async function getContentBySlug(slug: string): Promise<ContentItem | null> {
  const all = await getContents();
  return all.find((item) => item.slug === slug) || null;
}

export async function getRecentNews(limit = 3): Promise<NewsArticle[]> {
  const news = await getNews();
  return news.slice(0, limit);
}

export async function getNews(params?: { query?: string }): Promise<NewsArticle[]> {
  let list = [...defaultNews];

  if (isSupabaseConfigured()) {
    try {
      const { createServerSupabaseClient } = await import('./supabase/server');
      const supabase = createServerSupabaseClient();
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .eq('status', 'published')
        .order('published_at', { ascending: false });
      if (!error && data && data.length > 0) {
        list = data as NewsArticle[];
      }
    } catch {
      // Usa fallback
    }
  }

  if (params?.query) {
    const q = params.query.toLowerCase();
    list = list.filter(
      (n) => n.title.toLowerCase().includes(q) || n.summary.toLowerCase().includes(q)
    );
  }

  list.sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());
  return list;
}

export async function getNewsBySlug(slug: string): Promise<NewsArticle | null> {
  const all = await getNews();
  return all.find((n) => n.slug === slug) || null;
}

export async function getDownloads(params?: { query?: string; category?: string }): Promise<DownloadItem[]> {
  let list = [...defaultDownloads];

  if (isSupabaseConfigured()) {
    try {
      const { createServerSupabaseClient } = await import('./supabase/server');
      const supabase = createServerSupabaseClient();
      let query = supabase
        .from('downloads')
        .select('*')
        .eq('status', 'published')
        .order('published_at', { ascending: false });

      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        list = data as DownloadItem[];
      }
    } catch {
      // Usa fallback
    }
  }

  if (params?.query) {
    const q = params.query.toLowerCase();
    list = list.filter(
      (d) => d.title.toLowerCase().includes(q) || (d.description && d.description.toLowerCase().includes(q))
    );
  }

  if (params?.category && params.category !== 'all') {
    list = list.filter((d) => d.category === params.category);
  }

  return list;
}

export async function getUpcomingEvents(): Promise<ChurchEvent[]> {
  if (!isSupabaseConfigured()) {
    return defaultEvents;
  }
  try {
    const { createServerSupabaseClient } = await import('./supabase/server');
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('status', 'published')
      .order('starts_at', { ascending: true });
    if (error || !data || data.length === 0) return defaultEvents;
    return data as ChurchEvent[];
  } catch {
    return defaultEvents;
  }
}

