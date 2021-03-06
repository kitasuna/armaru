import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Navbar from '../components/Navbar'
import NotificationBar from '../components/NotificationBar'
import store from '../store'

class App extends React.Component {
  constructor(props) {
    super(props)
    store.subscribe(() => {
      document.getElementById('monitor').innerText = JSON.stringify(store.getState())
    })
  }

  render() {
    const { isAuthenticated, children} = this.props
    return (
      <div key="root">
        <Navbar isAuthenticated={ isAuthenticated } />
        <NotificationBar />
        <div className="col-sm-12">
          { children }
        </div>
      </div>
    )
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  reminder: PropTypes.string,
  isAuthenticated: PropTypes.bool.isRequired
}

function mapStateToProps(state) {
  const { reminders, user } = state
  const { reminder, authenticated } = reminders
  const { isAuthenticated } = user

  return {
    reminder,
    isAuthenticated
  }
}


export default connect(mapStateToProps)(App)
