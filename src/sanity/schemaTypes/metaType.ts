import { defineField, defineType } from "sanity";

export const metaType = defineType({
  name: 'meta',
  title: 'Meta',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'icon',
      type: 'image',
      validation: (rule) => rule.required(),
    }),
  ]
})
