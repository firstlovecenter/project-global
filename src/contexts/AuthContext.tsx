import { auth } from 'firebase'
import {
  UserCredential,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateEmail as updateEmailAuth,
  updatePassword as updatePasswordAuth,
} from 'firebase/auth'
import SplashScreen from 'pages/SplashScreen'
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { Member } from 'types/types'

interface AuthContextType {
  user: Member
  signup: (email: string, password: string) => Promise<UserCredential>
  login: (email: string, password: string) => Promise<UserCredential>
  logout: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
  updateEmail: (email: string) => Promise<void>
  updatePassword: (password: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: {} as Member,
  signup: () => Promise.resolve({} as UserCredential),
  login: () => Promise.resolve({} as UserCredential),
  logout: () => Promise.resolve(),
  resetPassword: () => Promise.resolve(),
  updateEmail: () => Promise.resolve(),
  updatePassword: () => Promise.resolve(),
})

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setuser] = useState<Member>({} as Member)
  const [loading, setLoading] = useState(true)

  const signup = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const logout = () => {
    return signOut(auth)
  }

  const resetPassword = (email: string) => {
    return sendPasswordResetEmail(auth, email)
  }

  const updateEmail = (email: string) => {
    return updateEmailAuth(user, email)
  }

  const updatePassword = (password: string) => {
    return updatePasswordAuth(user, password)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setuser(user as Member)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    user,
    signup,
    login,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  }

  return (
    <AuthContext.Provider value={value}>
      {loading && <SplashScreen />}
      {!loading && children}
    </AuthContext.Provider>
  )
}
