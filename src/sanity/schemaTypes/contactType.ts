import { defineField, defineType } from "sanity";

export const contactType = defineType({
  name: 'contact',
  title: 'Contact',
  type: 'document',
  fields: [
    defineField({
      name: 'email',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'phone',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'locationSrc',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'locationDetails',
      type: 'array',
      of: [
        {
          type: 'block',
          marks: {
            annotations: [
              {
                name: 'internalLink',
                type: 'object',
                title: 'Internal link',
                fields: [
                  {
                    name: 'reference',
                    type: 'reference',
                    title: 'Reference (optional)',
                    to: [{ type: 'section' }],
                  },
                  {
                    name: 'anchor',
                    type: 'string',
                    title: 'Anchor (e.g. #contact)',
                    description: 'Use for links to anchors like #contact or #home',
                  }
                ]
              },
              {
                name: 'link',
                type: 'object',
                title: 'External link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                  },
                  {
                    name: 'blank',
                    type: 'boolean',
                    title: 'Open in new tab',
                    initialValue: true
                  }
                ]
              }
            ]
          }
        },
      ],
    }),
  ]
})
