import React, { Component, Fragment } from 'react';
import WebPlaybackReact from '../components/WebPlaybackReact';
import LoginCallback from '../components/LoginCallback';
import NowPlayingScreen from '../components/NowPlayingScreen';
import IntroScreen from '../components/Intro';

window.onSpotifyWebPlaybackSDKReady = () => {};

export default class Dashboard extends Component {
  state = {
    // User's session credentials
    userDeviceId: null,
    userAccessToken: null,

    // Player state
    playerLoaded: false,
    playerSelected: false,
    playerState: null
  }

  componentWillMount() {
    LoginCallback({
      onSuccessfulAuthorization: this.onSuccessfulAuthorization.bind(this),
      onAccessTokenExpiration: this.onAccessTokenExpiration.bind(this)
    });
  }
  
  onSuccessfulAuthorization(userAccessToken) {
    this.setState({ userAccessToken });
  }
  
  onAccessTokenExpiration() {
    this.setState({
      userDeviceId: null,
      userAccessToken: null,
      playerLoaded: false,
      playerSelected: false,
      playerState: null
    });

    console.error("The user access token has expired.");
  }
  
  render() {
    let {
      userDeviceId,
      userAccessToken,
      playerLoaded,
      playerSelected,
      playerState
    } = this.state;
    
    let webPlaybackSdkProps = {
      playerName: "VYBE Media Visualizer",
      playerInitialVolume: 1.0,
      playerRefreshRateMs: 100,
      playerAutoConnect: true,
      onPlayerRequestAccessToken: (() => userAccessToken),
      onPlayerLoading: (() => this.setState({ playerLoaded: true })),
      onPlayerWaitingForDevice: (({ device_id }) => this.setState({ playerSelected: false, userDeviceId: device_id })),
      onPlayerDeviceSelected: (() => this.setState({ playerSelected: true })),
      onPlayerStateChange: (playerState => this.setState({ playerState })),
      onPlayerError: (playerError => console.error(playerError))
    };
    
    return (
      <div className="Dashboard">      
        <main>
          {!userAccessToken && <IntroScreen />}
          {userAccessToken &&
            <WebPlaybackReact {...webPlaybackSdkProps}>
              {!playerLoaded &&
                <h2 className="action-orange">Loading Player</h2>
              }

              {playerLoaded && !playerSelected && 
                <Fragment>
                  <h2 className="action-green">Loading Player</h2>
                  <h2 className="action-orange">Waiting for device to be selected</h2>
                  <p>On a Spotify Client, open the device picker, and choose "Spotify React Player".</p>
                </Fragment>
              }

              {playerLoaded && playerSelected && !playerState &&
                <Fragment>
                  <h2 className="action-green">Loading Player</h2>
                  <h2 className="action-green">Waiting for device to be selected</h2>
                  <h2 className="action-orange">Start playing music ...</h2>
                </Fragment>
              }

              {playerLoaded && playerSelected && playerState &&
                <Fragment>
                  <h2 className="action-green">Loading Player</h2>
                  <h2 className="action-green">Waiting for device to be selected</h2>
                  <h2 className="action-green">Start playing music!</h2>
                  <NowPlayingScreen playerState={playerState} />
                </Fragment>
              }
            </WebPlaybackReact>
          }
        </main>
      </div>
    );
  }
};

