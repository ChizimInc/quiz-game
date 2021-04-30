import React from 'react'

export const Result = ({count, item, points}) => {
  return(
    <div>
      <p>Correct answer {count} / {item.questions.length} points: {points}</p>
    </div>
  )
}
