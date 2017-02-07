'use strict'

import { CALL_API } from './middleware/api'

export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export const REGISTER_FAILURE = 'REGISTER_FAILURE'

export const HIDE_NOTIFICATION = 'HIDE_NOTIFICATION'

export function hideNotification() {
  return {
    type: HIDE_NOTIFICATION
  }
}

export const SET_REDIRECT_URL_UNAUTHORIZED = 'SET_REDIRECT_URL_UNAUTHORIZED'

export function setRedirectUrl(url) {
  return {
    type: SET_REDIRECT_URL_UNAUTHORIZED,
    url: url
  }
}

export function registerUserSuccess(user) {
	return {
		type: REGISTER_SUCCESS,
		isFetching: false,
		isAuthenticated: false,
    notificationText: 'You have successfully registered.',
    notificationType: 'alert alert-success',
    user: user
	}
}

export function registerUserFailure(message) {
	return {
		type: REGISTER_FAILURE,
		isFetching: false,
		isAuthenticated: false,
		message
	}
}

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

export function requestLogin(creds) {
  return {
    type: LOGIN_REQUEST,
    creds
  }
}

export function loginUserSuccess(response) {
  return {
    type: LOGIN_SUCCESS,
    token: response.token,
    username: response.username
  }
}

export function loginUserFailure() {
  return {
    type: LOGIN_FAILURE
  }
}


export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'

export function logoutUserSuccess() {
  return {
    type: LOGOUT_SUCCESS
  }
}

export const REMINDER_SINGLE_REQUEST = 'REMINDER_SINGLE_REQUEST'
export const REMINDER_SINGLE_SUCCESS = 'REMINDER_SINGLE_SUCCESS'
export const REMINDER_SINGLE_FAILURE = 'REMINDER_SINGLE_FAILURE'

export function getSingleReminderSuccess(response) {
  return {
    type: REMINDER_SINGLE_SUCCESS,
    currentlyEditing: response,
  }
}

export const DELETE_REMINDER_SINGLE_REQUEST = 'DELETE_REMINDER_SINGLE_REQUEST'
export const DELETE_REMINDER_SINGLE_SUCCESS = 'DELETE_REMINDER_SINGLE_SUCCESS'
export const DELETE_REMINDER_SINGLE_FAILURE = 'DELETE_REMINDER_SINGLE_FAILURE'

export function deleteSingleReminderSuccess(response) {
  return {
    type: DELETE_REMINDER_SINGLE_SUCCESS,
    id: response.id
  }
}

export const PUT_REMINDER_SINGLE_SUCCESS = 'PUT_REMINDER_SINGLE_SUCCESS'
export const PUT_REMINDER_SINGLE_FAILURE = 'PUT_REMINDER_SINGLE_FAILURE'

export function putSingleReminderSuccess(response) {
  console.log('in PUT action')
  console.dir(response)
  return {
    type: PUT_REMINDER_SINGLE_SUCCESS
  }
}

export const REMINDER_ALL_REQUEST = 'REMINDER_ALL_REQUEST'
export const REMINDER_ALL_SUCCESS = 'REMINDER_ALL_SUCCESS'
export const REMINDER_ALL_FAILURE = 'REMINDER_ALL_FAILURE'

export function getRemindersSuccess(response) {
  return {
    type: REMINDER_ALL_SUCCESS,
    reminders: response
  }

}

export function getRemindersFailure() {
  return {
    type: REMINDER_ALL_FAILURE
  }
}

export const TOKEN_FAILURE = 'TOKEN_FAILURE'

export function tokenFailure() {
  return {
    type: TOKEN_FAILURE
  }
}

export const REMINDER_ADD_REQUEST = 'REMINDER_ADD_REQUEST'
export const REMINDER_ADD_SUCCESS = 'REMINDER_ADD_SUCCESS'
export const REMINDER_ADD_FAILURE = 'REMINDER_ADD_FAILURE'

export function addReminderSuccess(reminder) {
  console.log('in action addReminderSuccess')
  return {
    type: REMINDER_ADD_SUCCESS,
    reminder: reminder
  }
}

export function addReminderFailure() {
  return {
    type: REMINDER_ADD_FAILURE
  }
}
