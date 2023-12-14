import { createSlice } from '@reduxjs/toolkit'

const memberSlice = createSlice({
  name: 'member',
  initialState: {
    member: null,
    loading: false,
    error: null,
  },
  reducers: {
    getMemberBio: (state) => {
      state.loading = true
    },
    getMemberBioSuccess: (state, action) => {
      state.loading = false
      state.member = action.payload
    },
    getMemberBioFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
  },
})

export default memberSlice.reducer
export const { getMemberBio, getMemberBioSuccess, getMemberBioFailure } =
  memberSlice.actions
