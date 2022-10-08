import React from 'react';

type Props = {
  children: React.ReactNode
}

const BoringRoundedButton:React.FC<Props> = ({children}) => {
  return (
    <button className={'bg-blue rounded-full py-2 px-6 text-lg text-white'} style={{fontFamily:'Roboto'}}>
      {children}
    </button>
  );
};

export default BoringRoundedButton;
