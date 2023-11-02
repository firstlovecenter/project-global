import { ReactNode, createContext, useContext, useEffect, useMemo } from 'react'
import { Member, Role } from 'types/types'
import { useAuth } from './AuthContext'
import {
  collection,
  getDocs,
  getFirestore,
  limit,
  query,
  where,
} from 'firebase/firestore'
import { ApolloWrapper, InitialLoading } from '@jaedag/admin-portal-react-core'

interface UserContextType {
  user: Member
  isAuthorised: (permittedRoles: Role[]) => boolean
}

const UserContext = createContext<UserContextType>({
  user: {} as Member,
  isAuthorised: () => false,
})

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { user: currentUser, setUser: setCurrentUser } = useAuth()
  const user: Member = currentUser

  useEffect(() => {
    const getUserData = async (email: string) => {
      const db = getFirestore()

      const querySnapshot = await getDocs(
        query(collection(db, 'members'), where('email', '==', email), limit(1))
      )

      const members = querySnapshot.docs.map((doc) => ({
        id: doc.ref.id,
        ...doc.data(),
      }))

      const fromSessionStorage = JSON.parse(
        sessionStorage.getItem('user') ?? '{}'
      )

      setCurrentUser({
        ...fromSessionStorage,
        ...members[0],
      } as unknown as Member)

      return members[0]
    }

    if (currentUser?.email) {
      getUserData(currentUser?.email)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const isAuthorised = (permittedRoles: Role[]) => {
    if (permittedRoles?.includes('all')) {
      return true
    }

    if (!permittedRoles) {
      return true
    }

    return permittedRoles?.some((r) => user?.roles.includes(r))
  }

  const value = useMemo(
    () => ({
      user,
      isAuthorised,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user]
  )

  const isUserLoading = !user.id

  if (isUserLoading) {
    return <InitialLoading text={'Retrieving your church information...'} />
  }

  return (
    <UserContext.Provider value={value}>
      <ApolloWrapper data={user} loading={!user} error={undefined}>
        {children}
      </ApolloWrapper>
    </UserContext.Provider>
  )
}
