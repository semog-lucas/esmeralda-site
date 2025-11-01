import { defineField, defineType } from "sanity"

export const projectType = defineType({
  name: "project",
  title: "Projetos",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "mainImage",
      title: "Imagem Principal",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "categories",
      title: "Categorias",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
    }),
    defineField({
      name: "author",
      title: "Autor",
      type: "reference",
      to: { type: "author" },
    }),
    defineField({
      name: "body",
      title: "Descrição / Conteúdo",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "linkDemo",
      title: "Link de Demonstração",
      type: "url",
    }),
    defineField({
      name: "linkGithub",
      title: "Link do GitHub",
      type: "url",
    }),
    defineField({
      name: "publishedAt",
      title: "Data de Publicação",
      type: "datetime",
    }),
  ],
  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "mainImage",
    },
    prepare(selection) {
      const { author } = selection
      return {
        ...selection,
        subtitle: author ? `por ${author}` : "",
      }
    },
  },
})
