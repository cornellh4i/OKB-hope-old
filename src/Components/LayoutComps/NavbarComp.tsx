import {NavLink} from "react-router-dom";
import modules from './NavbarComp.module.css'

const NavbarComp = () => {


  return (
    <nav className={`w-full z-50 md:text-lg bg-light-blue`}>
      <ul className={"flex justify-between md:justify-end md:gap-6 px-3 items-center md:h-16 md:pr-6"}>
        <li>
          <NavLink className={modules.nav_links} to={"/"}
          >
            <span className={"flex md:items-center"}>
              <span>
            <svg width="21" height="21" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.95833 9.5H2.375L9.5 2.375L16.625 9.5H15.0417" stroke="#2469A6" strokeWidth="1.5" strokeLinecap="round"
      strokeLinejoin="round"/>
<path
  d="M3.95898 9.5V15.0417C3.95898 15.4616 4.1258 15.8643 4.42273 16.1613C4.71966 16.4582 5.12239 16.625 5.54232 16.625H13.459C13.8789 16.625 14.2816 16.4582 14.5786 16.1613C14.8755 15.8643 15.0423 15.4616 15.0423 15.0417V9.5"
  stroke="#2469A6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path
  d="M7.125 16.6248V11.8748C7.125 11.4549 7.29182 11.0522 7.58875 10.7553C7.88568 10.4583 8.28841 10.2915 8.70833 10.2915H10.2917C10.7116 10.2915 11.1143 10.4583 11.4113 10.7553C11.7082 11.0522 11.875 11.4549 11.875 11.8748V16.6248"
  stroke="#2469A6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

          </span>
              <span  >Home</span>
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink className={modules.nav_links} to={'/info-advice'}>
            <span className={"flex md:items-center"}>
              <span>

                <svg width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clipPath="url(#clip0_409_5379)">
<path
  d="M10.0001 0.90918H2.72736C1.72736 0.90918 0.90918 1.72736 0.90918 2.72736V17.2728C0.90918 18.2728 1.72736 19.091 2.72736 19.091H13.6365C14.6365 19.091 15.4546 18.2728 15.4546 17.2728V6.36372L10.0001 0.90918Z"
  stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M10 0.90918V6.36373H15.4545" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M11.8186 10.9092H4.5459" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M11.8186 14.5459H4.5459" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M6.36408 7.27246H5.45499H4.5459" stroke="black" strokeWidth="1.5" strokeLinecap="round"
      strokeLinejoin="round"/>
</g>
<defs>
<clipPath id="clip0_409_5379">
<rect width="16.3636" height="20" fill="white"/>
</clipPath>
</defs>
</svg>

              </span>
              <span >
                Info-Advice
              </span>
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink className={modules.nav_links} to={'/tips'}>

            <span className={"flex md:items-center"}>
              <span>
                <svg width="21" height="21" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path
  d="M2.375 9.5H3.16667M9.5 2.375V3.16667M15.8333 9.5H16.625M4.43333 4.43333L4.9875 4.9875M14.5667 4.43333L14.0125 4.9875"
  stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path
  d="M7.12435 12.6665C6.45972 12.168 5.96878 11.4731 5.72107 10.6801C5.47335 9.88709 5.48143 9.03625 5.74414 8.2481C6.00686 7.45995 6.5109 6.77444 7.18487 6.28867C7.85884 5.8029 8.66856 5.5415 9.49935 5.5415C10.3301 5.5415 11.1399 5.8029 11.8138 6.28867C12.4878 6.77444 12.9918 7.45995 13.2546 8.2481C13.5173 9.03625 13.5253 9.88709 13.2776 10.6801C13.0299 11.4731 12.539 12.168 11.8743 12.6665C11.5653 12.9725 11.3325 13.3469 11.195 13.7595C11.0575 14.1721 11.019 14.6113 11.0827 15.0415C11.0827 15.4614 10.9159 15.8642 10.6189 16.1611C10.322 16.458 9.91928 16.6248 9.49935 16.6248C9.07942 16.6248 8.6767 16.458 8.37976 16.1611C8.08283 15.8642 7.91602 15.4614 7.91602 15.0415C7.97971 14.6113 7.94123 14.1721 7.8037 13.7595C7.66617 13.3469 7.43344 12.9725 7.12435 12.6665"
  stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M7.67969 13.4585H11.3214" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

              </span>
              <span >
                Tips
              </span>
            </span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavbarComp;
