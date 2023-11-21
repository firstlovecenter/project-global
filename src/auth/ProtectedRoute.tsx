import { useAuth } from 'contexts/AuthContext'
import LogIn from './LogIn'
import { PageNotFound } from '@jaedag/admin-portal-react-core'
import { Member, Role } from 'types/types'
import { isAuthorised, Role as FakeRole } from '@jaedag/admin-portal-types'

interface ProtectedRouteProps {
  children: JSX.Element
  roles: string[]
  placeholder?: boolean
}

const getRoles = (user: Member): Role[] => {
  const roles: string[] = []
  user.roleChurches?.forEach((church) => {
    roles.push(`${church.role}${church.level}`)
  })

  return roles as Role[]
}

const ProtectedRoute: (props: ProtectedRouteProps) => JSX.Element = (props) => {
  const { children, roles, placeholder } = props
  const { user } = useAuth()
  console.log('🚀 ~ file: ProtectedRoute.tsx:25 ~ user:', user)

  if (placeholder) {
    return children
  }

  if (!user) {
    return <LogIn />
  }

  if (
    isAuthorised(
      roles as unknown as FakeRole[],
      getRoles(user) as unknown as FakeRole[]
    )
  ) {
    return children
  }

  if (roles.includes('all')) {
    return children
  }

  return <PageNotFound />
}

export default ProtectedRoute
