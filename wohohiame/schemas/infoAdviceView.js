

export default {
  name: 'infoAdviceView',
  title: 'Info & Advice',
  type: 'document',
  // __experimental_actions: [/*'create',*/ 'update', /*'delete',*/ 'publish'],
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      value:'Info & Advice',
      hidden:true,
    },
    // {
    //   name:'article',
    //   title: 'Articles',
    //   type: 'array',
    //   of:[{type: 'article'}]
    // },
    // {
    //   name: 'categories',
    //   title: 'Categories',
    //   type: 'array',
    //   of:[{type: 'category'}]
    // },
  ]
}
