'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Shield, Lock, Mail, AlertCircle, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { siteConfig } from '@/lib/config';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErrorMsg('E-mail ou senha incorretos. Verifique os dados digitados.');
        setLoading(false);
        return;
      }

      if (data?.session) {
        document.cookie = 'admin_session=active; path=/; max-age=86400; SameSite=Lax';
        router.push('/admin');
        router.refresh();
      } else {
        setErrorMsg('Sessão não iniciada. Verifique suas credenciais.');
      }
    } catch {
      setErrorMsg('Erro ao tentar conectar ao serviço de autenticação.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#F6F8F6]">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-[#E2E9E4] shadow-md space-y-6">
        <div className="text-center space-y-3">
          <div className="relative w-16 h-16 bg-[#E7F1EC] rounded-2xl mx-auto p-2 flex items-center justify-center shadow-sm">
            <Image
              src={siteConfig.logo}
              alt="Logo da Igreja"
              fill
              className="object-contain p-2"
            />
          </div>

          <div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#E7F1EC] text-[#0D5131]">
              <Shield className="w-3.5 h-3.5" /> Acesso Restrito
            </span>
            <h1 className="font-heading font-bold text-2xl text-[#17231C] mt-2">
              Painel Administrativo
            </h1>
            <p className="text-xs text-[#53655B] mt-1">
              {siteConfig.name}
            </p>
          </div>
        </div>

        {errorMsg && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-900 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-semibold uppercase tracking-wider text-[#17231C] mb-1"
            >
              E-mail do Administrador
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@igreja.org.br"
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#F6F8F6] border border-[#E2E9E4] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0D5131]"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-xs font-semibold uppercase tracking-wider text-[#17231C] mb-1"
            >
              Senha
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#F6F8F6] border border-[#E2E9E4] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0D5131]"
              />
            </div>
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={loading}
              className="w-full"
            >
              {loading ? 'Validando...' : 'Entrar no Sistema'}
            </Button>
          </div>
        </form>

        <div className="p-4 rounded-xl bg-[#F6F8F6] border border-[#E2E9E4] text-[11px] text-[#53655B] space-y-1">
          <p className="font-semibold text-[#17231C]">Atenção e Segurança:</p>
          <p>
            O cadastro de contas é restrito à liderança e administradores provisionados no Supabase. Criações públicas de conta estão desabilitadas por diretriz de segurança.
          </p>
        </div>

        <div className="text-center pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-[#0D5131] font-semibold hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Voltar ao site público
          </Link>
        </div>
      </div>
    </div>
  );
}

