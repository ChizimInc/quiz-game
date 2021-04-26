import React            from 'react'
import appStyles        from '../../../static/app.module.css'
import editStyles       from './edit.module.css'

export const AnswerVariants = ({item, gameEdit}) => {

  function onEdit(event){
    event.preventDefault()
  }

  return(
    <div>
      <form onSubmit={onEdit}>
          {item.answers.map( answerItem =>
            <div className={editStyles.title}>
              <label className={appStyles.answerLabel}>
                 <input
                   className={appStyles.answerInput}
                   type="radio"
                   value="radio"
                   name="radio"
                 />
                 {answerItem.title}
              </label>
              <button onClick={gameEdit.bind(null, event, answerItem.title, "answer", item.id, answerItem.id)}>Edit</button>
            </div>
          )}
      </form>
    </div>
  );
}
