'use client';

import React from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { submitContactMessage, type ContactFormState } from '@/app/contato/actions';
import { Button } from '@/components/ui/Button';

const initialState: ContactFormState = {};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant="primary"
      size="lg"
      disabled={pending}
      className="w-full sm:w-auto"
    >
      {pending ? (
        'Enviando mensagem...'
      ) : (
        <>
          <Send className="w-4 h-4 mr-2" /> Enviar Mensagem
        </>
      )}
    </Button>
  );
}

export function ContactForm() {
  const [state, formAction] = useFormState(submitContactMessage, initialState);

  return (
    <form action={formAction} className="space-y-5" noValidate>
      {state.success ? (
        <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-2">
          <div className="flex items-center gap-2 font-bold text-base">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            Mensagem Enviada!
          </div>
          <p className="text-sm">{state.message}</p>
        </div>
      ) : (
        <>
          {state.message && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-900 text-sm flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              {state.message}
            </div>
          )}

          {/* Campo Honeypot invisível para humanos */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="website_trap">Não preencha este campo:</label>
            <input
              type="text"
              id="website_trap"
              name="website_trap"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="name"
                className="block text-xs font-semibold text-[#17231C] uppercase tracking-wider mb-1.5"
              >
                Seu Nome Completo *
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Ex: João da Silva"
                className="w-full px-4 py-2.5 text-sm bg-[#F6F8F6] border border-[#E2E9E4] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0D5131]"
              />
              {state.errors?.name && (
                <p className="text-xs text-red-600 mt-1">{state.errors.name[0]}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-xs font-semibold text-[#17231C] uppercase tracking-wider mb-1.5"
              >
                Telefone ou WhatsApp *
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                placeholder="(61) 90000-0000"
                className="w-full px-4 py-2.5 text-sm bg-[#F6F8F6] border border-[#E2E9E4] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0D5131]"
              />
              {state.errors?.phone && (
                <p className="text-xs text-red-600 mt-1">{state.errors.phone[0]}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold text-[#17231C] uppercase tracking-wider mb-1.5"
              >
                E-mail (opcional)
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="seuemail@exemplo.com"
                className="w-full px-4 py-2.5 text-sm bg-[#F6F8F6] border border-[#E2E9E4] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0D5131]"
              />
              {state.errors?.email && (
                <p className="text-xs text-red-600 mt-1">{state.errors.email[0]}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block text-xs font-semibold text-[#17231C] uppercase tracking-wider mb-1.5"
              >
                Assunto *
              </label>
              <select
                id="subject"
                name="subject"
                required
                defaultValue="Informações e Visitas"
                className="w-full px-4 py-2.5 text-sm bg-[#F6F8F6] border border-[#E2E9E4] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0D5131]"
              >
                <option value="Informações e Visitas">Informações e Visitas</option>
                <option value="Pedido de Oração">Pedido de Oração</option>
                <option value="Pequenos Grupos">Pequenos Grupos nos Lares</option>
                <option value="Escola Dominical">Escola Dominical e Classes</option>
                <option value="Outros Assuntos">Outros Assuntos</option>
              </select>
              {state.errors?.subject && (
                <p className="text-xs text-red-600 mt-1">{state.errors.subject[0]}</p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-xs font-semibold text-[#17231C] uppercase tracking-wider mb-1.5"
            >
              Sua Mensagem *
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              placeholder="Como podemos ajudar você ou sua família?"
              className="w-full px-4 py-2.5 text-sm bg-[#F6F8F6] border border-[#E2E9E4] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0D5131]"
            />
            {state.errors?.message && (
              <p className="text-xs text-red-600 mt-1">{state.errors.message[0]}</p>
            )}
          </div>

          <div className="flex items-start gap-2 pt-1">
            <input
              id="consent"
              name="consent"
              type="checkbox"
              required
              className="mt-1 w-4 h-4 text-[#0D5131] rounded border-[#CAD6CF] focus:ring-[#0D5131]"
            />
            <label htmlFor="consent" className="text-xs text-[#53655B] leading-tight">
              Concordo com o tratamento dos meus dados de contato exclusivamente para retorno desta mensagem pela igreja, em conformidade com a nossa{' '}
              <a href="/politica-de-privacidade" className="text-[#0D5131] underline">
                Política de Privacidade (LGPD)
              </a>
              . *
            </label>
          </div>
          {state.errors?.consent && (
            <p className="text-xs text-red-600">{state.errors.consent[0]}</p>
          )}

          <div className="pt-2">
            <SubmitButton />
          </div>
        </>
      )}
    </form>
  );
}

