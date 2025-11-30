// src/sanity/queries/postQueries.ts
export const POST_METADATA_QUERY = `*[_type == "post" && slug.current == $slug][0]{
  title,
  excerpt,
  mainImage,
  publishedAt,
  "slug": slug.current,
  author->{name, image},
  categories[]->{title, slug}
}`;

export const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  mainImage,
  body,
  excerpt,
  author->{name, image},
  categories[]->{_id, title, slug}
}`;

export const RELATED_POSTS_QUERY = `*[
  _type == "post" 
  && slug.current != $currentSlug
  && count((categories[]->._id)[@ in $categoryIds]) > 0
] | order(publishedAt desc)[0...3]{
  _id, 
  title, 
  "slug": slug.current, 
  categories[]->{title, slug},
  publishedAt,
  mainImage,
  excerpt,
  author->{name, image}
}`;

export const RECENT_POSTS_QUERY = `*[
  _type == "post" 
  && slug.current != $currentSlug
] | order(publishedAt desc)[0...3]{
  _id, 
  title, 
  "slug": slug.current, 
  categories[]->{title, slug},
  publishedAt,
  mainImage,
  excerpt,
  author->{name, image}
}`;


export const CATEGORIES_QUERY = `*[_type == "category"]{
  _id,
  title,
  "slug": slug.current
}`;

// uma query mais específica para posts:
export const POSTS_QUERY = `*[_type == "post"] | order(publishedAt desc){
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  mainImage,
  excerpt,
  author->{name, image},
  categories[]->{title, "slug": slug.current}
}`;