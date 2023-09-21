import { useAuth } from 'contexts/AuthContext'
import LogIn from './LogIn'
import { PageNotFound } from '@jaedag/admin-portal-react-core'

interface ProtectedRouteProps {
  children: JSX.Element
  roles: string[]
  placeholder?: boolean
}

const PrivateRoute: (props: ProtectedRouteProps) => JSX.Element = (props) => {
  const { children, roles, placeholder } = props
  const { user } = useAuth()

  if (placeholder) {
    return children
  }

  if (!user) {
    return <LogIn />
  }

  if (roles.includes('all')) {
    return children
  }

  return <PageNotFound />
}

export default PrivateRoute
