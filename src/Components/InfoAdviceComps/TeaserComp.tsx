import React from 'react';
import {Article} from "../../hooks/useProvideData";
import imageUrlBuilder from "@sanity/image-url";
import sanity from "../../client";
import {SanityImageSource} from "@sanity/image-url/lib/types/types";
type Props = {
  article:Article
}

const TeaserComp:React.FC<Props> = ({article}) => {
  // sanity
  const builder = imageUrlBuilder(sanity);
  const urlFor = (source: SanityImageSource) => {
    return builder.image(source)
  }
  return (
    <div className={'my-6 grid gap-4 grid-cols-2'}>

      <div>
        <img className={'rounded-xl'} src={urlFor(article.mainImage).url()} alt={article.title}/>
      </div>
      <div className={'leading-5'}>
        <h2 className={'text-blue font-bold'}>{article.title}</h2>
        <p>
          {article.teaser}
        </p>
      </div>

    </div>
  );
};

export default TeaserComp;
