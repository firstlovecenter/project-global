import { Action } from 'redux-config'

export const GET_MEMBER_BIO = 'GET_MEMBER_BIO'
export const GET_MEMBER_BIO_SUCCESS = 'GET_MEMBER_BIO_SUCCESS'
export const GET_MEMBER_BIO_FAILURE = 'GET_MEMBER_BIO_FAILURE'
export type MemberAction<T = unknown> = Action<
  | typeof GET_MEMBER_BIO
  | typeof GET_MEMBER_BIO_SUCCESS
  | typeof GET_MEMBER_BIO_FAILURE
> & {
  type: string
  payload: T
}
