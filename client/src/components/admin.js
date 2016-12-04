import React, { Component } from 'react'
import * as styles from '../style.js'
import Box from './box'
import { connect } from 'react-redux'
import * as actions from '../actions'

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

export class Admin extends Component {
   renderRow(tag, account){
    const text = {
      color: 'lightgrey',
      padding: '2px 10px'
    }
    return (
      <div style={{...text, display: 'flex', justifyContent: 'space-between'}}>
        <div>{tag}</div>
        <div style={styles.button} onClick={() => this.props.removeTag(account, tag)}>X</div>
      </div>
    )
  }

  componentWillMount() {
    this.props.loadInitialData()
  }

  renderInput(account){
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
      border: 'none',
      width: '150px'
    }
    return (
      <div style={rowStyle}>
        <input style={input} onChange={(evt) => this.inputValue = evt.target.value} type='text' placeholder={'Tag name'}/>
        <div style={styles.button} onClick={() => this.props.addTag(account, this.inputValue)}>{'Add'}</div>
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
            this.props.accounts.map(account => (
              <Box key={account._id} title={account._id} height={'200px'}>
                <div style={box}>
                  { account.value.map(tag => this.renderRow(tag, account._id)) } 
                  { this.renderInput(account._id)}
                </div>
              </ Box>
            ))
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  console.log('mapStateToProps, state:', state)
  return {
      accounts: state.accounts
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadInitialData: () => {
      console.log('loading')
      //dispatch(actions.fetchAccounts())
      dispatch(actions.fetchTags())
    },
    removeTag: (account, tag) => {
      console.log('remove tag dispatched')
      dispatch(actions.removeTag(account, tag))
    },
    addTag: (account, tag) => {
      console.log('add tag dispatched')
      dispatch(actions.addTag(account, tag))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin)
