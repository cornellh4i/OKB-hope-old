import React from 'react';
import Topbar from "./Components/LayoutComps/Topbar";
import NavbarComp from "./Components/LayoutComps/NavbarComp";
import useWindowSize from "./hooks/use.window.size";
import SearchBarComp from "./Components/LayoutComps/SearchBarComp";
import ScrollToTop from "react-scroll-to-top";
import FooterComp from "./Components/LayoutComps/FooterComp";

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
      <div className={'max-w-screen-xl mx-auto relative h-[72px]'}>
        <ScrollToTop smooth={true} color={'white'} height={'22'}
                     style={{position:'absolute', right: windowBig? '0rem': '1rem', top:'1rem',
                       width:'60px', background:'#2469A6', color:'white',
                       borderRadius:'3rem', padding: '0 1rem'}}
          // component={<span>back to top</span>}
        />
      </div>
      <footer className={'bg-blue'}>
        <FooterComp />
      </footer>
    </>
  );
};

export default Layout

