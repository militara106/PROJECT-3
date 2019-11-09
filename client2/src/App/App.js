import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
<<<<<<< HEAD
import List from './pages/List';
=======
>>>>>>> 5aee040b60e146f9465e0e3d76c8e69961a91326
import Dashboard from './pages/Dashboard'

class App extends Component {
  render() {
    const App = () => (
      <div>
        <Switch>
          <Route exact path='/' component={Home}/>
<<<<<<< HEAD
          <Route path='/list' component={List}/>
=======
>>>>>>> 5aee040b60e146f9465e0e3d76c8e69961a91326
          <Route path='/dashboard' component={Dashboard}/>
        </Switch>
      </div>
    )
    return (
      <Switch>
        <App/>
      </Switch>
    );
  }
}

export default App;