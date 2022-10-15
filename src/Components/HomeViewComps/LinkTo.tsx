import React from 'react';
import {Link} from "react-router-dom";

type Props = {
  children: React.ReactNode
  url: string
}
const LinkTo: React.FC<Props> = ({children, url}) => {
  return (
    <div className={'w-full'}>
      <Link className={'lg:text-lg'} to={url}>
        {children}
      </Link>
    </div>
  );
};

export default LinkTo;
