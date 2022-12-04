import { listenerCount } from "process";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import './BreadCrumbs.css';
/** 
 * Requires: link is non-empty and has to be in the format: "xxx-xxx-xxx" where xxx can be any string
 * Returns: an array of routes in dictionary form;
*/
function transformPathToRoutes(link: string) {
  const array = link.slice(1).split("/");
  const routes = [];
  for (let i = 0; i < array.length; i++) {
    const text = array[i].split("-")
    for (let j = 0; j < text.length; j++) {
      const temp = text[j];
      text[j] = temp.charAt(0).toUpperCase() + temp.slice(1)
    }
    const breadCrumbText = text.join(" ");
    console.log(breadCrumbText);
    routes.push(
      {
        path: "/" + array[i],
        breadcrumb: breadCrumbText
      }
    )
  }
  return routes
}

const BreadCrumbs = () => {
  const [locationStrings, setLocationStrings] = useState<null | string[]>(null);
  const [lastElementInPath, setLastElementInPath] = useState<null | string>(
    null
  );
  let location = useLocation();
  useEffect(() => {
    if (location) {
      const splitPath = location.pathname.split("/");
      const noDashesInPath = splitPath.map((p) => p.split("-").join(" "));
      setLocationStrings(splitPath.slice(1, splitPath.length - 1));
      setLastElementInPath(noDashesInPath[noDashesInPath.length - 1]);
    }
  }, [location]);
  const routes = transformPathToRoutes(location["pathname"]);
  const breadcrumbs = useBreadcrumbs(routes);
  console.log(breadcrumbs);
  console.log(breadcrumbs[breadcrumbs.length-1].match.pathname);
  return (
    <div
      className={"py-0.5"}
      style={{ fontFamily: "Futura PT Cond", fontWeight: "normal" }}
    >
      {breadcrumbs.map(({ match, breadcrumb }) => (
        <span>
          <Link
            className={"no-underline text-black"}
            key={match.pathname}
            to={match.pathname}>
            {breadcrumb}
          </Link>
          {lastElementInPath!=match.pathname && <span>{" > "}</span> }
        </span>
      ))}
    </div>
  );
};

export default BreadCrumbs;
