import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';

class App extends Component {
  render() {
    return (
      <div className="h-100">
        <Switch>
          <Route exact path='/' component={Home}/>
        </Switch>
      </div>
    )
  }
}

export default App;