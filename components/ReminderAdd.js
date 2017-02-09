'use strict'

import React, { Component } from 'react'
import * as Api from '../middleware/api'
import RruleEditor from './RruleEditor' 

export default class ReminderAdd extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      reminderFuzz: 0,
      reminderWeight: 0,
      isRecurring: this.props.isRecurring || false,
      hasDueDate: this.props.hasDueDate || false
    }

    this.reminderFuzzLabels = {
      0: 'on the date you specify',
      1: 'within two days of the date you specify',
      2: 'within a week of the date you specify',
      3: 'within two weeks of the date you specify',
      4: 'within a month of the date you specify'
    }

    this.reminderWeightLabels = {
      0: 'between 5-10 minutes',
      1: 'between 10-30 minutes',
      2: 'between 30-60 minutes',
      3: 'between 1-2 hours',
      4: 'between 3-4 hours',
      5: 'between 4-6 hours'
    }
  }

  render() {
    return (
      <div>
        <form>
        <div className="form-group">
          <label htmlFor="reminder-title">Remind me to:</label>
          <input
            className="form-control"
            id="reminder-title"
            ref="title"
            name="title"
            required="required"
          />
        </div>

        <div className="form-group">
          <label htmlFor="reminderWeight">This task should take me:</label>
          <input
            type="range"
            name="reminderWeight"
            ref="reminderWeight"
            value={this.state.reminderWeight || 0}
            onChange={event => this.updateReminderWeight(event)}
            min="0"            
            max="4"
            className="form-control"
          />
          <span>{this.reminderWeightLabels[this.state.reminderWeight]}</span>
        </div>

        <div className="form-group">
          <label htmlFor="hasDueDate">
          <input
            type="checkbox"
            onChange={() => this.setState({ hasDueDate: !this.state.hasDueDate })}
          />
          &nbsp;Schedule this reminder
          </label>
        </div>

        {this.state.hasDueDate &&

        <div style={{backgroundColor: '#AAFFAA', padding: '5px', marginBottom: '20px'}}>
          <div className="form-group">
            <label htmlFor="dueDate">no earlier than:</label>
            <input
              type="date"
              className="form-control"
              ref="dueDate"
              id="dueDate"
              name="dueDate" 
              required="required"
            />
          </div>

          <div className="form-group">
            <label htmlFor="reminderFuzz">Fuzziness:</label>
            <input
              type="range"
              name="reminderFuzz"
              id="reminderFuzz"
              ref="reminderFuzz"
              value={this.state.reminderFuzz || 0}
              onChange={event => this.updateReminderFuzz(event)}
              min="0"            
              max="3"
              className="form-control"
            />
            <span>your reminder will come {this.reminderFuzzLabels[this.state.reminderFuzz]}</span>
          </div>
        </div>
        } 
      
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              value="1"
              onChange={() => this.setState({ isRecurring: !this.state.isRecurring })}
            />
            &nbsp;Repeat...
          </label>
        </div>
       
       {this.state.isRecurring && 
        <RruleEditor />
       }

        <div className="form-group">
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

  updateReminderWeight(event) {
     this.setState({
        reminderWeight: event.target.value
     })
  }
}
