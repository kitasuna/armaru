import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import router from './router'
import store from './store'

require('bootstrap-range-input/dist/css/bootstrap-range-input.min.css')


render(
  <Provider store={store}>
    {router}
  </Provider>,
  document.getElementById('root')
)
