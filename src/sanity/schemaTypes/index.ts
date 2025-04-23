import { type SchemaTypeDefinition } from 'sanity'
import { sectionType } from './sectionType'
import { coverType } from './coverType'
import { contactType } from './contactType'
import { metaType } from './metaType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [sectionType, coverType, contactType, metaType],
}
