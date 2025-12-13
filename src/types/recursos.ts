export const recursosQuery = `
  *[_type == "recurso"] | order(order asc) {
    _id,
    title,
    description,
    mainImage{
      asset->{
        _id,
        url
      }
    },
    ctaText,
    ctaLink,
    content,
    categories[]->{
      _id,
      title
    },
    order,
    featured,
    publishedAt
  }
`


export interface Recurso {
  _id: string
  title: string
  description: string
  mainImage: {
    asset: {
      _id: string
      url: string
    }
  }
  ctaText: string
  ctaLink: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: any[]
  categories?: Array<{
    _id: string
    title: string
  }>
  order?: number
  featured?: boolean
  publishedAt: string
}