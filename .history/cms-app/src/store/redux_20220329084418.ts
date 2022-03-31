import { createStore } from 'redux'
import rootReducer from '../reducers'
import { configureStore } from '@reduxjs/toolkit'

const store = createStore(rootReducer)

export default store
