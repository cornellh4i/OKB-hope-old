import React, {useEffect, useState} from 'react';
import {Article, Category} from "../../Views/MainHubView";
import VerticalTeaserComp from "./VerticalTeaserComp";
import sanityClient from "../../client";
import {useLocation, useParams} from "react-router-dom";

type Props = {
  category: Category
}


const MightInterestYouComp: React.FC<Props> = ({category}) => {
  const [heightState, setHeightState] = useState(100);
  const [error, setError] = useState<null | string>(null);
  const [problemArticle, setProblemArticle] = useState< Article[] | undefined>(undefined);
  let {problem: paramProblem} = useParams();
  let {pathname} = useLocation()

  const firstElementInPath = pathname.split('/')[1]


  const pathIncludesProblem = (param: string | undefined, problem: Article[]|undefined) => {
    return problem?.find(a => a.slug.current === param)
  }
  const sameProblem = pathIncludesProblem(paramProblem,problemArticle)
  useEffect(() => {

    if (!problemArticle && firstElementInPath === 'info-advice') {
      sanityClient
        .fetch(
          `*[_type == 'article' && !("${category._id}" in categories[]._ref)][0..1]`
        )
        .then((data) => {
          // console.log(data)
          setProblemArticle(data)
        })
        .catch((err) => {
          console.log(err);
          setError('error loading data')
        });
    }
    if (!problemArticle && firstElementInPath === 'tips') {
      console.log('runs')
      sanityClient
        .fetch(
          `*[_type == 'tipArticle' && !("${category._id}" in categories[]._ref)][0..1]`
        )
        .then((data) => {
          console.log(data)
          setProblemArticle(data)
        })
        .catch((err) => {
          console.log(err);
          setError('error loading data')
        });
    }
  }, [problemArticle, category, firstElementInPath])

  useEffect(() => {
    if (sameProblem && problemArticle) {
      const articleIds = problemArticle.map(a=> a._id)
      sanityClient
        .fetch(
          `*[_type == 'article' && !(_id in ["${articleIds[0]}", "${articleIds[1]}"])][0..1]`
        )
        .then((data) => {
          // console.log(data)
          setProblemArticle(data)
        })
        .catch((err) => {
          console.log(err);
          setError('error loading data')
        });
    }
  }, [sameProblem, problemArticle])


  const heightStateHandler = (n: number) => {
    if (n) {
      setHeightState(n)
    }
  }


  return (
    <div className={'bg-gradient-to-b from-[#E8FC97] to-[#9BFDF9] px-3 py-6 lg:py-10'}>
      {error && <div>{error}</div>}
      <h2 className={`text-center mx-auto`}>
        This might also interest you</h2>
      <div className={'flex gap-6 lg:gap-10 mt-4 lg:my-8 justify-center'}>
        {problemArticle && problemArticle.map(
          a => <VerticalTeaserComp heightState={heightState} setHeightState={heightStateHandler} key={a.title}
                                   article={a}/>
        )}
      </div>
    </div>
  );
};

export default MightInterestYouComp;
