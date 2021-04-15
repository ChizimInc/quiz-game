import React, {useState} from 'react'
import appStyles from '../../static/app.module.css'
import {Preloader} from '../Preloader'
import axios from 'axios'

export const Edit = ({userData, onUpdate}) => {

  const [username, setUsername] = useState(userData.username)
  const [password, setPassword] = useState([])
  const [loading, setLoading] = useState(false)
  const [localUserData, setLocalUserData] = useState(userData)

  function changeUsername(event){
    event.preventDefault()
    setUsername(event.target.value)
  }

  function changePassword(event){
    event.preventDefault()
    setPassword(event.target.value)
  }



  return(
    <form onSubmit={(event) => onUpdate(event, username, password)}
          className={appStyles.loginForm}>
       <div className="input-field col s6 login-input">
         <input
            onChange={changeUsername}
            id="change-username"
            type="text"
            value={username}
            className="validate"
         />
         <label className="active" for="change-username">Username</label>
       </div>
       <div className="input-field col s6 login-input">
         <input
            onChange={changePassword}
            id="change-pass"
            type="password"
            className="validate"
            value={password}
         />
         <label className="active" for="change-pass">New password</label>
       </div>
       <button type="submit" className={appStyles.loginSubmit}>
          <a className="waves-effect waves-light btn-small login-submit">Change</a>
       </button>
       {loading && <Preloader />}
    </form>
  )
}
