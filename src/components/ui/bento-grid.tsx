import { cn } from "@/lib/utils";
import Link from "next/link"; // Importação necessária

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[18rem] md:grid-cols-3",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  href, // Nova prop
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  href?: string; // Definição do tipo
}) => {
  // Define se o container será um Link ou uma div normal
  const Component = href ? Link : "div";

  return (
    <Component
      href={href as string} // O "as string" satisfaz o TS quando é Link
      className={cn(
        "group/bento row-span-1 shadow-input flex flex-col justify-between space-y-4 rounded-xl border border-neutral-200 bg-white p-4 transition duration-200 hover:shadow-xl dark:border-white/[0.2] dark:bg-neutral-900 dark:hover:bg-[#0C523A] dark:shadow-none",
        className
      )}
    >
      {header}
      <div className="transition duration-200 group-hover/bento:translate-x-2">
        {/* Renderiza o ícone aqui APENAS se não estivermos usando o layout de overlay na imagem.
            Se você passar o ícone dentro do header (imagem), pode remover esta linha {icon} 
            ou mantê-la para ter dois ícones. */}
        {icon}

        <div className="mt-2 mb-2 font-sans font-bold text-neutral-600 dark:text-neutral-200">
          {title}
        </div>
        <div className="font-sans text-xs font-normal text-neutral-600 dark:text-neutral-300">
          {description}
        </div>
      </div>
    </Component>
  );
};
