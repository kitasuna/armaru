import React, {Component} from 'react'

export default class WeightSlider extends Component {
  constructor(props, context) {
    super(props, context)


    this.labels = {
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
        <div className="form-group">
          <label htmlFor="weight">This task should take me:</label>
          <input
            type="range"
            name="weight"
            value={this.props.weight || 0}
            onChange={this.props.onChange}
            min="0"            
            max="4"
            className="form-control"
          />
          <span>{this.labels[this.props.weight]}</span>
        </div>
    )
  }
}
