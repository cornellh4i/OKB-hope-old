import React from 'react';
import {Inspiration} from "../../Views/HomeView";
import InspirationComp from "./InspirationComp";
import RedirectToInfoAdvice from "./RedirectToInfoAdvice";

type Props = {
  inspirations: Inspiration[] | null
}
const GetInspiredComp: React.FC<Props> = ({inspirations}) => {

  return (
    <div className={"py-2 lg:py-4 px-4 w-full bg-greenish-blue"}>
      <h3 className={"text-center text-xl md:text-4xl font-bold text-blue my-4"}>Get inspired</h3>
      <div className={'flex gap-4 lg:justify-evenly lg:gap-0'}>
        {inspirations && inspirations
          .map(i => <InspirationComp inspiration={i} key={i.tag}/>)}
      </div>
      <RedirectToInfoAdvice>
        Find more inspiration
      </RedirectToInfoAdvice>
    </div>
  );
}

export default GetInspiredComp;
