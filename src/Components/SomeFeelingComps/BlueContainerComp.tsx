import React from 'react';
import {BlueContainerContent} from "../../Views/SomeFeelingView";
import {PortableText} from "@portabletext/react";
import modules from './BlueContainerComp.module.css'
import {paragraphComponents} from "./ParagraphComp";
type Props={
  blueContainerContent: BlueContainerContent
}

const BlueContainerComp:React.FC<Props> = ({blueContainerContent}) => {
  return (
    <div className={'bg-greenish-blue my-2 rounded w-full p-3 lg:max-w-screen-xl mx-auto lg:w-1/2'}>
      <div>
        <h3>{blueContainerContent.title}</h3>
      </div>
      <div className={modules.custom_bullet}>
        <PortableText value={blueContainerContent.body} components={paragraphComponents} />
      </div>
    </div>
  );
};

export default BlueContainerComp;
