import React from 'react';
import {Link} from "react-router-dom";
import friends from '../../assets/friends.png'
import sad from '../../assets/boy_sad.png'
import substance from '../../assets/addiction_boy.png'
import {CategoryObject} from "../../hooks/useProvideData";

type Props = {
  categoryObject: CategoryObject
}
const GrayLinkContainer: React.FC<Props> = ({categoryObject}) => {
  return (
    <div className={`w-full bg-gray-light p-3 mt-4 rounded md:w-1/3`}>
      <div className={'py-1.5'}>
        <Link className={'no-underline text-blue text-xl md:text-2xl font-bold'}
              to={categoryObject.url}>{categoryObject.title}</Link>
      </div>
      <div className={'grid grid-cols-2'}>
        <div>
          {categoryObject?.articles && categoryObject.articles.map((a, idx) => {
            return <div key={idx + a.title} className={'py-1'}>
              <Link className={'no-underline text-black'} style={{fontFamily: 'Roboto'}}
                    to={`/info-advice/${categoryObject.url}/${a.slug.current}`}>{a.title}</Link>
            </div>
          })}
        </div>
      <div className={'justify-self-end'}>
          <img className={'max-h-20 md:max-h-24'}
               src={categoryObject.url === 'you-and-others' ? friends : categoryObject.url === 'feelings-and-emotions'
                 ? sad : categoryObject.url === 'substance-abuse' ? substance : undefined}
               alt={categoryObject.title}/>
        </div>
      </div>
    </div>
  );
};

export default GrayLinkContainer;
