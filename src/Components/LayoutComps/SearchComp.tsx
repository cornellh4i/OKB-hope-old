import { useContext, useRef } from "react";
import { ShowSearchCtx } from "../../ctx/showSearchCtx";
import { useNavigate } from "react-router-dom";

type SetSearchBarIsVisible = (value: boolean) => void;
interface SearchBarComponentProps {
  searchBarIsVisible: boolean;
  setSearchBarIsVisible: SetSearchBarIsVisible;
}

const SearchComp = (props: SearchBarComponentProps) => {
  const { setSearchPhrase } = useContext(ShowSearchCtx);
  const navigate = useNavigate();
  const searchRef = useRef<HTMLInputElement | null>(null);


  const searchHandler = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const val = searchRef.current?.value;
    if (val) {
      setSearchPhrase(val);
      navigate("/search");

    }
  };

  return (
    <div className={"w-full mx-auto flex justify-center px-3"}>
      <form onSubmit={searchHandler}>
        <input
          aria-label="Search Text Field"
          autoFocus={true}
          ref={searchRef}
          className={
            "px-4 text-xl h-12 w-11/12 translate-x-2 border rounded-full"
          }
          type="text"
        />
        <button className={"-translate-x-8"} onClick={searchHandler}>
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
        </button>
      </form>

      <div
        className={"flex justify-left align-items:center cursor-pointer"}
        onClick={() => { props.setSearchBarIsVisible(false) }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill={"currentColor"}
          height="40"
          width="40"
        >
          <path d="m10.458 31.458-1.916-1.916 9.5-9.542-9.5-9.542 1.916-1.916 9.542 9.5 9.542-9.5 1.916 1.916-9.5 9.542 9.5 9.542-1.916 1.916-9.542-9.5Z" />
        </svg>
      </div>
    </div >
  );
};

export default SearchComp;
