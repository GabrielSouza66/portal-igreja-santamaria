# Portal Institucional — Igreja em Santa Maria (DF)

Portal web institucional completo, moderno, elegante, acessível (WCAG 2.2 AA) e otimizado para SEO técnico (Google Search), com páginas públicas e painel administrativo protegido para gestão de conteúdos, programações, notícias e documentos.

---

## 1. Tecnologias Utilizadas

- **Framework Web:** Next.js (App Router, Server Components e Server Actions)
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS com variáveis CSS nativas para gerenciamento de tema
- **Ícones:** Lucide React
- **Banco de Dados & Auth:** PostgreSQL (Supabase) com Row Level Security (RLS)
- **Armazenamento:** Supabase Storage (com validação estrita de extensões e MIME types)
- **Validação de Dados:** Zod
- **SEO & Metadados:** Next.js Metadata API, Open Graph, Twitter Cards, `/sitemap.xml`, `/robots.txt`
- **Dados Estruturados:** JSON-LD e Schema.org (`Church`, `NewsArticle`, `BreadcrumbList`, `Event`)

---

## 2. Identidade Visual e Esquema de Cores

As cores institucionais foram centralizadas em variáveis globais no arquivo `src/app/globals.css` e mapeadas no `tailwind.config.ts`:

- **Primary:** `#0D5131` (Cor institucional predominante no cabeçalho, botões principais e destaques)
- **Primary Contrast:** `#19593B` (Contraste sutil, hovers e elementos secundários)
- **White:** `#FFFFFF` (Equilíbrio visual e conforto de leitura)
- **Background Secondary:** `#F6F8F6` (Fundos suaves para diferenciação de seções e cards)
- **Text Dark:** `#17231C` (Tipografia escura para alto contraste WCAG AA)
- **Border:** `#E2E9E4` (Bordas discretas e elegantes)

---

## 3. Estrutura de Diretórios

```
portal-igreja-santamaria/
├── public/
│   ├── logo_ipb.png                 # Logotipo oficial da instituição
│   └── downloads/                   # Documentos institucionais de exemplo
├── src/
│   ├── app/                         # App Router do Next.js
│   │   ├── layout.tsx               # Root Layout com Header, Footer, Fontes e Schema.org
│   │   ├── page.tsx                 # Página Inicial (Hero, Boas-vindas, Próximas Atividades, Mensagens, Notícias, Convite)
│   │   ├── globals.css              # Variáveis CSS e regras de acessibilidade
│   │   ├── not-found.tsx            # Página 404 personalizada e semântica
│   │   ├── sitemap.ts               # Sitemap dinâmico XML
│   │   ├── robots.ts                # Robots.txt com proteção a rotas restritas
│   │   ├── programacao/             # Página pública de Programação Semanal e Eventos
│   │   ├── conteudo/                # Biblioteca digital com filtros por categoria e busca
│   │   │   └── [slug]/              # Página individual do conteúdo com leitor e anexos
│   │   ├── downloads/               # Acervo de documentos públicos para download
│   │   ├── noticias/                # Mural de notícias e comunicados
│   │   │   └── [slug]/              # Página individual da notícia com compartilhamento
│   │   ├── contato/                 # Endereço, telefone, WhatsApp, rotas e formulário validado
│   │   │   └── actions.ts           # Server Action de recebimento com anti-spam honeypot
│   │   ├── politica-de-privacidade/ # Política institucional adequada à LGPD
│   │   └── admin/                   # Painel Administrativo Protegido
│   │       ├── layout.tsx           # Layout com noindex e proteção
│   │       ├── page.tsx             # Dashboard com métricas e status
│   │       ├── login/               # Autenticação segura com Supabase Auth
│   │       ├── conteudos/           # Gestão de pregações, estudos e escalas
│   │       ├── programacao/         # Gestão de dias, horários e eventos especiais
│   │       ├── downloads/           # Gestão de documentos e arquivos
│   │       ├── noticias/            # Gestão de comunicados e notícias
│   │       ├── arquivos/            # Gestor de mídias e regras de upload
│   │       └── configuracoes/       # Edição de endereço, telefone, WhatsApp e nome
│   ├── components/
│   │   ├── layout/                  # Header e Footer institucionais
│   │   ├── ui/                      # Button, Badge, Card
│   │   ├── seo/                     # Componentes JSON-LD Schema.org
│   │   ├── forms/                   # Formulário de Contato acessível
│   │   └── admin/                   # AdminSidebar e cabeçalhos administrativos
│   ├── lib/
│   │   ├── config.ts                # Configurações institucionais centralizadas
│   │   ├── utils.ts                 # Formatadores de data pt-BR, timezone e tamanhos
│   │   ├── data-service.ts          # Camada de dados resiliente (PostgreSQL + Fallback)
│   │   └── supabase/                # Clientes Supabase SSR e Browser
│   └── types/
│       ├── database.ts              # Tipos TypeScript das tabelas do banco
│       └── index.ts                 # Interfaces de navegação e filtros
├── supabase/
│   ├── migrations/
│   │   └── 20261103000000_initial_schema.sql # Schema PostgreSQL completo com RLS
│   └── seed.sql                     # Dados iniciais da congregação
├── .env.example                     # Modelo de variáveis de ambiente
├── .env.local                       # Configuração de desenvolvimento
├── next.config.mjs                  # Configurações do Next.js
├── tailwind.config.ts               # Mapeamento do design system
└── package.json
```

