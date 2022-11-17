import React, { useEffect, useRef } from "react";
import { Inspiration } from "../../Views/HomeView";
import imageUrlBuilder from "@sanity/image-url";
import sanity from "../../client";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import useWindowSize from "../../hooks/use.window.size";
import { PortableText } from "@portabletext/react";
import { useNavigate } from "react-router-dom";

type Props = {
  inspiration: Inspiration | null;
  heightState: null | number;
  setHeightState: (n: number) => void;
};

const InspirationComp: React.FC<Props> = ({
  inspiration,
  heightState,
  setHeightState,
}) => {
  const heightRef = useRef<null | HTMLDivElement>(null);

  const builder = imageUrlBuilder(sanity);
  const urlFor = (source: SanityImageSource) => {
    return builder.image(source);
  };

  const navigate = useNavigate();
  const handleNavigation = (url: string) => {
    navigate(url);
  };

  const { windowBig } = useWindowSize();
  console.log(inspiration!.title);

  useEffect(() => {
    if (heightRef && heightRef.current!.offsetHeight > heightState!) {
      setHeightState(heightRef.current!.offsetHeight);
    }
  }, [heightRef, heightState]);

  return (
    <div
      className={
        "w-1/2 py-2 lg:w-1/4 cursor-pointer hover:underline focus:border"
      }
      onClick={() => handleNavigation(inspiration!.url)}
    >
      <div className={"w-full rounded-t-md"}>
        {!windowBig ? (
          <img
            className={"mx-auto rounded-t-md"}
            loading="lazy"
            src={urlFor(inspiration?.mainImage)
              .width(184)
              .height(123)
              .fit("scale")
              .url()}
            alt={inspiration?.title}
          />
        ) : (
          <img
            className={"rounded-t-md mx-auto"}
            src={urlFor(inspiration?.mainImage)
              .width(400)
              .height(250)
              .fit("scale")
              .url()}
            alt=""
          />
        )}
      </div>
      <div
        ref={heightRef}
        className={
          "w-full mx-auto p-2 md:p-3 rounded-b-md bg-white lg:w-[400px]"
        }
        style={{ minHeight: `${heightState}px` }}
      >
        <h3 className={"no-underline"}>{inspiration?.title}</h3>
        <div className={"text-xs"} style={{ fontSize: "14px" }}>
          <PortableText value={inspiration!.text} />
        </div>
      </div>
    </div>
  );
};

export default InspirationComp;
