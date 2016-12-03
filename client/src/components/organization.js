import React, { Component } from 'react'
import * as styles from '../style'
import Queue from './queue'
import Statistics from './statistics'
import Donate from './donate'
import MyDonation from './mydonation'

export default class Organization extends Component {
  render(){
    return(
      <div style={styles.mainBackground}>
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '800px'}}>
          <div style={{display: 'flex', justifyContent: 'space-around'}}>
            <Queue />
            <MyDonation />
            <Statistics />
          </div>
          <div>
            <Donate />
          </div>
        </div>
      </div>
    )
  }
}
