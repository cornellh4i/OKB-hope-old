import React from 'react';
import {Paragraph} from "../../Views/SomeFeelingView";
import {PortableText} from "@portabletext/react";
import CustomImageComp from "../UIComps/CustomImageComp";

type Props = {
  paragraph: Paragraph
}

const components = {
  listItem: {
    bullet: (props:any) => <li style={{listStyleType: 'disc', margin:'0 1rem', fontSize: '.9rem'}}>{props.children}</li>,
  },
  types: {
    image: CustomImageComp,
    // Any other custom types you have in your content
    // Examples: mapLocation, contactForm, code, featuredProjects, latestNews, etc.
  },
}
const ParagraphComp: React.FC<Props> = ({paragraph}) => {
  return (
    <div id={`${paragraph.slug.current}`} className={'w-full p-3 lg:max-w-screen-xl mx-auto lg:w-1/2'}>

      <h3 className={'text-blue font-bold'}>{paragraph.title}</h3>
      <div>
        <PortableText value={paragraph.body} components={components} />
      </div>
    </div>
  );
};

export default ParagraphComp;
