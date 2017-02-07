'use strict'

import React, { Component, PropTypes } from 'react'
import * as Api from '../middleware/api'

export default class Logout extends Component {
  
  render() {
    const { onLogoutClick } = this.props

    return (
      <a onClick={(event) => this.handleClick(event)} style={{cursor:'pointer'}} >
        Logout
      </a>
    )
  }

  handleClick(event) {
    event.preventDefault()
    Api.logoutUser()

  }

}
