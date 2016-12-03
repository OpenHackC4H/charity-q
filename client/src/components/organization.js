import React, { Component } from 'react'
import * as styles from '../style'
import Queue from './queue'
import Statistics from './statistics'
import Donate from './donate'

const mockQueue = [
  { id: 1, amount: 200 },
  { id: 2, amount: 10 },
  { id: 3, amount: 50 },
  { id: 4, amount: 100 }
]

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
          <Queue donations={mockQueue}/>
          <Statistics />
        </div>
        <Donate />
      </div>
    )
  }
}
