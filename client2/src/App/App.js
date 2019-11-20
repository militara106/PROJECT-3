import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';

class App extends Component {
  render() {
    return (
      <div className="h-100">
        <Switch>
        <Route path='/' component={Login}/>
          <Route exact path='/home' component={Home}/>
          <Route path='/dashboard' component={Dashboard}/>
        </Switch>
      </div>
    )
  }
}

export default App;