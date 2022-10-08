import React from 'react';
import {Inspiration} from "../../Views/HomeView";

type Props = {
  inspirations: Inspiration[] | null
}
const GetInspiredComp:React.FC<Props> = ({inspirations}) => {
  return (
    <div className={" py-2 px-4"}>
      {inspirations && inspirations.map(i=><div key={i.tag}>{i.title}</div>)}
    </div>
  );
};

export default GetInspiredComp;
