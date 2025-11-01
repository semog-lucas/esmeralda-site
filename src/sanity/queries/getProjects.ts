// Listagem geral de projetos
export const PROJECTS_QUERY = `*[_type == "project"] | order(publishedAt desc){
  _id,
  title,
  "slug": slug.current,
  mainImage,
  categories[]->{
    title,
    "slug": slug.current
  },
  body,
  linkDemo,
  linkGithub,
  publishedAt
}`;

// Categorias de projeto
export const CATEGORIES_QUERY = `*[_type == "category"]{
  _id,
  title,
  "slug": slug.current
} | order(title asc)`;

// Projeto principal (completo)
export const PROJECT_QUERY = `*[_type == "project" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  mainImage,
  body,
  linkDemo,
  linkGithub,
  categories[]->{
    title,
    "slug": slug.current
  }
}`;

// Metadata do projeto (para SEO)
export const PROJECT_METADATA_QUERY = `*[_type == "project" && slug.current == $slug][0]{
  title,
  "slug": slug.current,
  mainImage,
  publishedAt,
  linkDemo,
  linkGithub,
  categories[]->{
    title
  }
}`;

// Projetos relacionados
export const RELATED_PROJECTS_QUERY = `*[
  _type == "project"
  && slug.current != $currentSlug
  && count(categories[@._ref in ^.^.categories[]._ref]) > 0
] | order(publishedAt desc)[0...3]{
  _id,
  title,
  "slug": slug.current,
  mainImage,
  categories[]->{
    title,
    "slug": slug.current
  },
  linkDemo,
  linkGithub,
  publishedAt
}`;

// Projetos recentes (fallback)
export const RECENT_PROJECTS_QUERY = `*[
  _type == "project"
  && slug.current != $currentSlug
] | order(publishedAt desc)[0...3]{
  _id,
  title,
  "slug": slug.current,
  mainImage,
  categories[]->{
    title,
    "slug": slug.current
  },
  linkDemo,
  linkGithub,
  publishedAt
}`;
