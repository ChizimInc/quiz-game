import React, {useState}  from 'react'
import appStyles          from '../../static/app.module.css'
import                    '../../static/index.css'
import axios              from 'axios'
import {GameForm}         from './Add/GameForm'
import {AnswersForm}      from './Add/AnswersForm'
import {QuestionsForm}    from './Add/QuestionsForm'

export const Add = ({userData}) => {

  const [addAnswer, setAddAnswer]         = useState(2)
  const [addQuestion, setAddQuestion]     = useState(1)
  const [showQuestions, setShowQuestions] = useState(false)
  const [name, setName]                   = useState([])
  const [description, setDescription]     = useState([])
  const [newGameId, setNewGameId]         = useState([])
  const [question, setQuestion]           = useState([])
  const [answersInput, setAnswersInput]    = useState({value: []})


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
    setShowQuestions(true)
    // url = `http://127.0.0.1:8000/users/${userData.id}/games-items/`
    // axios({
    //   method: 'post',
    //   url: url,
    //   headers: {'Content-Type': 'application/json'},
    //   data: {
    //     "title": name,
    //     "description": description,
    //     "questions": []
    //   }
    // })
    // .then((response) => {
    //   setNewGameId(response.id)
    // }, (error) => {
    //   console.log(error);
    // });
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
      />
    )
  }

  return(
    <form className={appStyles.addGameForm}>


        {
          showQuestions
            ? questionsArr
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
