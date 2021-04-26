import React, {useState, useEffect}     from 'react'
import axios                            from 'axios'
import {Question}                       from './Question'
import editStyles                       from './edit.module.css'

export const GameForm = ({gameId}) => {

const [gameData, setGameData]         = useState([])
const [showInput, setShowInput]       = useState(false)
const [input, setInput]               = useState([])
const [type, setType]                 = useState([])
const [questionId, setQuestionId]     = useState([])
const [answerId, setAnswerId]         = useState([])
const [reload, setReload]             = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `http://127.0.0.1:8000/game-items/?item_id=${gameId}`,
      );

      setGameData(result.data);
    };

    fetchData();
  }, []);

  let questions;


  if(gameData.title){
    questions = gameData.questions.map( item => <Question questionDelete={questionDelete} gameEdit={gameEdit} item={item} />)
    console.log("gameData from if", gameData)
  }

  function onInput(event){
    setInput(event.target.value)
  }

  function putToServer(path, data){
    axios({
      method: 'put',
      url: path,
      headers: {'Content-Type': 'application/json'},
      data: data
    })
    .then((response) => {
      console.log("succes")
    }, (error) => {
      console.log(error);
    });
  }

  function questionDelete(event, id){
    event.preventDefault()
    let questions = gameData.questions
    questions = questions.filter(item => item.id !== id)
    gameData.questions = questions
    setGameData(gameData)
    setReload(!reload)
  }

  function onSave(event){
    event.preventDefault()
    const newData = gameData

    if(type == "title"){
      newData.title = input
      const data = {
        "title": input,
        "description": gameData.description
      }
      const path = `http://127.0.0.1:8000/users/games-items/${gameData.id}/edit`
      putToServer(path, data)
    }
    if(type == "description"){
      newData.description = input
      const data = {
        "title": gameData.title,
        "description": input
      }
      const path = `http://127.0.0.1:8000/users/games-items/${gameData.id}/edit`
      putToServer(path, data)
    }
    if(type == "question"){
      newData.questions.map( (item) => {
        if(item.id == questionId){
          item.title = input
          const data = {
            "title": input,
          }
          const path = `http://127.0.0.1:8000/users/games-items/question/${item.id}/edit`
          putToServer(path, data)
        }
      })
    }
    if(type == "answer"){
      newData.questions.map( (item) => {
        if(item.id == questionId){
          item.answers.map( (answerItem) => {
            if(answerItem.id == answerId){
              answerItem.title = input
              const data = {
                "title": input,
              }
              const path = `http://127.0.0.1:8000/users/games-items/answer/${answerItem.id}/edit`
              putToServer(path, data)
            }
          })
        }
      } )
    }

    setGameData(newData)
    setShowInput(false)
  }

  function gameEdit(event, item, type, questionId, answerId){
    event.preventDefault()
    setShowInput(true)
    setInput(item)
    setType(type)
    setQuestionId(questionId)
    setAnswerId(answerId)
  }


  return(
    <div>
      <div className={editStyles.title}>
        <h6>Title: {gameData.title}</h6>
        <button onClick={gameEdit.bind(null, event, gameData.title, "title")}>Edit</button>
      </div>

      <div className={editStyles.desc}>
        <h6>Description: {gameData.description}</h6>
        <button onClick={gameEdit.bind(null, event, gameData.description, "description")}>Edit</button>
      </div>

      {questions}

      {showInput &&
        <div className={editStyles.footerInput}>
          <input
            type="text"
            onChange={onInput}
            value={input} />
          <button onClick={onSave}>Save</button>
        </div>
      }

    </div>
  )
}
