import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import defineLastElementInLocation from "../../hooks/defineLastElementInLocation";
import useProvideData, {CategoryObject} from "../../hooks/useProvideData";
import TeaserComp from "./TeaserComp";

const MainFeelingComp = () => {

  const [categoryObject, setCategoryObject] = useState<null | CategoryObject>(null);
  let location = useLocation();
  const realLocation = defineLastElementInLocation(location.pathname);
  const {categoryObjects} = useProvideData()
  useEffect(() => {
    if (realLocation && categoryObjects) {
      const filtered = categoryObjects?.filter(c => c.url === realLocation)
      setCategoryObject(filtered[0])
    }
  }, [realLocation, categoryObjects])
  console.log(categoryObject)
  return (
    <div className={'px-3'}>
      <h2 className={`text-left text-2xl md:text-5xl font-bold text-blue mx-auto`}>
        {categoryObject?.title}
      </h2>
      {
        categoryObject && categoryObject.articles && categoryObject.articles.map(
          a => <TeaserComp article={a} key={a.title}/>
        )
      }
    </div>
  );
};

export default MainFeelingComp;
