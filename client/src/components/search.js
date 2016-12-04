import React, { Component } from 'react'
import * as styles from '../style'
import * as actions from '../actions'
import Box from './box'
import { connect } from 'react-redux'

export class Search extends Component {

  constructor(props){
    super(props)
    this.state = {
      email: ''
    }
  }

  onSearchInput(event){
    this.setState({email: event.target.value})
  }

  onSearchSubmit(){
    this.props.search(this.state.email)
  }

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
          <input onChange={this.onSearchInput.bind(this)} style={input} />
          <div onClick={this.onSearchSubmit.bind(this)} style={{...styles.button, margin: '8px 0 0 5px'}}><i style={{color: 'white'}}className="fa fa-search" aria-hidden="true"></i></div>
        </div>
      </Box>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    search: email=> {
      dispatch(actions.searchDonation(email))
    }
  }
}

export default connect(null, mapDispatchToProps)(Search)