import React, {Component} from 'react';
const Twit = require('twit');

const T = new Twit({
    consumer_key:         '...',
    consumer_secret:      '...',
    access_token:         '...',
    access_token_secret:  '...',
    timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
    strictSSL:            true,     // optional - requires SSL certificates to be valid.
  })

class TwitterStream extends Component {
    state = {
        
    }

    componentDidMount(){

    }

    render(){
        return(
            <div>
                <h1>Twitter Ticker Goes Here</h1>
            </div>
        )
    }
}