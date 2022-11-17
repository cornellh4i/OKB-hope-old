export default {
  name: "paragraph",
  title: "Paragraph",
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
      },
    },

    {
      name: "body",
      title: "Body",
      type: "blockContent",
    },
    {
      name: "serial_num",
      title: "Serial Number",
      type: "number",
    },
    {
      name: "colorKey",
      title: "Background color",
      type: "string",
    },
    {
      name: "article",
      title: "article",
      type: "array",
      of: [
        {
          type: "reference",
          to: [
            {
              type: "article",
              id: "article",
            },
          ],
        },
      ],
    },
    {
      name: "tipArticle",
      title: "Tip article",
      type: "array",
      of: [
        {
          type: "reference",
          to: [
            {
              type: "tipArticle",
              id: "tipArticle",
            },
          ],
        },
      ],
    },
    {
      name: "aboutUs",
      title: "About Us",
      type: "array",
      of: [
        {
          type: "reference",
          to: [
            {
              type: "aboutUs",
              id: "aboutUs",
            },
          ],
        },
      ],
    },
  ],
};
