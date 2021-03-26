import React, {Component} from 'react'
import {Question} from './components/Question'
import quizQuestions from './api/quizQuestions.js'
import appStyles from './static/app.module.css'
import {Nav} from './components/Nav'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      db: quizQuestions,
      selectedOption: ""
    };
  };


  render(){

    console.log(this.state.selectedOption);

    const quiz = this.state.db.map(item => <Question item={item} selected={this.state.selectedOption}/>)
    return(
      <div>
        <Nav/>
        <div className="container">{quiz}</div>
      </div>
    );
  }
}

export default App;
