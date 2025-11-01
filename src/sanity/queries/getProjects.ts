export const projectsQuery = `
*[_type == "project"] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  "mainImage": mainImage.asset->url,
  "categories": categories[]->title,
  body,
  linkDemo,
  linkGithub,
  publishedAt
}
`;
