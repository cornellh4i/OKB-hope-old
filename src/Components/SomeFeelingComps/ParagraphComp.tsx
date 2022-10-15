import React from 'react';
import {Paragraph} from "../../Views/SomeFeelingView";
import {PortableText} from "@portabletext/react";
import CustomImageComp from "../UIComps/CustomImageComp";
import CustomBulletPointComp from "../UIComps/CustomBulletPointComp";

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
  return (
    <div id={`${paragraph.slug.current}`} className={`
    w-full p-3 lg:max-w-screen-xl mx-auto lg:w-1/2 ${paragraph.colorKey ? paragraph.colorKey : 'bg-white'}`}>

      <h3 className={'text-blue font-bold'}>{paragraph.title}</h3>
      <div>
        <PortableText value={paragraph.body} components={paragraphComponents} />
      </div>
    </div>
  );
};

export default ParagraphComp;
