import React, {useState, useEffect} from 'react'
import {Preloader} from './Preloader'
import {Nav} from './Nav'
import {useParams} from "react-router-dom";
import {Question} from './Question'


function GameShowPage() {

  const [item, setItem] = useState([{id:1}])
  const [loading, setLoading] = useState(true)

  const { id, title } = useParams();

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

   console.log("asd",item)

  return(
    <div>
      <Nav />
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

export default GameShowPage
