import React, { Component } from "react";
import Row from "../components/Row";
import Col from "../components/Col";
import { Authorize } from "react-auth0-components/es5";
class Login extends Component {
  // Default State/Song
  state = {
    songName: "Creative",
    artist: "Bensound",
    src: "bensound-creativeminds.mp3",
    account: "",
    room: ""
  };

  render() {
    return (
      <div className="d-flex flex-column h-100">
        <div className="loginBG" />
        <h1 className="vybe text-center">VYBE</h1>
        <div className="container h-100">
          <Row className=" h-100 row align-items-center">
            <Col size="sm-7">
              <h3 className="testColor">Intro</h3>
            </Col>
            <Col size="sm-5">
              <h3 className="testColor">Login Block</h3>
              <Authorize
                domain={process.env.YOUR_AUTH0_DOMAIN}
                clientID={process.env.YOUR_AUTH0_CLIENT_ID}
                render={({ error, userInfo, authResult }) => {
                  return <div>conditionally render userInfo here...</div>;
                }}
              />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
export default Login;
