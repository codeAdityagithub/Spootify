import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../UserSlice'
import playlistReducer  from '../PlaylistSlice'
import songReducer  from '../SongSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    playlist:playlistReducer,
    song:songReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch