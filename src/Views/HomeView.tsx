import {useEffect, useState} from "react";
import sanityClient from "../client.js";
import {TypedObject} from "@portabletext/types";
import HeroComp from "../Components/HomeViewComps/HeroComp";
import FeelingComp from "../Components/HomeViewComps/FeelingComp";

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

const HomeView = () => {
  const [error, setError] = useState<null | string>(null);
  const [homeViewContent, setHomeViewContent] = useState<null | HomeViewContent>(null);
  const [feelings, setFeelings] = useState<null | Feeling[]>(null);

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
  }, [homeViewContent])

  return (
    <>
      {error && <div>{error}</div>}
      <div className={''}>
        <HeroComp homeViewContent={homeViewContent}/>
      </div>
      <div>
        {feelings && <FeelingComp feelings={feelings}/>
        }      </div>
    </>
  );
};

export default HomeView;
