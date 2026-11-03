import React from 'react';
import { Settings, Save, MapPin, Phone, MessageCircle, Globe, Shield } from 'lucide-react';
import { getSiteSettings } from '@/lib/data-service';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { Button } from '@/components/ui/Button';

export const revalidate = 0;

export default async function AdminConfiguracoesPage() {
  const settings = await getSiteSettings();

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      <main className="flex-1 p-6 sm:p-10 max-w-5xl overflow-y-auto space-y-8">
        <div className="pb-8 border-b border-[#E2E9E4]">
          <h1 className="font-heading font-bold text-2xl sm:text-3xl text-[#17231C]">
            Configurações Institucionais
          </h1>
          <p className="text-xs sm:text-sm text-[#53655B] mt-1">
            Personalize os dados de identificação, endereço, contatos e metadados globais da igreja.
          </p>
        </div>

        <form className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E2E9E4] shadow-sm space-y-6">
          <div className="space-y-4">
            <h2 className="font-heading font-bold text-lg text-[#17231C] flex items-center gap-2">
              <Globe className="w-5 h-5 text-[#0D5131]" /> Identidade Oficial
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#17231C] mb-1.5">
                  Nome Oficial da Igreja
                </label>
                <input
                  type="text"
                  defaultValue={settings.church_name}
                  className="w-full px-4 py-2.5 text-sm bg-[#F6F8F6] border border-[#E2E9E4] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0D5131]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#17231C] mb-1.5">
                  Nome Resumido (Menus / Rodapé)
                </label>
                <input
                  type="text"
                  defaultValue={settings.church_short_name}
                  className="w-full px-4 py-2.5 text-sm bg-[#F6F8F6] border border-[#E2E9E4] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0D5131]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#17231C] mb-1.5">
                Descrição Institucional (Lema e Apresentação)
              </label>
              <textarea
                rows={3}
                defaultValue={settings.description}
                className="w-full px-4 py-2.5 text-sm bg-[#F6F8F6] border border-[#E2E9E4] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0D5131]"
              />
            </div>
          </div>

          <div className="pt-6 border-t border-[#E2E9E4] space-y-4">
            <h2 className="font-heading font-bold text-lg text-[#17231C] flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#0D5131]" /> Endereço e Contatos
            </h2>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#17231C] mb-1.5">
                Endereço Confirmado
              </label>
              <input
                type="text"
                defaultValue={settings.address}
                className="w-full px-4 py-2.5 text-sm bg-[#F6F8F6] border border-[#E2E9E4] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0D5131]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#17231C] mb-1.5">
                  Telefone
                </label>
                <input
                  type="text"
                  defaultValue={settings.phone}
                  className="w-full px-4 py-2.5 text-sm bg-[#F6F8F6] border border-[#E2E9E4] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0D5131]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#17231C] mb-1.5">
                  Link de WhatsApp
                </label>
                <input
                  type="text"
                  defaultValue={settings.whatsapp}
                  className="w-full px-4 py-2.5 text-sm bg-[#F6F8F6] border border-[#E2E9E4] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0D5131]"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#E2E9E4] flex justify-end">
            <Button type="button" variant="primary">
              <Save className="w-4 h-4 mr-2" /> Salvar Configurações
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}
