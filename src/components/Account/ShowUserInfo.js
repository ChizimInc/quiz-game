import React, {useState} from 'react'
import {Redirect} from 'react-router-dom'
import {Link} from 'react-router-dom'

export const ShowUserInfo = props => {

  const [onSignOut, setSignOut] = useState(false)
  const [redirect, setRedirect] = useState(false)

  function signOut(event){
    event.preventDefault()
    localStorage.removeItem('userData')
    setSignOut(true)
  }

  return(
    <div className="container">
      <div className="row">
       <div className="col s12 m6">
         <div className="card blue-grey darken-1">
           <div className="card-content white-text">
             <span className="card-title">{props.userData.username}</span>
             <p>E-mail: {props.userData.email}</p>
           </div>
           <div className="card-action">
             <Link to="/">Lets play</Link>
             <a href="#">Delete user</a>
             <a onClick={signOut} href="#">Sign out</a>
             {onSignOut && <Redirect to="/"/>}
           </div>
         </div>
       </div>
      </div>
    </div>
  )
}
