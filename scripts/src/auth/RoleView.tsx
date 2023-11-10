import { isAuthorised } from '@jaedag/admin-portal-types'
import { useAuth } from 'contexts/AuthContext'
import React from 'react'
import { Role as OtherRole } from '@jaedag/admin-portal-types'
import { Role } from 'types/types'

type RoleViewProps = {
  roles: Role[]
  children: React.ReactNode
}

const RoleView = (props: RoleViewProps) => {
  const { roles, children } = props
  const { user } = useAuth()

  if (isAuthorised(roles as OtherRole[], user.roles as OtherRole[])) {
    return <>{children}</>
  } else {
    return null
  }
}

export default RoleView
