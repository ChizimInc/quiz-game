import React, {Component} from 'react'
import {Nav} from './Nav'

export default class Dashboard extends Component {
  render(){
    return(
      <div>
      <Nav />
        <div className="container">
          <h1>Dashboard</h1>
        </div>
      </div>
    )
  }
}
