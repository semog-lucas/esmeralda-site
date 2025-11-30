
export interface Category {
  _id: string;
  title: string;
  slug: string;
}

export interface Project {
  _id: string;
  title: string;
  slug: string;
  mainImage?: any;
  categories?: Category[];
  body?: any;
  linkDemo?: string;
  linkGithub?: string;
  publishedAt?: string;
}

export interface ProjectCardProps {
  project: Project;
}