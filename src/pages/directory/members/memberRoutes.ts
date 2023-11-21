import { LazyRouteTypes } from 'auth/auth-types'
import { permitAdmin } from 'auth/auth-utils'
import { lazy } from 'react'

const RegisterMember = lazy(() => import('./profile/RegisterMember'))
const MemberProfile = lazy(() => import('./profile/MemberProfile'))
const MemberList = lazy(() => import('./MemberList'))

export const memberRoutes: LazyRouteTypes[] = [
  {
    path: '/directory/register-member',
    element: RegisterMember,
    roles: ['all', ...permitAdmin('campus')],
  },
  {
    path: '/member/profile',
    element: MemberProfile,
    roles: ['all', ...permitAdmin('campus')],
  },
  {
    path: '/directory/members',
    element: MemberList,
    roles: ['all'],
  },
]
