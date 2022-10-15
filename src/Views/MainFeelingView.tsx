import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import  {Article, Category,} from "../hooks/useProvideData";
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
          `*[_type == "article" && "${category._id}" != categories[]._ref][0...2]`
        )
        .then((data) => {
          setMightInterestYou(data);
        })
        .catch((err) => {
          console.log(err);
          setError('error loading data')
        });
    }
  }, [feeling, category, articles])

  return (
    <div className={'md:w-10/12 mx-auto '}>
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
        {mightInterestYou && mightInterestYou.length>0 && <MightInterestYouComp articles={mightInterestYou} />
        }
      </section>
    </div>
  );
};

export default MainFeelingView;
