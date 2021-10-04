import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Feedback from './pages/Feedback';
import Login from './pages/Login';
import Ranking from './pages/Ranking';
import Settings from './pages/Settings';
import Trivia from './pages/Trivia';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/settings" component={ Settings } />
          <Route exact path="/trivia" component={ Trivia } />
          <Route exact path="/feedback" component={ Feedback } />
          <Route exact path="/ranking" component={ Ranking } />
        </Switch>
      </div>
    );
  }
}

export default App;
