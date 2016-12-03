import React, { Component } from 'react'
import * as styles from '../style'
import Box from './box'
import Donation from './donation'
import * as selectors from '../selectors'
import * as actions from '../actions'
import { connect } from 'react-redux'

const borderHeight = 2

export class Queue extends Component {
  constructor(props){
    super(props)
  }

  onDonationClick(id) {
    this.props.setActiveDonation(id)
  }

  queueGenerator (donation, i, totalAmount, queueHeight) {
    let backgroundColor, height, borderBottom

    if (i === 2) {
      //Highligthed donation (yours)
      backgroundColor = styles.colors.highlight
      borderBottom = `${borderHeight}px solid rgb(254, 255, 76)`
    } else {
      backgroundColor = 'rgb(160, 167, 201)'
      borderBottom = `${borderHeight}px solid rgb(204, 226, 255)`
    }
    
    height = donation.amount / totalAmount
    height = height * queueHeight
    height = height - borderHeight

    const donationStyle = {
      backgroundColor,
      height,
      borderBottom,
      cursor: 'pointer'
    }
    return <Donation borderHeight={borderHeight} pattern={donation.pattern} onClick={() => this.onDonationClick(donation._id)} donationStyle={donationStyle} key={i}/>
  }

  render(){
    const padding = 15
    const queueHeight = 400
    
    //Hack to compensate for border height
    const containerHeight = queueHeight + this.props.donations.length * borderHeight

    return(
      <Box title={'€' + this.props.totalAmount} titleColor={'lightgray'} backgroundColor={'rgba(210,210,210,.6)'} height={containerHeight}>
        <div style={{padding: `${padding}px`}}>
          { this.props.donations.map((d, i) => this.queueGenerator(d, i, this.props.totalAmount, queueHeight-padding*2)) }
        </div>
      </Box>
    )
  }
}

const mapStateToProps = state => {
  return {
    donations: selectors.getQueue(state),
    totalAmount: selectors.getTotalAmount(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setActiveDonation: (id) => {
      dispatch(actions.setActiveDonation(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Queue)
