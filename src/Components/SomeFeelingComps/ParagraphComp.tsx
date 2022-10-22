import React from 'react';
import {Paragraph} from "../../Views/SpecificIssueView";
import {PortableText} from "@portabletext/react";
import CustomImageComp from "../UIComps/CustomImageComp";
import CustomBulletPointComp from "../UIComps/CustomBulletPointComp";
import CustomHeadingComp from "../UIComps/CustomHeadingComp";


type Props = {
  paragraph: Paragraph
}

export const paragraphComponents = {
  listItem: {
    bullet: CustomBulletPointComp,
  },
  block: {
    paragraph: CustomHeadingComp,
    p: CustomHeadingComp,
    h4: CustomHeadingComp,
  },
  types: {
    image: CustomImageComp,

    // Any other custom types you have in your content
    // Examples: mapLocation, contactForm, code, featuredProjects, latestNews, etc.
  },
}
const ParagraphComp: React.FC<Props> = ({paragraph}) => {

  return (
    <div id={`${paragraph.slug.current}`} className={` my-2 lg:my-4 rounded-md  
    ${paragraph.colorKey ? paragraph.colorKey : 'bg-white'} `}>

      <h3 className={'text-blue lg:text-xl font-bold my-2'}>{paragraph.title}</h3>
      <div className={paragraph.colorKey ? 'p-1' : 'p-0'}>
        <PortableText value={paragraph.body} components={paragraphComponents}/>
      </div>
    </div>
  );
};

export default ParagraphComp;
