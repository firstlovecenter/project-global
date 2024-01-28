import { configureStore } from '@reduxjs/toolkit'
import memberReducer from './members/memberSlice'
import userReducer from './user/userSlice'
import { Member } from 'types/types'

export interface RootState {
  member: {
    data: Member
    loading: boolean
    error: string | null
  }
  user: {
    data: Member
    loading: boolean
    error: string | null
  }
  // other state slices...
}

const store = configureStore({
  reducer: { member: memberReducer, user: userReducer },
})

export default store
