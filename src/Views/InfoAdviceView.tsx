import React, {useEffect, useState} from 'react';
import RadiantCommunicationSection from "../Components/HomeViewComps/RadiantCommunicationSection";
import GrayLinkContainer from "../Components/InfoAdviceComps/GrayLinkContainer";
import sanityClient from "../client.js";

type Category = {
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
type ArticleTitle = {
  categories: Categories[]
  slug: {
    _type: string
    current: string
  }
  title: string
}
export type CategoryObject = {
  title: string
  articles: ArticleTitle[]
  url: string
}
const InfoAdviceView = () => {
  const [categories, setCategories] = useState<null | Category[]>(null);
  const [articleTitles, setArticleTitles] = useState<null | ArticleTitle[]>(null);
  const [error, setError] = useState<null | string>(null);
  const [categoryObjects, setCategoryObjects] = useState<null | CategoryObject[]>(null);


  useEffect(() => {
    if (categories && articleTitles) {
      setCategoryObjects(
        categories!.map(c => {
          return {
            title: c.title,
            url: c.slug.current,
            articles: articleTitles!.filter(a => a.categories[0]._ref === c._id)
          }
        })
      )
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
          `*[_type == "article"] {title, categories, slug}`
        )
        .then((data) => setArticleTitles(data))
        .catch((err) => {
          console.log(err);
          setError('error loading data')
        });
    }

  }, [categories, articleTitles])

  console.log(categoryObjects)
  return (
    <div className={'max-w-screen-xl mx-auto'}>
      <section className={'px-3'}>
        <h2 className={`text-left text-3xl md:text-6xl font-bold text-blue mx-auto`}>
          Info & Advice
        </h2>
        <p>
          All the information and support you need in one place.
        </p>
      </section>
      <section className={'p-3 md:flex gap-4'}>

        {error ? <div>{error}</div> : null}
        {categoryObjects && categoryObjects.map((c,idx) => {
          return <GrayLinkContainer key={idx+c.title} categoryObject={c}></GrayLinkContainer>

        })}
      </section>
      <section id={'topics'} className={'mt-16'}>
        <RadiantCommunicationSection url={'/contact-us'} title={'Do you want to know about other topics?'}
                                     buttonText={'Send us suggestions!'}/>
      </section>
    </div>
  );
}

export default InfoAdviceView;
