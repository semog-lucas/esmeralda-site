import type { StructureResolver } from "sanity/structure"

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Conteúdo")
    .items([
      // 📰 Seção do Blog
      S.listItem()
        .title("Blog")
        .child(
          S.list()
            .title("Blog")
            .items([
              S.documentTypeListItem("post").title("Posts"),
              S.documentTypeListItem("category").title("Categorias"),
              S.documentTypeListItem("author").title("Autores"),
            ])
        ),

      S.divider(),

      // 💎 Seção de Projetos
      S.listItem()
        .title("Projetos")
        .child(
          S.list()
            .title("Projetos")
            .items([
              S.documentTypeListItem("project").title("Projetos"),
            ])
        ),

      S.divider(),

      // ⚙️ Outros documentos (caso tenha mais tipos no futuro)
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() &&
          !["post", "category", "author", "project"].includes(item.getId()!)
      ),
    ])
