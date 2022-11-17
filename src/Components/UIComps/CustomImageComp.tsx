import React from "react";
import imageUrlBuilder from "@sanity/image-url";
import sanity from "../../client";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

type Props = {
  isInline: boolean;
  value: any;
};
// Barebones lazy-loaded image component
const CustomImageComp: React.FC<Props> = ({ isInline, value }) => {
  // sanity
  const builder = imageUrlBuilder(sanity);
  const urlFor = (source: SanityImageSource) => {
    return builder.image(source);
  };

  return (
    <img
      className={"my-2 rounded"}
      src={urlFor(value)
        .width(isInline ? 100 : 800)
        .fit("max")
        .auto("format")
        .url()}
      alt={"inline image"}
      loading="lazy"
      style={{
        // Display alongside text if image appears inside a block text span
        display: isInline ? "inline-block" : "block",

        // Avoid jumping around with aspect-ratio CSS property
      }}
    />
  );
};

export default CustomImageComp;
