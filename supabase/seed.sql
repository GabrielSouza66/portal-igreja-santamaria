-- ==============================================================================
-- DADOS INICIAIS (SEED) - IGREJA EM SANTA MARIA DF
-- ==============================================================================

-- 1. Configurações Iniciais da Igreja
INSERT INTO public.site_settings (
    id,
    church_name,
    church_short_name,
    description,
    logo_url,
    address,
    phone,
    whatsapp,
    social_links,
    seo_defaults
) VALUES (
    '00000000-0000-0000-0000-000000000001',
    'Igreja Presbiteriana do Brasil em Santa Maria',
    'IPB Santa Maria',
    'Um lugar para viver a fé e crescer em comunhão. Conheça nossa comunidade, participe dos nossos encontros e acompanhe as mensagens e atividades da semana.',
    '/logo_ipb.png',
    'EQ 304/307 — Santa Maria Sul — Distrito Federal — Brasil',
    '(61) 98299-8554',
    'https://wa.me/5561982998554',
    '{"instagram": "https://instagram.com", "youtube": "https://youtube.com", "facebook": "https://facebook.com"}'::jsonb,
    '{"title_suffix": "IPB Santa Maria DF", "description": "Portal oficial da Igreja em Santa Maria Sul DF. Mensagens, estudos bíblicos, programação semanal e comunidade de fé."}'::jsonb
) ON CONFLICT (id) DO NOTHING;

-- 2. Categorias de Conteúdo
INSERT INTO public.content_categories (id, name, slug) VALUES
    ('10000000-0000-0000-0000-000000000001', 'Pregações', 'pregacoes'),
    ('10000000-0000-0000-0000-000000000002', 'Estudos Bíblicos', 'estudos-biblicos'),
    ('10000000-0000-0000-0000-000000000003', 'Mensagens Semanais', 'mensagens-semanais'),
    ('10000000-0000-0000-0000-000000000004', 'Escalas', 'escalas')
ON CONFLICT (id) DO NOTHING;

-- 3. Programação Semanal Recorrente Oficial
-- 0=Domingo, 1=Segunda, 2=Terça, 3=Quarta, 4=Quinta, 5=Sexta, 6=Sábado
INSERT INTO public.weekly_schedule (weekday, title, starts_at, description, display_order, active) VALUES
    (1, 'Pequenos Grupos', '20:00', 'Encontro nos lares para oração, comunhão fraterna e compartilhamento da Palavra de Deus.', 1, true),
    (2, 'Estudo Bíblico', '20:00', 'Reunião doutrinária e aprofundamento das Escrituras Sagradas no templo.', 2, true),
    (3, 'Discipulado', '20:00', 'Formação cristã contínua, mentoria bíblica e crescimento espiritual.', 3, true),
    (4, 'Discipulado', '20:00', 'Turma de acompanhamento bíblico e fortalecimento da fé na comunidade.', 4, true),
    (5, 'Vigília', '20:00', 'Tempo especial de intercessão coletiva, clamor e busca pela presença do Senhor.', 5, true),
    (0, 'Escola Dominical', '09:00', 'Classes de ensino bíblico por faixas etárias para toda a família.', 6, true),
    (0, 'Culto Solene', '19:00', 'Culto dominical comunitário de louvor, oração e pregação expositiva da Palavra.', 7, true);

