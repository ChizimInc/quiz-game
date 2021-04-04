import React from 'react'
import appStyles from '../../static/app.module.css'

export const Signin = () => {

  function signInSubmit(event) {
    console.log("submit sign in")
    event.preventDefault()
  }

  return(
    <form onSubmit={signInSubmit} className={appStyles.loginForm}>
       <div class="input-field col s6 login-input">
         <input id="log-email" type="email" class="validate"/>
         <label class="active" for="log-email">E-Mail</label>
       </div>
       <div class="input-field col s6 login-input">
         <input id="log-pass" type="password" class="validate"/>
         <label class="active" for="log-pass">Password</label>
       </div>
       <button type="submit" className={appStyles.loginSubmit}>
          <a class="waves-effect waves-light btn-small login-submit">Sign in</a>
       </button>
    </form>
  )
}
