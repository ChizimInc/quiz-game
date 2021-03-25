import React from 'react'

export const AnswerVariants = (props) => {
  return(
    <div>
      <form>
          {props.item.answers.map( item =>
            <label>
               <input
                 type="radio"
                 value={props.item.question}
                 name="radio"
               />
               {item.answer}
            </label>
          )}
      </form>
    </div>
  );
}
