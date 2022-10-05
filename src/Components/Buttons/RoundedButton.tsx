import React from 'react';
type Props = {
  children: React.ReactNode,
  onClick: ()=>void
}

const RoundedButton:React.FC<Props> = ({children, onClick}) => {
  return (
    <button onClick={onClick} className={"bg-light-purple font-black h-14 w-14 rounded-full flex justify-center items-center"}>
      <span className={"p-2.5 mx-auto"}>{children}</span>
    </button>
  );
};

export default RoundedButton;
