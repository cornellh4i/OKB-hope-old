import {useEffect, useState} from "react";
import sanityClient from "../client.js";
import {SanityImageSource} from "@sanity/image-url/lib/types/types";
import imageUrlBuilder from "@sanity/image-url";
import {PortableText} from "@portabletext/react"
import {TypedObject} from "@portabletext/types";
import useWindowSize from "../hooks/use.window.size";

import sanity from '../client.js'

type Herocontent = {
  title: string,
  mainImage: any,
  text: TypedObject
}
const HomeView = () => {
  const [heroContent, setHeroContent] = useState<null | Herocontent[]>(null);
  // sanity
  const builder = imageUrlBuilder(sanity);
  const urlFor = (source: SanityImageSource) => {
    return builder.image(source)
  }

  const {windowBig} = useWindowSize();

  useEffect(() => {
    if (!heroContent) {
      sanityClient
        .fetch(
          `*[_type == "hero_content"]`
        )
        .then((data) => setHeroContent(data))
        .catch(console.error);


    }
  }, [heroContent])

  console.log(heroContent)

  return (
    <>
      <div className={"h-fit w-full relative"}>
        {
          heroContent && !windowBig && <img src={urlFor(heroContent[0].mainImage).width(400).url()} alt="hero image"/>
        }
        {
          heroContent && windowBig && <img className={"object-cover w-full"} src={urlFor(heroContent[0].mainImage).width(1400).height(900).url()} alt="hero image"/>
        }
        <div className={"mx-auto w-11/12 md:w-fit md:px-6 -translate-y-28 md:-translate-y-32 p-2 border-2 border-gray-light"} style={{background: 'white'}}>
          {
            heroContent && <h2 className={`text-left text-3xl md:text-6xl font-bold text-blue
              mx-auto `}>{heroContent[0].title}</h2>
          }
          {
            heroContent &&
            <span className={"text-left md:text-2xl"}>
                <PortableText value={heroContent[0].text}/>
             </span>

          }
        </div>

      </div>

    </>
  );
};

export default HomeView;
