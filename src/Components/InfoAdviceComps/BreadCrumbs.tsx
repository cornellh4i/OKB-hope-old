import {useState, useEffect} from 'react';
import {Link, useLocation} from "react-router-dom";

const BreadCrumbs = () => {
  const [locationStrings, setLocationStrings] = useState<null | string[]>(null);
  let location = useLocation();
  useEffect(() => {
    if (location) {
     const splitPath=location.pathname.split('/')
      setLocationStrings([splitPath[splitPath.length-2]])
    }
  }, [location])
  return (
    <div className={'py-0.5'}>
      {locationStrings?.map(
        (str,idx)=><span key={idx}>
          <Link to={`/${str}`}
                className={`no-underline px-0.5 text-black`}
                >
        {str+'>'}
      </Link>
          <span className={'font-bold'}>{location.pathname.split('/')[
            location.pathname.split('/').length-1
            ]}</span>
        </span>)}
    </div>
  );
};

export default BreadCrumbs;
