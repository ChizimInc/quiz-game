import React, {useState, useEffect}   from 'react'
import {Preloader}                    from './components/Preloader'
import {Nav}                          from './components/Nav'
import {useParams}                    from "react-router-dom";
import {Question}                     from './components/Game/Question'


function Game(props) {

  const [item, setItem] = useState([{id:1}])
  const [loading, setLoading] = useState(true)

  const { id, title } = useParams();

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

  React.useEffect(function effectFunction() {
       async function fetchItems() {
           const path = `http://127.0.0.1:8000/game-items/?item_id=${id}`;
           const response = await fetch(path);
           const json = await response.json();
           console.log("effect",json)
           setItem(json);
           setLoading(false)
       }
       fetchItems();
   }, []);

  return(
    <div>
      <Nav userData={userData} />
      <div className='container'>
        {loading == true && <Preloader />}
        { item.questions
          ? item.questions.map( obj => <Question item={obj} /> )
          : loading ? null : <p>no data</p>
        }
      </div>
    </div>
  )
}

export default Game
