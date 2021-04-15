import React from 'react'
import appStyles from '../static/app.module.css'

export const EventMessage = ({message, messageType}) => {
  return(
    <div className={appStyles.errorContainer}>
      <p>*{message}</p>
    </div>
  )
}
