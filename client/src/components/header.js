import React, { Component } from 'react'

export default class Header extends Component {
  render(){
    const header = {
      height: '80px',
      backgroundColor: '#00DA09'
    }

    const logo = {
      fontSize: '22px',
      fontWeight: 'bold',
      fontFamily: 'Garamond sans-serif',
      padding: '20px 20px'
    }
    return(
      <div style={header}>
        <div style={logo}>Q</div>
      </div>
    )
  }
}