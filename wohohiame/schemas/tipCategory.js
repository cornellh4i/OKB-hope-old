export default {
  name: "tipCategory",
  title: "Tip Category",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      description: "Tip categories articles may belong to",
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
      name: "page",
      title: "Page",
      type: "string",
      initialValue: "tips",
    },
  ],
};
