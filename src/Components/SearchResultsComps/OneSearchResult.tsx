import React, { useEffect, useState } from "react";
import { Article } from "../../Views/MainHubView";
import imageUrlBuilder from "@sanity/image-url";
import sanity from "../../client";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { Link } from "react-router-dom";
import sanityClient from "../../client";

type Props = {
  article: Article;
  url: string;
};

const OneSearchResult: React.FC<Props> = ({ article, url }) => {
  const [error, setError] = useState<null | string>(null);
  const [categorySlug, setCategorySlug] = useState<null | string>(null);
  // sanity
  const builder = imageUrlBuilder(sanity);
  const urlFor = (source: SanityImageSource) => {
    return builder.image(source);
  };

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "category" && _id == "${article.categories[0]._ref}"]{slug}`
      )
      .then((data) => {
        setCategorySlug(data[0].slug.current);
      })
      .catch((err) => {
        console.log(err);
        setError("error loading data");
      });
  }, []);

  return (
    <Link
      className={"no-underline"}
      to={`${url}/${categorySlug}/${article.slug.current}`}
    >
      <div className={"grid grid-cols-2 gap-4 items-center text-black "}>
        <div>
          <img
            loading={"lazy"}
            className={"rounded"}
            src={urlFor(article.mainImage).height(300).width(400).url()}
            alt={article.title}
          />
          {error && <div>{error}</div>}
        </div>

        <div>
          <h2 className={"font-bold"}>{article.title}</h2>
          <p className={"font-normal"}>{article.teaser}</p>
        </div>
      </div>
    </Link>
  );
};

export default OneSearchResult;
