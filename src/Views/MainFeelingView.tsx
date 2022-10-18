import React, {useEffect, useState} from 'react';
import {useLocation, useParams} from "react-router-dom";
import {Article,Category} from "./MainHubView";
import HorizontalTeaserComp from "../Components/InfoAdviceComps/HorizontalTeaserComp";
import BreadCrumbs from "../Components/LayoutComps/BreadCrumbs";
import MightInterestYouComp from "../Components/MainFeelingComps/MightInterestYouComp";
import sanityClient from "../client";

const MainFeelingView = () => {
  const [category, setCategory] = useState<null | Category>(null);
  const [mightInterestYou, setMightInterestYou] = useState<null | Article[]>(null);
  const [error, setError] = useState<null | string>(null);
  const [articles, setArticles] = useState<null | Article[]>(null);
  // data

  let {feeling} = useParams()
  let {pathname} = useLocation()
  const firstElementInPath = pathname.split('/')[1]
  console.log(firstElementInPath)



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
    if (feeling && category && !mightInterestYou) {
      sanityClient
        .fetch(
          `*[_type == "article" && "${category._id}" != categories[]._ref]`
        )
        .then((data) => {
          const d:Article[] = data.filter((da: { categories: { _ref: string; }[]; })=>da.categories[0]._ref !== category._id).slice(0,2)
          setMightInterestYou(d);
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
      <div className={'lg:flex w-full px-3 gap-6 justify-start my-2 lg:my-8'}>
        {
          articles && articles.map(
            a => <div key={a.slug.current}>
              <HorizontalTeaserComp article={a}/>
            </div>
          )
        }
      </div>
      <section>
        {mightInterestYou && mightInterestYou.length>0 && category && <MightInterestYouComp category={category} />
        }
      </section>
    </div>
  );
};

export default MainFeelingView;
