import React, {useState, useEffect} from 'react'
import {Add} from './Add'
import axios from 'axios'
import {Preloader} from '../Preloader'
import {GamesMap} from './GamesMap'

export const Content = ({userData}) => {

  const [addGame, setAddGame]     = useState(false)
  const [usersList, setUsersList] = useState([])
  const [gamesList, setGamesList] = useState([])
  const [loading, setLoading]     = useState(true)

  function onAddGame(event){
    event.preventDefault()
    setAddGame(!addGame)
  }

  function onDelete(event, gameId){
    event.preventDefault()
    const dell = window.confirm("Do you confirm delete forever?")

    if(dell){
      axios.delete(`http://127.0.0.1:8000/users/games-items/${gameId}/delete/`)
      setGamesList(gamesList.filter(game => game.id !== gameId))
    }

  }

  useEffect( () => {

    axios.all([
      axios.get('http://127.0.0.1:8000/users/?skip=0&limit=100'),
      axios.get('http://127.0.0.1:8000/games-items/?skip=0&limit=100')
    ])
    .then((responseArr) => {
      setUsersList(responseArr[0].data)
      setGamesList(responseArr[1].data)
      setLoading(false)
    }, (error) => {
      setLoading(false)
    });

  },[setUsersList]);

  const userMap = usersList.map( (user) => <li class="collection-item">{user.username}</li> )
  const gamesMap = gamesList.map( (game) => <GamesMap onDelete={onDelete} game={game} userData={userData} /> )

  return(
    <div>
      <div class="row">
        <div class="col s12 m12">
          <div class="card blue-grey darken-1">
            <div class="card-content darken-text">
              <span class="card-title">Games list</span>
              <ul class="collection userMap">
              {gamesMap}
              {loading && <Preloader />}
              </ul>
            </div>
            <div class="card-action">
              <a onClick={onAddGame} href="#">Add game</a>
            </div>
          </div>
        </div>
      </div>
      {addGame && <Add userData={userData} onAddGame={onAddGame} />}
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
