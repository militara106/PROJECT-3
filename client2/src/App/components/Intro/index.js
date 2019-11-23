import React, { Component, Fragment } from 'react';
import Login from '../LoginSpotify';

export default class IntroScreen extends Component {
  buttonClick() {
    Login.logInWithSpotify();
  };

  render() {
    return (
      <Fragment>
        <button className="btn" onClick={this.buttonClick}>Log in with Spotify</button>
      </Fragment>
    );
  };
}