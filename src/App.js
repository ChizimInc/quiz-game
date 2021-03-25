import React, {Component} from 'react'
import {Question} from './components/Question'
import quizQuestions from './api/quizQuestions.js'

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
      <div>{quiz}</div>
    );
  }
}

export default App;
