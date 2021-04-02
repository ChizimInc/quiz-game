import React from 'react'
import {Link} from 'react-router-dom'

export const List = (props) => {
  return(
    <div class="col s12 m7">
      <div class="card horizontal">
        <div class="card-stacked">
          <div class="card-content">
            <h3>{props.item.title}</h3>
            <p>{props.item.description}</p>
          </div>
          <div class="card-action">
            <Link to={`/game/${props.item.title}`}>To game</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
