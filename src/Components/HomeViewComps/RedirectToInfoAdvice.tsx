import React from 'react';
import {Link} from "react-router-dom";
type Props={
  children:React.ReactNode
}
const RedirectToInfoAdvice:React.FC<Props> = ({children}) => {
  return (
      <div className={'w-full mt-2 mb-4'}>
        <Link to={'/info-advice'}>
          {children}
        </Link>
      </div>
  );
};

export default RedirectToInfoAdvice;
