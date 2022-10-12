export default {
  name: 'paragraph',
  title: 'Paragraph',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Categories articles may belong to'
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
      name: 'page',
      title: 'Page',
      type: 'string',
    },
    {
      name: 'serial_num',
      title: 'Serial Number',
      type: 'number'
    },
    {
      name: 'paragraph',
      title: 'paragraph',
      type: 'array',
      of: [
        type
      ]
    },
    { name: 'text', title: 'Paragraph', type: "string" }
  ],
}
