import { User } from "firebase/auth"
import { createContext, useContext, FC } from "react"
import { WrappedComponentProps } from "react-with-firebase-auth"
import { createComponentWithAuth } from "../firebase"

type AuthData = Omit<WrappedComponentProps, "user"> & {
  user?: User | null
}

const AuthUserContext = createContext<AuthData | undefined>(undefined)

type FCProps = WrappedComponentProps & {
  children?: React.ReactNode
}

const AuthUserProvider: FC<FCProps> = ({ children, ...auth }) => (
  <AuthUserContext.Provider value={auth}>{children}</AuthUserContext.Provider>
)

export default createComponentWithAuth(AuthUserProvider)

export const useAuth = () => {
  const context = useContext(AuthUserContext)
  if (!context) throw new Error("AuthUserContext has no value")
  return context
}