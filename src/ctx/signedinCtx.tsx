import { User } from "firebase/auth";
import { loggedIn } from "../firebase/firebase";
import React, { createContext, ReactNode, useState } from "react";

type Props = {
  children: ReactNode;
};

// This is the context that is used to show and hide the search bar. It is used in the Layout component.  
export const SignedInCtx = createContext({
  showUser: false,
  setUser: (x: boolean) => {},
});

// This is the provider for the signedinCtx context. It is used in the Layout component. 
const SignedInCtxProvider: React.FC<Props> = ({ children }) => {
  const [showUser, setUser] = useState(false);

  const showHandler = () => {
    setUser(loggedIn === null ? true : false);
  };

  const value: {
    showUser: boolean;
    setUser: (x: boolean) => void;
  } = {
    showUser,
    setUser: showHandler
  };
  return (
    <SignedInCtx.Provider value={value}>{children}</SignedInCtx.Provider>
  );
};

export default SignedInCtxProvider;