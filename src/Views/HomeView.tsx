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
};
type Slug = {
  current: string,
  _type: string
}

interface HomeViewContent {
  heroContent: Herocontent,
  slug: Slug,
  title: string,
  text:TypedObject

}

const HomeView = () => {
  const [homeViewContent, setHomeViewContent] = useState<null | HomeViewContent>(null);
  const [feelings, setFeelings] = useState<null|any>(null );
  // sanity
  const builder = imageUrlBuilder(sanity);
  const urlFor = (source: SanityImageSource) => {
    return builder.image(source)
  }

  const {windowBig} = useWindowSize();

  useEffect(() => {
    if (!homeViewContent) {
      sanityClient
        .fetch(
          `*[_type == 'homeView']`
        )
        .then((data) => setHomeViewContent(data[0]))
        .catch(console.error);
    }
    if (!feelings) {
      sanityClient
        .fetch(
          `*[_type == 'feelingsPreview' && page=='home']`
        )
        .then((data) => setFeelings(data))
        .catch(console.error);
    }
  }, [homeViewContent])

  console.log(homeViewContent)
  // console.log(feelings);

  return (
    <>
      <div className={"h-fit w-full relative"}>
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
          className={"mx-auto md:ml-40 w-11/12 md:w-fit md:px-6 -translate-y-28 md:-translate-y-40 p-2 border-2 border-gray-light"}
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

    </>
  );
};

export default HomeView;
