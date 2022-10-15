import React, {useState} from 'react';
import {Article} from "../../hooks/useProvideData";
import VerticalTeaserComp from "./VerticalTeaserComp";

type Props = {
  articles: Article[]
}

const MightInterestYouComp: React.FC<Props> = ({articles}) => {
  const [heightState, setHeightState] = useState(0);

  const heightStateHandler = (n: number) => {
    if (n) {
      setHeightState(n)
    }
  }



  return (
    <div className={'bg-gradient-to-b from-[#E8FC97] to-[#9BFDF9] px-3 py-6 lg:py-10'}>
      <h2 className={`text-center text-xl lg:text-4xl font-bold text-blue mx-auto`}>
        This might also interest you</h2>
      <div className={'flex gap-6 lg:gap-10 mt-4 lg:my-8 justify-center'}>
        {articles && articles.map(
          a => <VerticalTeaserComp heightState={heightState} setHeightState={heightStateHandler} key={a.title}
                                   article={a}/>
        )}
      </div>
    </div>
  );
};

export default MightInterestYouComp;
