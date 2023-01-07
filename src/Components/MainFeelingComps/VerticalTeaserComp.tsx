import React, { useEffect, useRef, useState } from "react";
import { Article } from "../../Views/MainHubView";
import { Link, useLocation } from "react-router-dom";
import imageUrlBuilder from "@sanity/image-url";
import sanity from "../../client";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import sanityClient from "../../client";

type Props = {
  article: Article;
  heightState: null | number;
  setHeightState: (n: number) => void;
};

const VerticalTeaserComp: React.FC<Props> = ({
  article,
  heightState,
  setHeightState,
}) => {
  const [myPath, setMyPath] = useState<string | null>(null);
  const [myCategory, setMyCategory] = useState("");

  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname && article) {
      const pathArr = pathname.split("/");
      setMyPath(`${pathArr[1]}`);
    }
  }, [pathname, article]);

  // console.log(`/${myPath}/${myCategory}/${article.slug.current}`)

  const heightRef = useRef<null | HTMLDivElement>(null);
  // sanity
  const builder = imageUrlBuilder(sanity);
  const urlFor = (source: SanityImageSource) => {
    return builder.image(source);
  };

  useEffect(() => {
    if (heightRef && heightRef.current!.offsetHeight > heightState!) {
      setHeightState(heightRef.current!.offsetHeight);
    }
  }, [heightRef, heightState]);

  useEffect(() => {
    if (!myCategory && article) {
      const categoryRef = article.categories[0]._ref;
      const queryString =
        myPath === "tips"
          ? `*[_type == "tipCategory" && _id == "${categoryRef}" ] `
          : `*[_type == "category" && _id == "${categoryRef}"] `;
      sanityClient
        .fetch(queryString)
        .then((data) => {
          setMyCategory(data[0].slug.current);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [myPath, article]);

  const handleNavigation = (url: string) => {
    window.location.href = url;
    // navigate(url)
  };
  const scroller = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <>
      <div
        onClick={() =>
          handleNavigation(
            myPath ? `/${myPath}/${myCategory}/${article.slug.current}` : ""
          )
        }
        className={
          "flex flex-col gap-0 w-full lg:w-[400px] hover:underline cursor-pointer focus:border"
        }
      >
        {/*{error && <div>{error}</div>}*/}
        <div>
          <img
            className={"rounded-t-lg"}
            src={urlFor(article.mainImage).height(200).width(400).url()}
            loading="lazy"
            alt=""
          />
        </div>
        <div
          ref={heightRef}
          className={`bg-white p-3 rounded-b-lg`}
          style={{ minHeight: `${heightState}px` }}
        >
          <Link
            to={myPath ? myPath : ""}
            onClick={scroller}
            className={"text-blue font-bold no-underline"}
          >
            <h2>{article.title}</h2>
          </Link>
          <p className={"leading-5 text-sm lg:text-base"}>{article.teaser}</p>
        </div>
      </div>
    </>
  );
};

export default VerticalTeaserComp;
