import React, {useEffect, useState} from 'react';
import {Article} from "../../hooks/useProvideData";
import VerticalTeaserComp from "./VerticalTeaserComp";
import sanityClient from "../../client";
import {useParams} from "react-router-dom";

type Props = {}


const MightInterestYouComp: React.FC<Props> = () => {
  const [heightState, setHeightState] = useState(0);
  const [error, setError] = useState<null | string>(null);
  const [problemArticle, setProblemArticle] = useState<null | Article[]>(null);
  let {problem: paramProblem} = useParams();

  useEffect(() => {
    const pathIncludesProblem = (param: string | undefined, problem: Article[]) => {
      return problem.find(a => a.slug.current === param)
    }
    if ((!problemArticle && paramProblem) || (problemArticle && pathIncludesProblem(paramProblem, problemArticle))) {
      const randStart = Math.ceil(Math.random() * 5)
      const randEnd = randStart + 1
      sanityClient
        .fetch(
          `*[_type == 'article' && slug.current != '${paramProblem}'][${randStart}..${randEnd}]`
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
  }, [problemArticle, paramProblem])

  useEffect(() => {
    if (!paramProblem) {
      const randStart = Math.ceil(Math.random() * 5)
      const randEnd = randStart + 1
      sanityClient
        .fetch(
          `*[_type == 'article'][${randStart}..${randEnd}]`
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
  }, [])


  const heightStateHandler = (n: number) => {
    if (n) {
      setHeightState(n)
    }
  }


  return (
    <div className={'bg-gradient-to-b from-[#E8FC97] to-[#9BFDF9] px-3 py-6 lg:py-10'}>
      {error && <div>{error}</div>}
      <h2 className={`text-center text-xl lg:text-4xl font-bold text-blue mx-auto`}>
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
