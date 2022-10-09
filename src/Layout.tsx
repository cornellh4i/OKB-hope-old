import React from 'react';
import Topbar from "./Components/LayoutComps/Topbar";
import NavbarComp from "./Components/LayoutComps/NavbarComp";
import useWindowSize from "./hooks/use.window.size";
import SearchBarComp from "./Components/LayoutComps/SearchBarComp";

type Props={
  children?: React.ReactNode
}
const Layout:React.FC<Props> = ({children}) => {
  const {windowBig} = useWindowSize();

  return (
    <>
      <section className={"py-2 md:flex items-center md:w-10/12 mx-auto"}>
        <Topbar/>
        <NavbarComp />
        {windowBig && <SearchBarComp />}
      </section>

      <main>
        {children}
      </main>
      <footer>
        Footer
      </footer>
    </>
  );
};

export default Layout

