import React, {useEffect, useState} from 'react';
import {useLocation, useParams} from "react-router-dom";
import useProvideData, {CategoryObject} from "../hooks/useProvideData";
import HorizontalTeaserComp from "../Components/InfoAdviceComps/HorizontalTeaserComp";
import BreadCrumbs from "../Components/LayoutComps/BreadCrumbs";
import MightInterestYouComp from "../Components/MainFeelingComps/MightInterestYouComp";

const MainFeelingView = () => {


  const [pathLength, setPathLength] = useState(0);
  const [mightInterestYou, setMightInterestYou] = useState<null | CategoryObject[]>(null);
  const [categoryObject, setCategoryObject] = useState<null | CategoryObject>(null);
  // data
  const {categoryObjects} = useProvideData()

  let location = useLocation();
  let {feeling} = useParams()


  useEffect(() => {
    if (feeling && categoryObjects) {
      const filtered = categoryObjects?.filter(c => c.url === feeling)
      setCategoryObject(filtered[0])
      const otherFiltered = categoryObjects?.filter(c => c.url !== feeling)
      setMightInterestYou([otherFiltered[0]])
    }
    if (location) {
      setPathLength(location.pathname.split('/').length)
    }
  }, [feeling, categoryObjects, categoryObject])

  return (
    <div className={'md:w-10/12 mx-auto '}>
      <section className={'px-3'}>
        <BreadCrumbs/>
      </section>
      <section className={'px-3'}>
        <h2 className={`text-left text-2xl md:text-5xl font-bold text-blue mx-auto`}>
          {categoryObject?.title}
        </h2>
      </section>
      <section className={'lg:flex w-full px-3 gap-6 justify-start my-2 lg:my-8'}>
        {
          categoryObject && pathLength === 3 && categoryObject.articles && categoryObject.articles.map(
            a => <div className={'w-full lg:w-1/3'} key={a.title}>
              <HorizontalTeaserComp article={a}/>
            </div>
          )
        }
      </section>
      <section>
        {mightInterestYou && mightInterestYou.map(o => <div key={o.title}>
          <MightInterestYouComp articles={o.articles}/>
        </div>)}
      </section>
    </div>
  );
};

export default MainFeelingView;
