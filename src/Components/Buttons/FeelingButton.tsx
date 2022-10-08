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
  activeFeeling: string | null | undefined
}
const FeelingButton: React.FC<Props> = ({feelingButton, onClick, activeFeeling}) => {
  // sanity
  const builder = imageUrlBuilder(sanity);
  const urlFor = (source: SanityImageSource) => {
    return builder.image(source)
  }

  const activeBackground = activeFeeling === feelingButton.text ? 'bg-light-blue' : ''

  return (
    <button onClick={()=>onClick(feelingButton.text)} aria-label={feelingButton.text}
            className={`shadow-lg rounded-lg py-2 px-3 flex gap-2 ${activeBackground}
            border border-gray-light active:bg-gray-light`}>
      <img className={"h-6 w-6"} src={urlFor(feelingButton.icon).url()} alt={feelingButton.text}/>
      <span>{feelingButton.text}</span>
    </button>
  );
};

export default FeelingButton;
