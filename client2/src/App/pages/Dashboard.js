import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SpotifyAuth from '../components/SpotifyAuth';


class Dashboard extends Component {
  render() {
    return (
    <div className="App">
      <h1>Spotify Dashboard</h1>
      < SpotifyAuth />
    </div>
    );
  }
}
export default Dashboard;