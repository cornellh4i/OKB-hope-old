import React from 'react';
import {Paragraph} from "../../Views/SomeFeelingView";
import {PortableText} from "@portabletext/react";

type Props = {
  paragraph: Paragraph
}
const ParagraphComp: React.FC<Props> = ({paragraph}) => {
  return (
    <div className={'w-full p-3 lg:max-w-screen-xl mx-auto lg:w-1/2'}>

      <h3 className={'text-blue font-bold'}>{paragraph.title}</h3>
      <div>
        <PortableText value={paragraph.body} />
      </div>
    </div>
  );
};

export default ParagraphComp;
