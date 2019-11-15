import React, { Component } from "react";
import Row from "../components/Row";
import Col from "../components/Col";
import NavBar from "../components/Navbar";
import axios from "axios";
import { Route, Link } from "react-router-dom";
import LoginForm from "../components/Login";
import SignupForm from "../components/Signup";

// import { Link } from 'react-router-dom';
class Login extends Component {
  // Default State/Song
  state = {
    songName: "Creative",
    artist: "Bensound",
    src: "bensound-creativeminds.mp3",
    account: "",
    room: ""
  };

  constructor() {
    super();
    this.state = {
      loggedIn: false,
      user: null
    };
    this._logout = this._logout.bind(this);
    this._login = this._login.bind(this);
  }
  componentDidMount() {
    axios.get("/auth/user").then(response => {
      console.log(response.data);
      if (!!response.data.user) {
        console.log("THERE IS A USER");
        this.setState({
          loggedIn: true,
          user: response.data.user
        });
      } else {
        this.setState({
          loggedIn: false,
          user: null
        });
      }
    });
  }

  _logout(event) {
    event.preventDefault();
    console.log("logging out");
    axios.post("/auth/logout").then(response => {
      console.log(response.data);
      if (response.status === 200) {
        this.setState({
          loggedIn: false,
          user: null
        });
      }
    });
  }

  _login(username, password) {
    axios
      .post("/auth/login", {
        username,
        password
      })
      .then(response => {
        console.log(response);
        if (response.status === 200) {
          // update the state
          this.setState({
            loggedIn: true,
            user: response.data.user
          });
        }
      });
  }
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
              <div className="App">
                <h1>This is the main App component</h1>
                {/*  ROUTES */}
                {/* <Route exact path="/" component={Home} /> */}
                <Route
                  exact
                  path="/login"
                  render={() => (
                    <LoginForm
                      _login={this._login}
                    />
                  )}
                />
                <Route exact path="/signup" component={SignupForm} />
                {/* <LoginForm _login={this._login} /> */}
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
export default Login;