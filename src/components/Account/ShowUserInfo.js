import React, {useState} from 'react'
import {Redirect} from 'react-router-dom'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {Edit} from './Edit'
import '../../static/index.css'

export const ShowUserInfo = props => {

  const [onSignOut, setSignOut] = useState(false)
  const [redirect, setRedirect] = useState(false)
  const [showEditUser, setEditUser] = useState(false)
  const [getAdmin, setAdmin] = useState(false)

  function signOut(event){
    event.preventDefault()
    localStorage.removeItem('userData')
    setSignOut(true)
  }


  function deleteUser(event){
    event.preventDefault();
    let dell = window.confirm("Yoy are sure to delete account forever?")

    if(dell == true){
      axios.delete(`http://127.0.0.1:8000/users/delete/?email=${props.userData.email}`)

      localStorage.removeItem('userData')
      setSignOut(true)
    }

  }

  return(
    <div className="container">
      <div className="row">
       <div className="col s12 m12">
         <div className="card blue-grey darken-1">
           <div className="card-content white-text">
             <span className="card-title">{props.userData.username}</span>
             <p>E-mail: {props.userData.email}</p>
           </div>
           <div className="card-action center card-action-account">
             <a onClick={setEditUser.bind(null, !showEditUser)} class="waves-effect waves-light btn blue">Edit user data</a>
             <a onClick={setAdmin.bind(null, true)} class="waves-effect waves-light btn">Get admin status</a>
             <a onClick={deleteUser} class="waves-effect waves-light btn red">Delete user</a>
             <a onClick={signOut} class="waves-effect waves-light btn red">Sign out</a>
             {onSignOut && <Redirect to="/"/>}
           </div>
         </div>
       </div>
      </div>
      {showEditUser && <Edit userData={props.userData} onUpdate={props.onUpdate}/>}
    </div>
  )
}
