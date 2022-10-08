import React from 'react';
import {Feeling} from "../../Views/HomeView";
import {PortableText} from "@portabletext/react";

type Props = {
  feeling: Feeling | null | undefined
}
const FeelingInfoHint: React.FC<Props> = ({feeling}) => {
  return (
    <div className={"p-4 bg-light-blue rounded-md"}>
      <h3 className={"text-left text-base md:text-3xl font-bold"}>{feeling?.title}</h3>
      <br/>
        {feeling &&  <PortableText value={feeling.body} />}
    </div>
  );
};

export default FeelingInfoHint;
