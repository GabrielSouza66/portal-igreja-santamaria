import React from 'react';
import Link from 'next/link';
import { Compass, Home, Calendar, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16 px-4 bg-[#F6F8F6]">
      <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-3xl border border-[#E2E9E4] shadow-sm text-center">
        <div className="w-16 h-16 rounded-2xl bg-[#E7F1EC] text-[#0D5131] flex items-center justify-center mx-auto mb-6">
          <Compass className="w-8 h-8" />
        </div>

        <span className="text-xs font-bold uppercase tracking-wider text-[#0D5131] bg-[#E7F1EC] px-3 py-1 rounded-full">
          Erro 404
        </span>

        <h1 className="font-heading font-bold text-2xl sm:text-3xl text-[#17231C] mt-4 mb-2">
          Página não encontrada
        </h1>

        <p className="text-xs sm:text-sm text-[#53655B] leading-relaxed mb-8">
          O endereço acessado pode ter sido alterado, removido ou está temporariamente indisponível.
        </p>

        <div className="space-y-3">
          <Button href="/" variant="primary" size="md" className="w-full">
            <Home className="w-4 h-4 mr-2" /> Voltar para a Página Inicial
          </Button>

          <Button href="/programacao" variant="outline" size="md" className="w-full">
            <Calendar className="w-4 h-4 mr-2" /> Ver Programação da Semana
          </Button>
        </div>

        <div className="pt-6 mt-6 border-t border-[#E2E9E4] text-xs text-[#53655B]">
          Precisa de ajuda?{' '}
          <Link href="/contato" className="text-[#0D5131] font-semibold underline">
            Entre em contato conosco
          </Link>
        </div>
      </div>
    </div>
  );
}
