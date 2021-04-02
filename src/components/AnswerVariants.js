import React from 'react'
import appStyles from '../static/app.module.css'

export const AnswerVariants = (props) => {
  return(
    <div>
      <form>
          {props.item.answers.map( item =>
            <label className={appStyles.answerLabel}>
               <input
                 className={appStyles.answerInput}
                 type="radio"
                 value={props.item.question}
                 name="radio"
               />
               {item.title}
            </label>
          )}
      </form>
    </div>
  );
}
