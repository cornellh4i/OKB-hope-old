import React from 'react';
import {Paragraph} from "../../Views/SomeFeelingView";
import {PortableText} from "@portabletext/react";
import CustomImageComp from "../UIComps/CustomImageComp";
import CustomBulletPointComp from "../UIComps/CustomBulletPointComp";
import useWindowSize from "../../hooks/use.window.size";

type Props = {
  paragraph: Paragraph
}

export const paragraphComponents = {
  listItem: {
    bullet: CustomBulletPointComp,
  },
  types: {
    image: CustomImageComp,
    // Any other custom types you have in your content
    // Examples: mapLocation, contactForm, code, featuredProjects, latestNews, etc.
  },
}
const ParagraphComp: React.FC<Props> = ({paragraph}) => {
  const {windowBig}=useWindowSize()
  return (
    <div id={`${paragraph.slug.current}`} className={` my-2 lg:my-4 rounded-md ${windowBig?'p-3':'p-1'}
    ${paragraph.colorKey ? paragraph.colorKey : 'bg-white'} `}>

      <h3 className={'text-blue font-bold'}>{paragraph.title}</h3>
      <div>
        <PortableText value={paragraph.body} components={paragraphComponents} />
      </div>
    </div>
  );
};

export default ParagraphComp;
