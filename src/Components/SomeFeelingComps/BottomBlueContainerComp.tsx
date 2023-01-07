import React, { useEffect, useRef } from "react";
import { Paragraph } from "../../Views/SpecificIssueView";
import useWindowSize from "../../hooks/use.window.size";
import { PortableText } from "@portabletext/react";
import { paragraphComponents } from "./ParagraphComp";
type Props = {
  paragraph: Paragraph;
  heightState: null | number;
  setHeightState: (n: number) => void;
};
const BottomBlueContainerComp: React.FC<Props> = ({
  paragraph,
  heightState,
  setHeightState,
}) => {
  const { windowBig } = useWindowSize();
  const heightRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (heightRef && heightRef.current!.offsetHeight > heightState!) {
      setHeightState(heightRef.current!.offsetHeight);
    }
  }, [heightRef, heightState]);
  
  return (
    <div
      ref={heightRef}
      id="bottom-blue-container"
      style={{ minHeight: `${heightState}px` }}
      className={` my-2 lg:my-4 rounded-md ${
        windowBig ? "p-4" : "p-2"
      } bg-greenish-blue `}
    >
      <h2 className={""}>{paragraph.title}</h2>
      <div className={paragraph.colorKey ? "p-1" : "p-0"}>
        <PortableText value={paragraph.body} components={paragraphComponents} />
      </div>
    </div>
  );
};

export default BottomBlueContainerComp;
