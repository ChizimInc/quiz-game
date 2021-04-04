import React, {useState} from 'react'
import {Redirect} from 'react-router-dom'
import {Nav} from './components/Nav'
import {ShowUserInfo} from './components/Account/ShowUserInfo'

export const Account = props => {

  const [isLoged, setLoged] = useState(false)
  const [userData, setUserData] = useState([])

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

  return(
    <div>
      <Nav userData={userData} />
      <ShowUserInfo userData={userData} />
      { !isLoged && <Redirect to={{ pathname: "/login"}}/> }
    </div>
  )
}
