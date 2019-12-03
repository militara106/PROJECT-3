import React from "react";
function Navbar(props) {
  return (
    <div>
      <nav className="navbar navGradient darkFont navbar-fixed-top topNavBar" style={props.style}>
        <h1 className="vybe" style={props.vybe}>VYBE</h1>
        {props.children}
      </nav>
    </div>
  );
}

export default Navbar;
