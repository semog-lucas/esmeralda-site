// src/app/contato/actions.ts
"use server";

import { contactSchema, ContactFormData } from "./schema";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitContactForm(data: ContactFormData) {
  const result = contactSchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { name, email, message } = result.data;

  try {
    const data = await resend.emails.send({
      from: 'Esmeralda Contato <site@esmeraldacompany.com.br>',
      to: [process.env.MY_EMAIL_TO as string], 
      replyTo: email, 
      
      subject: `Novo Lead do Site: ${name}`,
      html: `
        <div style="font-family: sans-serif; font-size: 16px; color: #333;">
          <h1>Novo contato recebido! 📬</h1>
          <p><strong>Nome:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <hr />
          <p><strong>Mensagem:</strong></p>
          <blockquote style="background: #f9f9f9; padding: 15px; border-left: 4px solid #0C523A;">
            ${message}
          </blockquote>
        </div>
      `,
    });

    if (data.error) {
        console.error("Erro Resend:", data.error);
        return { success: false, message: "Erro ao enviar. Tente novamente." };
    }

    return { success: true, message: "Recebemos sua mensagem! Em breve entraremos em contato." };

  } catch (error) {
    console.error("Erro no servidor:", error);
    return { success: false, message: "Erro interno. Tente novamente mais tarde." };
  }
}