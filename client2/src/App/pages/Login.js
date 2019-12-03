import React from "react";
import Row from "../components/Row";
import Col from "../components/Col";
import Verbage from "../components/Verbage";
import { useAuth0 } from "../../react-auth0-spa";

const Login = () => {
  // const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

  const {user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

  const logoutWithRedirect = () => {
    logout({
      returnTo: window.location.origin
    });
  };

  const linkStyle = {
    color: "inherit",
    textDecoration: "none"
  };

  return (
    <div className="d-flex flex-column h-100">
      <div className="loginBG" />
      <div className="container h-100">
        <Row className=" h-100 row align-items-center">
          <Col size="sm-8">
            {/* INTRO BOX */}
            <div className="intro darkBorder">

              {/* VERBAGE TEXT */}
              <h1 className="wordsContainer">
                <span className="preVerb">Feel the</span>
                <span className="verbage">
                  <Verbage />
                </span>
              </h1>

            </div>

            </Col>
            <Col size="sm-4">

            <h1 className="vybe text-center">VYBE</h1>
            {/* LOGIN */}
            {!isAuthenticated && (
              <h3
                className="login darkBorder lightBg"
                onClick={() => loginWithRedirect({})}
              >
                Get Started <i className="fas fa-arrow-right"></i>
              </h3>
            )}
            {/* LOGOUT */}
            {isAuthenticated && (
              <div>
                <h3
                  className="login darkBorder lightBg"
                  onClick={() => logoutWithRedirect({})}
                >
                  Log Out
                </h3>
                <h3 className="toHome darkBorder lightBg">
                  <a style={linkStyle} href="/home">
                    Start Session <i className="fas fa-arrow-right"></i>
                  </a>
                </h3>
              </div>
            )}
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default Login;
