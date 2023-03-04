import { User } from "firebase/auth"
import { createContext, useContext, FC, useState, useEffect } from "react"
import { auth } from "../firebase";

type AuthUser = User | null;
type AuthData = { user?: AuthUser }

const AuthUserContext = createContext<AuthData | undefined>(undefined)

type FCProps = { children?: React.ReactNode }

const AuthUserProvider: FC<FCProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUser>(null);

  useEffect(() => (auth.onAuthStateChanged(
    setUser
  )), [])

  return (<AuthUserContext.Provider value={{ user }}>{children}</AuthUserContext.Provider>);
}

export default AuthUserProvider;

export const useAuth = () => {
  const context = useContext(AuthUserContext)
  if (!context) throw new Error("AuthUserContext has no value")
  return context
}