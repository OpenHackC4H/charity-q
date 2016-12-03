import React, { Component } from 'react'
import * as styles from '../style'
import Box from './box'

export default class Queue extends Component {
  constructor(props){
    super(props)
  }
  render(){
    const totalAmount = this.props.donations.reduce((prev, curr) => prev + curr.amount, 0)
    const padding = 15
    const queueHeight = 400
    return(
      <Box title={'€230 403'} titleColor={'lightgray'} backgroundColor={'rgba(210,210,210,.6)'} height={queueHeight}>
        <div style={{padding: `${padding}px`}}>
          { this.props.donations.map((d, i) => queueGenerator(d, i, totalAmount, queueHeight-padding*2)) }
        </div>
      </Box>
    )
  }
}

const queueGenerator = (donation, i, totalAmount, queueHeight) => {
  let backgroundColor, height
  if (i%2===0){
    backgroundColor = 'rgb(160, 167, 201)'	
  }
  else {
    backgroundColor = 'rgb(160, 167, 201)'
    
  }

  const borderBottom = '4px solid rgb(204, 226, 255)'

  height = donation.amount / totalAmount
  height = height * queueHeight

  const donationStyle = {
    backgroundColor,
    height,
    borderBottom
  }
  return <div style={donationStyle} key={i}></div>
}

// const Donation = props => {
//   return null
// }
