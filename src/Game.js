import React, {useState, useEffect}   from 'react'
import {Preloader}                    from './components/Preloader'
import {Nav}                          from './components/Nav'
import {useParams}                    from "react-router-dom";
import {Question}                     from './components/Game/Question'


function Game(props) {

  const [item, setItem]               = useState([{id:1}])
  const [loading, setLoading]         = useState(true)
  const { id, title }                 = useParams();
  const [isLoged, setLoged]           = useState(false)
  const [userData, setUserData]       = useState([])
  const [answerRadio, setAnswerRadio] = useState([])
  const [reload, setReload]           = useState(false)
  const [showAnswer, setShowAnswer]   = useState(false)

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

   function onRadio(event, question_id){
     const {name, value} = event.target
     let answerState = answerRadio

     if(answerState.length){
       answerState.map(item => {
         answerState.push({name: value, "question_id": question_id })
       })
     }else{
       answerState = [{name: value, "question_id": question_id }]
     }

     item.questions.map( question => {
       if(question_id == question.id){
         question.selected = value
         setItem(item)
         setReload(!reload)
       }
     })

     setAnswerRadio(
       answerState
     )
   }

  function onVerify(event){
    event.preventDefault()
    setShowAnswer(true)
  }

   let itemMap;
   if(item.questions){
     itemMap = item.questions.map( obj => <Question onRadio={onRadio} answerRadio={answerRadio} showAnswer={showAnswer} reload={reload} item={obj} /> )
   }

  return(
    <div>
      <Nav userData={userData} />
      <div className='container'>
        {loading == true && <Preloader />}
        { item.questions
          ? itemMap
          : loading ? null : <p>no data</p>
        }
        {loading ? null
          : showAnswer ? <p>Answer resultat</p>
          : <button onClick={onVerify}>Verify</button>
        }
      </div>
    </div>
  )
}

export default Game
