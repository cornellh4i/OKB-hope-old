import React from 'react';
import {BlueContainerContent} from "../../Views/SomeFeelingView";
import CustomImageComp from "../UIComps/CustomImageComp";
import {PortableText} from "@portabletext/react";
import modules from './BlueContainerComp.module.css'
type Props={
  blueContainerContent: BlueContainerContent
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
const BlueContainerComp:React.FC<Props> = ({blueContainerContent}) => {
  return (
    <div className={'bg-greenish-blue p-3 rounded'}>
      <div>
        <h3>{blueContainerContent.title}</h3>
      </div>
      <div className={modules.custom_bullet}>
        <PortableText value={blueContainerContent.body} components={components} />
      </div>
    </div>
  );
};

export default BlueContainerComp;
