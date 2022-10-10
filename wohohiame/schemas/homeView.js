// Create the Page document
// Location: /schemas/page.js


export default {
  name: 'homeView',
  title: 'Home View',
  type: 'document',
  __experimental_actions: [/*'create',*/ 'update', /*'delete',*/ 'publish'],
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
    },
    {
      name: 'heroContent',
      title: 'Hero content',
      type: 'heroContent',
    },
    {
      name: 'feelingsPreview',
      title: 'Feelings hints',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'feelingsPreview'}]
        }
      ]
    },
    {
      name: 'getInspired',
      title: 'Get Inspired',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'getInspired'}]
        }
      ]
    },

  ],
  
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
    },
  },
}
