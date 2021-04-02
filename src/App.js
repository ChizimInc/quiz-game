import React, {Component} from 'react'
import {Question} from './components/Question'
import {Games} from './components/Games'
import quizQuestions from './api/quizQuestions.js'
import appStyles from './static/app.module.css'
import {Nav} from './components/Nav'
import './static/index.css'


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      db: quizQuestions,
      selectedOption: ""
    };

  };

  componentDidMount() {
    fetch("http://127.0.0.1:8000/games-items/?skip=0&limit=100")
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)
          this.setState({
            db: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }




  render(){

    console.log(this.state.selectedOption);

    const quiz = this.state.db.map(item => <Games item={item} selected={this.state.selectedOption}/>)
    return(
      <div>
        <Nav/>
        <div className="container">
          <h3 className={appStyles.h3allgames}>All games:</h3>
          <div>
            {quiz}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
