'use strict'

import { combineReducers } from 'redux'
import {
        LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
        REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE,
        REMINDER_ALL_REQUEST, REMINDER_ALL_SUCCESS, REMINDER_ALL_FAILURE,
        REMINDER_SINGLE_REQUEST, REMINDER_SINGLE_SUCCESS, REMINDER_SINGLE_FAILURE,
        REMINDER_ADD_REQUEST, REMINDER_ADD_SUCCESS, REMINDER_ADD_FAILURE,
        PUT_REMINDER_SINGLE_SUCCESS,
        DELETE_REMINDER_SINGLE_SUCCESS,
        LOGOUT_SUCCESS,
        HIDE_NOTIFICATION,
        TOKEN_FAILURE,
        SET_REDIRECT_URL_UNAUTHORIZED
       } from './actions'

function redirect( state = {url: ''}, action ) {
  switch(action.type) {
    case SET_REDIRECT_URL_UNAUTHORIZED:
      return Object.assign({}, state, {
        url: action.url
      })

    default:
       return state
  }
}
function notification( state = {
    notificationType: '',
    notificationText: ''
  }, action) {

  switch(action.type) {
    case SET_REDIRECT_URL_UNAUTHORIZED:
      return Object.assign({}, state, {
        notificationType: 'alert alert-warning',
        notificationText: 'Please login to access your reminders.'
      })

    case REGISTER_SUCCESS:
      return Object.assign({}, state, {
        notificationType: 'alert alert-success',
        notificationText: 'You have registered successfully.'
      })

    case REGISTER_FAILURE:
      return Object.assign({}, state, {
        notificationType: 'alert alert-danger',
        notificationText: 'An account already exists with that username.'
      })

    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        notificationType: 'alert alert-success',
        notificationText: 'Hey, welcome back. Great job.'
      })

    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        notificationType: 'alert alert-danger',
        notificationText: 'Your username and password do not match. Give it another try.'
      })

    case LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        notificationType: 'alert alert-success',
        notificationText: 'You have logged out. Great job.'
      })
      
    case REMINDER_ADD_SUCCESS:
      return Object.assign({}, state, {
        notificationType: 'alert alert-success',
        notificationText: 'Your reminder has been added.'
      })

    case TOKEN_FAILURE:
      return Object.assign({}, state, {
        notificationType: 'alert alert-warning',
        notificationText: 'Please login.'
      })
     
    case PUT_REMINDER_SINGLE_SUCCESS:
      return Object.assign({}, state, {
        notificationType: 'alert alert-success',
        notificationText: 'Your reminder has been updated.'
      })

    case DELETE_REMINDER_SINGLE_SUCCESS:
      return Object.assign({}, state, {
        notificationType: 'alert alert-success',
        notificationText: 'Your reminder has been deleted.'
      })

    case HIDE_NOTIFICATION:
      return Object.assign({}, state, {
        notificationType: '',
        notificationText: ''
      })

    default:
      return state
  }
}

// user reducer
function user(state = {
  isFetching: false,
  isAuthenticated: localStorage.getItem('token') ? true : false,
  token: localStorage.getItem('token'),
  username: localStorage.getItem('username')
  }, action) {

  switch(action.type) {
    case REGISTER_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        user: action.user
      })
    
    case REGISTER_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false
      })

    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        user: action.creds
      })
    
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        token: action.token,
        username: action.username
      })

    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        token: ''
      })

    case LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false
      })

    case TOKEN_FAILURE:
      return Object.assign({}, state, {
        isAuthenticated: false
      })

    default:
      return state
  }
}

// reminder reducer
function reminders(state={
  isFetching: false,
  reminders: [],
  authenticated: true
  }, action) {
  
  switch(action.type) {
    case REMINDER_SINGLE_SUCCESS:
      return Object.assign({}, state, {
        currentlyEditing: action.currentlyEditing
      })

    case REMINDER_ALL_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })

    case REMINDER_ALL_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        reminders: action.reminders
      })

    case REMINDER_ALL_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      })

    case REMINDER_ADD_SUCCESS:
      const reminders = [].concat(state.reminders, action.reminder)
      return Object.assign({}, state, {
        isFetching: false,
        reminders: [].concat(state.reminders, action.reminder)
      })

    case PUT_REMINDER_SINGLE_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        currentlyEditing: false
      })

    case DELETE_REMINDER_SINGLE_SUCCESS:
      return Object.assign({}, state, {
        reminders: state.reminders.filter(function(reminder) {
          return reminder.id != action.id
        }),
        isFetching: false
      })

    default:
      return state
  }
}

const remindersApp = combineReducers({
  user,
  reminders,
  redirect,
  notification
})

export default remindersApp
