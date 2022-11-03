import React, { useState } from 'react';
import { Inspiration } from "../../Views/HomeView";
import InspirationComp from "./InspirationComp";
import LinkTo from "./LinkTo";

type Props = {
  inspirations: Inspiration[] | null
}
const GetInspiredComp: React.FC<Props> = ({ inspirations }) => {
  const [heightState, setHeightState] = useState(0);



  const heightStateHandler = (n: number) => {
    if (n) {
      setHeightState(n)
    }
  }

  return (
    <div className={"w-full p-4 bg-greenish-blue"}>
      <h2 className={"text-center font-bold text-blue"}>Get inspired</h2>
      <div className={'flex gap-4 md:justify-evenly md:gap-0 md:w-11/12 md:mx-auto'}>
        {inspirations && inspirations
          .map(i =>
            <InspirationComp setHeightState={heightStateHandler} heightState={heightState} inspiration={i}
              key={i.tag} />
          )}
      </div>
      <div className={'my-3 lg:my-8'}>
        <LinkTo url={'/tips'}>
          Find more inspiration
        </LinkTo>
      </div>
    </div>
  );
}

export default GetInspiredComp;
