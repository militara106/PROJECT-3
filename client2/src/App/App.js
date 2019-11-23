import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';

class App extends Component {
  render() {
    return (
      <div className="h-100" >
        <Switch>
        <Route exact path='/' component={Login}/>
          <Route path='/home' component={Home}/>
        </Switch>
      </div>
    )
  }
}

export default App;