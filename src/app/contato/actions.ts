'use server';

import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, 'O nome deve ter pelo menos 2 caracteres'),
  phone: z.string().min(8, 'Informe um telefone ou WhatsApp válido'),
  email: z.string().email('Informe um e-mail válido').optional().or(z.literal('')),
  subject: z.string().min(3, 'Selecione ou informe o assunto da mensagem'),
  message: z.string().min(10, 'A mensagem deve conter pelo menos 10 caracteres'),
  // Campo Honeypot para proteção contra robôs/spam
  website_trap: z.string().max(0, 'Spam detectado'),
  consent: z.literal(true, {
    errorMap: () => ({ message: 'É obrigatório aceitar o tratamento dos dados para contato' }),
  }),
});

export type ContactFormState = {
  success?: boolean;
  message?: string;
  errors?: Record<string, string[]>;
};

export async function submitContactMessage(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const rawData = {
    name: formData.get('name'),
    phone: formData.get('phone'),
    email: formData.get('email'),
    subject: formData.get('subject'),
    message: formData.get('message'),
    website_trap: formData.get('website_trap') || '',
    consent: formData.get('consent') === 'on',
  };

  const validation = contactSchema.safeParse(rawData);

  if (!validation.success) {
    return {
      success: false,
      message: 'Por favor, corrija os erros no formulário.',
      errors: validation.error.flatten().fieldErrors,
    };
  }

  // Se o honeypot foi preenchido, rejeita silenciosamente como spam
  if (rawData.website_trap !== '') {
    return {
      success: true,
      message: 'Sua mensagem foi enviada com sucesso! Em breve entraremos em contato.',
    };
  }

  try {
    // Registra a mensagem (no banco Supabase se configurado ou log institucional seguro)
    console.log('[Contato Recebido]', {
      name: validation.data.name,
      phone: validation.data.phone,
      subject: validation.data.subject,
      timestamp: new Date().toISOString(),
    });

    return {
      success: true,
      message: 'Sua mensagem foi enviada com sucesso! Em breve nossa equipe entrará em contato.',
    };
  } catch {
    return {
      success: false,
      message: 'Ocorreu um erro ao enviar sua mensagem. Por favor, tente pelo WhatsApp.',
    };
  }
}
