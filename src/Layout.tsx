import React, { useState, useEffect, useContext } from "react";
import Topbar from "./Components/LayoutComps/Topbar";
import NavbarComp from "./Components/LayoutComps/NavbarComp";
import useWindowSize from "./hooks/use.window.size";
import ScrollToTop from "react-scroll-to-top";
import FooterComp from "./Components/LayoutComps/FooterComp";
// import useScrollDirection from "./hooks/useScrollDirection";
import SearchComp from "./Components/LayoutComps/SearchComp";
import { ShowSearchCtx } from "./ctx/showSearchCtx";

type Props = {
  children?: React.ReactNode;
};
const Layout: React.FC<Props> = ({ children }) => {
  const [screenHeight, setScreenHeight] = useState(0);
  const { windowBig } = useWindowSize();

  // const direction = useScrollDirection()
  const { showSearch } = useContext(ShowSearchCtx);

  // useEffect(() => {
  //   const transformValuesOff = [
  //     {transform: 'translateY(0)'},
  //     {transform: 'translateY(-6.6rem)'},
  //   ]
  //   const transformValuesOn = [
  //     {transform: 'translateY(-6.6rem)'},
  //     {transform: 'translateY(0)'},
  //   ]
  //   const optionsOn = {
  //     duration: 400,
  //     fill: 'forwards',
  //     easing: 'ease-out'
  //   }
  //
  //   const element = document.getElementById('topbar')
  //   if (direction && direction === 'down' && element) {
  //     // @ts-ignore
  //     element.animate(transformValuesOff, optionsOn)
  //   } else if (element && direction && direction === 'up') {
  //     // @ts-ignore
  //     element.animate(transformValuesOn, optionsOn)
  //   }
  // }, [direction,])

  useEffect(() => {
    if (windowBig) {
      setScreenHeight(window.innerHeight - 310);
    } else {
      setScreenHeight(window.innerHeight - 310);
    }
  }, []);

  return (
    <div className={"w-screen bg-white relative"}>
      <div
        id={"topbar"}
        className={`w-screen bg-white z-30 top-0 left-0 right-0 h-[108px] drop-shadow`}
      >
        <section
          className={`bg-white md:flex items-center md:w-11/12 mx-auto md:px-14 top-0 left-0 right-0 z-40 pt-2`}
        >
          <Topbar />
          <NavbarComp />
          {!windowBig && (
            <div className={"top-26  right-0 left-0 z-50"}>
              {showSearch && <SearchComp />}
            </div>
          )}
        </section>
        {windowBig && (
          <div className={"relative w-full top-[106px]  right-0 left-0 z-50"}>
            {showSearch && <SearchComp />}
          </div>
        )}
      </div>

      <main className={""} style={{ minHeight: `${screenHeight}px` }}>
        {children}
      </main>
      <div className={"max-w-screen-xl mx-auto relative h-[72px]"}>
        <ScrollToTop
          smooth={true}
          color={"white"}
          height={"22"}
          style={{
            position: "absolute",
            right: windowBig ? "0rem" : "1rem",
            top: "1rem",
            width: "60px",
            background: "#2469A6",
            color: "white",
            borderRadius: "3rem",
            padding: "0 1rem",
            filter: "drop-shadow(0 4px 2px rgb(0 0 0 / 0.10))",
          }}
          // component={<span>back to top</span>}
        />
      </div>
      <footer className={"bg-blue "}>
        <FooterComp />
      </footer>
      <div className={"flex gap-4 w-full bg-blue mx-auto px-4"}>
        <div className={"relative  md:left-2/3 "}>
          <a
            style={{ color: "white", fontSize: "14px", textDecoration: "none" }}
            href="https://www.sanity.io"
          >
            Structured content powered by: Sanity.io
          </a>
        </div>
        <div className={"relative  md:left-2/3 "}>
          <a
            style={{ color: "white", fontSize: "14px", textDecoration: "none" }}
            href="https://www.vhodobay.com"
          >
            created by: vhodobay.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default Layout;
