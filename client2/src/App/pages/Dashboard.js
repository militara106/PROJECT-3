import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SpotifyAuth from '../components/SpotifyAuth';
import SpotifyPlayer from '../components/SpotifyPlayer'


class Dashboard extends Component {
  render() {
    return (
    <div className="App">
      <h1>Spotify Dashboard</h1>
      < SpotifyPlayer />
    </div>
    );
  }
}
export default Dashboard;