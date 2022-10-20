import React, {useEffect, useState} from 'react';
import {Article, Category} from "./MainHubView";
import imageUrlBuilder from "@sanity/image-url";
import sanity from "../client";
import {SanityImageSource} from "@sanity/image-url/lib/types/types";
import {useLocation, useParams} from "react-router-dom";
import useWindowSize from "../hooks/use.window.size";
import {TypedObject} from "@portabletext/types";
import sanityClient from "../client";
import ParagraphComp from "../Components/SomeFeelingComps/ParagraphComp";
import LinkObjectContainer from "../Components/SomeFeelingComps/LinkObjectContainer";
import MightInterestYouComp from "../Components/MainFeelingComps/MightInterestYouComp";
import ColoredContainerComp from "../Components/SomeFeelingComps/ColoredContainerComp";
import BreadCrumbs from "../Components/LayoutComps/BreadCrumbs";
import BottomBlueContainerComp from "../Components/SomeFeelingComps/BottomBlueContainerComp";
import GradientCommunicationSection from "../Components/HomeViewComps/GradientCommunicationSection";


export type Paragraph = {
  title: string
  slug: {
    _type: string
    current: string
  }
  body: TypedObject
  serial_num: number
  article: any[]
  tipArticle: any
  aboutUs: any
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


const SpecificIssueView = () => {
  const [heightState, setHeightState] = useState(0);
  const [category, setCategory] = useState<null | Category>(null);
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

  let {pathname} = useLocation()

  const firstElementInPath = pathname.split('/')[1]

  let {problem: paramProblem, feeling, tipCategory, tip} = useParams();
  // console.log('tipCategory', tipCategory)
  // console.log('tip', tip)
  console.log('paragraphs', paragraphs)
  // console.log('problem', problem)
  // console.log(category)
  // console.log(feeling)
  // console.log(firstElementInPath)

  // about us request
  useEffect(() => {
    if (firstElementInPath === 'about-us') {
      if ((!problem) || problem.slug.current !== 'about-us') {
        sanityClient
          .fetch(
            `*[_type == 'aboutUs']`
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
      if ((problem && !paragraphs) || (problem && paragraphs && !paragraphs[0]?.aboutUs)) {
        sanityClient
          .fetch(
            `*[_type=="paragraph" && "${problem._id}" in aboutUs[]._ref]`
          )
          .then((data) => {
            console.log(data)
            const d: Paragraph[] = data.sort((a: { serial_num: number; }, b: { serial_num: number; }) => a.serial_num - b.serial_num);
            setParagraphs(d);
          })
          .catch((err) => {
            console.log(err);
            setError('error loading data')
          });
      }
      if ((paragraphs && !linkObjects) || (paragraphs && linkObjects && !paragraphs[0]?.aboutUs)) {
        setLinkObjects(paragraphs.map(p => {
          return {
            title: p.title,
            slug: p.slug.current
          }
        }))
      }

    }

  }, [firstElementInPath, problem, paragraphs, linkObjects])

  useEffect(() => {
    if (firstElementInPath !== 'about-us') {
      if (paramProblem) {
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
      }
      if (tip) {
        if (!paragraphs && problem) {
          sanityClient
            .fetch(
              `*[_type=="paragraph" && "${problem._id}" in tipArticle[]._ref]`
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
      }

    }
  }, [paragraphs, problem, linkObjects, tip, firstElementInPath])

  //article
  useEffect(() => {
    if (paramProblem && feeling) {
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
    }
    if (tipCategory && tip) {
      if ((!problem && tip) || (problem && tip !== problem.slug.current)) {
        sanityClient
          .fetch(
            `*[_type == 'tipArticle' && slug.current == '${tip}']`
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
    }
  }, [problem, paramProblem])

  //blue container
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
    if (feeling) {

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

    }
    if (tipCategory) {
      if (tipCategory && !category) {
        sanityClient
          .fetch(
            `*[_type == "tipCategory" && slug.current == "${tipCategory}"]{_id,page,title,slug,articles}`
          )
          .then((data) => {
            // console.log(data)
            setCategory(data[0]);
          })
          .catch((err) => {
            console.log(err);
            setError('error loading data')
          });
      }

    }
  }, [feeling, category, tipCategory])

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


      <section className={'w-full px-3 lg:max-w-screen-xl mx-auto '}>
        {windowBig && firstElementInPath !== 'about-us'  && <div className={'mb-3'}>
          <BreadCrumbs/>
        </div>}
        {linkObjects && firstElementInPath !== 'about-us' &&
          <LinkObjectContainer scrollToHandler={scrollToElementHandler} linkObjects={linkObjects}/>}
      </section>

      <div className={'lg:grid grid-cols-3 w-full p-3 lg:max-w-screen-xl mx-auto lg:gap-10'}>

        <div className={!blueContainerContent ? 'col-span-2' : 'col-span-2'}>
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
            <BottomBlueContainerComp heightState={heightState} setHeightState={heightStateHandler} paragraph={y}/>
          </div>)}
        </div>}

      <div className={'mt-8 lg:mt-12'}>
        {
          category && <MightInterestYouComp category={category}/>
        }
      </div>
      <section id={'contact-us'} className={'mt-16'}>
        <GradientCommunicationSection
          url={'/contact-us'} title={'Do you want to know about other topics?'}
          buttonText={'Send us suggestions!'}/>
      </section>
    </div>
  );
};

export default SpecificIssueView;
