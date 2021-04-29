import React, {useState, useEffect}     from 'react'
import {Redirect}                       from 'react-router-dom'
import axios                            from 'axios'
import {Preloader}                      from '../../Preloader'
import {Question}                       from '../../Game/Question'
import {QuestionsForm}                  from './QuestionsForm'
import {AnswersForm}                    from './AnswersForm'
import appStyles                        from '../../../static/app.module.css'

export const NewGame = ({newGameId, setShowNewGame}) => {

  const [gameData, setGameData]                     = useState([])
  const [loading, setLoading]                       = useState(true)
  const [addQuestion, setAddQuestion]               = useState(false)
  const [addAnswer, setAddAnswer]                   = useState(2)
  const [answersInput, setAnswersInput]             = useState([])
  const [question, setQuestion]                     = useState([])
  const [showAddQuestion, setShowAddQuestion]       = useState(false)
  const [questionMap, setQuestionMap]               = useState([])
  const [showFinishButton, setShowFinishButton]     = useState(true)
  const [showGoToGameButton, setShowGoToGameButton] = useState(true)
  const [points, setPoints]                         = useState(25)
  const [reload, setReload]                         = useState(false)
  const [onLinkRedirect, setOnLinkRedirect]         = useState(false)

  useEffect( () => {
    axios.get(`http://127.0.0.1:8000/game-items/?item_id=${newGameId}`)
    .then( (response) => {
      setGameData(response.data)
      setQuestionMap(response.data.questions.map( (item) => <Question item={item}/> ) )

      setLoading(false)
    });
  }, []);


  function setCorrect(event, answerId, questionId){
    event.preventDefault()
    if(gameData.length){
      console.log("gameData: ", gameData)
      gameData.questions.map( question => {
        question.answers.map( answer => {
          if(answer.question_id == questionId){
            if(answer.correct){
              const path  = `http://127.0.0.1:8000/users/games-items/answer/${answer.id}/correct?status=false`
              axios({
                method: 'put',
                url: path,
                headers: {'Content-Type': 'application/json'}
              })
                answer.correct = false
                setGameData(gameData)
                setReload(!reload)

            }else{
              if(answer.id == answerId){
                const path = `http://127.0.0.1:8000/users/games-items/answer/${answer.id}/correct?status=true`
                axios({
                  method: 'put',
                  url: path,
                  headers: {'Content-Type': 'application/json'}
                })
                answer.correct = true
                setGameData(gameData)
                setReload(!reload)
              }

            }
          }
        })
      })
    }

  }


  function createQandA(event){
    event.preventDefault()

    const url = `http://127.0.0.1:8000/game-items/questions/create/?item_id=${gameData.id}`
    axios({
      method: 'post',
      url: url,
      headers: {'Content-Type': 'application/json'},
      data: {
        "title": question,
        "points": points,
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
              setLoading(true)
              axios.get(`http://127.0.0.1:8000/game-items/?item_id=${gameData.id}`)
              .then( (response) => {
                console.log("get new realaod data: ", response.data)
                setGameData(response.data)
                setQuestionMap(response.data.questions.map( (item) => <Question item={item}/> ) )
                setQuestion([])
                setPoints(25)
                setLoading(false)
              });
              setShowNewGame(true)
              setShowAddQuestion(false)
            }, (error) => {
              console.log(error);
            });
          }

     // --------
    }, (error) => {
      console.log(error);
    });

  }

  function onQuestion(event){
    setQuestion(event.target.value)
  }

  function onPoints(event){
    setPoints(event.target.value)
  }

  function onAddAnswer(event) {
    event.preventDefault()
    setAddAnswer(addAnswer + 1)
  }

  function onFinish(event){
    event.preventDefault()
    setShowNewGame(false)
  }

  function onLink(event){
    event.preventDefault()
    setOnLinkRedirect(true)
  }

  const answersArr = []
  const i = 0
  for (var j = 0; j < addAnswer; j++) {
    answersArr.push(
      <AnswersForm
        j               = {j}
        answersInput    = {answersInput}
        setAnswersInput = {setAnswersInput}
      />
    )
  }
  const questionsForm = <QuestionsForm
                            onQuestion          = {onQuestion}
                            question            = {question}
                            answersArr          = {answersArr}
                            onAddAnswer         = {onAddAnswer}
                            i                   = {i}
                            createQandA         = {createQandA}
                            onPoints            = {onPoints}
                            points              = {points}
                        />


  return(
    <div className={appStyles.createGameCont}>
      { loading && <Preloader /> }
      <div className={appStyles.succesCreateMsg}>
        <p>Game create succesful</p>
      </div>

      <div className={appStyles.newGameInfo}>
        <h4>Title: {gameData.title}</h4>
        <p>Description: {gameData.description}</p>
      </div>

      {questionMap.length && questionMap}

      <div className={appStyles.newGameBtn}>
        <button className="btn btn-small"
          onClick={(event) => {setShowAddQuestion(!showAddQuestion); event.preventDefault()}}>Add question</button>
        <button className="btn btn-small blue"
          onClick={onLink} >set correct</button>
      </div>

      {onLinkRedirect && <Redirect to={`dashboard/game/edit/${gameData.id}`} /> }

      <div className={appStyles.informEditMsg}>
        <p>For set correct answer click "set correct"</p>
      </div>

      {showAddQuestion && questionsForm}

    </div>
  )
}
