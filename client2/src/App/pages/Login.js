import React from "react";
import Row from "../components/Row";
import Col from "../components/Col";
import { useAuth0 } from "../../react-auth0-spa";

const Login = () => {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

  const logoutWithRedirect = () => {
    logout({
      returnTo: window.location.origin
    });
  };

  const linkStyle = {
    color: "inherit",
    textDecoration: "none"
  }

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
            {/* LOGIN */}
            {!isAuthenticated && (
              <h3 className="login darkBorder lightBg" onClick={() => loginWithRedirect({})}>
                Get Started <i className="fas fa-arrow-right"></i>
              </h3>
            )}
            {/* LOGOUT */}
            {isAuthenticated && (
              <div>
              <h3 className="login darkBorder lightBg" onClick={() => logoutWithRedirect({})}>
                Log Out 
              </h3>
              <h3 className="btnCustom toHome"><a style={linkStyle} href="/home">Go To Home Dashboard <i className="fas fa-arrow-right"></i></a></h3>
              </div>
            )}
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default Login;
