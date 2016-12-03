import React, { Component } from 'react'

export default class Donation extends Component {
  constructor(props){
    super(props)
  }

  getPattern(id, patternStyle){
    if(id === 0) return null
    if(id === 1) return <div style={{...patternStyle, backgroundImage: 'url("assets/patterns&badges/oh_-06.png")'}}></div>
    if(id === 2) return <div style={{...patternStyle, backgroundImage: 'url("assets/patterns&badges/oh_-07.png")'}}></div>
    if(id === 3) return <div style={{...patternStyle, backgroundImage: 'url("assets/patterns&badges/oh_-08.png")'}}></div>
  }

  render(){
    const height = this.props.donationStyle.height
    const patternStyle = {
      height: height + 'px',
      width: this.props.donationStyle.width,
      backgroundSize: '100%',
      backgroundRepeat: 'repeat'
    }

    return (
      <div onClick={this.props.onClick} style={this.props.donationStyle}>
        { this.getPattern(this.props.pattern || 0, patternStyle) }
      </div>
    )
  }
}
