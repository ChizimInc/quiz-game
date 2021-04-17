import React, {useState, useEffect} from 'react'
import {Add} from './Add'
import axios from 'axios'
import {Preloader} from '../Preloader'

export const Content = ({userData}) => {

  const [addGame, setAddGame] = useState(false)
  const [usersList, setUsersList] = useState([])
  const [loading, setLoading] = useState(true)

  function onAddGame(event){
    event.preventDefault()
    setAddGame(!addGame)
  }

  useEffect( () => {
    const path = "http://127.0.0.1:8000/users/?skip=0&limit=100"
    axios.get(path)
    .then((response) => {
      if(response.status == 200){
        setUsersList(response.data)
        setLoading(false)
      }
    }, (error) => {
      setLoading(false)
    });
  });

  const userMap = usersList.map( (user) => <li class="collection-item">{user.username}</li> )

  return(
    <div>
      <div class="row">
        <div class="col s12 m12">
          <div class="card blue-grey darken-1">
            <div class="card-content white-text">
              <span class="card-title">Games list</span>
              <p>No game</p>
            </div>
            <div class="card-action">
              <a onClick={onAddGame} href="#">Add game</a>
            </div>
          </div>
        </div>
      </div>
      {addGame && <Add userData={userData} />}
      <div class="row">
        <div class="col s12 m12">
          <div class="card blue-grey darken-1">
            <div class="card-content darken-text">
              <span class="card-title white-text">Users list</span>
              <ul class="collection userMap">

                {userMap}

                {loading && <Preloader />}
              </ul>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
