const BASE_URL = 'http://localhost:8080/api'
import store from '../store'
import { browserHistory } from 'react-router'

import { 
  loginUserSuccess, loginUserFailure,
  logoutUserSuccess,
  registerUserSuccess, registerUserFailure,
  getRemindersSuccess, getRemindersFailure,
  getSingleReminderSuccess, getSingleReminderFailure,
  putSingleReminderSuccess,
  addReminderSuccess, addReminderFailure,
  tokenFailure,
  hideNotification
} from '../actions'

export function createUser(creds) {
  return fetch(BASE_URL + '/signup',
  {
    method: "POST",
    headers: {  
      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"  
    },  
    body: 'username=' + creds.username + '&password=' + creds.password
  })
  .then(res => { 
    if(!res.ok) {
      throw Error(res.statusText)
    }
    res.json().then(user => {
      store.dispatch(registerUserSuccess(user))
      browserHistory.push('/login')
      return user
    })
  })
  .catch(function(error) {
    store.dispatch(registerUserFailure(error))
  })
}

export function addReminder(reminder) {
  console.log('in api addReminder')  
  const state = store.getState()
  return fetch(BASE_URL + '/' + state.user.username + '/reminder?token=' + state.user.token, 
  {
    method: "POST",
    headers: {
      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
    },
    body: 'title=' + reminder.title + '&rrule=' + reminder.rrule
  })
  .then(res => {
    if(!res.ok) {
      throw Error(res.statusText)
    }
    res.json().then( response => {
      store.dispatch(addReminderSuccess(response.reminder))
    })
  })
  .catch(function(error) {
    store.dispatch(addReminderFailure(error))
  })
}

export function getReminders() {
  const state = store.getState()
  return fetch(BASE_URL + '/' + state.user.username + '/reminder?token=' + state.user.token,
  {
    method: "GET"
  })
  .then(res => {
    if(!res.ok) {
      throw Error(res.statusText)
    }
    res.json().then(response => {
      console.dir(response)
      if(response.err) {
        store.dispatch(tokenFailure()) 
        browserHistory.push('/login')
      } else {
        store.dispatch(getRemindersSuccess(response))
      }
    })
  })
  .catch(function(error) {
    console.log(error)
    store.dispatch(getRemindersFailure(error))
  })
}

export function getReminder(reminderId) {
  const state = store.getState()
  return fetch(BASE_URL + '/reminder/' + reminderId + '?token=' + state.user.token,
  {
    method: "GET"
  })
  .then(res => {
    res.json().then(response => {
      store.dispatch(getSingleReminderSuccess(response))
    })
  })
  .catch(function(err) {
    console.log(err)
  })
}

export function putReminder(reminder) {
  const state = store.getState()
  return fetch(BASE_URL + '/reminder/' + reminder.id + '?token=' + state.user.token,
  {
    method: "PUT",
    headers: {  
      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"  
    },  
    body: `title=${reminder.title}&rrule=${reminder.rrule}`
  })
  .then(res => {
    res.json().then(response => {
      console.dir(response)
      store.dispatch(putSingleReminderSuccess(response))
      browserHistory.push('/reminders')
      setTimeout(() => {
        store.dispatch(hideNotification())
      }, 3000)
    })
  })
  .catch(function(err) {
    console.log(err)
  })
}

export function deleteReminder(reminderId) {
  const state = store.getState()
  return fetch(BASE_URL + '/reminder/' + reminderId + '?token=' + state.user.token,
  {
    method: 'DELETE'
  })
  .then(res => {
    res.json().then(response => {
      store.dispatch(deleteSingleReminderSuccess(response))
    })
  })
  .catch(function(err) {
    console.log(err)
  })
}

export function loginUser(creds) {
  return fetch(BASE_URL + '/authenticate',
  {
    method: 'POST',
    headers: {  
      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"  
    },  
    body: `username=${creds.username}&password=${creds.password}`
  })
  .then(res => {
    if(!res.ok) {
      throw Error(res.statusText)
    }

    res.json().then(response => {
        store.dispatch(loginUserSuccess(response))
        browserHistory.push('/reminders')
        setTimeout(() => {
          store.dispatch(hideNotification())
        }, 3000)
        localStorage.setItem('token', response.token)
        localStorage.setItem('username', response.username)
        return response
    })
  })
  .catch(function(error) {
    store.dispatch(loginUserFailure())
  })
}

export function forceLogoutUser(redirect) {
  localStorage.removeItem('token')
  store.dispatch(logoutUserSuccess())
  browserHistory.push('/login')
}

export function logoutUser() {
  localStorage.removeItem('token')
  store.dispatch(logoutUserSuccess())
  browserHistory.push('/home')
  setTimeout(() => {
    store.dispatch(hideNotification())
  }, 3000)
}
