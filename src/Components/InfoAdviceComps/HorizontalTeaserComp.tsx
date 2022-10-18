import React from 'react';
import {Article} from "../../Views/MainHubView";
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
    <div className={'grid grid-cols-2 lg:grid-cols-none lg:flex lg:flex-col gap-4 my-6'}>

      <div className={'shrink self-center lg:self-auto'}>
        <img className={'rounded-xl '} loading="lazy" src={urlFor(article.mainImage).url()} alt={article.title}/>
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
