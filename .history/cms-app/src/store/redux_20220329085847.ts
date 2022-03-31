import { createStore } from 'redux'
import rootReducer from '../reducers'
import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(
        // correctly typed middlewares can just be used
        additionalMiddleware,
        // you can also type middlewares manually
        untypedMiddleware as Middleware<
          (action: Action<'specialAction'>) => number,
          RootState
        >
      )
      // prepend and concat calls can be chained
      .concat(logger),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store
