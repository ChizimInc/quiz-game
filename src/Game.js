import React, {useState, useEffect}   from 'react'
import {Preloader}                    from './components/Preloader'
import {Nav}                          from './components/Nav'
import {useParams}                    from "react-router-dom";
import {Question}                     from './components/Game/Question'
import {Result}                       from './components/Game/Result'


function Game(props) {

  const [item, setItem]                               = useState([{id:1}])
  const [loading, setLoading]                         = useState(true)
  const { id, title }                                 = useParams();
  const [isLoged, setLoged]                           = useState(false)
  const [userData, setUserData]                       = useState([])
  const [answerRadio, setAnswerRadio]                 = useState([])
  const [reload, setReload]                           = useState(false)
  const [showAnswer, setShowAnswer]                   = useState(false)
  const [correctAnswerCount , setCorrectAnswerCount]  = useState(0)
  const [points, setPoints]                           = useState(0)

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
           setItem(json);
           setLoading(false)
       }
       fetchItems();
   }, []);

   function onRadio(event, question_id){
     const {name, value} = event.target
     let answerState = answerRadio

     if(answerState.length){
       answerState.push({name: value, "question_id": question_id })
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
   let count      = correctAnswerCount
   let pointsVar  = points

  function onVerify(event){
    event.preventDefault()
    setShowAnswer(true)
    item.questions.map( question => {
      question.answers.map( answer => {
        answerRadio.map( userAnswer => {
          if(question.id == userAnswer.question_id){
            if(answer.correct){
              if(answer.title == userAnswer.name){
                count++
                pointsVar = pointsVar + question.points
                setCorrectAnswerCount(count)
                setPoints(pointsVar)
              }
            }
          }
        })
      })
    })
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
          : showAnswer ? <Result count={correctAnswerCount} points={points} item={item} />
          : <button className="btn btn-small blue" onClick={onVerify}>Verify</button>
        }
      </div>
    </div>
  )
}

export default Game
