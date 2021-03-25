import React from 'react'
import {AnswerVariants} from './AnswerVariants.js'

export const Question = (props) => {
  return (
    <div>
      <h1>{props.item.question}</h1>
      <AnswerVariants item={props.item} selected={props.selected} />
    </div>
  )

}
