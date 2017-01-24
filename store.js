'use strict'

import remindersApp from './reducers'
import api from './middleware/api'
import { createStore } from 'redux'

let store = createStore(remindersApp)

export default store
