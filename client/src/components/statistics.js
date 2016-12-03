import React, { Component } from 'react'
import Box from './box'

export default class Statistics extends Component {
  
  renderRow(label, value){
    const text = {
      color: 'lightgrey',
      padding: '2px 10px'
    }

    return (
      <div style={{...text, display: 'flex', justifyContent: 'space-between'}}>
        <div>{label}</div>
        <div>{value}</div>
      </div>
    )
  }
  
  render(){

    const box = {
      padding: '25px 15px'
    }

    return(
      <Box title={'Statistics'}>
        <div id='top-box' style={box}>
          { this.renderRow('Total value', '100€') }
          { this.renderRow('Donors', '100€') }
          { this.renderRow('Avg donation', '100€') }
        </div>
        <p style={{color: 'white', padding: '0px 25px', fontSize: '20px'}}>Top donations</p>
        <div style={{...box, paddingTop: '2px'}}>
          { this.renderRow('Donation', '100€') }
          { this.renderRow('Donation', '100€') }
          { this.renderRow('Donation', '100€') }
          { this.renderRow('Donation', '100€') }
          { this.renderRow('Donation', '100€') }
          { this.renderRow('Donation', '100€') }
        </div>
      </Box>
    )
  }
}
