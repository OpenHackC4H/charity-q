import React, { Component } from 'react'
import * as styles from '../style'

export default class Box extends Component {
  render(){

    const title = {
      ...styles.text.title,
      color: this.props.titleColor || styles.text.title.color
    }
    const backgroundColor = this.props.backgroundColor || 'rgba(0,0,0,.4)'
    const height = this.props.height || 400

    const background = {
      width: 250,
      boxShadow: `inset 0 0 0 1000px ${backgroundColor}`,
      fontWeight: '600',
      marginTop: '-10px',
      borderRadius: this.props.rounded ? '5px' : '0',
      overflow: this.props.overflow ? 'auto' : 'none'
    }

    if (!this.props.overflow) {
      background.height = height
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