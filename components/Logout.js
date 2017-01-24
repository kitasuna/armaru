'use strict'

import React, { Component, PropTypes } from 'react'
import * as Api from '../middleware/api'

export default class Logout extends Component {
  
  render() {
    const { onLogoutClick } = this.props

    return (
      <button onClick={(event) => this.handleClick()} className="btn btn-primary">
        Logout
      </button>
    )
  }

  handleClick(event) {

    Api.logoutUser()

  }

}
