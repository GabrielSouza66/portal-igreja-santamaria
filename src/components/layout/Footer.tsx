import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  MapPin,
  Phone,
  MessageCircle,
  Clock,
  ExternalLink,
  Shield,
  Instagram,
  Youtube,
  Facebook,
} from 'lucide-react';
import { siteConfig } from '@/lib/config';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#17231C] text-white pt-16 pb-10 border-t border-[#19593B]/40 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Coluna 1: Identidade e Descrição */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 flex-shrink-0 bg-white rounded-full p-1 shadow-sm">
                <Image
                  src={siteConfig.logo}
                  alt={`Logotipo da ${siteConfig.shortName}`}
                  fill
                  sizes="48px"
                  className="object-contain p-1"
                />
              </div>
              <div>
                <h3 className="font-heading font-bold text-base text-white uppercase">
                  {siteConfig.shortName}
                </h3>
                <p className="text-[12px] text-emerald-300">Santa Maria • Distrito Federal</p>
              </div>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              {siteConfig.description}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-gray-300 hover:text-white hover:bg-[#0D5131] transition-colors"
                aria-label="Acompanhe nosso Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-gray-300 hover:text-white hover:bg-[#0D5131] transition-colors"
                aria-label="Acompanhe nosso canal no YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-gray-300 hover:text-white hover:bg-[#0D5131] transition-colors"
                aria-label="Acompanhe nossa página no Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Coluna 2: Links Rápidos */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-emerald-400 mb-4">
              Navegação
            </h4>
            <ul className="space-y-2.5 text-sm">
              {siteConfig.navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-white hover:underline transition-colors flex items-center gap-1.5"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/politica-de-privacidade"
                  className="text-gray-300 hover:text-white hover:underline transition-colors"
                >
                  Política de Privacidade (LGPD)
                </Link>
              </li>
              <li>
                <Link
                  href="/admin"
                  className="text-gray-400 hover:text-emerald-300 transition-colors flex items-center gap-1 text-xs pt-1"
                >
                  <Shield className="w-3.5 h-3.5" /> Área Administrativa
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Programação Resumida */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-emerald-400 mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4" /> Horários
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-300">
              <li className="border-b border-white/5 pb-2">
                <span className="font-semibold text-white block">Domingo:</span>
                09h — Escola Dominical
                <br />
                19h — Culto Noturno
              </li>
              <li className="border-b border-white/5 pb-2">
                <span className="font-semibold text-white block">Segunda a Sexta:</span>
                20h — Reuniões da Semana
              </li>
              <li>
                <Link
                  href="/programacao"
                  className="text-emerald-300 hover:text-emerald-200 hover:underline font-medium inline-flex items-center gap-1 mt-1 text-xs"
                >
                  Ver programação completa →
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 4: Localização e Contato */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-emerald-400 mb-4">
              Onde Estamos
            </h4>
            <div className="flex items-start gap-2.5 text-xs text-gray-300">
              <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span>{siteConfig.contact.address}</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-gray-300">
              <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <a
                href={siteConfig.contact.telUrl}
                className="hover:text-white hover:underline"
              >
                {siteConfig.contact.phone}
              </a>
            </div>
            <div className="pt-2">
              <a
                href={siteConfig.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#0D5131] hover:bg-[#19593B] text-white text-xs font-semibold rounded-md shadow-sm transition-colors"
              >
                <MessageCircle className="w-4 h-4" /> Falar no WhatsApp
              </a>
            </div>
            <div className="pt-1">
              <a
                href={siteConfig.contact.mapsRouteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-emerald-300 hover:text-white inline-flex items-center gap-1"
              >
                Como chegar (Google Maps) <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Linha Final de Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>
            © {currentYear} {siteConfig.name}. Todos os direitos reservados.
          </p>
          <p className="text-gray-400">
            Santa Maria • Distrito Federal • Brasil
          </p>
        </div>
      </div>
    </footer>
  );
}

