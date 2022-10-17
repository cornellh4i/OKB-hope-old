import React from 'react';
import {BlueContainerContent} from "../../Views/SomeFeelingView";
import {PortableText} from "@portabletext/react";
import {paragraphComponents} from "./ParagraphComp";

type Props = {
  blueContainerContent: BlueContainerContent
}

const ColoredContainerComp: React.FC<Props> = ({blueContainerContent}) => {

  return (
    <div className={'bg-greenish-blue my-2 rounded w-full p-3 lg:max-w-screen-xl mx-auto '}>
      <div>
        <h3 className={'font-bold'}>{blueContainerContent.title}</h3>
      </div>
      <div>
        <PortableText value={blueContainerContent.body} components={paragraphComponents}/>
      </div>
      {blueContainerContent && blueContainerContent.warning
        && <div className={`bg-[#DE304E] text-white p-2 my-2`}>
        <PortableText value={blueContainerContent.warning}/>
      </div>}
    </div>
  );
};

export default ColoredContainerComp;