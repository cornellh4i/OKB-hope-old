import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {Article, Category} from "./MainHubView";
import HorizontalTeaserComp from "../Components/InfoAdviceComps/HorizontalTeaserComp";
import BreadCrumbs from "../Components/LayoutComps/BreadCrumbs";
import MightInterestYouComp from "../Components/MainFeelingComps/MightInterestYouComp";
import sanityClient from "../client";

const MainIssueView = () => {
  const [category, setCategory] = useState<null | Category>(null);

  const [error, setError] = useState<null | string>(null);
  const [articles, setArticles] = useState<null | Article[]>(null);
  // data

  let {feeling, tipCategory} = useParams()



  useEffect(() => {
    if (feeling && !category) {
      sanityClient
        .fetch(
          `*[_type == "category" && slug.current == "${feeling}"]{_id,page,title,slug,articles}`
        )
        .then((data) => {
          setCategory(data[0]);
        })
        .catch((err) => {
          console.log(err);
          setError('error loading data')
        });
    }
    if (tipCategory && !category) {
      sanityClient
        .fetch(
          `*[_type == "tipCategory" && slug.current == "${tipCategory}"]{_id,page,title,slug,articles}`
        )
        .then((data) => {
          setCategory(data[0]);
        })
        .catch((err) => {
          console.log(err);
          setError('error loading data')
        });
    }
    if (feeling && category && !articles) {
      sanityClient
        .fetch(
          `*[_type == "article" && "${category._id}" in categories[]._ref]`
        )
        .then((data) => {
          setArticles(data);
        })
        .catch((err) => {
          console.log(err);
          setError('error loading data')
        });
    }
    if (tipCategory && category && !articles) {
      sanityClient
        .fetch(
          `*[_type == "tipArticle" && "${category._id}" in categories[]._ref]`
        )
        .then((data) => {
          setArticles(data);
        })
        .catch((err) => {
          console.log(err);
          setError('error loading data')
        });
    }
  }, [feeling, category, articles])

  return (
    <div className={' mx-auto '}>
      <section className={'px-4 md:mx-auto w-11/12'}>
        {error && <div>{error}</div>}
        <BreadCrumbs/>
      </section>
      <div className={'px-4  md:mx-auto w-11/12'}>
        <h1 className={`text-left mx-auto`}>
          {category?.title}
        </h1>
      </div>
      <div className={'lg:grid w-full px-3 gap-6 grid-cols-3 justify-start my-2 lg:my-8  md:mx-auto w-11/12'} style={{minHeight:'200px'}}>
        {
          articles && articles.map(
            a => <div key={a.slug.current}>
              <HorizontalTeaserComp article={a}/>
            </div>
          )
        }
      </div>
      <section>
        {category && <MightInterestYouComp category={category}/>
        }
      </section>
    </div>
  );
};

export default MainIssueView;
