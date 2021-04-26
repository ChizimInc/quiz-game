import React from 'react'

export const AnswersForm = ({j, answersInput, setAnswersInput}) => {

  function onAnswer(j, event){
    setAnswersInput({ ...answersInput, [j]: event.target.value})
  }

  return(
    <div className="input-field col s6 login-input">
      <input
        id={"game-answer-" + j}
        type="text"
        className="validate"
        onChange={() => onAnswer(j, event)}
      />
      <label className="active" for={"game-answer-" + j}>answer</label>
    </div>
  )
}
