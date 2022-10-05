import React from 'react';
type Props = {
  children: React.ReactNode,
  onClick: ()=>void
}

const RoundedButton:React.FC<Props> = ({children, onClick}) => {
  return (
    <button onClick={onClick} className={"bg-light-purple font-black p-3 rounded-full"}>
      <div className={"p-2"}>{children}</div>
    </button>
  );
};

export default RoundedButton;
