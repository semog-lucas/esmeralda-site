import type { Metadata } from "next";
import { PortableText } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/lib/client";
import Link from "next/link";
import Image from "next/image";
import { BlogCard } from "@/components/BlogCard";
import { User, ArrowLeft, Clock } from "lucide-react";
import { Post } from "@/types/sanity";
import { constructMetadata } from "@/lib/metadata";
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL, SITE_NAME, SITE_LOGO } from "@/app/constants";
import { CustomPortableTextComponents } from "@/components/PortableTextComponents";

// Interfaces para resolver o erro de "Unexpected any"
interface PortableTextChild {
  text?: string;
}

interface PortableTextBlock {
  _type?: string;
  children?: PortableTextChild[];
}

// Query do post principal para metadata
const POST_METADATA_QUERY = `*[_type == "post" && slug.current == $slug][0]{
  title,
  excerpt,
  mainImage,
  publishedAt,
  "slug": slug.current,
  author->{name},
  categories[]->{
    title
  }
}`;

// Query do post principal completo
const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  publishedAt,
  mainImage,
  body,
  excerpt,
  author->{name},
  categories[]->{
    title,
    slug
  }
}`;

// Query para posts relacionados
const RELATED_POSTS_QUERY = `*[
  _type == "post" 
  && slug.current != $currentSlug
  && count(categories[@._ref in ^.^.categories[]._ref]) > 0
] | order(publishedAt desc)[0...3]{
  _id, 
  title, 
  slug, 
  categories[]->{
    title,
    slug
  },
  publishedAt,
  mainImage,
  excerpt,
  author->{
    name,
    image
  }
}`;

// Query de fallback para posts recentes
const RECENT_POSTS_QUERY = `*[
  _type == "post" 
  && slug.current != $currentSlug
] | order(publishedAt desc)[0...3]{
  _id, 
  title, 
  slug, 
  categories[]->{
    title,
    slug
  },
  publishedAt,
  mainImage,
  excerpt,
  author->{
    name,
    image
  }
}`;

// ==========================================
// FUNÇÃO AUXILIAR: Tempo de Leitura (Tipada)
// ==========================================
function estimateReadingTime(
  body: PortableTextBlock[] | null | undefined,
): number {
  if (!body || !Array.isArray(body)) return 1;

  let text = "";
  body.forEach((block) => {
    if (block.children) {
      block.children.forEach((child) => {
        if (child.text) {
          text += child.text + " ";
        }
      });
    }
  });

  const wordCount = text.trim().split(/\s+/).length;
  const wordsPerMinute = 200;
  const minutes = Math.ceil(wordCount / wordsPerMinute);

  return minutes || 1;
}

const { projectId, dataset } = client.config();

const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

// ==========================================
// 1. GERAÇÃO DE METADATA OTIMIZADA
// ==========================================
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await client.fetch<Post>(POST_METADATA_QUERY, { slug });

  if (!post) {
    return constructMetadata({
      title: "Post Não Encontrado",
      description: "O conteúdo que você procura não existe.",
      noIndex: true, // Evita indexar página de erro 404 de conteúdo
    });
  }

  const imageUrl = post.mainImage
    ? urlFor(post.mainImage)?.width(1200).height(630).url()
    : undefined;

  const description =
    post.excerpt || `Leia ${post.title} no blog da ${SITE_NAME}.`;

  return constructMetadata({
    title: post.title,
    description,
    image: imageUrl, // Passa a imagem do post para OG/Twitter
    type: "article", // Define como artigo para o Facebook/LinkedIn
    publishedTime: post.publishedAt,
    authors: post.author ? [{ name: post.author.name }] : undefined,
    keywords: post.categories?.map((c) => c.title),
  });
}

// Componente assíncrono para posts relacionados
async function RelatedPosts({ currentSlug }: { currentSlug: string }) {
  let relatedPosts = await client.fetch<Post[]>(RELATED_POSTS_QUERY, {
    currentSlug,
  });

  if (!relatedPosts || relatedPosts.length === 0) {
    relatedPosts = await client.fetch<Post[]>(RECENT_POSTS_QUERY, {
      currentSlug,
    });
  }

  if (!relatedPosts || relatedPosts.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">
          Nenhum post relacionado encontrado.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {relatedPosts.map((relatedPost) => (
        <BlogCard
          key={relatedPost._id}
          post={relatedPost}
          imageSize={{ width: 400, height: 225 }}
          showExcerpt={true}
        />
      ))}
    </div>
  );
}

// ==========================================
// COMPONENTE DA PÁGINA PRINCIPAL
// ==========================================
export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await client.fetch<Post>(POST_QUERY, { slug });

  if (!post) {
    return (
      <main className="container mx-auto min-h-screen max-w-3xl p-8">
        <Link
          href="/blog"
          className="hover:underline flex items-center gap-2 mb-4"
        >
          <ArrowLeft className="w-4 h-4" /> Voltar para posts
        </Link>
        <h1 className="text-2xl font-bold mt-8">Post não encontrado</h1>
      </main>
    );
  }

  const postImageUrl = post?.mainImage
    ? urlFor(post.mainImage)?.width(1200).height(600).url()
    : null;

  // Cast seguro para a função de tempo de leitura
  // (Assumindo que post.body vem do Sanity compativel com PortableTextBlock)
  const readTime = estimateReadingTime(
    post.body as unknown as PortableTextBlock[],
  );

  // 2. Criação do JSON-LD (Structured Data) para Artigo
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt || post.title,
    image: postImageUrl || `${SITE_URL}/og-blog.jpg`, // Fallback de imagem
    datePublished: post.publishedAt,
    dateModified: post.publishedAt, // Idealmente seria _updatedAt do Sanity se disponível
    author: {
      "@type": "Person",
      name: post.author?.name || SITE_NAME,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}${SITE_LOGO}`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${slug}`,
    },
  };

  return (
    <>
      {/* 3. Injeção do Schema no Cabeçalho */}
      <JsonLd data={jsonLd} />

      <main className="container mx-auto min-h-screen max-w-4xl p-8 flex flex-col gap-6 pt-24 lg:pt-32">
        <Link
          href="/blog"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-4 group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Voltar para o blog
        </Link>

        {/* Header do Artigo */}
        <header className="space-y-6 mb-8">
          <div className="flex flex-wrap gap-2">
            {post.categories?.map((category, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded-full bg-secondary/50 text-secondary-foreground text-xs font-medium"
              >
                {category.title}
              </span>
            ))}
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            {post.title}
          </h1>

          <div className="flex items-center gap-6 text-muted-foreground text-sm border-y border-border py-4">
            {/* 1. Minutos de Leitura */}
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{readTime} min de leitura</span>
            </div>

            {/* 2. Link do Autor */}
            {post.author && (
              <Link
                href="/perfil"
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <User className="w-4 h-4" />
                <span>{post.author.name}</span>
              </Link>
            )}
          </div>
        </header>

        {/* Imagem Principal */}
        {postImageUrl && (
          <div className="relative aspect-video w-full rounded-xl overflow-hidden shadow-lg mb-8">
            <Image
              src={postImageUrl}
              alt={post.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
          </div>
        )}

        {/* Conteúdo */}
        <article className="max-w-none">
          {Array.isArray(post.body) && (
            <PortableText
              value={post.body}
              components={CustomPortableTextComponents}
            />
          )}
        </article>

        <hr className="my-12 border-border" />

        {/* Posts Relacionados */}
        <section>
          <h2 className="text-2xl font-bold mb-8">Posts Recomendados</h2>
          <RelatedPosts currentSlug={slug} />
        </section>
      </main>
    </>
  );
}
