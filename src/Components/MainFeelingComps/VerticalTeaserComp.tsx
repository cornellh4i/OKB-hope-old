import React from 'react';
import {Article} from "../../hooks/useProvideData";
import {Link} from "react-router-dom";
import imageUrlBuilder from "@sanity/image-url";
import sanity from "../../client";
import {SanityImageSource} from "@sanity/image-url/lib/types/types";

type Props = {
  article: Article
}

const VerticalTeaserComp: React.FC<Props> = ({article}) => {

  // sanity
  const builder = imageUrlBuilder(sanity);
  const urlFor = (source: SanityImageSource) => {
    return builder.image(source)
  }

  return (
    <div className={'flex flex-col gap-0 w-full lg:w-1/4'}>
      <div>
        <img className={'rounded-t-xl'} src={urlFor(article.mainImage).url()} alt={article.title}/>

      </div>
      <div className={'bg-white p-3 min-h-[150px]'}>
        <Link to={`${article.slug.current}`} className={'text-blue font-bold no-underline'}>{article.title}</Link>
        <p className={'leading-5 text-sm lg:text-base'}>{article.teaser}</p>
      </div>
    </div>
  );
};

export default VerticalTeaserComp;
