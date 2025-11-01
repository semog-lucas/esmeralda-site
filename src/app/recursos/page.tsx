// app/recursos/page.tsx
"use client";
import { useRef } from "react";
import { getRecursos } from "@/sanity/queries/getRecursos";
import HeroPage from "@/components/HeroPage";
import { FolderCode } from "lucide-react";
import { motion as m } from "framer-motion";
import { RecursosCards } from "@/components/RecursosCards";
import { Recurso } from "@/sanity/types/recursos";
import { useEffect, useState } from "react";

export default function RecursosPage() {
    const ref = useRef(null);
    const [recursos, setRecursos] = useState<Recurso[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchRecursos() {
            try {
                const data = await getRecursos();
                setRecursos(data);
            } catch (error) {
                console.error('Erro ao buscar recursos:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchRecursos();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Carregando recursos...</p>
            </div>
        );
    }

    return (
        <>
            <m.header
                ref={ref}
                className="w-full px-9 py-8 sm:py-12 md:py-16 relative overflow-hidden"
                role="banner"
                aria-label="Cabeçalho principal da página de Recursos"
            >
                {/* 🔥 Imagem com filtro */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: "url('/hero-recursos.jpg')",
                    }}
                />

                {/* 🔥 Overlay extra para dar contraste */}
                <div className="absolute inset-0 bg-black/40" />

                {/* Conteúdo */}
                <div className="relative mx-auto max-w-7xl">
                    <HeroPage
                        title="Recursos"
                        description="Explore uma coleção de recursos cuidadosamente selecionados para aprimorar suas habilidades e conhecimentos."
                        Icon={FolderCode}
                    />
                </div>
            </m.header>
            <div className="bg-cover bg-center mt-10 mb-10">
                <RecursosCards recursos={recursos} />
            </div>
        </>
    );
}