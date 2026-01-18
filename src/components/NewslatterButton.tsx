"use client";
import React, { useState } from "react";
import { Portal } from "@/components/ui/Portal";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2 } from "lucide-react"; // Importando o ícone de loading

export function NewslatterButton() {
  const [open, setOpen] = useState(false);
  const [isIframeLoaded, setIsIframeLoaded] = useState(false); // Estado para controlar o carregamento

  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpen(true);
    // Reseta o estado de carregamento toda vez que abre
    setIsIframeLoaded(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <button
        onClick={handleButtonClick}
        className="relative z-50 pointer-events-auto cursor-pointer px-4 py-2 rounded-md bg-black text-white dark:bg-white dark:text-black hover:opacity-90 transition font-medium text-sm"
      >
        Newsletter
      </button>

      <Portal>
        <AnimatePresence>
          {open && (
            <motion.div
              className="fixed inset-0 z-[99999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl w-full max-w-[500px] overflow-hidden relative min-h-[320px]"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header com botão de fechar */}
                <div className="flex justify-end p-2 absolute right-0 top-0 z-10">
                  <button
                    onClick={handleClose}
                    className="p-2 rounded-full bg-white/10 hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                  >
                    <span className="text-xl font-bold leading-none text-gray-500">
                      ✕
                    </span>
                  </button>
                </div>

                {/* Conteúdo do Iframe */}
                <div className="w-full h-[320px] sm:h-[400px] bg-transparent relative">
                  {/* SPINNER DE LOADING: Aparece enquanto o iframe não carrega */}
                  {!isIframeLoaded && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 z-0">
                      <Loader2 className="w-10 h-10 text-green-500 animate-spin mb-2" />
                      <p className="text-sm text-gray-400 font-medium">
                        Carregando Newsletter...
                      </p>
                    </div>
                  )}

                  <iframe
                    src="https://esmeraldalucas.substack.com/embed"
                    width="100%"
                    height="100%"
                    style={{ border: "none", background: "transparent" }}
                    frameBorder="0"
                    scrolling="no"
                    // O segredo está aqui: onLoad avisa quando terminou
                    onLoad={() => setIsIframeLoaded(true)}
                    // Enquanto não carrega, opacidade 0 para não mostrar tela branca
                    className={`transition-opacity duration-500 ${
                      isIframeLoaded ? "opacity-100" : "opacity-0"
                    } relative z-1`}
                  ></iframe>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Portal>
    </>
  );
}
