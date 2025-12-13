import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import { apiVersion, dataset, projectId } from '@/sanity/env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  stega: {
    enabled: process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview', // Só habilita stega em preview
  }
})

const builder = imageUrlBuilder(client)

import { SanityImageSource } from '@sanity/image-url/lib/types/types'

export const urlFor = (source: SanityImageSource) => {
  if (!source) return null
  return builder.image(source).auto('format').fit('max')
}