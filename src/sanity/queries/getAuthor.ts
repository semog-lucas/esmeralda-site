export const AUTHOR_WITH_CONTENT_QUERY = `*[_type == "author"][0]{
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
    "slug": slug.current,
    categories[]->{
      title,
      "slug": slug.current
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
  }
}`;