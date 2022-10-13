import React, { useState, useEffect} from 'react';
import Topbar from "./Components/LayoutComps/Topbar";
import NavbarComp from "./Components/LayoutComps/NavbarComp";
import useWindowSize from "./hooks/use.window.size";
import SearchBarComp from "./Components/LayoutComps/SearchBarComp";
import ScrollToTop from "react-scroll-to-top";
import FooterComp from "./Components/LayoutComps/FooterComp";

type Props = {
  children?: React.ReactNode
}
const Layout: React.FC<Props> = ({children}) => {
  const [screenHeight, setScreenHeight] = useState(0);
  const {windowBig} = useWindowSize();

  useEffect(()=>{
    if (windowBig) {
      setScreenHeight(window.innerHeight-310)
    } else {
      setScreenHeight(window.innerHeight-310)

    }
  },[])

  return (
    <div className={'w-screen bg-white relative'} >
      <section className={" bg-white md:flex items-center md:w-11/12 mx-auto md:px-14 fixed top-0 left-0 right-0 z-50 pt-2"}>
          <Topbar/>
          <NavbarComp/>

        {windowBig && <SearchBarComp/>}
      </section>

      <main className={'mt-[108px]'} style={{minHeight:`${screenHeight}px`}}>
        {children}
      </main>
      <div className={'max-w-screen-xl mx-auto relative h-[72px]'}>
        <ScrollToTop smooth={true} color={'white'} height={'22'}
                     style={{
                       position: 'absolute', right: windowBig ? '0rem' : '1rem', top: '1rem',
                       width: '60px', background: '#2469A6', color: 'white',
                       borderRadius: '3rem', padding: '0 1rem'
                     }}
          // component={<span>back to top</span>}
        />
      </div>
      <footer className={'bg-blue '}>
        <FooterComp/>
      </footer>
    </div>
  );
};

export default Layout

