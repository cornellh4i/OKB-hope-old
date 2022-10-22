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
  onClick: (s: string) => void
  activeFeeling: string | null | undefined
}
const FeelingButton: React.FC<Props> = ({feelingButton, onClick, activeFeeling}) => {
  // sanity
  const builder = imageUrlBuilder(sanity);
  const urlFor = (source: SanityImageSource) => {
    return builder.image(source)
  }

  const activeBackground = activeFeeling === feelingButton.text ? 'bg-light-blue' : ''
  const activeShadow = activeFeeling === feelingButton.text ? '' : 'shadow-lg'
  const activeSize =  activeFeeling === feelingButton.text ? 'scale-95' : ''

  const clickHandler = () => {
    onClick(feelingButton.text)
  }


  return (
    <button onClick={clickHandler} aria-label={feelingButton.text}
            className={`${activeShadow} ${activeSize} rounded py-2 focus:border px-3 flex gap-2 ${activeBackground}        `}>
      <img className={"h-6 w-6"} src={urlFor(feelingButton.icon).url()} alt={feelingButton.text}/>
      <span>{feelingButton.text}</span>
    </button>
  );
};

export default FeelingButton;
