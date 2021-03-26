import React from 'react'
import {AnswerVariants} from './AnswerVariants.js'

export const Question = (props) => {
  return (
    <div>
      <h3>{props.item.question}</h3>
      <AnswerVariants item={props.item} selected={props.selected} />
    </div>
  )

}
