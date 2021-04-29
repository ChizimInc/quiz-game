import React        from 'react'
import appStyles    from '../../../static/app.module.css'

export const QuestionsForm = (
  {
    onQuestion,
    question,
    answersArr,
    onAddAnswer,
    i,
    createQandA,
    showFinishButton,
    showGoToGameButton,
    onFinish,
    onLink,
    points,
    onPoints
  }) => {
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
          <div className={appStyles.numberContainer}>
            <input
              className={appStyles.number}
              onChange={onPoints}
              placeholder="points"
              value={points}
              type="number"/>
              <p>points</p>
          </div>
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

     <button
        type="submit"
        className={appStyles.loginSubmit}
        onClick={createQandA}>

        <a className="waves-effect waves-light btn-small login-submit">Add</a>
     </button>
     {showFinishButton    && <button onClick={onFinish}>Finish</button>}
     {showGoToGameButton  && <button onClick={onLink}>Go to</button>}
  </div>
  )
}
