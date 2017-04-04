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
      schedule: this.props.schedule || 'none',
      onceDueDate: this.props.onceDueDate ? this.props.onceDueDate : '2017-06-01',
      onceFuzz: 0,
      recurringDueDate: this.props.recurringDueDate ? this.props.recurringDueDate : '2017-07-01',
      recurringFuzz: 0,
      recurType: 'DAILY',
      recurEndType: 'NEVER',
      recurEndDate: this.props.recurEndDate ? this.props.recurEndDate : '2017-05-01',
      recurEndCount: this.props.recurEndCount ? this.props.recurEndCount : '0',
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

    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange(event) {
    const target = event.target
    const value = target.type == 'checkbox' ? target.checked : target.value
    const name = target.name


    this.setState({
      [name]: value
    }, this.updateRrule)
    
  }

  updateRrule() {
     let recurEndType = this.state.recurEndType
     let recurEndTypeString = ''
     if(recurEndType === 'UNTIL' && this.state.recurEndDate) {
       let endDate = new Date(this.state.recurEndDate)
       console.log(endDate)
       console.log(endDate.getMonth())
       endDate.setDate(endDate.getDate() + 1)
       recurEndTypeString = 'UNTIL=' + endDate.getFullYear() + ('0' + (endDate.getMonth()+1)).slice(-2) + ('0' + (endDate.getDate()-1)).slice(-2)
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
  render() {
    return (
      <div>
        <form>
        <div className="form-group">
          <label htmlFor="title">Remind me to:</label>
          <input
            className="form-control"
            id="title"
            name="title"
            required="required"
            value={this.state.title}
            onChange={this.handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="reminderWeight">This task should take me:</label>
          <input
            type="range"
            name="reminderWeight"
            value={this.state.reminderWeight || 0}
            onChange={this.handleInputChange}
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
              className={(this.state.schedule == 'none' ? 'active' : '')}
            >
              <a
                href="#"
                onClick={event => this.switchTabs(event, "event-unscheduled")}
              >
                None
              </a>
            </li>
            <li
              className={(this.state.schedule == 'once' ? 'active' : '')}
            >
              <a
                href="#"
                onClick={event => this.switchTabs(event, "event-scheduled")}
              >
                Once
              </a>
            </li>
            <li
              className={(this.state.schedule == 'recurring' ? 'active' : '')}
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
              className={"tab-pane " + (this.state.schedule == 'none' ? 'active' : '')}
              id="event-unscheduled"
              style={{backgroundColor: '#AAAAFF', padding: '5px', marginBottom: '20px'}}
            >
              This reminder can show up in your rolls immediately.
              It will not repeat.
            </div>
          
            <div
              className={"tab-pane " + (this.state.schedule == 'once' ? 'active' : '')}
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
                  id="onceDueDate"
                  name="onceDueDate" 
                  required="required"
                  onChange={this.handleInputChange}
                  value={this.state.onceDueDate}
                />
              </div>

              <div className="form-group">
                <label htmlFor="reminderFuzz">Fuzz:</label>
                <input
                  type="range"
                  name="onceFuzz"
                  id="onceFuzz"
                  value={this.state.onceFuzz || 0}
                  onChange={this.handleInputChange}
                  min="0"            
                  max="3"
                  className="form-control"
                />
                <span>your reminder will come {this.reminderFuzzLabels[this.state.onceFuzz]}</span>
              </div>
            </div>
        
            <div
              className={"tab-pane " + (this.state.schedule == 'recurring' ? 'active' : '')}
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
              id="recurringDueDate"
              name="recurringDueDate" 
              value={this.state.recurringDueDate}
              onChange={this.handleInputChange}
              required="required"
            />
          </div>

          <div className="form-group">
            <label htmlFor="reminderFuzz">Fuzz:</label>
            <input
              type="range"
              name="recurringFuzz"
              id="recurringFuzz"
              value={this.state.recurringFuzz || 0}
              onChange={this.handleInputChange}
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
              value={this.state.recurType}
              onChange={this.handleInputChange}
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
                value={this.state.recurInterval}
                onChange={this.handleInputChange}
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
            <label htmlFor="recurEndType">Ends:</label>
            <div className="radio">
              <label className="radio control-label">
                <input
                  type="radio"
                  name="recurEndType"
                  value="NEVER"
                  checked={this.state.recurEndType === 'NEVER'}
                  onChange={this.handleInputChange}
                />
                Never
              </label>
            </div>
            <div className="radio">
              <label className="radio control-label inline">
                <input
                  type="radio"
                  name="recurEndType"
                  value="COUNT"
                  checked={this.state.recurEndType === 'COUNT'}
                  onChange={this.handleInputChange}
                />
                After&nbsp;
                <input
                  className="form-control"
                  style={{minWidth:0,width:'45px',display:'inline'}}
                  type="text"
                  name="recurEndCount"
                  value={this.state.recurEndCount} 
                  onChange={this.handleInputChange}
                  /> times
              </label>
            </div>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  name="recurEndType"
                  value="UNTIL"
                  checked={this.state.recurEndType === 'UNTIL'}
                  onChange={this.handleInputChange}
                />
                On&nbsp;
                <input
                  className="form-control"
                  type="date"
                  name="recurEndDate"
                  id="recurEndDate"
                  onChange={this.handleInputChange}
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
      title: this.state.title,
      rrule: this.state.rrule,
      weight: this.state.reminderWeight,
      schedule: this.state.schedule,
    }

    if(reminder.schedule == 'once') {
      reminder.dueDate = this.state.onceDueDate
      reminder.fuzz = this.state.onceFuzz
    } else if(reminder.schedule == 'recurring') {
      reminder.dueDate = this.state.recurringDueDate
      reminder.fuzz = this.state.recurringFuzz
      reminder.rrule = this.state.rrule
    }

    Api.addReminder(reminder)
  }

  switchTabs(event, tabId) {
    event.preventDefault()

    if(tabId === 'event-unscheduled') {
      this.setState({
        schedule: 'none'
      })
    } else if(tabId === 'event-scheduled') {
      this.setState({
        schedule: 'once'
      })
    } else if(tabId === 'event-recurring') {
      this.setState({
        schedule: 'recurring'
      })
    }
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
}
