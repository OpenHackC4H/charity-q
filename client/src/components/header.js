import React, { Component } from 'react'
import * as styles from '../style'

export default class Header extends Component {
  render(){
    const header = {
      height: '80px',
      backgroundColor: styles.colors.gray,
      color: 'white',
      display: 'flex',
      padding: '0 20px',
      alignItems: 'center'
    }

    const logo = {
      fontSize: '30px',
      fontWeight: 'bold',
      padding: '20px 20px'
    }
    return(
      <div style={header}>
        <img style={{height: '80%', width: 'auto'}} src={'assets/logo_small.png'}/>
        <div style={logo}>for Untitled Charity Org</div>
      </div>
    )
  }
}
