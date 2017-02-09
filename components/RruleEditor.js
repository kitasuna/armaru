'use strict'

import React, { Component } from 'react'

export default class RruleEditor extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      recurType: 'DAILY',
      recurEndType: 'NEVER',
      recurEndDate: this.props.recurEndDate ? this.props.recurEndDate : '',
      recurEndCount: this.props.recurEndCount ? this.props.recurEndCount : '',
      recurInterval: 1,
      recurLabel: 'days',
      rrule: this.props.rrule ? this.props.rrule : 'RRULE:FREQ=DAILY;INTERVAL=1;',
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
      <div style={{backgroundColor: '#FFAAAA', padding: '5px', marginBottom: '20px'}}>
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

        {this.state.recurType == 'NOPE' &&
          <div className="form-group">
            <div className="checkbox"><label><input type="checkbox" value="M" />Monday</label></div>
            <div className="checkbox"><label><input type="checkbox" value="T" />Tuesday</label></div>
            <div className="checkbox"><label><input type="checkbox" value="W" />Wednesday</label></div>
            <div className="checkbox"><label><input type="checkbox" value="R" />Thursday</label></div>
            <div className="checkbox"><label><input type="checkbox" value="F" />Friday</label></div>
            <div className="checkbox"><label><input type="checkbox" value="S" />Saturday</label></div>
            <div className="checkbox"><label><input type="checkbox" value="U" />Sunday</label></div>
          </div>
        }

        <div>Current rrule: {this.state.rrule}</div>
        <input type="hidden" id="reminder-rrule" ref="rrule" name="rrule" placeholder="How often?"/>

      </div>
    )
  }

  updateRrule() {
     let recurEndType = this.state.recurEndType
     let recurEndTypeString = ''
     if(recurEndType === 'UNTIL' && this.state.recurEndDate) {
       recurEndTypeString = 'UNTIL=' + this.state.recurEndDate
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
