import React from 'react';
import {LinkObject} from "../../Views/SomeFeelingView";

type Props = {
  linkObjects: LinkObject[]
  scrollToHandler: (s: string) => void
}

const LinkObjectContainer: React.FC<Props> = ({scrollToHandler, linkObjects}) => {
  return (
    <div className={'w-full lg:w-1/4'}>
      <h3 className={'text-blue font-bold p-3 bg-gray-light rounded-xl'}>
        What you’ll find on this page
        <div className={'my-2'}>
          {linkObjects && linkObjects.map(o => <div className={'py-0.5'} key={o.slug}>
            {/*<Link className={'no-underline text-black'} to={`#${o.slug}`}>*/}
            {/*  {o.title}*/}
            {/*</Link>*/}
            <h4 className={'no-underline text-black cursor-pointer'}
                onClick={() => scrollToHandler(o.slug)}>
              {o.title}
            </h4>
          </div>)}
        </div>
      </h3>
    </div>
  );
};

export default LinkObjectContainer;
