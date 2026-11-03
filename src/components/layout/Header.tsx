'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Shield } from 'lucide-react';
import { siteConfig } from '@/lib/config';
import { cn } from '@/lib/utils';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Fecha o menu móvel ao mudar de rota
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Efeito de sombra sutil na rolagem
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fechar o menu móvel com a tecla ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  // Prevenir rolagem do body quando o menu mobile está aberto
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full bg-[#0D5131] text-white transition-all duration-300',
        isScrolled ? 'shadow-md border-b border-[#19593B]' : 'border-b border-[#19593B]/40'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Lado Esquerdo: Logotipo e Nome Oficial da Igreja */}
          <Link
            href="/"
            className="flex items-center gap-3.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-md p-1"
            aria-label={`${siteConfig.name} - Voltar para página inicial`}
          >
            <div className="relative w-12 h-12 flex-shrink-0 bg-white rounded-full p-1.5 shadow-sm group-hover:scale-105 transition-transform duration-200">
              <Image
                src={siteConfig.logo}
                alt={`Logotipo da ${siteConfig.shortName}`}
                fill
                sizes="48px"
                className="object-contain p-1"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-base sm:text-lg leading-tight tracking-tight text-white group-hover:text-emerald-100 transition-colors">
                {siteConfig.shortName}
              </span>
              <span className="text-xs text-emerald-100/90 hidden sm:block font-normal">
                Santa Maria • Distrito Federal
              </span>
            </div>
          </Link>

          {/* Lado Direito: Navegação Desktop */}
          <nav
            className="hidden md:flex items-center gap-1.5"
            aria-label="Navegação Principal"
          >
            {siteConfig.navigation
              .filter((item) => item.href !== '/')
              .map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'px-3.5 py-2 text-sm font-medium rounded-md transition-colors relative duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white',
                      isActive
                        ? 'bg-[#19593B] text-white font-semibold'
                        : 'text-emerald-50 hover:bg-[#19593B]/70 hover:text-white'
                    )}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-emerald-400 rounded-full" />
                    )}
                  </Link>
                );
              })}

            {/* Acesso Rápido ao Painel Administrativo */}
            <Link
              href="/admin"
              className="ml-3 p-2 text-emerald-200 hover:text-white hover:bg-[#19593B] rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              title="Acesso Administrativo"
              aria-label="Acesso ao Painel Administrativo"
            >
              <Shield className="w-4 h-4" />
            </Link>
          </nav>

          {/* Botão de Menu Mobile */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              href="/admin"
              className="p-2 text-emerald-200 hover:text-white rounded-md"
              aria-label="Painel Administrativo"
            >
              <Shield className="w-5 h-5" />
            </Link>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-emerald-100 hover:text-white hover:bg-[#19593B] rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white transition-colors"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={isMobileMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Painel de Navegação Móvel Acessível */}
      {isMobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="fixed inset-0 top-20 bg-black/60 z-40 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-modal="true"
          role="dialog"
        >
          <div
            className="bg-[#0D5131] border-b border-[#19593B] px-6 py-6 space-y-3 shadow-xl max-h-[calc(100vh-5rem)] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-xs uppercase tracking-wider text-emerald-200/80 font-semibold mb-2">
              Menu Institucional
            </p>
            <Link
              href="/"
              className={cn(
                'block px-4 py-3 rounded-lg text-base font-medium transition-colors',
                pathname === '/'
                  ? 'bg-[#19593B] text-white font-semibold'
                  : 'text-emerald-50 hover:bg-[#19593B]/60'
              )}
              aria-current={pathname === '/' ? 'page' : undefined}
            >
              Início
            </Link>
            {siteConfig.navigation
              .filter((item) => item.href !== '/')
              .map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'block px-4 py-3 rounded-lg text-base font-medium transition-colors',
                      isActive
                        ? 'bg-[#19593B] text-white font-semibold'
                        : 'text-emerald-50 hover:bg-[#19593B]/60'
                    )}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                );
              })}

            <div className="pt-4 mt-4 border-t border-[#19593B]">
              <div className="text-xs text-emerald-100/80 space-y-1">
                <p className="font-semibold text-white">{siteConfig.contact.phone}</p>
                <p>{siteConfig.contact.address}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
