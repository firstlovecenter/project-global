import { LazyRouteTypes } from 'auth/auth-types'
import { permitAdmin } from 'auth/auth-utils'
import { lazy } from 'react'

const RegisterMember = lazy(() => import('./RegisterMember'))
const MemberProfile = lazy(() => import('./MemberProfile'))
const MemberList = lazy(() => import('./MemberList'))

export const memberRoutes: LazyRouteTypes[] = [
  {
    path: '/member/register',
    element: RegisterMember,
    roles: ['all', ...permitAdmin('Campus')],
  },
  {
    path: '/member/profile',
    element: MemberProfile,
    roles: ['all', ...permitAdmin('Campus')],
  },
  {
    path: '/directory/members',
    element: MemberList,
    roles: ['all'],
  },
]
