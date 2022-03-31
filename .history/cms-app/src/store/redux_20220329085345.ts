import { createStore } from 'redux'
import rootReducer from '../reducers'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    comments: commentsReducer,
    users: usersReducer,
  },
})
