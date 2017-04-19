'use strict'

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import ReminderAdd from './ReminderAdd'
import * as Api from '../middleware/api'
import { Link } from 'react-router'

class ReminderList extends Component {
  componentWillMount() {
    const { user } = this.props
    Api.getReminders(user)
  }

  render() {
    const { reminders } = this.props
    const reminderId = this.props.reminderId ? this.props.reminderId : null
    
    return (
      <div>
        <div className="row">
          <div className="col-sm-7">
            <h2>All reminders</h2>
              {reminders.map( (reminder, index) => 
                <div key={index}>
                  {reminder.title}
                  | Rrule: {reminder.rrule} 
                  | <Link style={{cursor:'pointer'}} onClick={event => this.handleEditClick(reminder.id)} >(edit)</Link>
                  | <Link style={{cursor:'pointer'}} onClick={event => this.handleDeleteClick(reminder.id)}>(delete)</Link>  
                </div> 
              )} 
          </div>
          <div className="col-sm-5">
            <ReminderAdd reminder={this.props.activeReminder}/>
          </div>
        </div>
      </div>
    )
  }

  handleDeleteClick(reminderId) {
    Api.deleteReminder(reminderId)
  }

  handleEditClick(reminderId) {
    // Get all the reminder juice from the API
    // and stuff it in the store... somehow...
    Api.getReminder(reminderId)
  }
}

ReminderList.propTypes = {
  reminders: PropTypes.array
}

function mapStateToProps(state) {
  const { user } = state
  const { reminders } = state.reminders
  const { activeReminder } = state

  return {
    user,
    reminders,
    activeReminder
  }
}

export default connect(mapStateToProps)(ReminderList)
