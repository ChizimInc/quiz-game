import React, {useState}  from 'react'
import appStyles          from '../../static/app.module.css'
import                    '../../static/index.css'
import axios              from 'axios'
import {GameForm}         from './Add/GameForm'
import {AnswersForm}      from './Add/AnswersForm'
import {QuestionsForm}    from './Add/QuestionsForm'
import {NewGame}          from './Add/NewGame'

export const Add = ({userData, onAddGame}) => {

  const [addAnswer, setAddAnswer]         = useState(2)
  const [addQuestion, setAddQuestion]     = useState(1)
  const [showQuestions, setShowQuestions] = useState(false)
  const [name, setName]                   = useState([])
  const [description, setDescription]     = useState([])
  const [newGameId, setNewGameId]         = useState([])
  const [question, setQuestion]           = useState([])
  const [answersInput, setAnswersInput]   = useState([])
  const [showNewGame, setShowNewGame]     = useState(false)


  const questionsArr = []

  function onAddAnswer(event) {
    event.preventDefault()
    setAddAnswer(addAnswer + 1)
  }

  function onAddQuestion(event){
    event.preventDefault()
    setAddQuestion(addQuestion + 1)
  }

  function onName(event){
    setName(event.target.value)
  }

  function onDescription(event){
    setDescription(event.target.value)
  }

  function onQuestion(event){
    setQuestion(event.target.value)
  }

  function createGame(event){
    event.preventDefault()

    const url = `http://127.0.0.1:8000/users/${userData.id}/games-items/`
    axios({
      method: 'post',
      url: url,
      headers: {'Content-Type': 'application/json'},
      data: {
        "title": name,
        "description": description,
        "questions": []
      }
    })
    .then((response) => {
      setNewGameId(response.data.id)
      setShowQuestions(true)
    }, (error) => {
      console.log(error);
    });
  }

  function createQandA(event){
    event.preventDefault()

    const url = `http://127.0.0.1:8000/game-items/questions/create/?item_id=${newGameId}`
    axios({
      method: 'post',
      url: url,
      headers: {'Content-Type': 'application/json'},
      data: {
        "title": question,
        "answers": []
      }
    })
    .then((response) => {
      const url2 = `http://127.0.0.1:8000/game-items/questions/answers/create/?question_id=${response.data.id}`
      // --------
          for (var i in answersInput) {
            axios({
              method: 'post',
              url: url2,
              headers: {'Content-Type': 'application/json'},
              data: {
                "title": answersInput[i],
              }
            })
            .then((response) => {
              //onAddGame(event)
              setShowNewGame(true)
            }, (error) => {
              console.log(error);
            });
          }

     // --------
      setShowQuestions(false)
    }, (error) => {
      console.log(error);
    });

  }

  for (var i = 0; i < addQuestion; i++) {

    const answersArr = []
    for (var j = 0; j < addAnswer; j++) {
      answersArr.push(
        <AnswersForm
          j               = {j}
          answersInput    = {answersInput}
          setAnswersInput = {setAnswersInput}
        />
      )
    }
    questionsArr.push(
      <QuestionsForm
          onQuestion  = {onQuestion}
          question    = {question}
          answersArr  = {answersArr}
          onAddAnswer = {onAddAnswer}
          i           = {i}
          createQandA = {createQandA}
      />
    )
  }

  return(
    <form className={appStyles.addGameForm}>


        {
          showQuestions
            ? questionsArr
            : showNewGame ?
              <NewGame newGameId={newGameId} setShowNewGame={setShowNewGame} />
            : <GameForm
                onName        = {onName}
                name          = {name}
                onDescription = {onDescription}
                createGame    = {createGame}
              />
        }


    </form>
  )
}
