import React, {useEffect, useRef, useState} from 'react';
import {Article} from "../../hooks/useProvideData";
import {Link} from "react-router-dom";
import imageUrlBuilder from "@sanity/image-url";
import sanity from "../../client";
import {SanityImageSource} from "@sanity/image-url/lib/types/types";
import sanityClient from "../../client";

type Props = {
  article: Article
  heightState: null | number
  setHeightState: (n: number) => void
}

const VerticalTeaserComp: React.FC<Props> = ({article, heightState, setHeightState}) => {
  const [categoryPath, setCategoryPath] = useState<{ slug: { current: string, _type: 'slug' } } | null>(null);
  const [error, setError] = useState<null | string>(null);

  const heightRef = useRef<null | HTMLDivElement>(null)
  // sanity
  const builder = imageUrlBuilder(sanity);
  const urlFor = (source: SanityImageSource) => {
    return builder.image(source)
  }
  useEffect(() => {
    if (heightRef && heightRef.current!.offsetHeight > heightState!) {
      setHeightState(heightRef.current!.offsetHeight)
    }
  }, [heightRef, heightState])


  useEffect(() => {
    if (!categoryPath) {
      const categoryRef = article.categories[0]._ref
      sanityClient
        .fetch(
          `*[_type == "category" && _id == "${categoryRef}"]{slug}`
        )
        .then((data) => {
          setCategoryPath(data[0]);
        })
        .catch((err) => {
          console.log(err);
          setError('error loading data')
        });
    }
  }, [categoryPath, article])

  const scroller = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  return (
    <div className={'flex flex-col gap-0 w-full lg:w-1/4'}>
      {error && <div>{error}</div>}
      <div>
        <img className={'rounded-t-lg'} src={urlFor(article.mainImage).url()} loading="lazy" alt={article.title}/>
      </div>
      <div ref={heightRef} className={`bg-white p-3 rounded-b-lg`} style={{minHeight: `${heightState}px`}}>
        <Link
          to={`/info-advice/${categoryPath?.slug.current}/${article.slug.current}`}
          onClick={scroller}
          className={'text-blue font-bold no-underline'}>{article.title}</Link>
        <p className={'leading-5 text-sm lg:text-base'}>{article.teaser}</p>
      </div>
    </div>
  );
};

export default VerticalTeaserComp;
