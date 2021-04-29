import React              from 'react'
import {AnswerVariants}   from './AnswerVariants.js'
import editStyles         from './edit.module.css'

export const Question = ({item, gameEdit, questionDelete, setCorrect}) => {
  return (
    <div className={editStyles.editQuestionCont}>
      <div className={editStyles.title}>
        <h4>{item.title}</h4>
        <button onClick={gameEdit.bind(null, event, item.title, "question", item.id)}>Edit</button>
        <button onClick={questionDelete.bind(null, event, item.id)}>Delete question</button>
      </div>
      <AnswerVariants gameEdit={gameEdit} setCorrect={setCorrect} item={item}/>
    </div>
  )

}
