import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import appStyles from '../static/app.module.css'

export const Nav = (props) => {

  const [userData, setUserData] = React.useState([])

  useEffect( () => {
    if (props.userData) {
      setUserData(props.userData)
      console.log("userData from Nav: ", props.userData)
    }
  }, [userData] );

  return(
      <nav className={appStyles.nav} >
        <div className="nav-wrapper container">
          <Link className="brand-logo" to="/">React-quiz App</Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><Link to="/dashboard">Dashboard</Link></li>
            {
              userData.username
                ? <li><Link to="/account">{userData.username}</Link></li>
                : <li><Link to="/login">Sign in</Link></li>
            }
          </ul>
        </div>
      </nav>
  )
}
