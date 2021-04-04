import React, {useState} from 'react'
import {Redirect} from 'react-router-dom'
import appStyles from './static/app.module.css'
import {Nav} from './components/Nav'
import {Signin} from './components/Login/Signin'
import Signup from './components/Login/Signup'

export const Login = (props) => {

  const [btn, setBtn] = useState(false)
  const [isLoged, setLoged] = useState(false)
  const [userData, setUserData] = useState([])

  if(isLoged == false){
    if(JSON.parse(localStorage.getItem('userData'))){
      setUserData(JSON.parse(localStorage.getItem('userData')))
      setLoged(true)
    }
  }

  return(
    <div className="appStyles.login">
      <Nav/>
      <div className="container">
        <div className="row row-center">
          <div className="col s12 m5 card-center">
            <div className="card">
              <div className="card-image">
                <img src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg"/>
                <span className="card-title">
                {btn ? 'Create new account':'Sign in'}
                </span>

                <a onClick={ () => setBtn(!btn) }
                  className={
                    btn ? "btn-floating halfway-fab waves-effect waves-light red"
                        : "btn-floating halfway-fab waves-effect waves-light green"
                  }>
                  <i className="material-icons">{btn ? 'remove' : 'add'}</i>
                </a>
              </div>
              <div className="card-content">
                <div class="row">
                  {btn
                    ? <Signup />
                    : <Signin />
                  }
                  {
                    isLoged && <Redirect to="/Account" />
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
