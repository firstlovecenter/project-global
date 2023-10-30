import { LazyRouteTypes } from 'auth/auth-types'
import { permitAdmin } from 'auth/auth-utils'
import { lazy } from 'react'

const RegisterMember = lazy(() => import('./RegisterMember'))
const MemberProfile = lazy(() => import('./MemberProfile'))

export const memberRoutes: LazyRouteTypes[] = [
  {
    path: '/member/register',
    element: RegisterMember,
    roles: ['all', ...permitAdmin('campus')],
  },
  {
    path: '/member/profile',
    element: MemberProfile,
    roles: ['all', ...permitAdmin('campus')],
  },
]
