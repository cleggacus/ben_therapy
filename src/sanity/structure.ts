import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list';
import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title('Content')
    .items([
      orderableDocumentListDeskItem({
        title: "Sections",
        type: 'section',
        S,
        context
      }),
      S.listItem()
        .title('Cover')
        .child(
          S.editor()
            .id('cover')
            .schemaType('cover')
            .documentId('cover')
        ),
      S.listItem()
        .title('Contact')
        .child(
          S.editor()
            .id('contact')
            .schemaType('contact')
            .documentId('contact')
        ),
      S.listItem()
        .title('Metadata')
        .child(
          S.editor()
            .id('meta')
            .schemaType('meta')
            .documentId('metadata')
        ),
    ]);


// .items(S.documentTypeListItems())
