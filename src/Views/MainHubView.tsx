import React, { useEffect, useState } from "react";
import GradientCommunicationSection from "../Components/HomeViewComps/GradientCommunicationSection";
import GrayLinkContainer from "../Components/InfoAdviceComps/GrayLinkContainer";
import { useLocation } from "react-router-dom";
import categoryObjectFactory from "../hooks/categoryObjectFactory";
import sanityClient from "../client";
import { Paragraph } from "./SpecificIssueView";

export type Category = {
  _id: string;
  page: string;
  title: string;
  slug: {
    current: string;
  };
};
type Categories = {
  _ref: string;
  _key: string;
  _type: string;
};
export type SanityRef = {
  _key: string;
  _ref: string;
  _type: "reference";
};
export type Article = {
  categories: Categories[];
  blueContainerContent: SanityRef[];
  yellowContainerContent: Paragraph[];
  slug: {
    _type: string;
    current: string;
  };
  title: string;
  summary: string;
  mainImage: any;
  teaser: string;
  _id: string;
  paragraph: SanityRef[];
  page: string;
};
export type CategoryObject = {
  title: string;
  articles: Article[];
  url: string;
};

const MainHubView = () => {
  const [page, setPage] = useState<null | string>(null);
  const [categories, setCategories] = useState<null | Category[]>(null);
  const [articleTitles, setArticleTitles] = useState<null | Article[]>(null);
  const [error, setError] = useState<null | string>(null);
  const [categoryObjects, setCategoryObjects] = useState<
    null | CategoryObject[]
  >(null);

  let { pathname } = useLocation();
  const firstElementInPath = pathname.split("/")[1];

  const equality = page === firstElementInPath;

  // if (articleTitles) {
  //   console.log(articleTitles[0])
  //
  // }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [firstElementInPath]);

  useEffect(() => {
    if (!equality && articleTitles) {
      setPage(articleTitles[0].page);
    }

    if (firstElementInPath === "info-advice") {
      if (
        categories &&
        articleTitles &&
        categories.length !== 0 &&
        articleTitles.length !== 0
      ) {
        setCategoryObjects(categoryObjectFactory(categories, articleTitles));
      }
      if (!equality) {
        sanityClient
          .fetch(`*[_type == "category"]{_id,page,title,slug}`)
          .then((data) => setCategories(data))
          .catch((err) => {
            console.log(err);
            setError("error loading data");
          });
      }
      if (!equality) {
        sanityClient
          .fetch(`*[_type == 'article']`)
          .then((data) => {
            setArticleTitles(data);
          })
          .catch((err) => {
            console.log(err);
            setError("error loading data");
          });
      }
    }
    if (firstElementInPath === "tips") {
      if (
        categories &&
        articleTitles &&
        categories.length !== 0 &&
        articleTitles.length !== 0
      ) {
        setCategoryObjects(categoryObjectFactory(categories, articleTitles));
      }
      if (!equality) {
        sanityClient
          .fetch(`*[_type == "tipCategory"]{_id,page,title,slug}`)
          .then((data) => setCategories(data))
          .catch((err) => {
            console.log(err);
            setError("error loading data");
          });
      }
      if (!equality) {
        sanityClient
          .fetch(`*[_type == 'tipArticle']`)
          .then((data) => {
            setArticleTitles(data);
          })
          .catch((err) => {
            console.log(err);
            setError("error loading data");
          });
      }
    }
  }, [categories, articleTitles, firstElementInPath, page]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={"px-4 md:px-0 pt-[15px] mx-auto"}>
      <section className={" md:w-10/12 mx-auto"}>
        <h1 className={`text-left mx-auto mb-[5px] `}>
          {firstElementInPath === "info-advice" && "Info & Advice"}
          {firstElementInPath === "tips" && "Tips"}
        </h1>
        <p>All the information and support you need in one place.</p>
      </section>
      <section className={"mt-2 md:flex gap-4 md:w-10/12 mx-auto"}>
        {error ? <div>{error}</div> : null}
        {categoryObjects &&
          categoryObjects.map((c, idx) => {
            return (
              <GrayLinkContainer
                key={idx + c.title}
                categoryObject={c}
              ></GrayLinkContainer>
            );
          })}
      </section>
      <section id={"topics"} className={"mt-[25px]"}>
        <GradientCommunicationSection
          url={undefined}
          title={"Do you want to know about other topics?"}
          buttonText={"Send us suggestions!"}
        />
      </section>
    </div>
  );
};

export default MainHubView;
