'use strict'

import React, { Component } from 'react'
//import { connect } from 'react-redux'
import * as Api from '../middleware/api'
import RruleEditor from './RruleEditor' 
import WeightSlider from './WeightSlider'
import update from 'immutability-helper'
import momment from 'moment'

export default class ReminderAdd extends Component {

  constructor(props, context) {
    super(props, context)

    this.state = {
      formMode: 'add',
      reminder: props.reminder,
    }

    /*
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
      formMode: 'add',
    }
    */

    this.reminderFuzzLabels = {
      0: 'on the date you specify',
      1: 'within two days of the date you specify',
      2: 'within a week of the date you specify',
      3: 'within two weeks of the date you specify',
      4: 'within a month of the date you specify'
    }


    this.recurTypeLabels = {
        DAILY: 'days',
        WEEKLY: 'weeks',
        MONTHLY: 'months',
        YEARLY: 'years'
    }

    this.handleInputChange = this.handleInputChange.bind(this)
  }

  componentWillReceiveProps(props) {
    let formMode = 'add'

    if(props.reminder && props.reminder.id) {
      formMode = 'edit'  
    }

    this.state = {
      formMode: formMode,
      reminder: props.reminder || {},
    }
  }

  handleInputChange(event) {
    const target = event.target
    const value = target.type == 'checkbox' ? target.checked : target.value
    const name = target.name

    if(this.state.reminder.hasOwnProperty(name)) {
      this.setState({
        reminder: update(this.state.reminder, {[name]: {$set: value}})
      }, this.updateRrule)
    } else {
      this.setState({
        [name]: value
      }, this.updateRrule)
    }
    
  }

  updateRrule() {
     let recurEndType = this.state.recurEndType
     let recurEndTypeString = ''
     if(recurEndType === 'UNTIL' && this.state.recurEndDate) {
       let endDate = new Date(this.state.recurEndDate)
       //console.log(endDate)
       //console.log(endDate.getMonth())
       endDate.setDate(endDate.getDate() + 1)
       recurEndTypeString = 'UNTIL=' + endDate.getFullYear() + ('0' + (endDate.getMonth()+1)).slice(-2) + ('0' + (endDate.getDate()-1)).slice(-2)
     } else if(recurEndType == 'COUNT' && this.state.recurEndCount) {
       recurEndTypeString = 'COUNT=' + this.state.recurEndCount
     } 
    
     //
    //TODO: This needs to be updated... somehow....

     this.setState({
       rrule: 
        'RRULE:FREQ=' + this.state.recurType + ';'
        + 'INTERVAL=' + this.state.recurInterval + ';'
        + recurEndTypeString
     })
  }

