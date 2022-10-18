import {useEffect, useState} from 'react';
import {CategoryObject} from "../Views/MainHubView";

const useMightInterestYouFactory = (feeling: string|undefined, categoryObjects:CategoryObject[]|null) => {
  const [mightInterestYou, setMightInterestYou] = useState<null | CategoryObject[]>(null);
  const [categoryObject, setCategoryObject] = useState<null | CategoryObject>(null);

  useEffect(() => {
    if (feeling && categoryObjects) {
      const filtered = categoryObjects?.filter(c => c.url === feeling)
      setCategoryObject(filtered[0])
      const otherFiltered = categoryObjects?.filter(c => c.url !== feeling)
      setMightInterestYou([otherFiltered[0]])
    }
  }, [feeling, categoryObjects, categoryObject])
  return {mightInterestYou, categoryObject,}
};

export default useMightInterestYouFactory;
