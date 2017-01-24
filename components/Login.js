'use strict'

import React, { Component, PropTypes } from 'react'
import * as Api from '../middleware/api'

export default class Login extends Component {
  render() {
    const { errorMessage } = this.props

    return (
      <div className="col-xs-3">
        <div className="form-group">
          <input type='text' ref='username' className="form-control" placeholder='Username' />
        </div>
        <div className="form-group">
          <input type='password' ref='password' className="form-control" placeholder='Password' />
        </div>
        <button onClick={(event) => this.handleClick(event)} className="btn btn-primary">
          Login
        </button>
      </div>
    )
  }

  handleClick(event) {
    event.preventDefault()
    const username = this.refs.username
    const password = this.refs.password

    const creds = { username: username.value.trim(), password: password.value.trim()}

    Api.loginUser(creds)

  }
}
