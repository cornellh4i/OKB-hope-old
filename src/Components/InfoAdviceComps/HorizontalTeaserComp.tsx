import React, { useEffect, useState } from "react";
import { Article } from "../../Views/MainHubView";
import imageUrlBuilder from "@sanity/image-url";
import sanity from "../../client";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { Link } from "react-router-dom";
import useWindowSize from "../../hooks/use.window.size"

type Props = {
  article: Article;
};

const HorizontalTeaserComp: React.FC<Props> = ({ article }) => {
  const [startComp, setStartComp] = useState(false);
  const { windowBig, windowWidth } = useWindowSize();
  // sanity
  const builder = imageUrlBuilder(sanity);
  const urlFor = (source: SanityImageSource) => {
    return builder.image(source);
  };
  useEffect(() => {
    if (windowWidth > 0) {
      setStartComp(true);
    }
  }, [windowWidth]);

  if (startComp) {
    return (
      <div
        className={`
      flex md:flex md:flex-col md:justify-center gap-4 my-6 w-full md:items-center h-fit
      `}
      >
        <div
          className={
            " md:w-[400px] h-fit self-center md:self-auto col-span-1 w-full"
          }
        >
          {windowBig ? (
            <img
              className={"rounded-t-xl object-cover"}
              loading="lazy"
              src={urlFor(article.mainImage).height(200).width(400).url()}
              alt=""
            />
          ) : (
            <img
              className={"rounded-xl h-fit object-fill"}
              loading="lazy"
              src={urlFor(article.mainImage)
                .height(Math.ceil(windowWidth / 2.9))
                .width(Math.ceil(windowWidth / 2))
                .url()}
              alt=""
            />
          )}
        </div>
        <div className={"md:w-[400px] col-span-1 w-full"}>
          <Link
            style={{ lineHeight: "23px" }}
            to={`${article.slug.current}`}
            className={"futura-extrabold text-blue text-[18px] font-black no-underline"}
          >
            {article.title}
          </Link>
          <p
            className={"text-[14px]"}
            style={{ padding: "0 0", margin: "0 0", lineHeight: "16px" }}
          >
            {article.teaser}
          </p>
        </div>
      </div>
    );
  } else {
    return <div>loading...</div>;
  }
};

export default HorizontalTeaserComp;
