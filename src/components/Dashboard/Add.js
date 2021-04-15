import React, {useState} from 'react'
import appStyles from '../../static/app.module.css'
import '../../static/index.css'

export const Add = props => {

  const [addAnswer, setAddAnswer] = useState(2)
  const [addQuestion, setAddQuestion] = useState(1)


  const questions = []

  function onAddAnswer(event) {
    event.preventDefault()
    setAddAnswer(addAnswer + 1)
  }

  function onAddQuestion(event){
    event.preventDefault()
    setAddQuestion(addQuestion + 1)
  }

  for (var i = 0; i < addQuestion; i++) {

    const answers = []
    for (var j = 0; j < addAnswer; j++) {
      answers.push(<div className="input-field col s6 login-input">
        <input id={"game-answer-" + j} type="text" className="validate"/>
        <label className="active" for={"game-answer-" + j}>answer</label>
      </div>)
    }
    questions.push(
      <div className="question">

        <div className="input-field col s6 login-input">
          <input id={"game-question-" + i} type="text" className="validate"/>
          <label className="active" for={"game-question-" + i}>question</label>
        </div>

        <div className="answers">
          {answers}

          <button className={appStyles.add}>
             <a onClick={onAddAnswer}
                className="waves-effect waves-light btn-small login-submit">Add answer
             </a>
          </button>
        </div>

      </div>

    )
  }

  return(
    <form className={appStyles.addGameForm}>
       <div className="input-field col s6 login-input">
         <input id="game-name" type="text" className="validate"/>
         <label className="active" for="game-name">Name:</label>
       </div>
       <div className="input-field col s6 login-input">
         <input id="game-desc" type="text" className="validate"/>
         <label className="active" for="game-desc">Description</label>
       </div>

        {questions}

        <button className={appStyles.addQuestion}>
           <a onClick={onAddQuestion}
              className="waves-effect waves-light btn-small login-submit">Add question
           </a>
        </button>

       <button type="submit" className={appStyles.loginSubmit}>
          <a className="waves-effect waves-light btn-small login-submit">Add</a>
       </button>
    </form>
  )
}
