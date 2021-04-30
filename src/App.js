import React, {Component, useState, useEffect}  from 'react'
import {Preloader}                              from './components/Preloader'
import {Question}                               from './components/Game/Question'
import {Games}                                  from './components/App/Games'
import quizQuestions                            from './api/quizQuestions.js'
import appStyles                                from './static/app.module.css'
import {Nav}                                    from './components/Nav'
import                                               './static/index.css'
import axios                                    from 'axios'
import {ServerErr}                              from './components/App/ServerErr'


function App(props){

  const [db, setDb]               = useState([])
  const [loading, setLoading]     = useState(true)
  const [isLoged, setLoged]       = useState(false)
  const [userData, setUserData]   = useState([])
  const [error, setError]         = useState(false)
  const [reload, setReload]       = useState(0)

  useEffect(function effectFunction() {

       async function fetchItems() {
         try {
          let res = await axios.get('http://127.0.0.1:8000/games-items/?skip=0&limit=100');

          setDb(res.data);
          setLoading(false)
        } catch (error) {
          setLoading(false)
          setError(true)
        }
      }
      fetchItems()

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

   }, [reload]);

   function onRentry(){
     setLoading(true)
     setTimeout( () => {
        setReload(reload + 1)
      }, 1000);
   }

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
                  : error
                    ? <ServerErr onRentry={onRentry} />
                  : <p>No data</p>
              }
            </div>
          </div>
        </div>
    );
}

export default App;
