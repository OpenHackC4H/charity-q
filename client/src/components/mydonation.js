import React, { Component } from 'react'
import * as styles from '../style'
import Box from './box'
import { connect } from 'react-redux'
import * as selectors from '../selectors'
import * as actions from '../actions'

export class MyDonation extends Component {
  render(){
    let backgroundColor, titleColor
    if (this.props.donation.email === 'test@test.com'){
      backgroundColor = styles.colors.highlight
      titleColor = styles.colors.highlight
    } else {
      backgroundColor = 'rgba(0,0,0,.6)'
      titleColor = 'lightgray'
    }
    return(
      <Box title={'€' + this.props.donation.amount} titleColor={titleColor} backgroundColor={backgroundColor} overflow={true} rounded={true}>
        <div style={{overflow: 'auto'}}>
          <div style={{backgroundColor: 'rgba(0,0,0,.6)', margin: '10px', padding: '10px', color: 'white'}}>
            Lorentz did no wrong, and nothing he did
          </div>
        </div>
      </Box>
    )
  }
}

const mapStateToProps = state => {
  return {
    donation: selectors.getActiveDonation(state)
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
