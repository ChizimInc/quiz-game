import React              from 'react'
import {AnswerVariants}   from './AnswerVariants.js'
import editStyles         from './edit.module.css'

export const Question = ({item, gameEdit, questionDelete}) => {
  return (
    <div>
      <div className={editStyles.title}>
        <h3>{item.title}</h3>
        <button onClick={gameEdit.bind(null, event, item.title, "question", item.id)}>Edit</button>
        <button onClick={questionDelete.bind(null, event, item.id)}>Delete question</button>
      </div>
      <AnswerVariants gameEdit={gameEdit} item={item} />
    </div>
  )

}
