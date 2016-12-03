import React, { Component } from 'react'
import * as styles from '../style'
import Queue from './queue'
import Statistics from './statistics'

export default class Organization extends Component {
  render(){
    const totalDonations = {
      border: '2px solid black',
      width: '150px',
      height: '100px'
    }
    return(
      <div style={styles.mainBackground}>
        <p style={{...styles.text.header, textAlign: 'center'}}>SIDA</p>
        <div style={{display: 'flex', justifyContent: 'space-around'}}>
          <Queue />
          <Statistics />
        </div>
      </div>
    )
  }
}
