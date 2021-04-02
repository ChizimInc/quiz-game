import React from 'react'
import {Nav} from './Nav'
import {
  useParams
} from "react-router-dom";

export const GameShowPage = (props) => {
  const {title} = useParams();
  return(
    <div>
      <Nav />
      <div className='container'>
        {title}
      </div>
    </div>
  )
}
