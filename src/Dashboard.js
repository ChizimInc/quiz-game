import React, {useState} from 'react'
import {Nav} from './components/Nav'

export const Dashboard = props => {

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
      <div className="container">
        <h1>Dashboard</h1>
        <h5>Hello {userData.username}</h5>
      </div>
    </div>
  )
}
