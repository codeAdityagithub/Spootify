import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { UserType } from "../types";


const initialState: UserType = {
    _id: "",
    accessToken: "",
    username: "",
    email: "",
    premiumSubscriber: false,
}

export const userSlice = createSlice({
  name: 'userState',
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload
    },
    setUserDetails: (state, action: PayloadAction<UserType>)=>{
        state = {...action.payload}
    }
  },
})

// Action creators are generated for each case reducer function
export const { setAccessToken, setUserDetails } = userSlice.actions

export default userSlice.reducer