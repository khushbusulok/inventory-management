import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slice/authSlice'
import userReducer from './slice/userSlice'
import { useDispatch } from 'react-redux'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const dispatch:AppDispatch = store.dispatch