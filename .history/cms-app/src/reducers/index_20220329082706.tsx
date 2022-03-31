import ticketManageReducer from './ticketManage'
import ticketCheckReducer from './ticketCheck'
import statisticReducer from './statistic'
import servicePackReducer from './servicePack'

import { combineReducers } from 'redux'
import { useReducer } from 'react'

const rootReducer = combineReducers({
  ticketManage: ticketManageReducer,
  ticketCheck: ticketCheckReducer,
  ticketServices: servicePackReducer,
  statistic: statisticReducer,
})

export default rootReducer
