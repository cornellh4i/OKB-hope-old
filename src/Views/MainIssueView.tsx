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
  console.log(tipCategory)


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
    <div className={'lg:max-w-screen-xl mx-auto '}>
      <section className={'px-3'}>
        {error && <div>{error}</div>}
        <BreadCrumbs/>
      </section>
      <div className={'px-3'}>
        <h2 className={`text-left text-2xl md:text-5xl font-bold text-blue mx-auto`}>
          {category?.title}
        </h2>
      </div>
      <div className={'lg:grid w-full px-3 gap-6 grid-cols-3 justify-start my-2 lg:my-8'} style={{minHeight:'150px'}}>
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
