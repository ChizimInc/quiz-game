import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

import App from './App';
import Dashboard from './Dashboard';
import {Login} from './Login'
import Game from './Game'


const routing = (
  <Router>
    <div>
      <Switch>
        <Route exact path='/' component={App}/>
        <Route path='/dashboard' component={Dashboard}/>
        <Route path='/login' component={Login}/>
        <Route path='/game/:id/:title' component={Game}/>
      </Switch>
    </div>
  </Router>
)


ReactDOM.render(
  routing,
  document.getElementById('root')
);
