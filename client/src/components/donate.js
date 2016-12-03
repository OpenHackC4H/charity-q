import React, { Component } from 'react'
import * as styles from '../style'
import Donation from './donation'

export default class Donate extends Component {
  constructor(props){
    super(props)
    this.state = {
      pimping: false
    }
  }

  onDonateClick() {
    this.setState({pimping: true})
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
        <div style={{marginRight: '10px'}}>{label}</div>
        <input style={input} type='text' placeholder={placeholder}/>
      </div>
    )
  }
  
  render(){
    const background = {
      backgroundColor: 'rgb(36,36,36)',
      height: '300px',
      display: 'flex',
      justifyContent: 'space-around'
    }

    const title = {
      ...styles.text.title
    }

    const disclaimer = {
      fontFamily: 'Times', 
      fontSize: '8pt',
      color: 'lightgray',
      marginTop: '10px'
    }

    const link = {
      ...disclaimer,
      color: 'lightblue',
      textDecoration: 'underline',
      margin: '0',
      cursor: 'pointer'
    } 

    const column = {
      width: '250px'
    }

    const donationStyle = {
      backgroundColor: 'rgb(160, 167, 201)',
      height: '40px',
      width: '100px',
      borderBottom: '4px solid rgb(204, 226, 255)',
      margin: '20px'
    }

    return(
      <div style={background}>
        <div style={column}>
          <p style={title}>
            Donate
          </p>
          <div>
            { this.renderInput('Email', 'you@example.com') }
            { this.renderInput('Amount', '€50') }
            <div onClick={this.onDonateClick.bind(this)} style={{...styles.button, marginTop: '10px'}}>Pay with card</div> 
            <div style={disclaimer}>Untitled Charity Org will charge 15% for daily running costs</div>
            <div style={link}>Read More</div>   
          </div>
        </div>
        <div style={column}>
         { this.state.pimping && (
           <div>
              <div style={title}>Style It!</div>
              <div style={disclaimer}>Your donation has entitled you to choose a custom style for your donation</div>
              
              <div style={{display: 'flex', justifyContent:'space-between', alignItems: 'center' }}>
                <div style={{...styles.button, height: '30px', padding: '0 10px'}}>
                  Left
                </div> 
                <Donation donationStyle={donationStyle} />
                <div style={{...styles.button, height: '30px', padding: '0 10px'}}>
                  Right
                </div> 
              </div>
              
              <div style={{...styles.button, marginTop: '10px'}}>Donate</div> 
           </div>
         )}
        </div>
      </div>
    )
  }
}
