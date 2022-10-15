export default {
  name: 'blueContainerContent',
  title: 'Blue Container Content',
  type: 'document',
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
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    },
    // {
    //   name: 'article', title: 'article', type: "array",
    //   of: [
    //     {
    //       type: 'reference',
    //       to: [
    //         {
    //           type: 'article',
    //           id: 'article'
    //         }
    //       ]
    //     }
    //   ]
    // }
  ],
}
