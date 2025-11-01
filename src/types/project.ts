// src/types/project.ts

export interface Category {
  _id: string;
  title: string;
  slug?: string;
}

export interface Project {
  _id: string;
  title: string;
  slug: {
    current: string;
    _type?: string;
  };
  mainImage?: any;
  categories?: Array<{ title: string; slug: { current: string } }> | string[];
  body?: any;
  linkDemo?: string;
  linkGithub?: string;
  publishedAt?: string;
}

export interface ProjectCardProps {
  project: Project;
}