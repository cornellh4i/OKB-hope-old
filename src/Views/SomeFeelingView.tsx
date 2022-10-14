import React, {useEffect, useState} from 'react';
import useProvideData, {Article} from "../hooks/useProvideData";
import imageUrlBuilder from "@sanity/image-url";
import sanity from "../client";
import {SanityImageSource} from "@sanity/image-url/lib/types/types";
import {useLocation} from "react-router-dom";
import defineLastElementInLocation from "../hooks/defineLastElementInLocation";
import useWindowSize from "../hooks/use.window.size";
import {TypedObject} from "@portabletext/types";
import sanityClient from "../client";
import ParagraphComp from "../Components/SomeFeelingComps/ParagraphComp";

export type Paragraph = {
  title: string
  slug: {
    _type: string
    current: string
  }
  body: TypedObject
  serial_num: number
  article: any[]
}

const SomeFeelingView = () => {
  const [error, setError] = useState<null | string>(null);
  const [paragraphs, setParagraphs] = useState<null | Paragraph[]>(null);
  const {articleTitles} = useProvideData()
  const [problem, setProblem] = useState<null | Article>(null);
  const {windowBig} = useWindowSize()

  // sanity
  const builder = imageUrlBuilder(sanity);
  const urlFor = (source: SanityImageSource) => {
    return builder.image(source)
  }

  let location = useLocation();
  const realLocation = defineLastElementInLocation(location.pathname);

  useEffect(() => {
    if (!paragraphs && problem) {
      sanityClient
        .fetch(
          `*[_type == 'paragraph']`
        )
        .then((data) => {
          const d = data.filter(((p: { article: any[]; }) => p.article.filter(a => a._ref === problem._id)))
          setParagraphs(d);
        })
        .catch((err) => {
          console.log(err);
          setError('error loading data')
        });
    }
  }, [paragraphs, problem])

  useEffect(() => {
    if (articleTitles) {
      const foundArticle = articleTitles.find(a => a.slug.current === realLocation)
      if (foundArticle) {
        setProblem(foundArticle)
      }
    }
  }, [articleTitles])


  return (
    <div className={'w-screen relative'}>
      {error && <div>{error}</div>}
      {problem && <div className={'mt-4'}>
        <div className={'w-screen'}>
          {!windowBig &&
            <img className={'object-cover'} src={urlFor(problem.mainImage).width(400).url()} alt={problem.title}/>}
          {windowBig && <img className={'object-cover max-h-[600px] w-screen 2xl:max-w-screen-xl mx-auto'}
                             src={urlFor(problem.mainImage).width(1280).url()} alt={problem.title}/>}
        </div>
        <div className={'p-3 w-screen'}>
          <div
            className={'bg-light-blue p-3 rounded-lg mt-3 lg:absolute lg:top-6 2xl:left-1/4 lg:left-20 lg:right-1/3'}>

            <h2 className={`text-left text-2xl md:text-5xl font-bold text-blue mx-auto mb-3`}>
              {problem.title}
            </h2>
            <p style={{fontFamily: 'Roboto'}}>{problem.summary}</p>
          </div>

        </div>
      </div>}

      <div className={'lg:grid grid-cols-3'}>
        <div className={'col-end-2'}>
          {paragraphs && paragraphs.slice(0,3).map(
            p => <ParagraphComp key={p.slug.current} paragraph={p}/>
          )}
        </div>
        <div></div>
      </div>

    </div>
  );
};

export default SomeFeelingView;
