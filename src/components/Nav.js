import React from 'react'
import {Link} from 'react-router-dom'
import appStyles from '../static/app.module.css'

export const Nav = (props) => {

  return(
      <nav className={appStyles.nav} >
        <div className="nav-wrapper container">
          <Link className="brand-logo" to="/">React-quiz App</Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/login">Sign In</Link></li>
          </ul>
        </div>
      </nav>
  )
}