---

## 4. Como Executar o Projeto Localmente

### 4.1 Pré-requisitos
- Node.js versão 18+ (recomendado Node 20 ou superior)
- Gerenciador de pacotes `npm`

### 4.2 Passo a Passo

1. **Acessar a pasta do projeto no terminal:**
   ```bash
   cd "C:\Users\gabri\Desktop\portal-igreja-santamaria"
   ```

2. **Instalar dependências (caso necessário):**
   ```bash
   npm install
   ```

3. **Executar em modo de desenvolvimento:**
   ```bash
   npm run dev
   ```
   Abra seu navegador em [http://localhost:3000](http://localhost:3000).

4. **Gerar build de produção otimizado e testar:**
   ```bash
   npm run build
   npm run start
   ```

---

## 5. Configuração do Supabase e Provisionamento do Administrador

### 5.1 Criar o Projeto no Supabase
1. Crie um projeto gratuito ou corporativo em [supabase.com](https://supabase.com).
2. Acesse o **SQL Editor** no painel do Supabase.
3. Copie o conteúdo de `supabase/migrations/20261103000000_initial_schema.sql` e execute. Todas as tabelas, índices e políticas de Row Level Security (RLS) serão criadas.
4. Em seguida, execute o arquivo `supabase/seed.sql` para carregar a programação semanal oficial, as configurações da igreja e os conteúdos iniciais.

### 5.2 Configurar o Storage
Crie os buckets no menu **Storage**:
- `media_public` (Público: `true`): Para fotos de capa, imagens de estudos e documentos públicos de download.
- `media_private` (Público: `false`): Para documentos restritos à liderança.

### 5.3 Procedimento Seguro para Criar o Primeiro Administrador
Para garantir a segurança, cadastros públicos estão desabilitados. Para criar o primeiro usuário administrativo:
1. No painel do Supabase, vá em **Authentication -> Users -> Add User -> Create User**.
2. Digite o e-mail do pastor/administrador e defina uma senha forte.
3. Copie o `User UID` gerado.
4. No **SQL Editor**, vincule o usuário ao perfil de administrador executando:
   ```sql
   INSERT INTO public.profiles (auth_user_id, role, display_name)
   VALUES ('SEU_USER_UID_AQUI', 'admin', 'Pastor / Administrador');
   ```
5. Atualize as chaves em `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anon-publica
   SUPABASE_SERVICE_ROLE_KEY=sua-chave-service-role-privada
   ```

---

## 6. Informações Institucionais Oficiais Cadastradas

- **Endereço:** EQ 304/307 — Santa Maria Sul — Distrito Federal — Brasil
- **Telefone:** (61) 98299-8554
- **WhatsApp:** https://wa.me/5561982998554
- **Programação Semanal Recorrente:**
  - **Segunda-feira:** Pequenos Grupos — 20h
  - **Terça-feira:** Estudo Bíblico — 20h
  - **Quarta-feira:** Discipulado — 20h
  - **Quinta-feira:** Discipulado — 20h
  - **Sexta-feira:** Vigília — 20h
  - **Domingo:** Escola Dominical — 09h | Culto Solene — 19h
  - *(Sábado sem atividade fixa, conforme especificação)*
- **Fuso Horário:** America/Sao_Paulo (Horário de Brasília)
