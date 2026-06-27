import { defineField, defineType } from 'sanity';

export const aboutType = defineType({
  name: 'about',
  title: 'about',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      type: 'image',
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      title: 'Job titles',
      name: 'jobTitles',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      title: 'Social Links',
      name: 'socialLinks',
      type: 'array',
      of: [{ type: 'socialLink' }],
    }),
    defineField({
      title: 'About',
      name: 'about',
      type: 'array',
      of: [
        {
          title: 'Block',
          type: 'block',
          styles: [
            { title: 'H1', value: 'h1' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'H5', value: 'h5' },
            { title: 'P', value: 'p' },
          ],
        },
      ],
    }),
    defineField({
      title: 'How I work',
      name: 'how',
      type: 'array',
      of: [
        {
          title: 'Block',
          type: 'block',
          styles: [
            { title: 'H1', value: 'h1' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'H5', value: 'h5' },
            { title: 'P', value: 'p' },
          ],
        },
      ],
    }),
    defineField({
      title: 'Skills intro',
      name: 'techIntro',
      type: 'array',
      of: [
        {
          title: 'Block',
          type: 'block',
          styles: [
            { title: 'H1', value: 'h1' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'H5', value: 'h5' },
            { title: 'P', value: 'p' },
          ],
        },
      ],
    }),
  ],
});
