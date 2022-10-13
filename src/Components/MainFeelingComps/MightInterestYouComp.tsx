import React, {useEffect, useState} from 'react';
import {Article} from "../../hooks/useProvideData";
import VerticalTeaserComp from "./VerticalTeaserComp";

type Props = {
  articles: Article[]
}

const MightInterestYouComp: React.FC<Props> = ({articles}) => {
  const [shortenedArticles, setShortenedArticles] = useState<null | Article[]>(null);
  const [heightState, setHeightState] = useState(0);

  const heightStateHandler = (n: number) => {
    if (n) {
      setHeightState(n)
    }
  }
  console.log(heightState)


  useEffect(() => {
    if (articles && articles.length > 2) {
      setShortenedArticles(articles.slice(0, 2))
    } else {
      setShortenedArticles(articles)
    }
  }, [articles])

  return (
    <div className={'bg-gradient-to-b from-[#E8FC97] to-[#9BFDF9] px-3 py-6 lg:py-10'}>
      <h2 className={`text-center text-xl lg:text-4xl font-bold text-blue mx-auto`}>
        This might also interest you</h2>
      <div className={'flex gap-6 lg:gap-10 mt-4 lg:my-8 justify-center'}>
        {shortenedArticles && shortenedArticles.map(
          a => <VerticalTeaserComp heightState={heightState} setHeightState={heightStateHandler} key={a.title}
                                   article={a}/>
        )}
      </div>
    </div>
  );
};

export default MightInterestYouComp;
