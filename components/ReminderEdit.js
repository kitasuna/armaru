'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as Api from '../middleware/api'

class ReminderEdit extends Component {
  componentWillMount() {
    Api.getReminder(this.props.params.reminderId)
  }

  render() {
    let { reminder } = this.props
    console.log('in render')
    console.dir(reminder)
    if(reminder == undefined) {
      return null
    }
    return (
      <div className="col-sm-6">
        <h2>Editing Reminder {reminder.title}</h2>
        <div className="form-group">
          <input className="form-control" ref="title" name="title" placeholder="Title" defaultValue={reminder.title} />
        </div>

        <div className="form-group">
          <input className="form-control" ref="rrule" name="rrule" placeholder="Rrule" defaultValue={reminder.rrule} />
        </div>

        <div className="form-group">
          <button 
            onClick={event => this.handleClick(event)}
            className="btn btn-primary"
          >
          Update reminder
          </button>
        </div>

      </div>
    )
  }

  handleClick(event) {
    event.preventDefault()
    const title = this.refs.title
    const rrule = this.refs.rrule
    const updatedReminder = {id: this.props.params.reminderId, title: title.value.trim(), rrule: rrule.value.trim()}
    Api.putReminder(updatedReminder)
  }
}

function mapStateToProps(state) {
  console.log('in map state')
  const { reminders } = state
  console.dir(reminders.currentlyEditing)
  return {
    reminder: reminders.currentlyEditing
  }
}

export default connect(mapStateToProps)(ReminderEdit)
