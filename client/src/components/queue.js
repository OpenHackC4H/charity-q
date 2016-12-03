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
  let backgroundColor, height, borderBottom
  
  if (i === 2) {
    //Highligthed donation (yours)
    backgroundColor = styles.colors.highlight
    borderBottom = '4px solid rgb(254, 255, 76)'
  } else {
    backgroundColor = 'rgb(160, 167, 201)'
    borderBottom = '4px solid rgb(204, 226, 255)'
  }
	
  height = donation.amount / totalAmount
  height = height * queueHeight

  const donationStyle = {
    backgroundColor,
    height,
    borderBottom
  }
  return <Donation donationStyle={donationStyle} key={i}/>
}

const Donation = props => {
  return <div style={props.donationStyle}></div>
}
