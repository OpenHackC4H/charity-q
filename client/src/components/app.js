import React, { Component } from 'react'
import Header from './header'
import Organization from './organization'
import { connect } from 'react-redux'

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

const mapStateToProps = state => {
  return {

  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadInitialData: () => {
      
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
