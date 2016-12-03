import React, { Component } from 'react'

export default class Donation extends Component {
  constructor(props){
    super(props)
  }

  render(){
    return (
      <div onClick={this.props.onClick} style={this.props.donationStyle}>
        { this.props.pattern ? this.props.pattern : null}
      </div>
    )
  }
}
