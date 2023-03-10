import React from "react";
type Props = {
  children: React.ReactNode;
  aLabel: string;
  onClick: () => void;
};

const RoundedButton: React.FC<Props> = ({ children, onClick, aLabel }) => {
  return (
    <button
      aria-label={aLabel}
      onClick={onClick}
      className={`bg-[#EDF3F8] font-black h-14 w-14 rounded-full hover:bg-blue hover:text-white focus:border
             flex justify-center items-center`}
    >
      <span className={"p-2.5 mx-auto"}>{children}</span>
    </button>
  );
};

export default RoundedButton;
