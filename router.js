import React from 'react'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

import App from './containers/App'
import EnsureLoggedIn from './containers/EnsureLoggedIn'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import ReminderList from './components/ReminderList'
import ReminderEdit from './components/ReminderEdit'

export default (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="/login" 
        component={Login}
      />
      <Route path="/register" 
        component={Register}
      />
      <Route path="/home" 
        component={Home}
      />
      <Route component={EnsureLoggedIn}>
        <Route path="/reminders" 
          component={ReminderList}
        />
        <Route path="/reminder/edit/:reminderId" 
          component={ReminderEdit}
        />
      </Route>
    </Route>
  </Router>
)
