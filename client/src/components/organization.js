import React, { Component } from 'react'
import * as styles from '../style'
import Queue from './queue'
import Statistics from './statistics'
import Donate from './donate'
import MyDonation from './mydonation'
import Search from './search'
import { connect } from 'react-redux'
import * as selectors from '../selectors'

export class Organization extends Component {
  render(){
    return(
      <div style={styles.mainBackground}>
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '800px'}}>
          <div style={{display: 'flex', justifyContent: 'space-around'}}>
            <Queue />
            <div style={{marginTop: '40px'}}>
              <Search />          
              { this.props.activeDonation ? <MyDonation />:<div style={{width: 250}}></div>}
            </div>
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

const mapStateToProps = state => {
  return {
    activeDonation: selectors.getActiveDonation(state)
  }
}

export default connect(mapStateToProps, null)(Organization)
