'use strict'

import React, { Component } from 'react'
import * as Api from '../middleware/api'
import DatePicker from 'react-datepicker'
import moment from 'moment'
require('react-datepicker/dist/react-datepicker.css');

export default class ReminderAdd extends Component {

  render() {
    return (
      <div className="col">
      <div className="form-group">
        <input className="form-control" ref="title" name="title" placeholder="Remind me to"/>
      </div>
      <div className="form-group">
        <input className="form-control" ref="rrule" name="rrule" placeholder="How often?"/>
      </div>
      <div className="form-group">
        <DatePicker
          selected={moment()}
          onChange={(event) => this.handleStartDateClick(this, event)}
        />
      </div>
      <div className="form-group">
        <DatePicker
          selected={moment()}
          onChange={(event) => this.handleEndDateClick(this, event)}
        />
      </div>
      <div className="form-group">
        <button 
          onClick={(event) => this.handleClick(event)}
          className="btn btn-primary" 
        >Add Reminder</button>
      </div>
      </div>
    )
  }

  handleClick() {
    const title = this.refs.title 
    const rrule = this.refs.rrule 

    Api.addReminder({title: title.value.trim(), rrule: rrule.value.trim()})
  }

  handleStartDateClick(element, event) {
    console.dir(event) 
    console.dir(element)
    element.setState({startDate: event._d})
  }

  handleEndDateClick() {

  }
}
