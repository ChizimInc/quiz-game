import React        from 'react'
import {Link}       from 'react-router-dom'
import appStyles    from '../../static/app.module.css'
import              '../../static/index.css'

export const GamesMap = ({game, userData, onDelete}) => {
  const viewLink = `/game/${game.id}/${game.title}/`
  const editLink = `/dashboard/game/edit/${game.id}`
  return(
    <div>
      <li class="collection-item game-li">
        <div className={appStyles.gamesTitleMap}>
          {game.title}
        </div>
        <div className={appStyles.actionBtnGreen}>
          <Link to={viewLink}>View game</Link>
        </div>
        <div className={appStyles.actionBtnRed}>
          <Link onClick={onDelete.bind(null, event, game.id)}>Delete game</Link>
          <Link to={{ pathname: editLink, userData: userData, gameId: game.id }} >Edit game</Link>
        </div>
      </li>
    </div>
  )
}
