 import React, { Component } from 'react'
 import { connect } from 'react-redux'

class Home extends Component {
  render() {
    const { isAuthenticated, children} = this.props

    if(!isAuthenticated) {
      return (
        <div>
        This is the homepage.
        </div>
      )
    } else {
      return (
        <div>
        Welcome back, dude.
        </div>
      )

    }
  }
}

function mapStateToProps(state) {
  const { user } = state
  const { isAuthenticated } = user

  return {
    isAuthenticated
  }
}

export default connect(mapStateToProps)(Home)
