import React from 'react'
import appStyles from '../static/app.module.css'

export const Signin = () => {
  return(
    <form className={appStyles.loginForm}>
       <div class="input-field col s6 login-input">
         <input id="log-email" type="email" class="validate"/>
         <label class="active" for="log-email">E-Mail</label>
       </div>
       <div class="input-field col s6 login-input">
         <input id="log-pass" type="password" class="validate"/>
         <label class="active" for="log-pass">Password</label>
       </div>
       <a class="waves-effect waves-light btn-small">Sign in</a>
    </form>
  )
}
