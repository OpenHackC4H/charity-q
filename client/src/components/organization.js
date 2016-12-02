import React, { Component } from 'react'
import * as styles from '../style'
import Queue from './queue'

export default class Organization extends Component {
  render(){
    const totalDonations = {
      border: '2px solid black',
      width: '150px',
      height: '100px'
    }
    return(
      <div>
        <p style={{...styles.text.header, textAlign: 'center'}}>SIDA</p>
        <div style={{display: 'flex', justifyContent: 'space-around'}}>
          <Queue />
          <div style={totalDonations}>
            <p>Total Donations in Queue</p>
            <p>265 700 SEK</p>
          </div>
        </div>
      </div>
    )
  }
}
