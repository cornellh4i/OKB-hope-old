import React from 'react';
import {Inspiration} from "../../Views/HomeView";
import imageUrlBuilder from "@sanity/image-url";
import sanity from "../../client";
import {SanityImageSource} from "@sanity/image-url/lib/types/types";
import useWindowSize from "../../hooks/use.window.size";
import {PortableText} from "@portabletext/react";

type Props = {
  inspiration: Inspiration | null
}
const InspirationComp: React.FC<Props> = ({inspiration}) => {
  const builder = imageUrlBuilder(sanity);
  const urlFor = (source: SanityImageSource) => {
    return builder.image(source)
  }
  const {windowBig} = useWindowSize();

  return (
    <div className={'w-1/2 py-2 lg:w-1/4'}>
      <div className={'w-full'}>
        {!windowBig ?         <img className={'rounded mx-auto'} src={urlFor(inspiration?.mainImage).width(184).height(123).fit('scale').url()} alt=""/>
         :         <img className={'rounded mx-auto'} src={urlFor(inspiration?.mainImage).width(400).height(250).fit('scale').url()} alt=""/>
        }
      </div>
      <div className={'w-full mx-auto '}>
        <h4 className={'leading-5 text-lg md:text-2xl text-blue font-bold pb-0.5'}>{inspiration?.title}</h4>
        <PortableText value={inspiration!.text} />
      </div>
    </div>
  );
};

export default InspirationComp;
