import React from 'react'
import {AnswerVariants} from './AnswerVariants.js'

export const Question = ({item}) => {
  return (
    <div>
      <h3>{item.title}</h3>
      <AnswerVariants item={item} />
    </div>
  )

}
