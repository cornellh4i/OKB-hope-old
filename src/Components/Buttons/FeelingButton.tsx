import React from 'react';
import imageUrlBuilder from "@sanity/image-url";
import sanity from "../../client";
import {SanityImageSource} from "@sanity/image-url/lib/types/types";

type FeelingButton = {
  icon: any,
  text: string
}
type Props = {
  feelingButton: FeelingButton
  onClick: (s:string) => void
}
const FeelingButton: React.FC<Props> = ({feelingButton, onClick}) => {
  // sanity
  const builder = imageUrlBuilder(sanity);
  const urlFor = (source: SanityImageSource) => {
    return builder.image(source)
  }
  return (
    <button onClick={()=>onClick(feelingButton.text)}
            className={"shadow-lg rounded-lg py-2 px-3 flex gap-2 border border-gray-light active:bg-gray-light"}>
      <img className={"h-6 w-6"} src={urlFor(feelingButton.icon).url()} alt={feelingButton.text}/>
      <span>{feelingButton.text}</span>
    </button>
  );
};

export default FeelingButton;
