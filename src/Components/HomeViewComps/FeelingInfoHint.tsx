import React from 'react';
import {Feeling} from "../../Views/HomeView";

type Props = {
  feeling: Feeling | null | undefined
}
const FeelingInfoHint: React.FC<Props> = ({feeling}) => {
  return (
    <div className={"p-4 bg-light-purple rounded-md"}>
      <h3 className={"text-left text-base md:text-3xl font-bold"}>{feeling?.title}</h3>

    </div>
  );
};

export default FeelingInfoHint;
