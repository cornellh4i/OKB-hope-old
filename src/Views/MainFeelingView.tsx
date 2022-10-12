import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import defineLastElementInLocation from "../hooks/defineLastElementInLocation";
import useProvideData, {CategoryObject} from "../hooks/useProvideData";
import HorizontalTeaserComp from "../Components/InfoAdviceComps/HorizontalTeaserComp";
import BreadCrumbs from "../Components/InfoAdviceComps/BreadCrumbs";
import MightInterestYouComp from "../Components/MainFeelingComps/MightInterestYouComp";

const MainFeelingView = () => {


  const [pathLength, setPathLength] = useState(0);

  const [mightInterestYou, setMightInterestYou] = useState<null | CategoryObject[]>(null);
  const [categoryObject, setCategoryObject] = useState<null | CategoryObject>(null);
  let location = useLocation();
  const realLocation = defineLastElementInLocation(location.pathname);
  const {categoryObjects} = useProvideData()
  useEffect(() => {
    if (realLocation && categoryObjects) {
      const filtered = categoryObjects?.filter(c => c.url === realLocation)
      setCategoryObject(filtered[0])
      const otherFiltered = categoryObjects?.filter(c => c.url !== realLocation)
      setMightInterestYou([otherFiltered[0]])
    }
    if (location) {
      setPathLength(location.pathname.split('/').length)
    }
  }, [realLocation, categoryObjects, categoryObject])

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
      <section className={'lg:flex w-full px-3 gap-6 justify-center my-2'}>
        {
          categoryObject && pathLength === 3 && categoryObject.articles && categoryObject.articles.map(
            a => <div className={'w-full'} key={a.title}>
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
