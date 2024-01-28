import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  loading: false,
  error: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => ({
      ...state,
      data: {
        ...action.payload,
      },
    }),
  },
})

export default userSlice.reducer

export const { setUser } = userSlice.actions
