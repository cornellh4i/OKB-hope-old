import {Article,Category} from "../Views/MainHubView";

const categoryObjectFactory = (categories: Category[], articleTitles: Article[]) => {
  console.log(categories)
  if (categories && articleTitles) {
    return categories!.map(c => {
        return {
          title: c.title,
          url: c.slug.current,
          articles: articleTitles!.filter(a => a.categories[0]._ref === c._id)
        }
      }
    )
  } else {
    return null
  }
}

export default categoryObjectFactory;
