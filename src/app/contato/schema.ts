import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, { message: "O nome deve ter pelo menos 2 caracteres." }),
  email: z.string().email({ message: "Por favor, insira um email válido." }),
  message: z.string().min(10, { message: "Sua mensagem deve ter pelo menos 10 caracteres." }),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "Você deve concordar com os termos.",
  }),
});

export type ContactFormData = z.infer<typeof contactSchema>;