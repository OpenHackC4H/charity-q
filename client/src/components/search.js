import React, { Component } from 'react'
import * as styles from '../style'
import Box from './box'

export default class Search extends Component {

  render(){
    const input = {
      padding: '10px',
      borderRadius: '5px',
      border: 'none',
      margin: '8px 0 0 5px',
      width: '80%'
    }

    return(
      <Box rounded={true} height={50}>
        <div style={{display: 'flex'}}>
          <input style={input} />
          <div style={{...styles.button, margin: '8px 0 0 5px'}}><i style={{color: 'white'}}className="fa fa-search" aria-hidden="true"></i></div>
        </div>
      </Box>
    )
  }
}
