import React from 'react';
import logo from '../../assets/Logo.png';
import useWindowSize from "../../hooks/use.window.size";
import SearchBarComp from "./SearchBarComp";

const Topbar = () => {

  const {windowBig} = useWindowSize();
  return (
    <div className={"w-full bg-white flex justify-between mx-auto pb-1"}>
      <div id="logo" className={"w-full"}>
        <img src={logo} alt="logo" className={"w-[60px] h-[60px] md:w-24 md:h-24"}/>
      </div>
      {!windowBig && <SearchBarComp />}
    </div>
  );
};

export default Topbar;
