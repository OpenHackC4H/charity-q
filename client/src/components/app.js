import React, { Component } from 'react'
import Header from './header'
import Organization from './organization'
import { connect } from 'react-redux'
import * as actions from '../actions'

export class App extends Component {

  componentDidMount() {
    this.props.loadInitialData()
  }

  render(){
    return(
      <div>
        <Header />
        <Organization />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadInitialData: () => {
      console.log('loading')
      dispatch(actions.fetchQueue())
      dispatch(actions.fetchTotalAmount())
      dispatch(actions.fetchLeaderboard())
    }
  }
}

export default connect(null, mapDispatchToProps)(App)
