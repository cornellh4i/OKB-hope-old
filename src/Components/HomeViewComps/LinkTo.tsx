import React from 'react';
import {Link} from "react-router-dom";

type Props = {
  children: React.ReactNode
  url: string
}
const LinkTo: React.FC<Props> = ({children, url}) => {
  const linkStyles = {fontFamily:'Roboto', fontWeight: '400'}

  return (
    <div className={'w-full'}>
      <Link className={''} style={linkStyles} to={url}>
        {children}
      </Link>
    </div>
  );
};

export default LinkTo;
