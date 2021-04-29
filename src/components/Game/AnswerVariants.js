import React from 'react'
import appStyles from '../../static/app.module.css'
import editStyles   from '../Dashboard/Edit/edit.module.css'

export const AnswerVariants = ({item, onRadio}) => {
  function onEdit(event){
    event.preventDefault()
  }
  return(
    <div>
      <form onSubmit={onEdit}>
          {item.answers.map( answer =>
            <div className={editStyles.title}>
              <label className={appStyles.answerLabel}>
                 <input
                   className={appStyles.answerInput}
                   type="radio"
                   value={answer.title}
                   name={item.title}
                   onChange={() => onRadio(event, item.id)}
                 />
                 {answer.title}
              </label>
            </div>
          )}
      </form>
    </div>
  );
}
