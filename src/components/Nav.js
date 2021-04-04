import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import appStyles from '../static/app.module.css'

export const Nav = (props) => {

  const [userData, setUserData] = React.useState([])

  useEffect( () => {
    if (props.userData) {
      setUserData(props.userData)
    }
  }, [userData] );

  return(
      <nav className={appStyles.nav} >
        <div className="nav-wrapper container">
          <Link className="brand-logo" to="/">React-quiz App</Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {
              userData.username
                ? <li><Link
                    to={{ pathname: "/dashboard", userData }}>Dashboard</Link></li>
                : <li><Link to="/dashboard">Dashboard</Link></li>
            }
            {
              userData.username
                ? <li><Link
                        to={{ pathname: "/account", userData: userData }}
                        >{userData.username}</Link></li>
                : <li><Link to="/login">Sign in</Link></li>
            }
          </ul>
        </div>
      </nav>
  )
}
