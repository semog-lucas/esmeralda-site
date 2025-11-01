import {UserIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const authorType = defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'name',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'bio',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [{title: 'Normal', value: 'normal'}],
          lists: [],
        }),
      ],
    }),
    // Campos para redes sociais
    defineField({
      name: 'socialLinks',
      title: 'Redes Sociais',
      type: 'object',
      fields: [
        defineField({
          name: 'github',
          title: 'GitHub',
          type: 'url',
          description: 'URL do perfil do GitHub',
        }),
        defineField({
          name: 'linkedin',
          title: 'LinkedIn',
          type: 'url',
          description: 'URL do perfil do LinkedIn',
        }),
        defineField({
          name: 'instagram',
          title: 'Instagram',
          type: 'url',
          description: 'URL do perfil do Instagram',
        }),
        defineField({
          name: 'substack',
          title: 'Substack',
          type: 'url',
          description: 'URL da newsletter no Substack',
        }),
        defineField({
          name: 'website',
          title: 'Website Pessoal',
          type: 'url',
          description: 'URL do website pessoal (opcional)',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
})