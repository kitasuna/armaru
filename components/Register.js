'use strict'

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as Api from '../middleware/api'

export default class Register extends React.Component {
  render() {

    return (
      <div className="col-xs-3">
        <div className="form-group">
        <input type='text' ref='username' className="form-control" placeholder='Username' />
        </div>
        <div className="form-group">
        <input type='password' ref='password' className="form-control" placeholder='Password' />
        </div>
        <div className="form-group">
        <input type='password' ref='confirm_password' className="form-control" placeholder='Confirm Password' />
        </div>
        <div className="form-group">
        <button onClick={(event) => this.handleClick(event)} className="btn btn-primary">
          Create account
        </button>
        </div>

      </div>
    )
  }

  handleClick(event) {
    const username = this.refs.username
    const password = this.refs.password
    const confirm_password = this.refs.confirm_password

    const creds = { username: username.value.trim(), password: password.value.trim(), confirm_password: confirm_password.value.trim()}

    Api.createUser(creds)

  }
}
