import React from 'react'
import {Link} from 'react-router-dom'

export const ShowUserInfo = props => {
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
           </div>
         </div>
       </div>
      </div>
    </div>
  )
}
