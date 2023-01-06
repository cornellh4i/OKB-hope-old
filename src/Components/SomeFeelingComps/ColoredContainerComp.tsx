import React from "react";
import { BlueContainerContent } from "../../Views/SpecificIssueView";
import { PortableText } from "@portabletext/react";
import { paragraphComponents } from "./ParagraphComp";

type Props = {
  blueContainerContent: BlueContainerContent;
};

const ColoredContainerComp: React.FC<Props> = ({ blueContainerContent }) => {
  return (
    <div 
    id="greenish-blue-box"
      className={
        "bg-greenish-blue my-6 rounded w-full p-3 lg:max-w-screen-xl mx-auto "
      }
    >
      <div>
        <h2 className={""}>{blueContainerContent.title}</h2>
      </div>
      <div>
        <PortableText
          value={blueContainerContent.body}
          components={paragraphComponents}
        />
      </div>
      {blueContainerContent && blueContainerContent.warning && (
        <div className={`bg-[#DE304E] text-white px-2 pb-1 my-2`}>
          <PortableText value={blueContainerContent.warning} />
        </div>
      )}
    </div>
  );
};

export default ColoredContainerComp;
