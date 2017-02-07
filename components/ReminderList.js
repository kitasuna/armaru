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
    
    return (
      <div>
        <div className="row">
          <div className="col-sm-7">
            <h2>My stuff</h2>
              {reminders.map( (reminder, index) => 
                <div key={index}>
                  {reminder.title}
                  | Rrule: {reminder.rrule} 
                  | <Link to={`/reminder/edit/${reminder.id}`} >(edit)</Link>
                  | <Link style={{cursor:'pointer'}} onClick={event => this.handleDeleteClick(reminder.id)}>(delete)</Link>  
                </div> 
              )} 
          </div>
          <div className="col-sm-5">
            <h2>Add a reminder</h2>
            <ReminderAdd />
          </div>
        </div>
      </div>
    )
  }

  handleDeleteClick(reminderId) {
    Api.deleteReminder(reminderId)
  }
}

ReminderList.propTypes = {
  reminders: PropTypes.array
}

function mapStateToProps(state) {
  const { user } = state
  const { reminders } = state.reminders

  return {
    user,
    reminders
  }
}

export default connect(mapStateToProps)(ReminderList)
