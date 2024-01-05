import { LazyRouteTypes } from 'auth/auth-types'
import { permitAdmin } from 'auth/auth-utils'
import { lazy } from 'react'

const RegisterMember = lazy(() => import('./profile/RegisterMember'))
const MemberProfile = lazy(() => import('./profile/MemberProfile'))
const MemberList = lazy(() => import('./MemberList'))
const MemberBioData = lazy(() => import('./profile/documents/MemberBioData'))
const EditMemberBioData = lazy(
  () => import('./profile/documents/EditMemberBioData')
)

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
  {
    path: '/member/documents/bio-data',
    element: MemberBioData,
    roles: ['all'],
  },
  {
    path: '/member/documents/bio-data/edit',
    element: EditMemberBioData,
    roles: ['all'],
  },
]
