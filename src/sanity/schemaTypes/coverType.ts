import { defineField, defineType } from "sanity";

export const coverType = defineType({
  name: 'cover',
  title: 'Cover',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      type: 'image',
      validation: (rule) => rule.required(),
    }),
  ]
})
