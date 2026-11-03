-- ==============================================================================
-- SCHEMA DO BANCO DE DADOS - PORTAL INSTITUCIONAL DA IGREJA
-- PostgreSQL / Supabase
-- ==============================================================================

-- Habilita extensões necessárias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==============================================================================
-- 1. TABELA: site_settings
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.site_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    church_name TEXT NOT NULL DEFAULT 'Igreja Presbiteriana do Brasil em Santa Maria',
    church_short_name TEXT NOT NULL DEFAULT 'IPB Santa Maria',
    description TEXT NOT NULL DEFAULT 'Um lugar para viver a fé e crescer em comunhão.',
    logo_url TEXT DEFAULT '/logo_ipb.png',
    address TEXT NOT NULL DEFAULT 'EQ 304/307 — Santa Maria Sul — Distrito Federal — Brasil',
    phone TEXT NOT NULL DEFAULT '(61) 98299-8554',
    whatsapp TEXT NOT NULL DEFAULT 'https://wa.me/5561982998554',
    social_links JSONB DEFAULT '{"instagram": "", "youtube": "", "facebook": ""}'::jsonb,
    seo_defaults JSONB DEFAULT '{"title_suffix": "IPB Santa Maria DF", "description": "Portal oficial da Igreja em Santa Maria Sul DF. Mensagens, estudos bíblicos, programação semanal e comunidade de fé."}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ==============================================================================
-- 2. TABELA: profiles (Usuários Administrativos)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    auth_user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('admin', 'editor')) DEFAULT 'admin',
    display_name TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ==============================================================================
