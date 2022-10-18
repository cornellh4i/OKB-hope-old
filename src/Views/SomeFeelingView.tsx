import React, {useEffect, useState} from 'react';
import {Article, Category} from "../hooks/useProvideData";
import imageUrlBuilder from "@sanity/image-url";
import sanity from "../client";
import {SanityImageSource} from "@sanity/image-url/lib/types/types";
import {useParams} from "react-router-dom";
import useWindowSize from "../hooks/use.window.size";
import {TypedObject} from "@portabletext/types";
import sanityClient from "../client";
import ParagraphComp from "../Components/SomeFeelingComps/ParagraphComp";
import LinkObjectContainer from "../Components/SomeFeelingComps/LinkObjectContainer";
import MightInterestYouComp from "../Components/MainFeelingComps/MightInterestYouComp";
import ColoredContainerComp from "../Components/SomeFeelingComps/ColoredContainerComp";
import BreadCrumbs from "../Components/LayoutComps/BreadCrumbs";
import YellowContainerComp from "../Components/SomeFeelingComps/YellowContainerComp";


export type Paragraph = {
  title: string
  slug: {
    _type: string
    current: string
  }
  body: TypedObject
  serial_num: number
  article: any[]
  colorKey?: string
}
export type BlueContainerContent = {
  title: string
  body: TypedObject
  warning: TypedObject
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
  const [heightState, setHeightState] = useState(0);
  const [category, setCategory] = useState<null | Category>(null);
  const [mightInterestYou, setMightInterestYou] = useState<null | Article[]>(null);
  const [error, setError] = useState<null | string>(null);
  const [blueContainerContent, setBlueContainerContent] = useState<null | BlueContainerContent[]>(null);
  const [paragraphs, setParagraphs] = useState<null | Paragraph[]>(null);
  const [linkObjects, setLinkObjects] = useState<null | LinkObject[]>(null);
  const [problem, setProblem] = useState<null | Article>(null);
  const {windowBig} = useWindowSize()

  const {windowHeight} = useWindowSize()
  // sanity
  const builder = imageUrlBuilder(sanity);
  const urlFor = (source: SanityImageSource) => {
    return builder.image(source)
  }

  let {problem: paramProblem, feeling} = useParams();

  useEffect(() => {

    if (!paragraphs && problem) {
      sanityClient
        .fetch(
          `*[_type=="paragraph" && "${problem._id}" in article[]._ref]`
        )
        .then((data) => {
          // console.log(data)
          const d: Paragraph[] = data.sort((a: { serial_num: number; }, b: { serial_num: number; }) => a.serial_num - b.serial_num);
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
    if ((!problem && paramProblem) || (problem && paramProblem !== problem.slug.current)) {
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
  }, [problem, paramProblem])

  useEffect(() => {
    if (!blueContainerContent && problem && problem.blueContainerContent && problem.blueContainerContent.length > 0) {
      const refList = problem?.blueContainerContent.map(b => b._ref)
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

  useEffect(() => {
    if (feeling && !category) {
      sanityClient
        .fetch(
          `*[_type == "category" && slug.current == "${feeling}"]{_id,page,title,slug,articles}`
        )
        .then((data) => {
          setCategory(data[0]);
        })
        .catch((err) => {
          console.log(err);
          setError('error loading data')
        });
    }
    if ((feeling && category && !mightInterestYou)) {
      sanityClient
        .fetch(
          `*[_type == "article" && "${category!._id}" != categories[]._ref]`
        )
        .then((data) => {
          const d: Article[] = data.filter((da: { categories: { _ref: string; }[]; }) => da.categories[0]._ref !== category._id).slice(2, 4)
          setMightInterestYou(d);
        })
        .catch((err) => {
          console.log(err);
          setError('error loading data')
        });
    }
  }, [feeling, category, mightInterestYou])

  const scrollToElementHandler = (s: string) => {
    const element = document.getElementById(s)
    if (element) {
      element.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
    }
  }

  const heightStateHandler = (n: number) => {
    if (n) {
      setHeightState(n)
    }
  }

  return (
    <div className={'w-screen relative'}>
      {error && <div>{error}</div>}
      {!windowBig && <div className={'mx-3'}>
        <BreadCrumbs/>
      </div>}
      {problem && <div className={'mt-4'}>
        <div className={'w-screen'}>
          {!windowBig &&
            <img className={'object-cover'} loading="lazy" src={urlFor(problem.mainImage).width(400).url()}
                 alt={problem.title}/>}
          {windowBig &&
            <img loading="lazy" className={'object-cover max-h-[600px] w-screen 2xl:max-w-screen-xl mx-auto'}
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


      <div className={'w-full px-3 lg:max-w-screen-xl mx-auto '}>
        {windowBig && <div className={'mb-3'}>
          <BreadCrumbs/>
        </div>}
        {linkObjects && <LinkObjectContainer scrollToHandler={scrollToElementHandler} linkObjects={linkObjects}/>}
      </div>

      <div className={'lg:grid grid-cols-3 w-full p-3 lg:max-w-screen-xl mx-auto lg:gap-10'}>

        <div className={!blueContainerContent ? 'col-span-3' : 'col-span-2'}>
          <div>
            {paragraphs && paragraphs.slice(0, 2).map(
              p => <ParagraphComp key={p.slug.current} paragraph={p}/>
            )}
          </div>
          <div>
            {!windowBig && problem && problem.blueContainerContent && blueContainerContent && blueContainerContent.map(
              b => <div key={b.slug.current} className={'px-3 my-3'}>
                <ColoredContainerComp blueContainerContent={b}/>
              </div>
            )}
          </div>
          <div className={''}>
            {paragraphs && paragraphs.slice(2,).map(
              p => <ParagraphComp key={p.slug.current} paragraph={p}/>
            )}
          </div>

        </div>
        <div>
          {windowBig && problem && problem.blueContainerContent && blueContainerContent && blueContainerContent.map(
            b => <div key={b.slug.current}
                      style={{minHeight: `${windowHeight / 3 * 2}px`}}
                      className={`flex flex-col justify-between`}>
              <ColoredContainerComp blueContainerContent={b}/>
            </div>
          )}
        </div>
      </div>

      {problem && problem.yellowContainerContent?.length > 0 &&
        <div className={'w-full px-3 lg:max-w-screen-xl mx-auto lg:grid lg:grid-cols-3 lg:gap-4'}>
          {problem.yellowContainerContent.map(y => <div key={y.serial_num}>
            <YellowContainerComp heightState={heightState} setHeightState={heightStateHandler} paragraph={y}/>
          </div>)}
        </div>}

      <div className={'mt-8 lg:mt-12'}>
        {mightInterestYou && mightInterestYou.length > 0 && category && <MightInterestYouComp category={category}/>
        }
      </div>
    </div>
  );
};

export default SomeFeelingView;
