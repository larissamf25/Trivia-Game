import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Game from './pages/Game';
import Config from './pages/Config';
import Feedback from './pages/Feedback';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/game" component={ Game } />
        <Route path="/config" component={ Config } />
        <Route path="/feedback" component={ Feedback } />
      </Switch>
    </div>
  );
}
