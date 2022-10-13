import {useState, useEffect} from 'react';
import {Link, useLocation} from "react-router-dom";

const BreadCrumbs = () => {
  const [locationStrings, setLocationStrings] = useState<null | string[]>(null);
  const [lastElementInPath, setLastElementInPath] = useState<null | string>(null);
  let location = useLocation();
  useEffect(() => {
    if (location) {
      const splitPath = location.pathname.split('/')
      const noDashesInPath = splitPath.map(
        p => p.split('-').join(' ')
      )
      // setLocationStrings([splitPath[splitPath.length-2].split('-').join(' ')])
      setLocationStrings(splitPath.slice(1, splitPath.length - 1))
      setLastElementInPath(noDashesInPath[noDashesInPath.length - 1])
    }
  }, [location])

  return (
    <div className={'py-0.5'}>
      <span>
              {locationStrings && <Link className={'no-underline text-black'} to={`/${locationStrings!.join('/')}`}>
                {locationStrings!.map(s => s.split('-').join(' ')).join(' > ') + ' > '}
              </Link>}
        <span>{lastElementInPath}</span>
      </span>
    </div>
  );
};

export default BreadCrumbs;
