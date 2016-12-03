import React, { Component } from 'react'
import * as styles from '../style'
import Box from './box'

export default class MyDonation extends Component {
  render(){
    return(
      <Box title={'€400'} titleColor={styles.colors.highlight} backgroundColor={styles.colors.highlight} overflow={true} rounded={true}>
        <div style={{overflow: 'auto'}}>
          <div style={{backgroundColor: 'rgba(0,0,0,.6)', margin: '10px', padding: '10px', color: 'white'}}>
            Lorentz did no wrong, and nothing he did
          </div>
        </div>
      </Box>
    )
  }
}
