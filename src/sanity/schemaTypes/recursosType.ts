import { defineField, defineType } from "sanity"

export const recursosType = defineType({
  name: "recurso",
  title: "Recursos",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Descrição",
      type: "string",
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: "mainImage",
      title: "Imagem Principal",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "ctaText",
      title: "Texto do Botão",
      type: "string",
      initialValue: "Visitar",
    }),
    defineField({
      name: "ctaLink",
      title: "Link do Botão",
      type: "url",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "content",
      title: "Conteúdo Detalhado",
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "categories",
      title: "Categorias",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
    }),
    defineField({
      name: "order",
      title: "Ordem de Exibição",
      type: "number",
      description: "Número para ordenar os recursos (menor aparece primeiro)",
    }),
    defineField({
      name: "publishedAt",
      title: "Data de Publicação",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "featured",
      title: "Destaque",
      type: "boolean",
      initialValue: false,
      description: "Marcar como recurso em destaque",
    }),
  ],
  orderings: [
    {
      title: "Ordem de Exibição",
      name: "orderAsc",
      by: [
        {field: 'order', direction: 'asc'}
      ]
    },
    {
      title: "Data de Publicação, Nova",
      name: "publishedAtDesc",
      by: [
        {field: 'publishedAt', direction: 'desc'}
      ]
    },
    {
      title: "Destaque",
      name: "featuredDesc",
      by: [
        {field: 'featured', direction: 'desc'}
      ]
    }
  ],
  preview: {
    select: {
      title: "title",
      description: "description",
      media: "mainImage",
    },
    prepare(selection) {
      const { description } = selection
      return {
        ...selection,
        subtitle: description ? `${description}` : "",
      }
    },
  },
})