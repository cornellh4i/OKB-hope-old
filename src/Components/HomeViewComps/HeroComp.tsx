import React from 'react';
import {PortableText} from "@portabletext/react";

import {HomeViewContent} from "../../Views/HomeView";
import imageUrlBuilder from "@sanity/image-url";
import sanity from "../../client";
import {SanityImageSource} from "@sanity/image-url/lib/types/types";
import useWindowSize from "../../hooks/use.window.size";

type Props = {
  homeViewContent: HomeViewContent | null
}
const HeroComp: React.FC<Props> = ({homeViewContent}) => {
  // sanity
  const builder = imageUrlBuilder(sanity);
  const urlFor = (source: SanityImageSource) => {
    return builder.image(source)
  }

  const {windowBig} = useWindowSize();
  return (
    <div className={"w-full relative min-h-20"}>
      {
        homeViewContent && !windowBig &&
        <img className={"object-cover w-full"}
             src={urlFor(homeViewContent.heroContent.mainImage).width(445).height(300).url()}
             loading="lazy"
             alt="hero image"/>
      }
      {
        homeViewContent && windowBig &&
        <img className={"object-cover w-full"} src={urlFor(homeViewContent.heroContent.mainImage).url()}
             alt="hero image"/>
      }

      <div className={`absolute bottom-[25px] 
         left-0 right-0 
         md:right-1/3`}>
        <div
          className={` p-4
        mx-4
        md:mx-auto md:w-fit
        `}
          style={{background: 'white',}}>

          {
            homeViewContent && <h1
              className={`mb-[10px]
            text-left  text-blue mx-auto
             font-[900]
             `}>
              {homeViewContent.heroContent.title}
            </h1>
          }
          {
            homeViewContent &&
            <span className={"text-left"}>
                <PortableText value={homeViewContent.heroContent.text}/>
             </span>
          }
        </div>
      </div>

    </div>
  );
};

export default HeroComp;
