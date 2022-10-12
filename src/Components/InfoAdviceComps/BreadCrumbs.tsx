import {useState, useEffect} from 'react';
import {Link, useLocation} from "react-router-dom";

const BreadCrumbs = () => {
  const [locationStrings, setLocationStrings] = useState<null | string[]>(null);
  let location = useLocation();
  useEffect(() => {
    if (location) {
      const splitPath = location.pathname.split('/')
      // setLocationStrings([splitPath[splitPath.length-2].split('-').join(' ')])
      setLocationStrings(splitPath.slice(1, splitPath.length - 1))
    }
  }, [location])

  return (
    <div className={'py-0.5'}>
      {locationStrings && <Link className={'no-underline text-black'} to={`/${locationStrings!.join('/')}`}>
        {locationStrings!.join('>')}
      </Link>}
    </div>
  );
};

export default BreadCrumbs;
