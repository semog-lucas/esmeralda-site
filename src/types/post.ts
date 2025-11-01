// src/types/post.ts
export interface Author {
  name: string;
  image?: {
    asset?: {
      _id?: string;
      url?: string;
    };
  };
}

export interface Category {
  _id?: string;
  title: string;
  slug?: string;
}

export interface Post {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  body?: any;
  mainImage?: {
    asset?: {
      _id?: string;
      url?: string;
    };
  };
  categories?: Category[];
  author?: Author;
  publishedAt?: string;
}
