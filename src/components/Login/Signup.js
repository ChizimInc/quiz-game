import React, {useState, useContext} from 'react'
import {Redirect} from 'react-router-dom';
import appStyles from '../../static/app.module.css'
import axios from 'axios'
import {Preloader} from '../Preloader'

function Signup() {

  const [username, setUsername] = useState([])
  const [email, setEmail] = useState([])
  const [password, setPassword] = useState([])
  const [loading, setLoading] = useState(false)
  const [userData, setUserData] = useState([])
  const [isLoged, setLoged] = useState(false)



  function signUpSubmit(event) {
    event.preventDefault()
    setLoading(true)

    axios({
      method: 'post',
      url: 'http://127.0.0.1:8000/users/',
      headers: {'Content-Type': 'application/json'},
      data: {
        "email": email,
        "username": username,
        "password": password
      }
    })
    .then((response) => {
      setLoading(false)
      setUserData(response.data)
      setLoged(true)
    }, (error) => {
      console.log(error);
      setLoading(false)
    });

  }

  function changeUsername(event) {
    setUsername(event.target.value)
  }

  function changeEmail(event) {
    setEmail(event.target.value)
  }

  function changePassword(event) {
    setPassword(event.target.value)
  }

  return(
    <form onSubmit={signUpSubmit} className={appStyles.loginForm}>
        <div class="input-field col s6 login-input">
          <input onChange={changeUsername} id="log-nick" type="text" class="validate"/>
          <label class="active" for="log-nick">Username</label>
        </div>
       <div class="input-field col s6 login-input">
         <input onChange={changeEmail} id="log-email" type="email" class="validate"/>
         <label class="active" for="log-email">E-Mail</label>
       </div>
       <div class="input-field col s6 login-input">
         <input onChange={changePassword} id="log-pass" type="password" class="validate"/>
         <label class="active" for="log-pass">Password</label>
       </div>
       <button type="submit" className={appStyles.loginSubmit}>
          <a class="waves-effect waves-light btn-small login-submit">Sign up</a>
       </button>
       {loading && <Preloader />}
       {isLoged && <Redirect to={{ pathname: "/", userData: userData }}/>}
    </form>
  )
}

export default Signup
