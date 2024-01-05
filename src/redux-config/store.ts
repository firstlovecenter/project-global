import { configureStore } from '@reduxjs/toolkit'
import memberReducer from './members/memberSlice'
import { Member } from 'types/types'

export interface RootState {
  member: {
    data: Member
    loading: boolean
    error: string | null
  }
  // other state slices...
}

const store = configureStore({
  reducer: { member: memberReducer },
})

export default store
