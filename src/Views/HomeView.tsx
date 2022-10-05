import {useEffect, useState} from "react";
import sanityClient from "../client.js";
import {SanityImageSource} from "@sanity/image-url/lib/types/types";
import imageUrlBuilder from "@sanity/image-url";
import {PortableText} from "@portabletext/react"
import {TypedObject} from "@portabletext/types";

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
          heroContent && <img src={urlFor(heroContent[0].mainImage).width(400).url()} alt="hero image"/>
        }
        <div className={"mx-auto w-11/12 -translate-y-28 p-2"} style={{background: 'white'}}>
          {
            heroContent && <h2 className={`text-center text-3xl font-bold text-blue border border-gray-light
              mx-auto `} >{heroContent[0].title}</h2>
          }
          {
            heroContent &&
             <span className={"text-center"}>
                <PortableText value={heroContent[0].text} />
             </span>

          }
        </div>

      </div>

    </>
  );
};

export default HomeView;
