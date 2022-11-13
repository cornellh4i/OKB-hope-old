import {useEffect, useState} from "react";
import sanityClient from "../client.js";
import {TypedObject} from "@portabletext/types";
import HeroComp from "../Components/HomeViewComps/HeroComp";
import FeelingComp from "../Components/HomeViewComps/FeelingComp";
import GetInspiredComp from "../Components/HomeViewComps/GetInspiredComp";
import useWindowSize from "../hooks/use.window.size";
import GradientCommunicationSection from "../Components/HomeViewComps/GradientCommunicationSection";

type HeroContent = {
  title: string,
  mainImage: any,
  text: TypedObject
};
type Slug = {
  current: string,
  _type: string
}

export interface HomeViewContent {
  heroContent: HeroContent,
  slug: Slug,
  title: string,
  text: TypedObject

}

export type Feeling = {
  body: TypedObject
  icon: any
  page: string
  tag: string
  title: string
}

export type Inspiration = {
  mainImage: any
  page: string
  tag: string
  text: TypedObject
  title: string
  url: string
}

const HomeView = () => {
  const [error, setError] = useState<null | string>(null);
  const [homeViewContent, setHomeViewContent] = useState<null | HomeViewContent>(null);
  const [feelings, setFeelings] = useState<null | Feeling[]>(null);
  const [inspirations, setInspirations] = useState<null | Inspiration[]>(null);
  const {windowBig} = useWindowSize();


  useEffect(() => {
    if (!homeViewContent) {
      sanityClient
        .fetch(
          `*[_type == 'homeView']`
        )
        .then((data) => setHomeViewContent(data[0]))
        .catch((err) => {
          console.log(err);
          setError('error loading data')
        });
    }
    if (!feelings) {
      sanityClient
        .fetch(
          `*[_type == 'feelingsPreview' && page=='home']`
        )
        .then((data) => setFeelings(data))
        .catch((err) => {
          console.log(err);
          setError('error loading data')
        });
    }
    if (!inspirations) {
      sanityClient
        .fetch(
          `*[_type == 'getInspired' && page=='home']`
        )
        .then((data) => {
          const mappedData: Inspiration[] = data.map(
            (d: Inspiration) => {
              if (d.title === 'Grounding techniques') {
                return {
                  ...d,
                  url: 'tips/finding-your-inner-calm/grounding-techniques',
                }
              } else if (d.title === 'Basics of a healthy diet') {
                return {
                  ...d,
                  url: 'tips/taking-care-of-yourself/basics-of-a-healthy-diet',
                }
              } else if (d.title === 'Calming breathing exercises') {
                return {
                  ...d,
                  url: 'tips/finding-your-inner-calm/calming-breathing-exercises',
                }
              } else {
                return d
              }
            }
          )
          setInspirations(mappedData)
        })
        .catch((err) => {
          console.log(err);
          setError('error loading data')
        });
    }
  }, [homeViewContent, feelings, inspirations])

  useEffect(() => {
    if (!windowBig && inspirations && inspirations.length > 2) {
      const slicedInspirations = inspirations.slice(0, 2)
      setInspirations(slicedInspirations);
    }
  }, [windowBig, inspirations])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])


  return (
    <>
      {error && <div>{error}</div>}
      <section id={'hero'} className={''}>
        <HeroComp homeViewContent={homeViewContent}/>
      </section>
      <section id={'feelings'} className={'mx-4'}>
        {feelings && <FeelingComp feelings={feelings}/>
        }
      </section>
      <section id={'inspiration'} className={'mx-auto'}>
        <GetInspiredComp inspirations={inspirations}/>
      </section>
      <section id={'us'} className={'mt-[25px]'}>
        <GradientCommunicationSection url={'/about-us'} title={'Get to know us!'} buttonText={'Learn more about us'}/>
      </section>
    </>
  );
};

export default HomeView;
