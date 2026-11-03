import React from 'react';
import { Calendar, Plus, Clock, MapPin, CheckCircle } from 'lucide-react';
import { getWeeklySchedule, getUpcomingEvents } from '@/lib/data-service';
import { getWeekdayName, formatDate } from '@/lib/utils';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export const revalidate = 0;

export default async function AdminProgramacaoPage() {
  const [schedule, events] = await Promise.all([
    getWeeklySchedule(),
    getUpcomingEvents(),
  ]);

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      <main className="flex-1 p-6 sm:p-10 max-w-7xl overflow-y-auto space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 border-b border-[#E2E9E4] gap-4">
          <div>
            <h1 className="font-heading font-bold text-2xl sm:text-3xl text-[#17231C]">
              Gestão da Programação e Agenda
            </h1>
            <p className="text-xs sm:text-sm text-[#53655B] mt-1">
              Configure as reuniões regulares semanais e cadastre eventos especiais com data e hora.
            </p>
          </div>
        </div>

        {/* Reuniões Semanais Fixas */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E9E4] shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#E2E9E4]">
            <h2 className="font-heading font-bold text-lg text-[#17231C] flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#0D5131]" /> Programação Semanal Oficial
            </h2>
            <span className="text-xs text-[#53655B]">
              Fuso Horário: America/Sao_Paulo (Brasília)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {schedule.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-2xl bg-[#F6F8F6] border border-[#E2E9E4] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#0D5131]">
                      {getWeekdayName(item.weekday)}
                    </span>
                    <Badge variant="primary" className="text-[10px]">
                      {item.starts_at}
                    </Badge>
                  </div>
                  <h3 className="font-heading font-bold text-base text-[#17231C]">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-xs text-[#53655B] mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>
                <div className="pt-3 mt-3 border-t border-[#E2E9E4] flex items-center justify-between text-xs text-[#53655B]">
                  <span className="flex items-center gap-1 text-emerald-700 font-medium">
                    <CheckCircle className="w-3.5 h-3.5" /> Ativo no Portal
                  </span>
                  <span>Ordem: #{item.display_order}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Eventos Especiais / Extraordinários */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E9E4] shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#E2E9E4]">
            <h2 className="font-heading font-bold text-lg text-[#17231C] flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#0D5131]" /> Eventos e Conferências Especiais
            </h2>
            <span className="text-xs text-[#53655B]">
              {events.length} evento(s) agendado(s)
            </span>
          </div>

          <div className="space-y-4">
            {events.map((evt) => (
              <div
                key={evt.id}
                className="p-5 rounded-2xl bg-[#F6F8F6] border border-[#E2E9E4] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-[#0D5131] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {formatDate(evt.starts_at)}
                  </span>
                  <h3 className="font-heading font-bold text-base text-[#17231C]">
                    {evt.title}
                  </h3>
                  <p className="text-xs text-[#53655B]">{evt.description}</p>
                  <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-[#0D5131]" /> {evt.location}
                  </p>
                </div>

                <Badge variant="primary" className="text-xs self-start sm:self-auto">
                  Publicado
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
