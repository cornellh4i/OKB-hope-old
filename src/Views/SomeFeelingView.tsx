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
type ArticleRef = {
  _key: string
  _ref: string
  _type: 'reference'
}
export type LinkObject = {
  title: string,
  slug: string
}


const SomeFeelingView = () => {
  const [error, setError] = useState<null | string>(null);
  const [paragraphs, setParagraphs] = useState<null | Paragraph[]>(null);
  const [linkObjects, setLinkObjects] = useState<null | LinkObject[]>(null);
  const {articleTitles} = useProvideData()
  const [problem, setProblem] = useState<null | Article>(null);
  const {windowBig} = useWindowSize()

  // sanity
  const builder = imageUrlBuilder(sanity);
  const urlFor = (source: SanityImageSource) => {
    return builder.image(source)
  }

  // let location = useLocation();


  let {problem: paramProblem} = useParams();


  useEffect(() => {
    if (!paragraphs && problem) {
      sanityClient
        .fetch(
          `*[_type == 'paragraph']`
        )
        .then((data) => {
          // console.log(data)
          const d: Paragraph[] = data.filter(((p: { article: ArticleRef[]; }) => p.article.find(a => a._ref === problem._id)))
          // console.log(d);
          d.sort((d: Paragraph) => d.serial_num)
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
    if (articleTitles) {
      const foundArticle = articleTitles.find(a => a.slug.current === paramProblem)
      if (foundArticle) {
        setProblem(foundArticle)
      }
    }
  }, [articleTitles])

  const scrollToElementHandler = (s:string) => {
    console.log(s)
    const element = document.getElementById(s)
    console.log(element)
    if (element){
      element.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"} )
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
            {paragraphs && paragraphs.slice(0, 3).map(
              p => <ParagraphComp key={p.slug.current} paragraph={p}/>
            )}
          </div>
          <div></div>
          <div>
            {paragraphs && paragraphs.slice(3,).map(
              p => <ParagraphComp key={p.slug.current} paragraph={p}/>
            )}
          </div>

        </div>
        <div></div>
      </div>

    </div>
  );
};

export default SomeFeelingView;
