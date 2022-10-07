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
const HeroComp:React.FC<Props> = ({homeViewContent}) => {
  // sanity
  const builder = imageUrlBuilder(sanity);
  const urlFor = (source: SanityImageSource) => {
    return builder.image(source)
  }

  const {windowBig} = useWindowSize();
  return (
    <div className={"w-full relative bg-light-purple"}>
      {
        homeViewContent && !windowBig &&
        <img className={"object-cover w-full"} src={urlFor(homeViewContent.heroContent.mainImage).width(445 ).height(300).url()}
             alt="hero image"/>
      }
      {
        homeViewContent && windowBig &&
        <img className={"object-cover w-full"} src={urlFor(homeViewContent.heroContent.mainImage).url()} alt="hero image"/>
      }
      <div
        className={"mx-auto md:ml-40 w-11/12 md:w-fit md:px-6 absolute bottom-3 left-0 right-0 md:right-6 md:bottom-10 p-2 border-2 border-gray-light"}
        style={{background: 'white'}}>
        {
          homeViewContent && <h2 className={`text-left text-3xl md:text-6xl font-bold text-blue
              mx-auto `}>{homeViewContent.heroContent.title}</h2>
        }
        {
          homeViewContent &&
          <span className={"text-left md:text-2xl"}>
                <PortableText value={homeViewContent.heroContent.text}/>
             </span>

        }
      </div>
    </div>
  );
};

export default HeroComp;
