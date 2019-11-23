import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import SpotifyHome from './pages/SpotifyHome';
import Login from './pages/Login';

class App extends Component {
  render() {
    return (
      <div className="h-100" >
        <Switch>
        <Route exact path='/' component={Login}/>
          <Route path='/home' component={Home}/>
          <Route path='/spotifyhome' component={SpotifyHome} />
        </Switch>
      </div>
    )
  }
}

export default App;