import React, { Component } from 'react'
import * as styles from '../style'
import Box from './box'

export default class MyDonation extends Component {
  render(){
    return(
      <Box title={'€400'} titleColor={styles.colors.highlight} backgroundColor={styles.colors.highlight} height={'80px'} rounded={true}>
        <div style={{backgroundColor: 'rgba(0,0,0,.6)', paddingTop: '10px', margin: '0 10px 10px 10px', color: 'white'}}>
          Lorentz did no wrong, and nothing he did
        </div>
      </Box>
    )
  }
}
