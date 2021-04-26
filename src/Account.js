import React, {useState} from 'react'
import {Redirect} from 'react-router-dom'
import {Nav} from './components/Nav'
import {ShowUserInfo} from './components/Account/ShowUserInfo'
import {Preloader} from './components/Preloader'
import axios from 'axios'

export const Account = props => {

  const [isLoged, setLoged] = useState(false)
  const [userData, setUserData] = useState([])
  const [loading, setLoading] = useState(false)

  if(isLoged == false){
    if(props.location.userData){
      setUserData(props.location.userData)
      setLoged(true)
    }else{
      if(JSON.parse(localStorage.getItem('userData'))){
        setUserData(JSON.parse(localStorage.getItem('userData')))
        setLoged(true)
      }
    }
  }

  function editUserDataForm(event, username, password){
    event.preventDefault()
    setLoading(true)
    axios({
      method: 'put',
      url: 'http://127.0.0.1:8000/users/update/',
      headers: {'Content-Type': 'application/json'},
      data: {
        "email": userData.email,
        "username": username,
        "password": password
      }
    })
    .then((response) => {
      setLoading(false)
      localStorage.setItem('userData', JSON.stringify(response.data));
      setUserData(response.data)
    }, (error) => {
      console.log(error);
      setLoading(false)
    });

  }

  function onSetAdmin(event){
    event.preventDefault()
    axios.put(`http://127.0.0.1:8000/users/status/isadmin?email=${userData.email}`)
      .then( (response) =>  {
        localStorage.setItem('userData', JSON.stringify(response.data));
        setUserData(response.data)
      });
  }

  return(
    <div>
    <Nav userData={userData} isAdmin={userData.is_admin} />
      <ShowUserInfo userData={userData} onUpdate={editUserDataForm} onSetAdmin={onSetAdmin} />
      { !isLoged && <Redirect to={{ pathname: "/login"}}/> }
      { loading  && <Preloader />}
    </div>
  )
}
