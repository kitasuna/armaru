'use strict'

import React, { Component } from 'react'
import * as Api from '../middleware/api'
import RruleEditor from './RruleEditor' 

export default class ReminderAdd extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      reminderWeight: 0,
      title: this.props.title || '',
      scheduleType: this.props.scheduleType || 'none',
      onceDueDate: null,
      onceFuzz: 0,
      recurringDueDate: null,
      recurringFuzz: 0,
      recurType: 'DAILY',
      recurEndType: 'NEVER',
      recurEndDate: this.props.recurEndDate ? this.props.recurEndDate : '',
      recurEndCount: this.props.recurEndCount ? this.props.recurEndCount : '',
      recurInterval: 1,
      recurLabel: 'days',
      rrule: this.props.rrule ? this.props.rrule : 'RRULE:FREQ=DAILY;INTERVAL=1;',
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

    this.recurTypeLabels = {
        DAILY: 'days',
        WEEKLY: 'weeks',
        MONTHLY: 'months',
        YEARLY: 'years'
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

        
        <label>Schedule</label>
        <div className="">
          <ul className="nav nav-pills">
            <li
              className={(this.state.scheduleType == 'none' ? 'active' : '')}
            >
              <a
                href="#"
                onClick={event => this.switchTabs(event, "event-unscheduled")}
              >
                None
              </a>
            </li>
            <li
              className={(this.state.scheduleType == 'once' ? 'active' : '')}
            >
              <a
                href="#"
                onClick={event => this.switchTabs(event, "event-scheduled")}
              >
                Once
              </a>
            </li>
            <li
              className={(this.state.scheduleType == 'recurring' ? 'active' : '')}
            >
              <a
                href="#"
                onClick={event => this.switchTabs(event, "event-recurring")}
              >
                Repeat
              </a>
            </li>
          </ul>
          <div
            className={"tab-content"}
          >
            <div
              className={"tab-pane " + (this.state.scheduleType == 'none' ? 'active' : '')}
              id="event-unscheduled"
              style={{backgroundColor: '#AAAAFF', padding: '5px', marginBottom: '20px'}}
            >
              This reminder can show up in your rolls immediately.
              It will not repeat.
            </div>
          
            <div
              className={"tab-pane " + (this.state.scheduleType == 'once' ? 'active' : '')}
              id="event-scheduled"
              style={{backgroundColor: '#AAFFAA', padding: '5px', marginBottom: '20px'}}
            >
              This reminder will show up around the date you specify.
              If you don't add any fuzz, it will start appearing in your rolls on the date you specify.
              If you do add fuzz, it will start appearing in your rolls in a range of dates based on your specified
                start date and the fuzz.
              It will not repeat.
              <div className="form-group">
                <label htmlFor="dueDate">Start date</label>
                <input
                  type="date"
                  className="form-control"
                  ref="onceDueDate"
                  id="onceDueDate"
                  name="onceDueDate" 
                  required="required"
                />
              </div>

              <div className="form-group">
                <label htmlFor="reminderFuzz">Fuzz:</label>
                <input
                  type="range"
                  name="onceFuzz"
                  id="onceFuzz"
                  ref="onceFuzz"
                  value={this.state.onceFuzz || 0}
                  onChange={event => this.updateOnceFuzz(event)}
                  min="0"            
                  max="3"
                  className="form-control"
                />
                <span>your reminder will come {this.reminderFuzzLabels[this.state.onceFuzz]}</span>
              </div>
            </div>
        
            <div
              className={"tab-pane " + (this.state.scheduleType == 'recurring' ? 'active' : '')}
              id="event-recurring"
              style={{backgroundColor: '#FFAAAA', padding: '5px', marginBottom: '20px'}}
            >
              This reminder will start to show up around the date you specify.
              If you don't add any fuzz, it will start appearing in your rolls on the date you specify.
              If you do add fuzz, it will start appearing in your rolls in a range of dates based on your specified
                start date and the fuzz.
              It will repeat at the rate you specify.
              Fuzz also affects the rate at which it will repeat.
          <div className="form-group">
            <label htmlFor="dueDate">Start date</label>
            <input
              type="date"
              className="form-control"
              ref="recurringDueDate"
              id="recurringDueDate"
              name="recurringDueDate" 
              required="required"
            />
          </div>

          <div className="form-group">
            <label htmlFor="reminderFuzz">Fuzz:</label>
            <input
              type="range"
              name="recurringFuzz"
              id="recurringFuzz"
              ref="recurringFuzz"
              value={this.state.recurringFuzz || 0}
              onChange={event => this.updateRecurringFuzz(event)}
              min="0"            
              max="3"
              className="form-control"
            />
            <span>your reminder will come {this.reminderFuzzLabels[this.state.recurringFuzz]}</span>
          </div>
          <div className="form-group">
            <label htmlFor="recurType">Repeats:</label>
            <select
              className="form-control"
              id="recurType"
              name="recurType"
              ref="recurType"
              onChange={ event => this.updateRecurType(event) }
            >
              <option value="DAILY">Daily</option>
              <option value="WEEKLY">Weekly</option>
              <option value="MONTHLY">Monthly</option>
              <option value="YEARLY">Yearly</option>
            </select>
          </div>

          <div className="form-group">
              <label htmlFor="recurInterval">Repeats every:</label>
              <select
                className="form-control"
                id="recurInterval"
                name="recurInterval"
                ref="recurInterval"
                onChange={ event => this.updateRecurInterval(event) }
              >
                <option>1 {this.recurTypeLabels[this.state.recurType]}</option>
                <option>2 {this.recurTypeLabels[this.state.recurType]}</option>
                <option>3 {this.recurTypeLabels[this.state.recurType]}</option>
                <option>4 {this.recurTypeLabels[this.state.recurType]}</option>
                <option>5 {this.recurTypeLabels[this.state.recurType]}</option>
                <option>6 {this.recurTypeLabels[this.state.recurType]}</option>
                <option>7 {this.recurTypeLabels[this.state.recurType]}</option>
                <option>8 {this.recurTypeLabels[this.state.recurType]}</option>
                <option>9 {this.recurTypeLabels[this.state.recurType]}</option>
                <option>10 {this.recurTypeLabels[this.state.recurType]}</option>
              </select> 
          </div>

          <div className="form-group">
            <label htmlFor="endType">Ends:</label>
            <div className="radio">
              <label className="radio control-label">
                <input
                  type="radio"
                  name="endType"
                  value="NEVER"
                  checked={this.state.recurEndType === 'NEVER'}
                  onChange={event => this.updateRecurEndType(event)}
                />
                Never
              </label>
            </div>
            <div className="radio">
              <label className="radio control-label inline">
                <input
                  type="radio"
                  name="endType"
                  value="COUNT"
                  checked={this.state.recurEndType === 'COUNT'}
                  onChange={event => this.updateRecurEndType(event)}
                />
                After&nbsp;
                <input
                  className="form-control"
                  style={{minWidth:0,width:'45px',display:'inline'}}
                  type="text"
                  name="recurCount"
                  value={this.state.recurEndCount} 
                  onChange={event => this.updateRecurEndCount(event)}
                  /> times
              </label>
            </div>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  name="endType"
                  value="UNTIL"
                  onChange={event => this.updateRecurEndType(event)}
                  checked={this.state.recurEndType === 'UNTIL'}
                />
                On&nbsp;
                <input
                  className="form-control"
                  type="date"
                  name="recurEndDate"
                  id="recurEndDate"
                  ref="recurEndDate"
                  onChange={event => this.updateRecurEndDate(event)}
                />
              </label>
            </div>
          </div>
          <div>Current rrule: {this.state.rrule}</div>
            </div>
          </div>
        </div>

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
    let reminder = {
      title: this.refs.title,
      rrule: this.state.rrule,
      weight: this.state.reminderWeight,
      scheduleType: this.state.scheduleType,
    }

    if(reminder.scheduleType == 'once') {
      reminder.dueDate = this.refs.onceDueDate
      reminder.fuzz = this.refs.onceFuzz
    } else if(reminder.scheduleType == 'recurring') {
      reminder.dueDate = this.refs.recurringDueDate
      reminder.fuzz = this.refs.recurringFuzz
      reminder.rrule = this.state.rrule
    }

    Api.addReminder(reminder)
  }

  updateRecurringFuzz(event) {
    this.setState({
      recurringFuzz: event.target.value
    })
  }

  updateOnceFuzz(event) {
    this.setState({
      onceFuzz: event.target.value
    })
  }

  updateReminderWeight(event) {
    this.setState({
      reminderWeight: event.target.value
    })
  }

  switchTabs(event, tabId) {
    event.preventDefault()

    if(tabId === 'event-unscheduled') {
      this.setState({
        scheduleType: 'none'
      })
    } else if(tabId === 'event-scheduled') {
      this.setState({
        scheduleType: 'once'
      })
    } else if(tabId === 'event-recurring') {
      this.setState({
        scheduleType: 'recurring'
      })
    }
  }

  updateRrule() {
     let recurEndType = this.state.recurEndType
     let recurEndTypeString = ''
     if(recurEndType === 'UNTIL' && this.state.recurEndDate) {
       let endDate = new Date(this.state.recurEndDate)
       endDate.setDate(endDate.getDate() + 1)
       recurEndTypeString = 'UNTIL=' + endDate.getFullYear() + ('0' + endDate.getMonth()).slice(-2) + ('0' + endDate.getDate()).slice(-2)
     } else if(recurEndType == 'COUNT' && this.state.recurEndCount) {
       recurEndTypeString = 'COUNT=' + this.state.recurEndCount
     } 

     this.setState({
       rrule: 
        'RRULE:FREQ=' + this.state.recurType + ';'
        + 'INTERVAL=' + this.state.recurInterval + ';'
        + recurEndTypeString
     })
  }

  updateRecurType(event) {
    const recurLabels = {
      'Daily': 'days',
      'Weekly': 'weeks',
      'Monthly': 'months',
      'Yearly': 'years'
    }

    const selectedOption = event.target.options[event.target.selectedIndex]
    this.setState({
         recurType: selectedOption.value,
         recurLabel: recurLabels[selectedOption.text]
      }, this.updateRrule)
  }

  updateRecurEndType(event) {
    this.setState({
      recurEndType: event.target.value
    }, this.updateRrule)
  }

  updateRecurEndCount(event) {
    const val = event.target.value
    if(val) {
      this.setState({
        recurEndCount: val
      }, this.updateRrule)
    }
  }

  updateRecurEndDate(event) {
    const val = event.target.value
    console.log(val)
    if(val) {
      this.setState({
        recurEndDate: val
      }, this.updateRrule)
    }
  }

  updateRecurInterval(event) {
    const selectedOption = event.target.options[event.target.selectedIndex]
    this.setState({recurInterval: selectedOption.value}, this.updateRrule)
  }
}
