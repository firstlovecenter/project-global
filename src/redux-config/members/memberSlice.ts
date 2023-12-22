import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  member: null,
  loading: false,
  error: null,
}

const memberSlice = createSlice({
  name: 'member',
  initialState,
  reducers: {
    setMemberBio: (state, action) => ({
      ...state,
      data: {
        ...action.payload,
        createdAt: action.payload?.createdAt.toString(),
      },
    }),
  },
})

export default memberSlice.reducer
export const { setMemberBio } = memberSlice.actions
