import React from 'react';
import {Article} from "../../hooks/useProvideData";
import imageUrlBuilder from "@sanity/image-url";
import sanity from "../../client";
import {SanityImageSource} from "@sanity/image-url/lib/types/types";
import {Link} from "react-router-dom";

type Props = {
  article: Article
}

const HorizontalTeaserComp: React.FC<Props> = ({article}) => {

  // sanity
  const builder = imageUrlBuilder(sanity);
  const urlFor = (source: SanityImageSource) => {
    return builder.image(source)
  }

  return (
    <div className={'my-6 grid gap-4 grid-cols-2 w-full lg:w-1/2 xl:w-full'}>

      <div>
        <img className={'rounded-xl'} src={urlFor(article.mainImage).url()} alt={article.title}/>
      </div>
      <div className={'leading-5'}>
        <Link to={`${article.slug.current}`} className={'text-blue font-bold no-underline'}>{article.title}</Link>
        <p>
          {article.teaser}
        </p>
      </div>

    </div>
  );
};

export default HorizontalTeaserComp;
