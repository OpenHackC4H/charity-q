import React, { Component } from 'react'
import * as styles from '../style'
import Box from './box'
import { connect } from 'react-redux'
import * as selectors from '../selectors'
import * as actions from '../actions'

export class MyDonation extends Component {
  render(){
    let backgroundColor, titleColor
    if (this.props.highlightedDonations && this.props.highlightedDonations.includes(this.props.donation.email)){
      backgroundColor = styles.colors.highlight
      titleColor = styles.colors.highlight
    } else {
      backgroundColor = styles.colors.donation
      titleColor = 'lightgray'
    }
    return(
      <Box title={'€' + this.props.donation.amount} titleColor={titleColor} backgroundColor={backgroundColor} overflow={true} rounded={true}>
        <div style={{overflow: 'auto'}}>
          <div style={{backgroundColor: 'rgba(0,0,0,.6)', margin: '10px', padding: '10px', color: 'white'}}>
            { this.props.donation.email }
          </div>
        </div>
      </Box>
    )
  }
}

const mapStateToProps = state => {
  return {
    donation: selectors.getActiveDonation(state),
    highlightedDonations: state.highlightedDonations
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setActiveDonation: (id) => {
      dispatch(actions.setActiveDonation(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyDonation)
