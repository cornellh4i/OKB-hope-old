import React from 'react';
import {Link} from "react-router-dom";
import {CategoryObject} from "../../Views/InfoAdviceView";
import useWindowSize from "../../hooks/use.window.size";

type Props = {
  categoryObject: CategoryObject
}
const GrayLinkContainer: React.FC<Props> = ({categoryObject}) => {
  const {windowBig} = useWindowSize()
  return (
    <div className={`w-full bg-gray-light p-3 mt-4 rounded md:w-1/3`}>
      <div className={'py-1.5'}>
        <Link className={'no-underline text-blue text-xl md:text-2xl font-bold'}
              to={categoryObject.url}>{categoryObject.title}</Link>
      </div>
      <div className={'md:grid grid-cols-2'}>
        <div>
          {categoryObject?.articles && categoryObject.articles.map((a, idx) => {
            return <div key={idx + a.title} className={'py-1'}>
              <Link className={'no-underline text-black'} style={{fontFamily: 'Roboto'}}
                    to={a.slug.current}>{a.title}</Link>
            </div>
          })}
        </div>
        {windowBig ? <div className={'justify-self-end'}>
          <img className={'max-h-24'}
               src={categoryObject.url === 'you-and-others' ? 'src/assets/friends.png' : categoryObject.url === 'feelings-and-emotions' ? 'src/assets/boy_sad.png' : categoryObject.url === 'substance-abuse' ? 'src/assets/addiction_boy.png' : undefined}
               alt=""/>
        </div> : null}
      </div>
    </div>
  );
};

export default GrayLinkContainer;
