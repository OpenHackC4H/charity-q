import React, { Component } from 'react'
import * as styles from '../style.js'
import Box from './box'

const orgs = [
  { id: 'org1', values: [ 'tag1', 'tag2']},
  { id: 'org2', values: [ 'tag1', 'tag2']},
  { id: 'org3', values: [ 'tag1', 'tag2']},
  { id: 'org4', values: [ 'tag1', 'tag2']}
]

const accounts = [
  { id: 'org1'},
  { id: 'org2'},
  { id: 'org3'},
  { id: 'org4'},
  { id: 'org5'},
  { id: 'org6'}
]

export default class Admin extends Component {
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

  renderInput(label, placeholder){
    const rowStyle = {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '10px 10px',
      color: 'lightgray',
      alignItems: 'center'
    }

    const input = {
      padding: '10px',
      borderRadius: '5px',
      border: 'none'
    }
    return (
      <div style={rowStyle}>
        <input style={input} type='text' placeholder={placeholder}/>
        <div style={{marginRight: '10px'}}>{label}</div>
      </div>
    )
  }

  render(){
    const box = {
      padding: '25px 15px'
    }
    return(
      <div style={{...styles.mainBackground, height: '650px'}}>
        <div style={{display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap'}}>
          {
            orgs.map(org => (
              <Box title={org.id} height={'200px'}>
                <div style={box}>
                  { org.values.map(tag => this.renderRow(tag, 'X')) } 
                  { this.renderInput('Add', 'Tag name')}
                </div>
              </ Box>
            ))
          }
        </div>
      </div>
    )
  }
}
