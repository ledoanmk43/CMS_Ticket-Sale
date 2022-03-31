import ticketManageReducer from './ticketManage'
import ticketCheckReducer from './ticketCheck'
import statisticReducer from './statistic'
import servicePackReducer from './ticketServices'

import { combineReducers } from 'redux'
import { useReducer } from 'react'

const rootReducer = combineReducers({
  ticketManage: ticketManageReducer,
  ticketCheck: ticketCheckReducer,
  servicePack: servicePackReducer,
  statistic: statisticReducer,
})

export default rootReducer
