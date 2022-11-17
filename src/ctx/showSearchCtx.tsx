import React, { createContext, ReactNode, useState } from "react";

type Props = {
  children: ReactNode;
};

export const ShowSearchCtx = createContext({
  searchPhrase: "",
  setSearchPhrase: (y: string) => {},
  showSearch: false,
  showSearchHandler: (x: boolean) => {},
});

const ShowSearchCtxProvider: React.FC<Props> = ({ children }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchPhrase, setSearchPhrase] = useState("");

  const showHandler = (x: boolean) => {
    setShowSearch(x);
  };
  const searchHandler = (y: string) => {
    setSearchPhrase(y);
  };

  const value: {
    showSearch: boolean;
    showSearchHandler: (x: boolean) => void;
    searchPhrase: string;
    setSearchPhrase: (y: string) => void;
  } = {
    showSearch,
    showSearchHandler: showHandler,
    searchPhrase,
    setSearchPhrase: searchHandler,
  };
  return (
    <ShowSearchCtx.Provider value={value}>{children}</ShowSearchCtx.Provider>
  );
};

export default ShowSearchCtxProvider;
