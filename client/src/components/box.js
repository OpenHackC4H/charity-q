import React, { Component } from 'react'

export default class Box extends Component {
  render(){
    const title = {
      color: this.props.titleColor || 'white',
      fontSize: '50px',
      fontWeight: '900'
    }

    const backgroundColor = this.props.backgroundColor || 'rgba(0,0,0,.4)'
    const background = {
      width: 250,
      height: this.props.height || 400,
      boxShadow: `inset 0 0 0 1000px ${backgroundColor}`,
      fontWeight: '600',
      marginTop: '-10px',
      borderRadius: this.props.rounded ? '5px' : '0'
    }
    
    return(
     <div>
        <p style={title}>{ this.props.title }</p>
        <div style={background}>
          { this.props.children }
        </div>
      </div>
    )
  }
}


// Title color
// Box backgrounds
// width