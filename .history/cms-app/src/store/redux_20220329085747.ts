import { createStore } from 'redux'
import rootReducer from '../reducers'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: rootReducer,
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
