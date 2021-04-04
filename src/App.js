import React, {Component, useState, useEffect} from 'react'
import {Preloader} from './components/Preloader'
import {Question} from './components/Game/Question'
import {Games} from './components/App/Games'
import quizQuestions from './api/quizQuestions.js'
import appStyles from './static/app.module.css'
import {Nav} from './components/Nav'
import './static/index.css'


function App(props){

  const [db, setDb] = useState([])
  const [loading, setLoading] = useState(true)
  const [isLoged, setLoged] = useState(false)
  const [userData, setUserData] = useState([])

  useEffect(function effectFunction() {
       async function fetchItems() {
           const path = "http://127.0.0.1:8000/games-items/?skip=0&limit=100";
           const response = await fetch(path);
           const json = await response.json();

           setDb(json);
           setLoading(false)
       }
       fetchItems();

       if(props.location.userData){
         if(userData !== []){
            setUserData(props.location.userData)
            setLoged(true)
            localStorage.setItem('userData', JSON.stringify(props.location.userData));
         }
       }else{
         if(JSON.parse(localStorage.getItem('userData'))){
           setUserData(JSON.parse(localStorage.getItem('userData')))
         }
       }

   }, []);

    const quiz = db.map(item => <Games item={item}/> )
    return(
        <div>
          <Nav userData={userData}/>
          <div className="container">
            <h3 className={appStyles.h3allgames}>All games:</h3>
            <div>
              {
                quiz.length
                  ? quiz
                  : loading
                    ? <Preloader />
                  : <p>No data</p>
              }
            </div>
          </div>
        </div>
    );
}

export default App;
