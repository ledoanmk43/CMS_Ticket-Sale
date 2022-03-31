import { createStore } from 'redux'
import rootReducer from '../reducers'
import { configureStore, MiddlewareArray } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

const store = configureStore({
  reducer: rootReducer,
  middleware:middleware: [additionalMiddleware, logger] as const,,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store
