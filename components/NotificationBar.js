'use strict'

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

class NotificationBar extends Component {
  render() {
    const { notificationType, notificationText } = this.props
    if(notificationText) {
      return (
            <div className={ notificationType }>
              { notificationText } 
            </div>
      )
    } else {
      return null
    }
  }
}

NotificationBar.propTypes = {
  notificationType: PropTypes.string.isRequired,
  notificationText: PropTypes.string.isRequired
}


function mapStateToProps(state) {
  const { notificationType, notificationText } = state.notification

  return {
    notificationType,
    notificationText
  }
}

export default connect(mapStateToProps)(NotificationBar)