-- 3. TABELA: content_categories (Categorias de Conteúdo)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.content_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ==============================================================================
-- 4. TABELA: media_files (Arquivos de Mídia)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.media_files (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    original_filename TEXT NOT NULL,
    storage_path TEXT NOT NULL UNIQUE,
    public_url TEXT,
    mime_type TEXT NOT NULL,
    file_size BIGINT NOT NULL,
    visibility TEXT NOT NULL CHECK (visibility IN ('public', 'private')) DEFAULT 'public',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ==============================================================================
-- 5. TABELA: contents (Pregações, Estudos, Mensagens, Escalas)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.contents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    summary TEXT NOT NULL,
    body TEXT NOT NULL,
    category_id UUID REFERENCES public.content_categories(id) ON DELETE SET NULL,
    event_date DATE,
    published_at TIMESTAMPTZ,
    cover_image TEXT,
    video_url TEXT,
    author TEXT,
    status TEXT NOT NULL CHECK (status IN ('draft', 'published')) DEFAULT 'draft',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ==============================================================================
-- 6. TABELA: content_attachments (Anexos de Conteúdos)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.content_attachments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    content_id UUID NOT NULL REFERENCES public.contents(id) ON DELETE CASCADE,
    media_file_id UUID NOT NULL REFERENCES public.media_files(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ==============================================================================
-- 7. TABELA: downloads (Biblioteca de Documentos)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.downloads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL CHECK (category IN ('Escalas', 'Estudos', 'Apostilas', 'Formulários', 'Materiais institucionais', 'Outros')),
    media_file_id UUID REFERENCES public.media_files(id) ON DELETE SET NULL,
    file_url TEXT,
    file_name TEXT,
    file_size BIGINT,
    mime_type TEXT,
    status TEXT NOT NULL CHECK (status IN ('draft', 'published')) DEFAULT 'published',
    published_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ==============================================================================
-- 8. TABELA: weekly_schedule (Programação Semanal Recorrente)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.weekly_schedule (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    weekday INTEGER NOT NULL CHECK (weekday BETWEEN 0 AND 6), -- 0=Domingo, 1=Segunda, ..., 6=Sábado
    title TEXT NOT NULL,
    starts_at TEXT NOT NULL, -- Ex: '20:00', '09:00', '19:00'
    description TEXT,
    display_order INTEGER NOT NULL DEFAULT 0,
    active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ==============================================================================
-- 9. TABELA: events (Eventos Extraordinários / Especiais)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL,
    starts_at TIMESTAMPTZ NOT NULL,
    ends_at TIMESTAMPTZ,
    location TEXT DEFAULT 'Templo da Igreja — EQ 304/307 Santa Maria Sul',
    cover_image TEXT,
    status TEXT NOT NULL CHECK (status IN ('draft', 'published')) DEFAULT 'published',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ==============================================================================
-- 10. TABELA: news (Notícias e Comunicados)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.news (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    summary TEXT NOT NULL,
    body TEXT NOT NULL,
    cover_image TEXT,
    status TEXT NOT NULL CHECK (status IN ('draft', 'published')) DEFAULT 'draft',
    published_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ==============================================================================
-- 11. TABELA: audit_logs (Auditoria de Ações Administrativas)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    actor_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id TEXT,
    details JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ==============================================================================
-- ÍNDICES PARA ALTA PERFORMANCE E BUSCA
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_contents_slug ON public.contents(slug);
CREATE INDEX IF NOT EXISTS idx_contents_status_published_at ON public.contents(status, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_contents_category ON public.contents(category_id);
CREATE INDEX IF NOT EXISTS idx_news_slug ON public.news(slug);
CREATE INDEX IF NOT EXISTS idx_news_status_published_at ON public.news(status, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_downloads_status ON public.downloads(status, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_weekly_schedule_active_weekday ON public.weekly_schedule(active, weekday, display_order);
CREATE INDEX IF NOT EXISTS idx_events_starts_at ON public.events(starts_at ASC);

-- ==============================================================================
-- TRIGGER PARA ATUALIZAÇÃO AUTOMÁTICA DE updated_at
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_site_settings_modtime BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER update_contents_modtime BEFORE UPDATE ON public.contents FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER update_news_modtime BEFORE UPDATE ON public.news FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER update_downloads_modtime BEFORE UPDATE ON public.downloads FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER update_weekly_schedule_modtime BEFORE UPDATE ON public.weekly_schedule FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER update_events_modtime BEFORE UPDATE ON public.events FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ==============================================================================
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_attachments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.downloads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.weekly_schedule ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Helper function: verificar se o usuário autenticado é admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.profiles
        WHERE auth_user_id = auth.uid() AND role = 'admin'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Políticas de LEITURA PÚBLICA (apenas itens ativos e publicados)
CREATE POLICY "Public read site_settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Public read categories" ON public.content_categories FOR SELECT USING (true);
CREATE POLICY "Public read weekly_schedule" ON public.weekly_schedule FOR SELECT USING (active = true);
CREATE POLICY "Public read published contents" ON public.contents FOR SELECT USING (status = 'published');
CREATE POLICY "Public read published news" ON public.news FOR SELECT USING (status = 'published');
CREATE POLICY "Public read published downloads" ON public.downloads FOR SELECT USING (status = 'published');
CREATE POLICY "Public read published events" ON public.events FOR SELECT USING (status = 'published');
CREATE POLICY "Public read public media" ON public.media_files FOR SELECT USING (visibility = 'public');
CREATE POLICY "Public read attachments" ON public.content_attachments FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.contents WHERE contents.id = content_attachments.content_id AND contents.status = 'published')
);

-- Políticas de ESCRITA E GESTÃO: APENAS ADMINISTRADORES AUTENTICADOS
CREATE POLICY "Admin all site_settings" ON public.site_settings FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin all profiles" ON public.profiles FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin all categories" ON public.content_categories FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin all contents" ON public.contents FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin all media" ON public.media_files FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin all attachments" ON public.content_attachments FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin all downloads" ON public.downloads FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin all schedule" ON public.weekly_schedule FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin all events" ON public.events FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin all news" ON public.news FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin all audit_logs" ON public.audit_logs FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
