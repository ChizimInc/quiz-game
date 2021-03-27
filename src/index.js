import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import App from './App';
import Dashboard from './components/Dashboard';


const routing = (
  <Router>
    <div>
      <Switch>
        <Route exact path='/' component={App}/>
        <Route path='/dashboard' component={Dashboard}/>
      </Switch>
    </div>
  </Router>
)


ReactDOM.render(
  routing,
  document.getElementById('root')
);