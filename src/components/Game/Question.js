import React,{useState, useEffect}  from 'react'
import {AnswerVariants}             from './AnswerVariants.js'
import appStyles                    from '../../static/app.module.css'

export const Question = ({item, onRadio, showAnswer, answerRadio}) => {

  let selectAnswer;
  let correctAnswer;
  let showCorrectAnswer

  if(showAnswer){
    answerRadio.map( answer => {
      if(answer.question_id == item.id){
        selectAnswer = answer.name
      }
    })
    item.answers.map( answer => {
      if(answer.correct){
        correctAnswer = answer.title
      }
    })
    if(selectAnswer == correctAnswer){
      showCorrectAnswer = <p className={appStyles.succes}>{correctAnswer}</p>
    }else{
      showCorrectAnswer = <p className={appStyles.danger}>{selectAnswer} ({correctAnswer})</p>
    }
  }

  return (
    <div className={appStyles.newGameQuestionCont}>
      <h4>{item.title}</h4>
      <p>points: {item.points}</p>
      {item.selected
        ? showAnswer
          ? showCorrectAnswer
          : <p>Your answer [{item.selected}] is accepted</p>
        : <AnswerVariants onRadio={onRadio} item={item} />
      }
      <hr/>
    </div>
  )

}
