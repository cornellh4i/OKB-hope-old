import {Article, Category} from "./useProvideData";

const categoryObjectFactory = (categories: Category[], articleTitles: Article[]) => {
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
    return []
  }
}

export default categoryObjectFactory;
