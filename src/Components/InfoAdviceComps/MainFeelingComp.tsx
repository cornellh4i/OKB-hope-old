import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import defineLastElementInLocation from "../../hooks/defineLastElementInLocation";
import useProvideData, {CategoryObject} from "../../hooks/useProvideData";
import TeaserComp from "./TeaserComp";
import BreadCrumbs from "./BreadCrumbs";

const MainFeelingComp = () => {


  const [pathLength, setPathLength] = useState(0);

  const [categoryObject, setCategoryObject] = useState<null | CategoryObject>(null);
  let location = useLocation();
  const realLocation = defineLastElementInLocation(location.pathname);
  const {categoryObjects} = useProvideData()
  useEffect(() => {
    if (realLocation && categoryObjects) {
      const filtered = categoryObjects?.filter(c => c.url === realLocation)
      setCategoryObject(filtered[0])
    }
    if (location) {
      setPathLength(location.pathname.split('/').length)
      console.log(pathLength)
    }
  }, [realLocation, categoryObjects, categoryObject])

  return (
    <div className={'md:w-10/12 mx-auto'}>
      <BreadCrumbs/>
      <h2 className={`text-left text-2xl md:text-5xl font-bold text-blue mx-auto`}>
        {categoryObject?.title}
      </h2>
      <div className={'xl:flex w-full'}>
        {
          categoryObject && pathLength===3 && categoryObject.articles && categoryObject.articles.map(
            a =><div className={'w-full'} key={a.title}>
              <TeaserComp article={a} />
            </div>
          )
        }
      </div>
    </div>
  );
};

export default MainFeelingComp;
