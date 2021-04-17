import React from 'react'
import appStyles from '../../../static/app.module.css'

export const GameForm = ({onName, name, onDescription, createGame}) => {
  return(
    <div>
      <div className="input-field col s6 login-input">
        <input
            onChange={onName}
            id="game-name"
            type="text"
            value={name}
            className="validate"/>
        <label className="active" for="game-name">Name</label>
      </div>
      <div className="input-field col s6 login-input">
        <input onChange={onDescription} id="game-desc" type="text" className="validate"/>
        <label className="active" for="game-desc">Description</label>
      </div>
      <button className={appStyles.addQuestion}>
         <a onClick={createGame}
            className="waves-effect waves-light btn-small login-submit">Create
         </a>
      </button>
    </div>
  )
}
