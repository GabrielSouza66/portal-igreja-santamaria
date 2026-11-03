import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { siteConfig } from '@/lib/config';
import { BreadcrumbsJsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Política de Privacidade e Proteção de Dados (LGPD)',
  description:
    'Conheça nossa política de privacidade e como tratamos os dados pessoais de membros e visitantes em conformidade com a LGPD.',
  alternates: {
    canonical: `${siteConfig.url}/politica-de-privacidade`,
  },
};

export default function PoliticaPrivacidadePage() {
  return (
    <div className="py-12 sm:py-16 bg-[#F6F8F6]">
      <BreadcrumbsJsonLd
        items={[
          { name: 'Início', url: siteConfig.url },
          { name: 'Política de Privacidade', url: `${siteConfig.url}/politica-de-privacidade` },
        ]}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0D5131] hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Voltar para a página inicial
          </Link>
        </div>

        <article className="bg-white p-8 sm:p-12 rounded-3xl border border-[#E2E9E4] shadow-sm">
          <header className="border-b border-[#E2E9E4] pb-6 mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E7F1EC] text-[#0D5131] text-xs font-semibold uppercase tracking-wider mb-3">
              <ShieldCheck className="w-4 h-4" /> Conformidade com a LGPD (Lei nº 13.709/2018)
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-[#17231C]">
              Política de Privacidade
            </h1>
            <p className="text-xs text-[#53655B] mt-2">
              Última atualização: Novembro de 2026 • {siteConfig.name}
            </p>
          </header>

          <div className="prose prose-sm sm:prose-base max-w-none text-[#17231C] space-y-6">
            <section>
              <h2 className="text-xl font-bold text-[#17231C]">1. Compromisso Institucional</h2>
              <p className="text-[#53655B] leading-relaxed">
                A <strong>{siteConfig.name}</strong>, sediada em {siteConfig.contact.address}, tem o compromisso de proteger a privacidade e os dados pessoais de todos os membros, visitantes, voluntários e usuários do nosso portal institucional, em estrita observância à Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018 – LGPD).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#17231C]">2. Dados Coletados e Finalidade</h2>
              <p className="text-[#53655B] leading-relaxed">
                Coletamos apenas as informações estritamente necessárias para o bom atendimento institucional e pastoral:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-[#53655B]">
                <li>
                  <strong>Formulário de Contato:</strong> Nome, número de telefone/WhatsApp, e-mail (opcional) e mensagem, unicamente com a finalidade de responder a dúvidas, pedidos de oração ou orientações pastorais.
                </li>
                <li>
                  <strong>Downloads de Documentos:</strong> Não exigimos cadastro obrigatório para consulta a arquivos públicos oficiais.
                </li>
                <li>
                  <strong>Registros de Acesso e Segurança:</strong> Podem ser coletados dados técnicos (como endereço IP e registro de data/hora) para cumprimento de dever legal do Marco Civil da Internet (Lei 12.965/2014) e salvaguarda do portal contra fraudes e ataques maliciosos.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#17231C]">3. Compartilhamento de Dados</h2>
              <p className="text-[#53655B] leading-relaxed">
                A igreja <strong>não comercializa, não aluga e não compartilha</strong> dados pessoais de seus membros ou visitantes com terceiros para fins de marketing ou publicidade. Os dados poderão ser acessados apenas pela liderança pastoral e administrativa autorizada para cumprimento exclusivo de suas atribuições.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#17231C]">4. Armazenamento e Segurança da Informação</h2>
              <p className="text-[#53655B] leading-relaxed">
                Adotamos medidas técnicas e administrativas aptas a proteger os dados pessoais de acessos não autorizados e de situações acidentais ou ilícitas de destruição, perda ou alteração. Toda a comunicação neste website é realizada por meio de criptografia HTTPS/TLS.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#17231C]">5. Direitos do Titular dos Dados</h2>
              <p className="text-[#53655B] leading-relaxed">
                Nos termos do Art. 18 da LGPD, o titular possui o direito de confirmar a existência de tratamento, acessar seus dados, solicitar correção de dados incompletos ou requerer a eliminação de dados tratados com seu consentimento.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#17231C]">6. Canal de Atendimento para Dúvidas de Privacidade</h2>
              <p className="text-[#53655B] leading-relaxed">
                Para exercer seus direitos ou esclarecer qualquer dúvida sobre o tratamento de seus dados pessoais, você pode entrar em contato diretamente com nossa administração:
              </p>
              <div className="p-4 rounded-xl bg-[#F6F8F6] border border-[#E2E9E4] text-xs text-[#17231C] space-y-1">
                <p><strong>{siteConfig.name}</strong></p>
                <p>Endereço: {siteConfig.contact.address}</p>
                <p>Telefone: {siteConfig.contact.phone}</p>
                <p>WhatsApp: <a href={siteConfig.contact.whatsappUrl} className="text-[#0D5131] underline">Iniciar conversa</a></p>
              </div>
            </section>
          </div>
        </article>
      </div>
    </div>
  );
}