  render() {
    let reminder  = this.state.reminder
    console.log('RENDER reminderAdd')
    //console.log(reminder)
    return (
      <div>
        <h2>Add a reminder</h2>
        <form>
        <div className="form-group">
          <label htmlFor="title">Remind me to:</label>
          <input
            className="form-control"
            id="title"
            name="title"
            required="required"
            value={reminder.title}
            onChange={this.handleInputChange}
          />
        </div>

        <WeightSlider weight={reminder.weight} onChange={this.handleInputChange} />

        
        <label>Schedule</label>
        <div className="">
          <ul className="nav nav-pills">
            <li
              className={(reminder.schedule == 'none' ? 'active' : '')}
            >
              <a
                href="#"
                onClick={event => this.switchTabs(event, "none")}
              >
                None
              </a>
            </li>
            <li
              className={(reminder.schedule == 'once' ? 'active' : '')}
            >
              <a
                href="#"
                onClick={event => this.switchTabs(event, "once")}
              >
                Once
              </a>
            </li>
            <li
              className={(reminder.schedule == 'recurring' ? 'active' : '')}
            >
              <a
                href="#"
                onClick={event => this.switchTabs(event, "recurring")}
              >
                Repeat
              </a>
            </li>
          </ul>
          <div
            className={"tab-content"}
          >
            <div
              className={"tab-pane " + (reminder.schedule == 'none' ? 'active' : '')}
              id="schedule-none"
              style={{backgroundColor: '#AAAAFF', padding: '5px', marginBottom: '20px'}}
            >
              This reminder can show up in your rolls immediately.
              It will not repeat.
            </div>
          
            <div
              className={"tab-pane " + (reminder.schedule == 'once' ? 'active' : '')}
              id="schedule-once"
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
                  name="dueDate" 
                  required="required"
                  onChange={this.handleInputChange}
                  value={reminder.dueDate}
                />
              </div>

              <div className="form-group">
                <label htmlFor="reminderFuzz">Fuzz:</label>
                <input
                  type="range"
                  name="fuzz"
                  id="onceFuzz"
                  value={reminder.fuzz || 0}
                  onChange={this.handleInputChange}
                  min="0"            
                  max="3"
                  className="form-control"
                />
                <span>your reminder will come {this.reminderFuzzLabels[this.state.onceFuzz]}</span>
              </div>
            </div>
        
            <div
              className={"tab-pane " + (reminder.schedule == 'recurring' ? 'active' : '')}
              id="schedule-recurring"
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
              name="dueDate" 
              value={reminder.dueDate}
              onChange={this.handleInputChange}
              required="required"
            />
          </div>

          <div className="form-group">
            <label htmlFor="reminderFuzz">Fuzz:</label>
            <input
              type="range"
              name="fuzz"
              id="recurringFuzz"
              value={reminder.fuzz || 0}
              onChange={this.handleInputChange}
              min="0"            
              max="3"
              className="form-control"
            />
            <span>your reminder will come {this.reminderFuzzLabels[reminder.fuzz]}</span>
          </div>
          <div className="form-group">
            <label htmlFor="recurType">Repeats:</label>
            <select
              className="form-control"
              id="recurType"
              name="recurType"
              value={reminder.recurType}
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
                value={reminder.recurInterval}
                onChange={this.handleInputChange}
              >
                <option>1 {this.recurTypeLabels[reminder.recurType]}</option>
                <option>2 {this.recurTypeLabels[reminder.recurType]}</option>
                <option>3 {this.recurTypeLabels[reminder.recurType]}</option>
                <option>4 {this.recurTypeLabels[reminder.recurType]}</option>
                <option>5 {this.recurTypeLabels[reminder.recurType]}</option>
                <option>6 {this.recurTypeLabels[reminder.recurType]}</option>
                <option>7 {this.recurTypeLabels[reminder.recurType]}</option>
                <option>8 {this.recurTypeLabels[reminder.recurType]}</option>
                <option>9 {this.recurTypeLabels[reminder.recurType]}</option>
                <option>10 {this.recurTypeLabels[reminder.recurType]}</option>
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
                  checked={reminder.recurEndType === 'NEVER'}
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
                  checked={reminder.recurEndType === 'COUNT'}
                  onChange={this.handleInputChange}
                />
                After&nbsp;
                <input
                  className="form-control"
                  style={{minWidth:0,width:'45px',display:'inline'}}
                  type="text"
                  name="recurEndCount"
                  defaultValue={reminder.recurEndCount} 
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
                  checked={reminder.recurEndType === 'UNTIL'}
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
          <div>Current rrule: {reminder.rrule}</div>
            </div>
          </div>
        </div>

        <div className="form-group">
          <button 
            onClick={(event) => this.handleClick(event)}
            className="btn btn-primary" 
          >{this.state.formMode == 'add' ? 'Add Reminder' : 'Update Reminder'}</button>
        </div>
        </form>

      </div>
    )
  }

  handleClick(event) {
    let reminder = this.state.reminder

    if(reminder.dueDate == null) {
      reminder.dueDate = moment().format('YYYY-MM-DD')
    }

    console.log('using ', this.state.formMode)
    console.dir(reminder)
    if(this.state.formMode == 'add') {
      Api.addReminder(reminder)
    } else {
      Api.putReminder(reminder)
    }

    event.preventDefault()
  }

  switchTabs(event, scheduleType) {
    event.preventDefault()

    this.setState({
      reminder: update(this.state.reminder, {schedule: {$set: scheduleType}})
    }, this.updateRrule)
    /*
    if(tabId === 'unscheduled') {
      this.setState({
        schedule: 'none'
      })
    } else if(tabId === 'scheduled') {
      this.setState({
        schedule: 'once'
      })
    } else if(tabId === 'recurring') {
      this.setState({
        schedule: 'recurring'
      })
    }
    */
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
