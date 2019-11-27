import React from 'react';
import { render } from 'react-dom';
import * as serviceWorker from "./serviceWorker";
import history from "./utils/history";
import { Auth0Provider } from "./react-auth0-spa";
import './index.css';
import App from './App/App';


const onRedirectCallback = appState => {
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};


render(
  <Auth0Provider
    domain={'still-frost-0676.auth0.com'}
    client_id={'h3vADtvG4mOWGXga4Wsc8HWVLZD2TQG5'}
    redirect_uri={window.location.origin+"/home"}
    onRedirectCallback={onRedirectCallback}
  >
    <App />
  </Auth0Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();