import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

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
        state._id=action.payload._id
        state.accessToken=action.payload.accessToken
        state.username=action.payload.username
        state.email=action.payload.email
        state.premiumSubscriber=action.payload.premiumSubscriber
    }
  },
})

// Action creators are generated for each case reducer function
export const { setAccessToken, setUserDetails } = userSlice.actions

export default userSlice.reducer