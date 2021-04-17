import React        from 'react'
import appStyles    from '../../../static/app.module.css'

export const QuestionsForm = ({onQuestion, question, answersArr, onAddAnswer, i}) => {
  return(
    <div>
      <div className="question">

        <div className="input-field col s6 login-input">
          <input
              onChange={onQuestion}
              value={question}
              id={"game-question-" + i}
              type="text"
              className="validate"/>
          <label className="active" for={"game-question-" + i}>question</label>
        </div>

        <div className="answers">
          {answersArr}

          <button className={appStyles.add}>
             <a onClick={onAddAnswer}
                className="waves-effect waves-light btn-small login-submit">Add answer
             </a>
          </button>
        </div>

      </div>

     <button type="submit" className={appStyles.loginSubmit}>
        <a className="waves-effect waves-light btn-small login-submit">Add</a>
     </button>
  </div>
  )
}
