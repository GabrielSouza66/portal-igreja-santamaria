'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  BookOpen,
  Calendar,
  Download,
  Newspaper,
  FolderOpen,
  Settings,
  LogOut,
  ExternalLink,
  Shield,
} from 'lucide-react';
import { siteConfig } from '@/lib/config';
import { createClient } from '@/lib/supabase/client';
import { cn } from '@/lib/utils';

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch {
      // Ignore
    }
    router.push('/admin/login');
  };

  const navItems = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Conteúdos', href: '/admin/conteudos', icon: BookOpen },
    { label: 'Programação', href: '/admin/programacao', icon: Calendar },
    { label: 'Downloads', href: '/admin/downloads', icon: Download },
    { label: 'Notícias', href: '/admin/noticias', icon: Newspaper },
    { label: 'Arquivos & Mídia', href: '/admin/arquivos', icon: FolderOpen },
    { label: 'Configurações', href: '/admin/configuracoes', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-[#0D5131] text-white flex flex-col flex-shrink-0 min-h-screen border-r border-[#19593B]">
      {/* Topo da Sidebar */}
      <div className="p-6 border-b border-[#19593B]/70 flex items-center gap-3">
        <div className="relative w-10 h-10 bg-white rounded-xl p-1 flex-shrink-0 shadow-sm">
          <Image
            src={siteConfig.logo}
            alt="Logo"
            fill
            className="object-contain p-1"
          />
        </div>
        <div className="overflow-hidden">
          <h2 className="font-heading font-bold text-sm text-white truncate">
            Painel de Gestão
          </h2>
          <span className="text-[11px] text-emerald-200 block truncate">
            {siteConfig.shortName}
          </span>
        </div>
      </div>

      {/* Navegação Principal */}
      <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto" aria-label="Menu Administrativo">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href ||
            (item.href !== '/admin' && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors',
                isActive
                  ? 'bg-[#19593B] text-white font-semibold shadow-sm'
                  : 'text-emerald-100 hover:bg-[#19593B]/60 hover:text-white'
              )}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Rodapé da Sidebar */}
      <div className="p-4 border-t border-[#19593B]/70 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs text-emerald-200 hover:text-white hover:bg-[#19593B]/60 transition-colors"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="w-3.5 h-3.5" /> Ver Site Público
          </span>
          <span className="text-[10px] bg-emerald-900 px-1.5 py-0.5 rounded text-emerald-200">
            Abrir
          </span>
        </Link>

        <button
          onClick={handleLogout}
          type="button"
          className="w-full flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs text-red-200 hover:text-white hover:bg-red-900/40 transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" /> Sair do Painel
        </button>
      </div>
    </aside>
  );
}

