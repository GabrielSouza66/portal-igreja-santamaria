export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface SiteSettings {
  id: string;
  church_name: string;
  church_short_name: string;
  description: string;
  logo_url: string;
  address: string;
  phone: string;
  whatsapp: string;
  social_links: {
    instagram?: string;
    youtube?: string;
    facebook?: string;
  };
  seo_defaults: {
    title_suffix?: string;
    description?: string;
  };
  created_at: string;
  updated_at: string;
}

export interface ContentCategory {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}

export type ContentStatus = 'draft' | 'published';

export interface ContentItem {
  id: string;
  title: string;
  slug: string;
  summary: string;
  body: string;
  category_id?: string | null;
  category?: ContentCategory | null;
  event_date?: string | null;
  published_at?: string | null;
  cover_image?: string | null;
  video_url?: string | null;
  author?: string | null;
  status: ContentStatus;
  created_at: string;
  updated_at: string;
  attachments?: MediaFile[];
}

export interface MediaFile {
  id: string;
  original_filename: string;
  storage_path: string;
  public_url?: string | null;
  mime_type: string;
  file_size: number;
  visibility: 'public' | 'private';
  created_at: string;
}

export type DownloadCategory =
  | 'Escalas'
  | 'Estudos'
  | 'Apostilas'
  | 'Formulários'
  | 'Materiais institucionais'
  | 'Outros';

export interface DownloadItem {
  id: string;
  title: string;
  description?: string | null;
  category: DownloadCategory;
  media_file_id?: string | null;
  file_url: string;
  file_name: string;
  file_size?: number | null;
  mime_type?: string | null;
  status: ContentStatus;
  published_at?: string | null;
  created_at: string;
  updated_at: string;
}

export interface WeeklyScheduleItem {
  id: string;
  weekday: number; // 0 = Domingo, 1 = Segunda, ..., 6 = Sábado
  title: string;
  starts_at: string; // Ex: "20:00", "09:00"
  description?: string | null;
  display_order: number;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ChurchEvent {
  id: string;
  title: string;
  slug: string;
  description: string;
  starts_at: string;
  ends_at?: string | null;
  location?: string | null;
  cover_image?: string | null;
  status: ContentStatus;
  created_at: string;
  updated_at: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  summary: string;
  body: string;
  cover_image?: string | null;
  status: ContentStatus;
  published_at: string;
  created_at: string;
  updated_at: string;
}

export interface UserProfile {
  id: string;
  auth_user_id: string;
  role: 'admin' | 'editor';
  display_name: string;
  created_at: string;
  updated_at: string;
}

export interface AuditLog {
  id: string;
  actor_id?: string | null;
  action: string;
  entity_type: string;
  entity_id?: string | null;
  details?: Record<string, unknown> | null;
  created_at: string;
}

