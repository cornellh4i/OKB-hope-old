import React from 'react';

type Props = {
  children: React.ReactNode
  onClick?: () => void
}

const BoringRoundedButton: React.FC<Props> = ({children, onClick}) => {
  return (
    <button onClick={onClick}
            className={'bg-blue rounded-full py-2 px-6 text-lg lg:text-xl text-white'} >
      {children}
    </button>
  );
};

export default BoringRoundedButton;
