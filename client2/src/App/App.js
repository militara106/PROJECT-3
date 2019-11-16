import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import SpotifyAuth from './components/SpotifyAuth';
import Login from './pages/Login';

class App extends Component {
  render() {
    return (
      <div className="h-100">
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/login' component={Login}/>
          <Route path='/dashboard' component={Dashboard}/>
        </Switch>
      </div>
    )
  }
}

export default App;