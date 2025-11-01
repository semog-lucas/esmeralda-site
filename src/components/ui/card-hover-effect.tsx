import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

// Interface simplificada - removido link
interface HoverItem {
  title: string;
  description: string;
}

export const HoverEffect = ({
  items,
  className,
}: {
  items: HoverItem[];
  className?: string;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10",
        className
      )}
    >
      {items.map((item, index) => (
        <div
          key={`hover-item-${index}`}
          className="relative group block p-2 h-full w-full cursor-default" // cursor-default pois não é mais clicável
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === index && (
              <motion.span
                key={`hover-bg-${index}`}
                className="absolute inset-0 h-full w-full bg-[#0C523A] block rounded-3xl"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </Card>
        </div>
      ))}
    </div>
  );
};

// Card simplificado - removido hasLink
export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <div
    className={cn(
      "rounded-2xl h-full w-full p-4 overflow-hidden",
      "bg-white/10 backdrop-blur-md",
      "border border-white/20 shadow-[0_0_24px_rgba(0,0,0,0.2)]",
      "group-hover:border-white/30 relative z-20 transition-all duration-300",
      "group-hover:scale-105", // Agora sempre tem scale no hover
      className
    )}
  >
    <div className="relative z-50">
      <div className="p-4">{children}</div>
    </div>
  </div>
);

export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <h4
    className={cn(
      "text-white font-bold tracking-wide mt-4 drop-shadow-md",
      className
    )}
  >
    {children}
  </h4>
);

export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <p
    className={cn(
      "mt-8 text-neutral-200 tracking-wide leading-relaxed text-sm drop-shadow-sm",
      className
    )}
  >
    {children}
  </p>
);