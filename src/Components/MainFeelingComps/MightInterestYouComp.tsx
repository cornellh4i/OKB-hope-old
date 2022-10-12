import React, {useEffect, useState} from 'react';
import {Article} from "../../hooks/useProvideData";
import VerticalTeaserComp from "./VerticalTeaserComp";

type Props = {
  articles: Article[]
}

const MightInterestYouComp: React.FC<Props> = ({articles}) => {
  const [shortenedArticles, setShortenedArticles] = useState<null | Article[]>(null);

  useEffect(() => {
    if (articles && articles.length > 2) {
      setShortenedArticles(articles.slice(0, 2))
    } else {
      setShortenedArticles(articles)
    }
  }, [articles])

  console.log(shortenedArticles);
  return (
    <div className={'bg-gradient-to-b from-[#E8FC97] to-[#9BFDF9] px-3 py-6'}>
      <h2 className={`text-left text-xl md:text-3xl font-bold text-blue mx-auto`}>
        This might also interest you</h2>
      <div className={'flex gap-6 mt-4'}>
        {shortenedArticles && shortenedArticles.map(
          a => <VerticalTeaserComp article={a}/>
        )}
      </div>
    </div>
  );
};

export default MightInterestYouComp;
