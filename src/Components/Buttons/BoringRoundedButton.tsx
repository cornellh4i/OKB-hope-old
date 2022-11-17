import React, { useState } from "react";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
};

const BoringRoundedButton: React.FC<Props> = ({ children, onClick }) => {
  const [active, setActive] = useState<string>("drop-shadow-lg");
  const clickHandler = () => {
    setActive("");
    if (onClick) {
      onClick();
    }
  };
  return (
    <button
      onClick={clickHandler}
      style={{ fontFamily: "Roboto", fontWeight: "400" }}
      className={`bg-blue rounded-full py-2 ${active} transition focus:bg-[#004888] hover:bg-[#004888] focus:border focus:border-[#5DADEC] px-6 text-base lg:text-xl text-white`}
    >
      {children}
    </button>
  );
};

export default BoringRoundedButton;
