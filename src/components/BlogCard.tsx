"use client";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { urlFor } from "@/lib/client";
import Image from "next/image";
import { Post, Category } from "@/types/sanity";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { Clock } from "lucide-react"; // Ícone opcional

interface BlogCardProps {
  post: Post;
  imageSize?: { width: number; height: number };
  showExcerpt?: boolean;
  showCategories?: boolean;
  showAuthor?: boolean;
  showReadTime?: boolean; // Novo nome para a prop
  className?: string;
}

// Função auxiliar para calcular tempo de leitura
function estimateReadingTime(body: any[]): number {
  if (!body || !Array.isArray(body)) return 1;

  let text = "";
  body.forEach((block) => {
    if (block.children) {
      block.children.forEach((child: any) => {
        if (child.text) {
          text += child.text + " ";
        }
      });
    }
  });

  const wordCount = text.trim().split(/\s+/).length;
  const wordsPerMinute = 200; // Velocidade média
  const minutes = Math.ceil(wordCount / wordsPerMinute);

  return minutes || 1; // Mínimo de 1 minuto
}

export function BlogCard({
  post,
  imageSize = { width: 400, height: 225 },
  showExcerpt = true,
  showCategories = true,
  showAuthor = true,
  showReadTime = true, // Padrão true
  className = "",
}: BlogCardProps) {
  const getImageUrl = (image: SanityImageSource | undefined) => {
    if (!image) return null;
    try {
      const urlBuilder = urlFor(image);
      return (
        urlBuilder?.width(imageSize.width).height(imageSize.height).url() ||
        null
      );
    } catch (error) {
      console.error("Erro ao gerar URL da imagem:", error);
      return null;
    }
  };

  const getAuthorImageUrl = (authorImage: SanityImageSource | undefined) => {
    if (!authorImage) return null;
    try {
      const urlBuilder = urlFor(authorImage);
      return urlBuilder?.width(32).height(32).url() || null;
    } catch (error) {
      console.error("Erro ao gerar URL do autor:", error);
      return null;
    }
  };

  const imageUrl = getImageUrl(post.mainImage);
  const authorImageUrl = getAuthorImageUrl(post.author?.image);
  const readTime = estimateReadingTime(post.body || []);

  return (
    <Card
      className={`shadow-none py-0 gap-3 hover:shadow-lg transition-all duration-300 group h-full flex flex-col ${className}`}
    >
      <CardHeader className="p-0">
        <Link href={`/blog/${post.slug.current}`} className="block">
          {imageUrl ? (
            <div className="aspect-video rounded-t-lg overflow-hidden">
              <Image
                src={imageUrl}
                alt={post.title}
                width={imageSize.width}
                height={imageSize.height}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          ) : (
            <div className="aspect-video bg-muted rounded-t-lg flex items-center justify-center">
              <span className="text-muted-foreground text-sm">Sem imagem</span>
            </div>
          )}
        </Link>
      </CardHeader>

      <CardContent className="p-5 flex-1 flex flex-col">
        {/* Categorias */}
        {showCategories && post.categories && post.categories.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {post.categories.slice(0, 2).map((category: Category, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {category.title}
              </Badge>
            ))}
            {post.categories.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{post.categories.length - 2}
              </Badge>
            )}
          </div>
        )}

        <Link href={`/blog/${post.slug.current}`} className="flex-1">
          <h3 className="text-lg font-semibold tracking-tight line-clamp-2 hover:text-primary transition-colors mb-3">
            {post.title}
          </h3>
        </Link>

        {showExcerpt && post.excerpt && (
          <p className="text-muted-foreground text-sm line-clamp-3 mb-4 flex-1">
            {post.excerpt}
          </p>
        )}

        {(showAuthor || showReadTime) && (
          <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
            {showAuthor && (
              // 1. Link para o perfil do autor
              <Link
                href="/perfil"
                className="flex items-center gap-2 group/author hover:opacity-80 transition-opacity"
              >
                {authorImageUrl ? (
                  <div className="size-8 rounded-full overflow-hidden border border-border">
                    <Image
                      src={authorImageUrl}
                      alt={post.author?.name || "Autor"}
                      width={32}
                      height={32}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="size-8 rounded-full bg-muted flex items-center justify-center">
                    <span className="text-xs font-medium">
                      {post.author?.name?.charAt(0) || "E"}
                    </span>
                  </div>
                )}
                <span className="text-muted-foreground text-sm font-medium group-hover/author:text-primary transition-colors">
                  {post.author?.name || "Time Esmeralda"}
                </span>
              </Link>
            )}

            {/* 2. Tempo de Leitura */}
            {showReadTime && (
              <div className="flex items-center gap-1 text-muted-foreground text-xs font-medium bg-secondary/50 px-2 py-1 rounded-full">
                <Clock className="w-3 h-3" />
                <span>{readTime} min de leitura</span>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
