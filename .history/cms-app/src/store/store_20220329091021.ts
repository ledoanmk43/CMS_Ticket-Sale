import { createStore } from 'redux'
import rootReducer from '../reducers'
import { configureStore, createSlice, MiddlewareArray } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

const store = configureStore({
  reducer: rootReducer,
  // middleware: new MiddlewareArray().concat(additionalMiddleware, logger),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store
