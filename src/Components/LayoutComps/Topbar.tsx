import React from "react";
import logo from "../../assets/Logo.png";
import SearchBarComp from "./SearchBarComp";
import useWindowSize from "../../hooks/use.window.size";
import { Link } from "react-router-dom";

const Topbar = () => {
  const { windowBig } = useWindowSize();
  return (
    <div
      className={
        "w-full md:w-28 bg-white flex justify-between mx-auto pb-2 md:pb-1"
      }
    >
      <div id="logo" className={"w-full pl-1"}>
        <Link to={"/"}>
          <img
            src={logo}
            alt="logo"
            className={"w-[60px] h-[60px] md:w-24 md:h-24"}
          />
        </Link>
      </div>
      {!windowBig && <SearchBarComp />}
    </div>
  );
};

export default Topbar;
