import React, {useEffect, useState} from 'react';
import useProvideData, {Article} from "../hooks/useProvideData";
import imageUrlBuilder from "@sanity/image-url";
import sanity from "../client";
import {SanityImageSource} from "@sanity/image-url/lib/types/types";
import {useLocation} from "react-router-dom";
import defineLastElementInLocation from "../hooks/defineLastElementInLocation";

const SomeFeelingView = () => {
  const { articleTitles} = useProvideData()
  const [problem, setProblem] = useState<null | Article>(null);

  // sanity
  const builder = imageUrlBuilder(sanity);
  const urlFor = (source: SanityImageSource) => {
    return builder.image(source)
  }

  let location = useLocation();
  const realLocation = defineLastElementInLocation(location.pathname);


  useEffect(()=>{
    if ( articleTitles) {
      const foundArticle = articleTitles.find(a => a.slug.current === realLocation)
      if (foundArticle) {
        setProblem(foundArticle)
      }
    }
  },[articleTitles])
  return (
    <div>
      {problem  && <div className={'mt-4'}>
        <div>
          <img src={urlFor(problem.mainImage).url()} alt=""/>
        </div>
        <div className={'p-3'}>
          <div className={'bg-light-blue p-3 rounded-lg mt-3'}>

            <h2 className={`text-left text-2xl md:text-5xl font-bold text-blue mx-auto`}>
              {problem.title}
            </h2>
            <p style={{fontFamily: 'Roboto'}}>{problem.summary}</p>
          </div>

        </div>
      </div>}

    </div>
  );
};

export default SomeFeelingView;