-- 4. Conteúdos Iniciais
INSERT INTO public.contents (
    id,
    title,
    slug,
    summary,
    body,
    category_id,
    event_date,
    published_at,
    cover_image,
    video_url,
    author,
    status
) VALUES
(
    '20000000-0000-0000-0000-000000000001',
    'A Fidelidade de Deus em Meio às Provações',
    'a-fidelidade-de-deus-em-meio-as-provacoes',
    'Uma reflexão expositiva sobre o Salmo 46 e a certeza do refúgio e fortaleza que encontramos em Cristo.',
    'Neste estudo meditamos no Salmo 46, lembrando que "Deus é o nosso refúgio e fortaleza, socorro bem presente nas tribulações". Em tempos de incertezas no mundo, a soberania e a graça de Deus nos sustentam com paz e esperança viva.',
    '10000000-0000-0000-0000-000000000001',
    '2026-11-01',
    '2026-11-01 10:00:00+00',
    'https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=1200&q=80',
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    'Pastor da Comunidade',
    'published'
),
(
    '20000000-0000-0000-0000-000000000002',
    'Fundamentos da Oração Bíblica',
    'fundamentos-da-oracao-biblica',
    'Guia de estudo prático para cultivar uma vida de oração alinhada ao modelo bíblico deixado por Jesus.',
    'A oração não é apenas um pedido, mas um diálogo filial com o Pai celeste. Este estudo aborda a oração do Pai Nosso, examinando cada petição e sua aplicação prática para a vida diária da família cristã.',
    '10000000-0000-0000-0000-000000000002',
    '2026-10-27',
    '2026-10-27 19:30:00+00',
    'https://images.unsplash.com/photo-1544427920-c49ccfb85579?auto=format&fit=crop&w=1200&q=80',
    NULL,
    'Equipe Pastoral',
    'published'
),
(
    '20000000-0000-0000-0000-000000000003',
    'Comunhão e Cuidado Mútuo no Corpo de Cristo',
    'comunhao-e-cuidado-mutuo-no-corpo-de-cristo',
    'Como os Pequenos Grupos fortalecem os laços de fraternidade e acolhimento em nossa comunidade em Santa Maria.',
    'A vida cristã foi planejada por Deus para ser vivida em comunidade. Através dos pequenos grupos nos lares, cada membro encontra espaço para ser acolhido, orar uns pelos outros e servir ao próximo.',
    '10000000-0000-0000-0000-000000000003',
    '2026-10-20',
    '2026-10-20 20:00:00+00',
    'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=80',
    NULL,
    'Ministério de Pequenos Grupos',
    'published'
)
ON CONFLICT (id) DO NOTHING;

-- 5. Downloads Iniciais
INSERT INTO public.downloads (
    id,
    title,
    description,
    category,
    file_url,
    file_name,
    file_size,
    mime_type,
    status
) VALUES
(
    '30000000-0000-0000-0000-000000000001',
    'Escala Mensal de Diaconia e Recepção',
    'Escala oficial das equipes de recepção e apoio para os cultos de domingo e eventos especiais.',
    'Escalas',
    '/downloads/escala-mensal-diaconia.pdf',
    'escala-mensal-diaconia.pdf',
    245760,
    'application/pdf',
    'published'
),
(
    '30000000-0000-0000-0000-000000000002',
    'Apostila do Estudo Panorâmico do Novo Testamento',
    'Material de apoio pedagógico para as aulas da Escola Dominical.',
    'Estudos',
    '/downloads/estudo-novo-testamento.pdf',
    'estudo-novo-testamento.pdf',
    1048576,
    'application/pdf',
    'published'
),
(
    '30000000-0000-0000-0000-000000000003',
    'Ficha Cadastral e Atualização de Membros',
    'Formulário institucional para novos membros e atualização de dados de contato das famílias.',
    'Formulários',
    '/downloads/ficha-atualizacao-membros.docx',
    'ficha-atualizacao-membros.docx',
    524288,
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'published'
)
ON CONFLICT (id) DO NOTHING;

-- 6. Notícias Iniciais
INSERT INTO public.news (
    id,
    title,
    slug,
    summary,
    body,
    cover_image,
    status,
    published_at
) VALUES
(
    '40000000-0000-0000-0000-000000000001',
    'Inscrições Abertas para as Classes da Escola Bíblica Dominical',
    'inscricoes-abertas-escola-biblica-dominical',
    'Participe dos novos módulos temáticos que terão início neste trimestre para crianças, jovens e adultos.',
    'Convidamos todas as famílias a participarem das classes da Escola Dominical aos domingos, às 09h da manhã. Teremos turmas especiais para berçário, crianças, adolescentes, jovens e classes de adultos focadas em doutrina e vida cristã prática. Venha crescer no conhecimento da Palavra de Deus.',
    'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80',
    'published',
    '2026-11-02 14:00:00+00'
),
(
    '40000000-0000-0000-0000-000000000002',
    'Convocação para a Noite de Vigília e Oração Comunitária',
    'convocacao-noite-de-vigilia-e-oracao',
    'Nesta sexta-feira às 20h, estaremos reunidos no templo para um tempo especial de intercessão pela igreja e pela cidade.',
    'A vigília semanal é um pilar fundamental da nossa caminhada. Convidamos toda a congregação a estar unida em oração por nossos lares, pelos enfermos, pelas famílias de Santa Maria e pelo avanço do Reino de Deus. O encontro começará pontualmente às 20h.',
    'https://images.unsplash.com/photo-1445445290350-18a3b86e0b5b?auto=format&fit=crop&w=1200&q=80',
    'published',
    '2026-10-30 18:00:00+00'
)
ON CONFLICT (id) DO NOTHING;
