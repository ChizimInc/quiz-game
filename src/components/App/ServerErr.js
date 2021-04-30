import React      from 'react'
import appStyles  from '../../static/app.module.css'

export const ServerErr = ({onRentry}) => {
  return(
    <div>
      <p>Server error | Please turn server on</p>
      <button className="btn btn-small blue" onClick={onRentry}>Rentry</button>
    </div>
  )
}
