import {useEffect, useState} from 'react';
import categoryObjectFactory from "./categoryObjectFactory";
import sanityClient from "../client";



export type Category = {
  _id: string
  page: string,
  title: string
  slug: {
    current: string
  }
}
type Categories = {
  _ref: string
  _key: string
  _type: string
}
type BlueContentRef = {
  _key: string
  _ref: string
  _type: 'reference'
}
export type Article = {
  categories: Categories[]
  blueContainerContent: BlueContentRef[]
  slug: {
    _type: string
    current: string
  }
  title: string
  summary: string
  mainImage: any
  teaser: string
  _id: string
}
export type CategoryObject = {
  title: string
  articles: Article[]
  url: string
}

const useProvideData = () => {
  const [categories, setCategories] = useState<null | Category[]>(null);
  const [articleTitles, setArticleTitles] = useState<null | Article[]>(null);
  const [error, setError] = useState<null | string>(null);
  const [categoryObjects, setCategoryObjects] = useState<null | CategoryObject[]>(null);

  useEffect(() => {
    if (categories && articleTitles && categories.length !== 0 && articleTitles.length !== 0) {
      setCategoryObjects(categoryObjectFactory(categories, articleTitles))
    }
    if (!categories || categories.length === 0) {
      sanityClient
        .fetch(
          `*[_type == "category"]{_id,page,title,slug}`
        )
        .then((data) => setCategories(data))
        .catch((err) => {
          console.log(err);
          setError('error loading data')
        });
    }
    if (!articleTitles || articleTitles.length === 0) {
      sanityClient
        .fetch(
          `*[_type == 'article']`
        )
        .then((data) => setArticleTitles(data))
        .catch((err) => {
          console.log(err);
          setError('error loading data')
        });
    }

  }, [categories, articleTitles])

  return {
    categories, articleTitles, error, categoryObjects
  }
};

export default useProvideData;
