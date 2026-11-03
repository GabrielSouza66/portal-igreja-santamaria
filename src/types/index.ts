export * from './database';

export interface NavItem {
  label: string;
  href: string;
}

export interface ContentFilterParams {
  query?: string;
  category?: string;
  period?: 'recent' | 'this-month' | 'this-year' | 'all';
  sort?: 'recent' | 'oldest';
  page?: number;
}

export interface DownloadsFilterParams {
  query?: string;
  category?: string;
}

export interface NewsFilterParams {
  query?: string;
  page?: number;
}
