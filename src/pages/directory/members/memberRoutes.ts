import { LazyRouteTypes } from 'auth/auth-types'
import { permitAdmin } from 'auth/auth-utils'
import { lazy } from 'react'

const RegisterMember = lazy(() => import('./RegisterMember'))

export const memberRoutes: LazyRouteTypes[] = [
  {
    path: '/member/register',
    element: RegisterMember,
    roles: ['all', ...permitAdmin('campus')],
  },
]
