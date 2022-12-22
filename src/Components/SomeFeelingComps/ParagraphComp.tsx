import React from "react";
import { Paragraph } from "../../Views/SpecificIssueView";
import { PortableText } from "@portabletext/react";
import CustomImageComp from "../UIComps/CustomImageComp";
import CustomBulletPointComp from "../UIComps/CustomBulletPointComp";
import CustomHeadingComp from "../UIComps/CustomParagraphComp";
import CustomParagraphComp from "../UIComps/CustomParagraphComp";

type Props = {
  paragraph: Paragraph;
};

export const paragraphComponents = {
  listItem: {
    bullet: CustomBulletPointComp,
  },
  block: {
    paragraph: CustomHeadingComp,
    p: CustomParagraphComp,
    h4: CustomHeadingComp,
    heading: CustomHeadingComp,
    headers: CustomHeadingComp,
  },
  types: {
    image: CustomImageComp,

    // Any other custom types you have in your content
    // Examples: mapLocation, contactForm, code, featuredProjects, latestNews, etc.
  },
};
const ParagraphComp: React.FC<Props> = ({ paragraph }) => {
  return (
    <div
      id={`${paragraph.slug.current}`}
      className={`mt-3 myb-2 lg:mb-4 lg:mt-6 rounded-md  
    ${paragraph.colorKey ? paragraph.colorKey : "bg-white"} `}
    >
      <h3 className={"text-blue lg:text-xl font-bold mt-2"}>
        {paragraph.title}
      </h3>
      <div className={paragraph.colorKey ? "p-1" : "p-0"}>
        <PortableText value={paragraph.body} components={paragraphComponents} />
      </div>
    </div>
  );
};

export default ParagraphComp;
