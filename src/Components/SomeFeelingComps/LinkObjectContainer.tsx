import React from 'react';
import {LinkObject} from "../../Views/SpecificIssueView";

type Props = {
  linkObjects: LinkObject[]
  scrollToHandler: (s: string) => void
}

const LinkObjectContainer: React.FC<Props> = ({scrollToHandler, linkObjects}) => {
  return (
    <div className={'w-full lg:w-2/3'}>
      <h3 className={'text-blue font-bold text-xl p-3 bg-gray-light rounded-xl'}>
        What you’ll find on this page
        <div className={'my-2'}>
          {linkObjects && linkObjects.map(o => <div className={'py-2'} key={o.slug}>
            <h4 className={'no-underline text-black font-light cursor-pointer text-sm lg:text-base'}
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
