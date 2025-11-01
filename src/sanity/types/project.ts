// types/project.ts
const PROJECTS_QUERY = `*[_type == "project"] | order(publishedAt desc){
  _id,
  title,
  "slug": slug.current, 
  mainImage,
  categories[]->{
    title,
    slug
  },
  body,
  linkDemo,
  linkGithub,
  publishedAt
}`;

export interface Category {
  _id: string;
  title: string;
}

export interface ProjectCardProps {
  project: {
    _id: string;
    title: string;
    slug: string;
    mainImage?: string;
    categories?: Array<{ title: string; slug: string }>;
    body?: any;
    linkDemo?: string;
    linkGithub?: string;
    publishedAt?: string;
  };
}