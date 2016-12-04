import React, { Component } from 'react'
import Box from './box'
import { connect } from 'react-redux'

export class Statistics extends Component {
  
  renderRow(label, value){
    const text = {
      color: 'lightgrey',
      padding: '2px 10px'
    }

    return (
      <div key={label} style={{...text, display: 'flex', justifyContent: 'space-between'}}>
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
      <Box title={'Statistics'} width={300}>
        <div id='top-box' style={box}>
          { this.renderRow('Total value', '€'+this.props.totalAmount) }
          { this.renderRow('Donors', this.props.totalDonors) }
          { this.renderRow('Avg donation', '€'+this.props.avgDonation) }
        </div>
        <p style={{color: 'white', padding: '0px 25px', fontSize: '20px'}}>Top donors</p>
        <div style={{...box, paddingTop: '2px'}}>
          { this.props.leaderboard.map(l => {
            return this.renderRow(l.key, l.value)
          })}
        </div>
      </Box>
    )
  }
}

const mapStateToProps = state => {
  console.log(state)
  return {
    leaderboard: state.leaderboard,
    totalAmount: state.totalAmount,
    totalDonors: state.queue.length,
    avgDonation: Math.round(state.totalAmount / state.queue.length || 1)
  }
}

export default connect(mapStateToProps, null)(Statistics)
