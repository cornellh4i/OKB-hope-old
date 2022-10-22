import React, {useContext, useRef} from 'react';
import {ShowSearchCtx} from "../../ctx/showSearchCtx";
import {useNavigate} from "react-router-dom";

const SearchComp = () => {
  const {showSearchHandler, setSearchPhrase} = useContext(ShowSearchCtx);
  const navigate = useNavigate();
  const searchRef = useRef<HTMLInputElement | null>(null)


  const searchHandler = (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    const val = searchRef.current?.value
    if (val) {
      setSearchPhrase(val)
      navigate('/search')
      showSearchHandler(false)
    }
  }

  return (
    <div className={' w-full bg-white'}>

      <div className={'w-full mx-auto flex justify-center px-3'}>
        <form onSubmit={searchHandler}>
        <input ref={searchRef} className={'px-4 text-xl h-12 w-11/12 translate-x-2 border rounded-full'} type="text"/>
        <button className={'-translate-x-8'} onClick={searchHandler}>
          <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M19.875 19.875L13.6251 13.625M15.7083 8.41667C15.7083 12.4437 12.4437 15.7083 8.41667 15.7083C4.38959 15.7083 1.125 12.4437 1.125 8.41667C1.125 4.38959 4.38959 1.125 8.41667 1.125C12.4437 1.125 15.7083 4.38959 15.7083 8.41667Z"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        </form>
      </div>

      <div className={'flex justify-end w-full cursor-pointer'} onClick={
        () => showSearchHandler(false)
      }>
        <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48" fill={'currentColor'}>
          <path
            d="m12.45 37.65-2.1-2.1L21.9 24 10.35 12.45l2.1-2.1L24 21.9l11.55-11.55 2.1 2.1L26.1 24l11.55 11.55-2.1 2.1L24 26.1Z"/>
        </svg>
      </div>

    </div>
  );
};

export default SearchComp;
