import React from 'react';
import {LinkObject} from "../../Views/SpecificIssueView";

type Props = {
  linkObjects: LinkObject[]
  scrollToHandler: (s: string) => void
}

const LinkObjectContainer: React.FC<Props> = ({scrollToHandler, linkObjects}) => {
  return (
    <div className={'w-full bg-[#ebf2f0] rounded-xl  py-2 px-3 '}>
      <h2 className={'text-blue font-bold'}>
        What you’ll find on this page
      </h2>
        <div className={''}>
          {linkObjects && linkObjects.map(o => <div className={''} key={o.slug}>
            <a className={'no-underline cursor-pointer text-[14px] text-black-color'}
                onClick={() => scrollToHandler(o.slug)}>
              {o.title}
            </a>
          </div>)}
        </div>

    </div>
  );
};

export default LinkObjectContainer;
