import React from 'react'
import {Link} from 'react-router-dom'

export const List = (props) => {
  return(
    <div className="col s12 m7">
      <div className="card horizontal">
        <div className="card-stacked">
          <div className="card-content">
            <h3>{props.item.title}</h3>
            <p>{props.item.description}</p>
          </div>
          <div className="card-action">
            <Link to={`/game/${props.item.id}/${props.item.title}`}>To game</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
