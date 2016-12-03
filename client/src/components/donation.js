import React, { Component } from 'react'

export const KING_BADGE = 170
export const ANGEL_BADGE = 190

export default class Donation extends Component {
  constructor(props){
    super(props)
  }

  getPattern(id, patternStyle){
    if(id === 0) return null
    if(id === 1) return <div style={{...patternStyle, backgroundImage: 'url("assets/patterns&badges/oh_-06.png")'}}></div>
    if(id === 2) return <div style={{...patternStyle, backgroundImage: 'url("assets/patterns&badges/oh_-07.png")'}}></div>
    if(id === 3) return <div style={{...patternStyle, backgroundImage: 'url("assets/patterns&badges/oh_-08.png")'}}></div>
    if(id === 4) return <div style={{...patternStyle, backgroundImage: 'url("assets/patterns&badges/oh_-06.svg")'}}></div>
  }

  getMedal(amount, width){
    const medalStyle = {
      position: 'absolute',
      margin: `-5px ${width-20}px`,
      height: '30px',
      width: '30px',
    }
    if (amount >= ANGEL_BADGE) return <img style={medalStyle} src={'assets/patterns&badges/oh_-03.svg'}/>
    else if (amount >= KING_BADGE) return <img style={medalStyle} src={'assets/patterns&badges/oh_-02.svg'}/>
  }

  render(){
    const height = this.props.donationStyle.height
    const patternStyle = {
      height: height + 'px',
      width: this.props.donationStyle.width,
      backgroundSize: '100%',
      backgroundRepeat: 'repeat'
    }
    const width = this.props.donationStyle.width || 220
    return (
      <div onClick={this.props.onClick} style={this.props.donationStyle}>
        { this.getMedal(this.props.amount, width) }
        { this.getPattern(this.props.pattern || 0, patternStyle) }
      </div>
    )
  }
}
