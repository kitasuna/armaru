'use strict'

import React, { Component } from 'react'
import * as Api from '../middleware/api'
import RruleEditor from './RruleEditor' 

export default class ReminderAdd extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      reminderFuzz: 0,
      isRecurring: this.props.isRecurring || false
    }
  }

  render() {
    return (
      <div className="col-sm-8">

        <form>
        <div className="form-group row">
          <label htmlFor="reminder-title">Remind me to:</label>
          <input
            className="form-control"
            id="reminder-title"
            ref="title"
            name="title"
            required="required"
          />
        </div>

        <div className="form-group row">
          <label htmlFor="reminder-title">on:</label>
          <input
            type="date"
            className="form-control"
            ref="dueDate"
            name="dueDate" 
            required="required"
          />
        </div>

        <div className="form-group row">
          <label htmlFor="reminder-fuzz">Fuzziness:</label>
          <input
            type="range"
            name="reminderFuzz"
            ref="reminderFuzz"
            value={this.state.reminderFuzz || 0}
            onChange={event => this.updateReminderFuzz(event)}
            min="0"            
            max="5"
            className="form-control"
          />
          <span>{this.state.reminderFuzz}</span>
        </div>
      
        <div className="form-group row">
          <label>
            <input
              type="checkbox"
              value="1"
              onChange={() => this.setState({ isRecurring: !this.state.isRecurring })}
            />
            Repeat...
          </label>
        </div>

       {this.state.isRecurring && 
        <RruleEditor />
       }

        <div className="form-group row">
          <button 
            onClick={(event) => this.handleClick(event)}
            className="btn btn-primary" 
          >Add Reminder</button>
        </div>
        </form>

      </div>
    )
  }

  handleClick() {
    const title = this.refs.title 
    const rrule = this.refs.rrule 

    Api.addReminder({title: title.value.trim(), rrule: rrule.value.trim()})
  }

  updateReminderFuzz(event) {
     this.setState({
        reminderFuzz: event.target.value
     })
  }
}
