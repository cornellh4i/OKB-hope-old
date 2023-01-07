import React from "react";
import { LinkObject } from "../../Views/SpecificIssueView";
import { BlueContainerContent } from "../../Views/SpecificIssueView";
import "./LinkObjectContainer.css"
type Props = {
  linkObjects: LinkObject[];
  scrollToHandler: (s: string) => void;
  blueContainerTitle: any;
  bottomBlueContainerTitle: any;
};

const LinkObjectContainer: React.FC<Props> = ({
  scrollToHandler,
  linkObjects,
  blueContainerTitle,
  bottomBlueContainerTitle,

}) => {
  let title;
  let ytitle;
  let containsTitles;
  let containsYellowContainer;
  if (blueContainerTitle === null){
    title =[];
    containsTitles = false;
  }else{
    title = [];
    containsTitles = true;
    for(let i=0; i<blueContainerTitle.length;i++){
      title.push(blueContainerTitle[i].title);
    }
  }
  console.log("error")
  if(bottomBlueContainerTitle.yellowContainerContent!=undefined &&bottomBlueContainerTitle.yellowContainerContent != null){
    ytitle =[]
    for(let i=0; i<bottomBlueContainerTitle.yellowContainerContent.length;i++){
      ytitle.push(bottomBlueContainerTitle.yellowContainerContent[i].title)
    }
    containsYellowContainer= true;
  }else{

    ytitle = []
    containsYellowContainer= false;
  }

  return (
    <div className={"w-full bg-[#ebf2f0] rounded-xl  py-2 px-3 "}>
      <h2 className={"text-blue font-bold heading-futura-bold"}>What you’ll find on this page</h2>
      <div className={"futura-bold"}>
        {linkObjects &&
          linkObjects.map((o) => (
            <div className={"blue-paragraphs"} key={o.slug}>
              <a aria-label="Navigation Elements"
                className={
                  "no-underline cursor-pointer futura-bold"
                }
                onClick={() => scrollToHandler(o.slug)}
              >
                {o.title}
              </a>
            </div>
          ))}
          {containsTitles && title.map((x) => (
            <div className={"blue-paragraphs"} key={"greenish-blue-box"}>
              <a
              aria-label="Navigation Elements"
                className={
                  "no-underline cursor-pointer futura-bold"
                }
                onClick={() => scrollToHandler("greenish-blue-box")}
              >
                {x}
              </a>
            </div>
          ))}
          {containsYellowContainer && ytitle.map((x) => (
              <div className={"blue-paragraphs"} key={"bottom-blue-container"}>
                <a
                aria-label="Navigation Elements"
                  className={
                    "no-underline cursor-pointer futura-bold"
                  }
                  onClick={() => scrollToHandler("bottom-blue-container")}
                >
                  {x}
                </a>
              </div>
            ))
          }
      </div>
    </div>
  );
};

export default LinkObjectContainer;
