"use plain";
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, ContactFormData } from "@/app/contato/schema";
import { submitContactForm } from "@/app/contato/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  MailIcon,
  MessageCircle,
  PhoneIcon,
  Check,
  Copy,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Configurações dos Links
const WHATSAPP_NUMBER = "5544984313307";
const WHATSAPP_MESSAGE = encodeURIComponent("Olá, Vim pelo Site da Esmeralda");
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;
const EMAIL_ADDRESS = "contato@esmeraldacompany.com.br";
const CALENDAR_LINK =
  "https://calendly.com/esmeraldacompany/agendamento-esmeralda";

const SectionContact = () => {
  const [isCopied, setIsCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverMessage, setServerMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Hook Form com Zod
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      acceptTerms: false,
    },
  });

  // Função para copiar email
  const handleCopyEmail = () => {
    navigator.clipboard.writeText(EMAIL_ADDRESS);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Função de Envio
  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setServerMessage(null);

    const response = await submitContactForm(data);

    if (response.success) {
      setServerMessage({
        type: "success",
        text: response.message || "Sucesso!",
      });
      reset();
    } else {
      setServerMessage({
        type: "error",
        text: response.message || "Erro ao enviar.",
      });
    }
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-16 bg-background">
      <div className="w-full max-w-(--breakpoint-xl) mx-auto px-6 xl:px-0">
        <b className="text-muted-foreground uppercase font-semibold text-sm">
          Entre Em Contato
        </b>
        <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">
          Vamos Construir um Brilho, Uma Ideia
        </h2>
        <p className="mt-3 text-base sm:text-lg text-muted-foreground">
          Seja para uma conversa, um projeto ou apenas para conversar.
        </p>

        <div className="mt-24 grid lg:grid-cols-2 gap-16 md:gap-10">
          {/* --- Lado Esquerdo: Links de Contato --- */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12">
            {/* 1. Email (Copiar) */}
            <div>
              <div className="h-12 w-12 flex items-center justify-center bg-primary/5 dark:bg-primary/10 text-primary rounded-full">
                <MailIcon />
              </div>
              <h3 className="mt-6 font-semibold text-xl">Email</h3>
              <p className="my-2.5 text-muted-foreground">
                Clique para copiar o endereço.
              </p>
              <button
                onClick={handleCopyEmail}
                className="flex items-center gap-2 font-medium text-primary hover:underline group transition-all"
              >
                {EMAIL_ADDRESS}
                {isCopied ? (
                  <Check className="w-4 h-4 text-emerald-500" />
                ) : (
                  <Copy className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                )}
              </button>
            </div>

            {/* 2. Agendamento (Calendar) */}
            <div>
              <div className="h-12 w-12 flex items-center justify-center bg-primary/5 dark:bg-primary/10 text-primary rounded-full">
                <MessageCircle />
              </div>
              <h3 className="mt-6 font-semibold text-xl">Agendamento</h3>
              <p className="my-2.5 text-muted-foreground">
                Escolha o melhor horário.
              </p>
              <Link
                className="font-medium text-primary hover:underline flex items-center gap-2"
                href={CALENDAR_LINK}
                target="_blank"
                rel="noopener noreferrer"
              >
                Agendar uma Conversa
              </Link>
            </div>

            {/* 3. WhatsApp (Mensagem Pronta) */}
            <div>
              <div className="h-12 w-12 flex items-center justify-center bg-primary/5 dark:bg-primary/10 text-primary rounded-full">
                <PhoneIcon />
              </div>
              <h3 className="mt-6 font-semibold text-xl">WhatsApp</h3>
              <p className="my-2.5 text-muted-foreground">
                Fale diretamente conosco.
              </p>
              <Link
                className="font-medium text-primary hover:underline"
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
              >
                +55 44 98431-3307
              </Link>
            </div>
          </div>

          {/* --- Lado Direito: Formulário Validado --- */}
          <Card className="bg-accent shadow-none py-0 h-fit">
            <CardContent className="p-6 md:p-8">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
                  {/* Nome */}
                  <div className="col-span-2 sm:col-span-1">
                    <Label htmlFor="name">Nome</Label>
                    <Input
                      {...register("name")}
                      id="name"
                      placeholder="Seu nome"
                      className={cn(
                        "mt-2 bg-white h-10 shadow-none",
                        errors.name &&
                          "border-red-500 focus-visible:ring-red-500"
                      )}
                    />
                    {errors.name && (
                      <span className="text-xs text-red-500 mt-1">
                        {errors.name.message}
                      </span>
                    )}
                  </div>

                  {/* Email */}
                  <div className="col-span-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      {...register("email")}
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      className={cn(
                        "mt-2 bg-white h-10 shadow-none",
                        errors.email &&
                          "border-red-500 focus-visible:ring-red-500"
                      )}
                    />
                    {errors.email && (
                      <span className="text-xs text-red-500 mt-1">
                        {errors.email.message}
                      </span>
                    )}
                  </div>

                  {/* Mensagem */}
                  <div className="col-span-2">
                    <Label htmlFor="message">Mensagem</Label>
                    <Textarea
                      {...register("message")}
                      id="message"
                      placeholder="Como podemos ajudar?"
                      className={cn(
                        "mt-2 bg-white shadow-none resize-none",
                        errors.message &&
                          "border-red-500 focus-visible:ring-red-500"
                      )}
                      rows={6}
                    />
                    {errors.message && (
                      <span className="text-xs text-red-500 mt-1">
                        {errors.message.message}
                      </span>
                    )}
                  </div>

                  {/* Termos */}
                  <div className="col-span-2">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="acceptTerms"
                        className="bg-background"
                        checked={watch("acceptTerms")}
                        onCheckedChange={(checked) =>
                          setValue("acceptTerms", checked === true, {
                            shouldValidate: true,
                          })
                        }
                      />
                      <Label
                        htmlFor="acceptTerms"
                        className="gap-0 font-normal cursor-pointer"
                      >
                        Concordo com os
                        <Link
                          href="/termos"
                          className="underline hover:text-primary"
                        >
                          termos e condições
                        </Link>
                        .
                      </Label>
                    </div>
                    {errors.acceptTerms && (
                      <span className="text-xs text-red-500 mt-1 block">
                        {errors.acceptTerms.message}
                      </span>
                    )}
                  </div>
                </div>

                {/* Feedback do Servidor */}
                {serverMessage && (
                  <div
                    className={cn(
                      "mt-4 p-3 rounded-md text-sm font-medium",
                      serverMessage.type === "success"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-red-100 text-red-800"
                    )}
                  >
                    {serverMessage.text}
                  </div>
                )}

                <Button
                  className="mt-6 w-full"
                  size="lg"
                  disabled={isSubmitting}
                  type="submit"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    "Enviar Mensagem"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SectionContact;
