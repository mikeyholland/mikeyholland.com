import { defineField, defineType } from 'sanity';
import {
  orderRankField,
  orderRankOrdering,
} from '@sanity/orderable-document-list';

export const projectType = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: 'project' }),
    defineField({
      title: 'Name',
      name: 'name',
      type: 'string',
    }),
    defineField({
      title: 'Brand Color',
      name: 'brand',
      type: 'string',
    }),
    defineField({
      title: 'Text Color',
      name: 'textColor',
      type: 'string',
      options: {
        list: ['Black', 'White'],
        layout: 'radio',
      },
    }),
    defineField({
      title: 'URL',
      name: 'url',
      type: 'string',
    }),
    defineField({
      title: 'Info',
      name: 'info',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      title: 'Key Tech',
      name: 'keyTech',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      title: 'Videos with labels',
      name: 'videosWithLabels',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'video' }],
        },
      ],
    }),
  ],
  initialValue: {
    textColor: 'Black',
  },
});
