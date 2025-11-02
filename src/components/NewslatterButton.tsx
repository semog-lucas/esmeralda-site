"use client";
import React, { useState } from "react";
import { Portal } from "@/components/ui/Portal";
import { motion, AnimatePresence } from "motion/react";

export function NewslatterButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 rounded-md bg-black text-white dark:bg-white dark:text-black hover:opacity-90 transition"
      >
        Newsletter
      </button>

      <AnimatePresence>
        {open && (
          <Portal>
            <motion.div
              className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="bg-white dark:bg-neutral-900 rounded-xl p-8 shadow-xl max-w-md w-full mx-4 relative"
              >
                <button
                  onClick={() => setOpen(false)}
                  className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>

                <h2 className="text-xl font-bold text-center mb-4">
                  Inscreva-se na Newsletter ✨
                </h2>

                <p className="text-sm text-gray-600 dark:text-gray-300 text-center mb-6">
                  Receba novidades e atualizações exclusivas da Esmeralda Company.
                </p>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setOpen(false);
                    alert("Inscrição enviada com sucesso!");
                  }}
                  className="flex flex-col gap-3"
                >
                  <input
                    type="email"
                    placeholder="Seu e-mail"
                    required
                    className="border border-gray-300 dark:border-gray-700 rounded-md p-2 w-full bg-transparent focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                  />
                  <button
                    type="submit"
                    className="bg-black text-white dark:bg-white dark:text-black py-2 rounded-md font-medium hover:opacity-90"
                  >
                    Inscrever-se
                  </button>
                </form>
              </motion.div>
            </motion.div>
          </Portal>
        )}
      </AnimatePresence>
    </>
  );
}
