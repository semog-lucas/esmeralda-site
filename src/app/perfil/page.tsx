import { sanityFetch } from "@/sanity/lib/live";
import HeroPerfil from "@/components/HeroPerfil";
import { BlogCard } from "@/components/BlogCard";
import { ProjectCard } from "@/components/ProjectCard";
import { Metadata } from 'next';

// Query atualizada com socialLinks
const AUTHOR_WITH_CONTENT_QUERY = `*[_type == "author"][0]{
  _id,
  name,
  image,
  bio,
  socialLinks,
  "postsCount": count(*[_type == "post" && references(^._id)]),
  "projectsCount": count(*[_type == "project" && references(^._id)]),
  "newsletterCount": count(*[_type == "newsletter" && references(^._id)]),
  
  // Posts do autor
  "posts": *[_type == "post" && references(^._id)] | order(publishedAt desc)[0...6] {
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
  },
  
  // Projetos do autor
  "projects": *[_type == "project" && references(^._id)] | order(publishedAt desc)[0...6] {
    _id,
    title,
    slug,
    mainImage,
    categories[]->{
      title,
      slug
    },
    body,
    linkDemo,
    linkGithub,
    publishedAt
  }
}`;

// Generate metadata
export async function generateMetadata(): Promise<Metadata> {
  const result = await sanityFetch({
    query: `*[_type == "author"][0]{
      name,
      bio,
      image
    }`
  });

  const author = result.data;

  if (!author) {
    return {
      title: 'Perfil - Autor não encontrado',
      description: 'Página de perfil do autor'
    };
  }

  const bioText = author.bio?.[0]?.children?.[0]?.text || 'Descrição do autor';

  return {
    title: `${author.name} - Perfil`,
    description: bioText.substring(0, 160),
    openGraph: {
      title: `${author.name} - Perfil`,
      description: bioText.substring(0, 160),
      type: 'profile',
      images: author.image ? [
        {
          url: author.image.asset?.url,
          width: 800,
          height: 600,
          alt: author.name,
        }
      ] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${author.name} - Perfil`,
      description: bioText.substring(0, 160),
      images: author.image ? [author.image.asset?.url] : [],
    },
  };
}

export default async function PagePerfil() {
  const result = await sanityFetch({
    query: AUTHOR_WITH_CONTENT_QUERY,
  });

  const author = result.data;

  if (!author) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Autor não encontrado</p>
      </div>
    );
  }

  return (
    <>
      <HeroPerfil author={author} />
      
      {/* Seção de Posts do Autor */}
      {author.posts && author.posts.length > 0 && (
        <section className="container mx-auto px-8 lg:px-48 py-16 mt-25">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Artigos de {author.name}
            </h2>
            <p className="text-muted-foreground text-lg">
              Últimos artigos escritos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {author.posts.map((post: any) => (
              <BlogCard 
                key={post._id}
                post={post}
                imageSize={{ width: 400, height: 225 }}
                showExcerpt={true}
                showCategories={true}
                showAuthor={false}
                showDate={true}
                className="h-full"
              />
            ))}
          </div>
        </section>
      )}

      {/* Seção de Projetos do Autor */}
      {author.projects && author.projects.length > 0 && (
        <section className="container mx-auto px-8 lg:px-48 py-16">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Projetos de {author.name}
            </h2>
            <p className="text-muted-foreground text-lg">
              Projetos desenvolvidos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {author.projects.map((project: any, index: number) => {
              const mappedProject = {
                ...project,
                categories: project.categories?.map((cat: any) => ({
                  title: cat.title || cat,
                  slug: (cat.slug?.current as string) ||
                    (typeof cat === "string"
                      ? cat.toLowerCase().replace(/\s+/g, "-")
                      : cat.title.toLowerCase().replace(/\s+/g, "-")),
                })) || [],
              };

              return (
                <ProjectCard 
                  key={project._id} 
                  project={mappedProject}
                />
              );
            })}
          </div>
        </section>
      )}

      {/* Mensagem se não houver conteúdo */}
      {(!author.posts || author.posts.length === 0) && (!author.projects || author.projects.length === 0) && (
        <section className="container mx-auto px-8 lg:px-48 py-16 -mt-80">
          <div className="text-center py-16">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Nenhum conteúdo publicado ainda
            </h3>
            <p className="text-muted-foreground">
              {author.name} ainda não publicou nenhum artigo ou projeto.
            </p>
          </div>
        </section>
      )}
    </>
  );
}