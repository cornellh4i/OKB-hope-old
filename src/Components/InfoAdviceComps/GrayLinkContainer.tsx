import React from 'react';
import {Link} from "react-router-dom";
import {CategoryObject} from "../../Views/InfoAdviceView";

type Props = {
  categoryObject: CategoryObject
}
const GrayLinkContainer: React.FC<Props> = ({categoryObject}) => {
  return (
    <div  className={`w-full bg-gray-light p-3 mt-4 rounded`}>
      <div className={'py-1.5'}>
        <Link className={'no-underline text-blue text-xl md:text-2xl font-bold'}
              to={categoryObject.url}>{categoryObject.title}</Link>
      </div>
      {categoryObject?.articles && categoryObject.articles.map(a => {
        return <div className={'py-1'}>
          <Link className={'no-underline text-black font-bold '} to={a.slug.current}>{a.title}</Link>
        </div>
      })}
    </div>
  );
};

export default GrayLinkContainer;
