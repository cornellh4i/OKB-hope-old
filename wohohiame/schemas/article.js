export default {
  name: "article",
  title: "Article",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    },
    {
      name: "mainImage",
      title: "Main image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "categories",
      title: "Categories",
      type: "array",
      of: [
        {
          type: "reference",
          to: [
            {
              type: "category",
              id: "category",
            },
          ],
        },
      ],
    },
    {
      name: "blueContainerContent",
      title: "Blue Container Content",
      type: "array",
      of: [
        {
          type: "reference",
          to: [
            {
              type: "blueContainerContent",
              id: "blueContainerContent",
            },
          ],
        },
      ],
    },
    {
      name: "yellowContainerContent",
      title: "Bottom Container Content",
      type: "array",
      of: [
        {
          type: "paragraph",
        },
      ],
    },
    {
      name: "paragraph",
      title: "Paragraphs",
      type: "array",
      of: [
        {
          type: "reference",
          to: [
            {
              type: "paragraph",
              id: "paragraph",
            },
          ],
        },
      ],
    },
    {
      name: "summary",
      title: "Summary",
      type: "text",
    },
    // {
    //   title: 'Paragraph',
    //   type: 'array',
    //   name: 'paragraph',
    //   of: [
    //     {
    //       type: 'reference',
    //       to: [{
    //         type:'paragraph',
    //         id: 'paragraph'
    //       }]
    //     }
    //   ]
    // },
    {
      name: "teaser",
      title: "Teaser",
      type: "text",
    },
    {
      name: "page",
      title: "Page",
      type: "string",
      initialValue: "info-advice",
    },
  ],

  preview: {
    select: {
      title: "title",
      media: "mainImage",
    },
  },
};
