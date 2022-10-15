import React, {useEffect, useState} from 'react';
import useProvideData, {Article} from "../hooks/useProvideData";
import imageUrlBuilder from "@sanity/image-url";
import sanity from "../client";
import {SanityImageSource} from "@sanity/image-url/lib/types/types";
import {useParams} from "react-router-dom";
import useWindowSize from "../hooks/use.window.size";
import {TypedObject} from "@portabletext/types";
import sanityClient from "../client";
import ParagraphComp from "../Components/SomeFeelingComps/ParagraphComp";
import LinkObjectContainer from "../Components/SomeFeelingComps/LinkObjectContainer";
import useMightInterestYouFactory from "../hooks/useMightInterestYouFactory";
import MightInterestYouComp from "../Components/MainFeelingComps/MightInterestYouComp";
import BlueContainerComp from "../Components/SomeFeelingComps/BlueContainerComp";


export type Paragraph = {
  title: string
  slug: {
    _type: string
    current: string
  }
  body: TypedObject
  serial_num: number
  article: any[]
  colorKey?:string
}
export type BlueContainerContent = {
  title: string
  body: TypedObject
  slug: {
    _type: string
    current: string
  }
}

export type LinkObject = {
  title: string,
  slug: string
}


const SomeFeelingView = () => {
  const [error, setError] = useState<null | string>(null);
  const [blueContainerContent, setBlueContainerContent] = useState<null | BlueContainerContent[]>(null);
  const [paragraphs, setParagraphs] = useState<null | Paragraph[]>(null);
  const [linkObjects, setLinkObjects] = useState<null | LinkObject[]>(null);
  const {categoryObjects} = useProvideData()
  const [problem, setProblem] = useState<null | Article>(null);
  const {windowBig} = useWindowSize()

  // sanity
  const builder = imageUrlBuilder(sanity);
  const urlFor = (source: SanityImageSource) => {
    return builder.image(source)
  }

  // let location = useLocation();

  let {problem: paramProblem, feeling} = useParams();

  const {mightInterestYou} = useMightInterestYouFactory(feeling, categoryObjects);

  useEffect(() => {

    if (!paragraphs && problem) {
      sanityClient
        .fetch(
          `*[_type=="paragraph" && "${problem._id}" in article[]._ref]`
        )
        .then((data) => {
          // console.log(data)
          const d:Paragraph[] = data.sort((a: { serial_num: number; }, b: { serial_num: number; }) => a.serial_num - b.serial_num);
          setParagraphs(d);
        })
        .catch((err) => {
          console.log(err);
          setError('error loading data')
        });
    }
    if (paragraphs && !linkObjects) {
      setLinkObjects(paragraphs.map(p => {
        return {
          title: p.title,
          slug: p.slug.current
        }
      }))
    }
  }, [paragraphs, problem, linkObjects])

  useEffect(() => {
    if (!problem && paramProblem) {
      sanityClient
        .fetch(
          `*[_type == 'article' && slug.current == '${paramProblem}']`
        )
        .then((data) => {
          // console.log(data)
          setProblem(data[0])
        })
        .catch((err) => {
          console.log(err);
          setError('error loading data')
        });
    }
  }, [problem,paramProblem])

  useEffect(() => {
    if (!blueContainerContent && problem && problem.blueContainerContent && problem.blueContainerContent.length>0) {
      const refList = problem?.blueContainerContent.map(b=>b._ref)
      sanityClient
        .fetch(
          `*[_type=='blueContainerContent' && _id in ["${refList[0]}", "${refList[1]}"]]`
        )
        .then((data) => {
          // console.log(data)
          setBlueContainerContent(data)
        })
        .catch((err) => {
          console.log(err);
          setError('error loading data')
        });
    }
  }, [problem, blueContainerContent])

  const scrollToElementHandler = (s: string) => {
    const element = document.getElementById(s)
    if (element) {
      element.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
    }
  }

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


      <div className={'px-3 w-full lg:max-w-screen-xl mx-auto'}>
        {linkObjects && <LinkObjectContainer scrollToHandler={scrollToElementHandler} linkObjects={linkObjects}/>}
      </div>

      <div className={'lg:grid grid-cols-3'}>

        <div className={'col-span-2'}>
          <div>
            {paragraphs && paragraphs.slice(0, 2).map(
              p => <ParagraphComp key={p.slug.current} paragraph={p}/>
            )}
          </div>
          <div>
            {problem && problem.blueContainerContent && blueContainerContent && blueContainerContent.map(
              b=> <div key={b.slug.current} className={'px-3'}>
                <BlueContainerComp blueContainerContent={b} />
              </div>
            )}
          </div>
          <div>
            {paragraphs && paragraphs.slice(2,).map(
              p => <ParagraphComp key={p.slug.current} paragraph={p}/>
            )}
          </div>

          <div>
            {mightInterestYou && mightInterestYou.map(o => <div key={o.title}>
              <MightInterestYouComp articles={o.articles}/>
            </div>)}
          </div>
        </div>
        <div></div>
      </div>

    </div>
  );
};

export default SomeFeelingView;
