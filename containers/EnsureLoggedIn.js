'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import store from '../store'
import { setRedirectUrl } from '../actions'
import { browserHistory } from 'react-router'

class EnsureLoggedIn extends Component {
  componentDidMount() {
    const { isAuthenticated, dispatch, currentURL } = this.props

    if(!isAuthenticated) {
      // store current url for eventual redirect
      store.dispatch(setRedirectUrl(currentURL))
      browserHistory.replace("/login")
    }
  }

  render() {
    const { isAuthenticated, dispatch, currentURL } = this.props
    if (isAuthenticated) {
      return this.props.children
    } else {
      return null
    }
  }
}

function mapStateToProps(state, ownProps) {
  return {
    isAuthenticated: state.user.isAuthenticated,
    currentURL: ownProps.location.pathname
  }
}


export default connect(mapStateToProps)(EnsureLoggedIn)
