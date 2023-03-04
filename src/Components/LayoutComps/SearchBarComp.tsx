// comment the following code

import { useContext, useState } from "react";
import RoundedButton from "../Buttons/RoundedButton";
// import { ShowSearchCtx } from "../../ctx/showSearchCtx";

// this component is used in the Layout component. It is a search bar that is displayed on the top right of the screen. It is hidden on mobile screens. 
const SearchBarComp = ({ searchBarIsVisible, setSearchBarIsVisible }: any) => {
  // const { showSearchHandler } = useContext(ShowSearchCtx);
  // const [searchBarIsVisible, setSearchBarIsVisible] = useState(false);

  // this function is called when the search button is clicked. It calls the showSearchHandler function from the showSearchCtx context. This function is used to show the search bar.
  const searchHandler = () => {
    // showSearchHandler(false);
    setSearchBarIsVisible(true)
  };

  // this returns the search button. It is a rounded button with a magnifying glass svg icon.
  return (
    <div className={"flex px-2 gap-2 md:gap-4"}>
      <RoundedButton aLabel={"Search Button"} onClick={searchHandler}>
        <svg
          width="21"
          height="21"
          viewBox="0 0 21 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.875 19.875L13.6251 13.625M15.7083 8.41667C15.7083 12.4437 12.4437 15.7083 8.41667 15.7083C4.38959 15.7083 1.125 12.4437 1.125 8.41667C1.125 4.38959 4.38959 1.125 8.41667 1.125C12.4437 1.125 15.7083 4.38959 15.7083 8.41667Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </RoundedButton>
      {/*<RoundedButton aLabel={'voice search'} onClick={microphoneHandler}>*/}
      {/*  <svg width="17" height="23" viewBox="0 0 17 23" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
      {/*    <path*/}
      {/*      d="M15.7913 9.41658V11.4999C15.7913 15.527 12.5268 18.7916 8.49967 18.7916M1.20801 9.41658V11.4999C1.20801 15.527 4.4726 18.7916 8.49967 18.7916M8.49967 18.7916V21.9166M4.33301 21.9166H12.6663M8.49967 14.6249C6.77378 14.6249 5.37467 13.2258 5.37467 11.4999V4.20825C5.37467 2.48236 6.77378 1.08325 8.49967 1.08325C10.2256 1.08325 11.6247 2.48236 11.6247 4.20825V11.4999C11.6247 13.2258 10.2256 14.6249 8.49967 14.6249Z"*/}
      {/*      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>*/}
      {/*  </svg>*/}
      {/*</RoundedButton>*/}
    </div>
  );
};

export default SearchBarComp;
