import React, {useState, useEffect}     from 'react'
import axios                            from 'axios'
import {Preloader}                      from '../../Preloader'
import {Question}                       from '../../Game/Question'
import {QuestionsForm}                  from './QuestionsForm'
import {AnswersForm}                    from './AnswersForm'

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

  useEffect( () => {
    axios.get(`http://127.0.0.1:8000/game-items/?item_id=${newGameId}`)
    .then( (response) => {
      setGameData(response.data)
      setQuestionMap(response.data.questions.map( (item) => <Question item={item}/> ) )

      setLoading(false)
    });
  }, []);



  function createQandA(event){
    event.preventDefault()

    const url = `http://127.0.0.1:8000/game-items/questions/create/?item_id=${gameData.id}`
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
              setLoading(true)
              axios.get(`http://127.0.0.1:8000/game-items/?item_id=${gameData.id}`)
              .then( (response) => {
                console.log("get new realaod data: ", response.data)
                setGameData(response.data)
                setQuestionMap(response.data.questions.map( (item) => <Question item={item}/> ) )
                setQuestion([])
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

                        />


  return(
    <div>
      { loading && <Preloader /> }
      <p>Game create succesful</p>
      <h4>Title: {gameData.title}</h4>
      <h6>Description: {gameData.description}</h6>
      {questionMap.length && questionMap}
      <button onClick={(event) => {setShowAddQuestion(!showAddQuestion); event.preventDefault()}}>Add question</button>
      <button onClick={onFinish} >Finish</button>
      <button onClick={onLink} >Go to Game</button>
      {showAddQuestion && questionsForm}
    </div>
  )
}
