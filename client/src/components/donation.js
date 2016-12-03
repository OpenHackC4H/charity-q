import React, { Component } from 'react'

export default class Donation extends Component {
  constructor(props){
    super(props)
  }
  render(){
    return <div style={this.props.donationStyle}></div>
  }
}
