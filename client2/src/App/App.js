import React from 'react';
import { Router, Route, Switch } from "react-router-dom";
import './App.css';
import Home from './pages/Home';
import Loading from "./components/Loading";
import Login from './pages/Login';
import history from "../utils/history";
import { useAuth0 } from "../react-auth0-spa";

const App = () => {
  const { loading, user } = useAuth0();

  const loadingStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    margin: "-60px"
  }

  if (loading) {
    return (<div style={loadingStyle}><Loading /></div>);
  }
  return (
    <Router history={history}>
      {console.log(user)}
      <div className="h-100" >
        <Switch>
          <Route exact path='/' component={Login} />
          <Route path='/home' component={Home} />
          <Route component={Login}/>
        </Switch>
      </div>
    </Router>
  )
}

export default App;