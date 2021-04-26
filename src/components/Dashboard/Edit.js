import React, {useState, useEffect}  from 'react'
import {Nav}              from '../Nav'
import axios              from 'axios'
import {useParams}        from 'react-router-dom'
import {GameForm}         from './Edit/GameForm'

export const Edit = (props) => {

  const [userData, setUserData]   = useState([])
  const [gameData, setGameData]   = useState([])
  const [isLoged, setLoged]       = useState(false)
  const [gameId, setGameId]       = useState([])
  const { id }                    = useParams();
  const [titleForm, setTitleForm] = useState([])
  const [descForm, setDescForm]   = useState([])

  useEffect( () => {
    axios.get(`http://127.0.0.1:8000/game-items/?item_id=${id}`)
      .then( (response) => {
        setGameData(response.data)
      });
  },[]);


  if(isLoged == false){
    if(props.location.userData){
      setUserData(props.location.userData)
      setLoged(true)
      setGameId(props.location.gameId)
    }else{
      if(JSON.parse(localStorage.getItem('userData'))){
        setUserData(JSON.parse(localStorage.getItem('userData')))
        setLoged(true)
        axios.get(`http://127.0.0.1:8000/game-items/?item_id=${id}`)
          .then( (response) => {
            setGameId(response.data.id)
          });
      }
    }
  }

  return(

    <div>
      <Nav userData={userData} />
      <div class="container darken">
        <GameForm gameId={id} />
      </div>
    </div>
  )
}
