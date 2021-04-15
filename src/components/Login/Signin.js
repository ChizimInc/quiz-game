import React, {useState} from 'react'
import {Redirect} from 'react-router-dom'
import appStyles from '../../static/app.module.css'
import {Preloader} from '../Preloader'
import axios from 'axios'
import {EventMessage} from '../EventMessage'

export const Signin = () => {

  const [email, setEmail] = useState([])
  const [password, setPassword] = useState([])
  const [userData, setUserData] = useState([])
  const [loading, setLoading] = useState(false)
  const [isLoged, setLoged] = useState(false)
  const [error, setError] = useState("")

  function signInSubmit(event) {
    event.preventDefault()
    setLoading(true)

    const hash = "notreallyhashed"

    const path = `http://127.0.0.1:8000/users/login/?email=${email}&password=${password}`;

    axios.get(path)
    .then((response) => {
      if(response.status == 200){
        setUserData(response.data)
        setLoged(true)
        setLoading(false)
      }
    }, (error) => {
      setLoading(false)
      setError("Login or password is wrong")
    });

  }

  function changeEmail(event){
    setEmail(event.target.value)
  }

  function changePassword(event){
    setPassword(event.target.value)
  }

  return(
    <form onSubmit={signInSubmit} className={appStyles.loginForm}>
       <div className="input-field col s6 login-input">
         <input onChange={changeEmail} id="log-email" type="email" className="validate"/>
         <label className="active" for="log-email">E-Mail</label>
       </div>
       <div className="input-field col s6 login-input">
         <input onChange={changePassword} id="log-pass" type="password" className="validate"/>
         <label className="active" for="log-pass">Password</label>
       </div>
       <button type="submit" className={appStyles.loginSubmit}>
          <a className="waves-effect waves-light btn-small login-submit">Sign in</a>
       </button>
       {loading && <Preloader />}
       {isLoged && <Redirect to={{ pathname: "/", userData: userData }}/>}
       {error   && <EventMessage messageType="error" message={error} />}
    </form>
  )
}
