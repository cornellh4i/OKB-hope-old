import {useEffect, useState} from "react";
import sanityClient from "../client.js";
import {TypedObject} from "@portabletext/types";
import HeroComp from "../Components/HomeViewComps/HeroComp";
import FeelingComp from "../Components/HomeViewComps/FeelingComp";
import GetInspiredComp from "../Components/HomeViewComps/GetInspiredComp";
import useWindowSize from "../hooks/use.window.size";
import GetToKnowUs from "../Components/HomeViewComps/GetToKnowUs";
import ScrollToTop from "react-scroll-to-top";

type Herocontent = {
  title: string,
  mainImage: any,
  text: TypedObject
};
type Slug = {
  current: string,
  _type: string
}

export interface HomeViewContent {
  heroContent: Herocontent,
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
        .then((data) => setInspirations(data))
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

  console.log(inspirations)
  return (
    <>
      {error && <div>{error}</div>}
      <section id={'hero'} className={''}>
        <HeroComp homeViewContent={homeViewContent}/>
      </section>
      <section id={'feelings'} className={'mt-2 lg:mt-6 max-w-screen-xl mx-auto'}>
        {feelings && <FeelingComp feelings={feelings}/>
        }
      </section>
      <section id={'inspiration'} className={'max-w-screen-xl mx-auto lg:mt-6'}>
        <GetInspiredComp inspirations={inspirations}/>
      </section>
      <div className={'max-w-screen-xl mx-auto relative h-[72px]'}>
        <ScrollToTop smooth={true} color={'white'} height={'22'}
                     style={{position:'absolute', right: windowBig? '3rem': '1rem', top:'1rem',
                       width:'60px', background:'#2469A6', color:'white',
                       borderRadius:'3rem', padding: '0 1rem'}}
                     // component={<span>back to top</span>}
        />
      </div>
      <section id={'us'}>
        <GetToKnowUs />
      </section>
    </>
  );
};

export default HomeView;
