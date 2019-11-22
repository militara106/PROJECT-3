import React from "react";
function Navbar(props) {
  return (
    <div>
    <nav className="navbar navGradient darkFont navbar-fixed-top topNavBar">
        <h1 className="vybe lightestFont">VYBE</h1>
        {props.children}
    </nav>
    <div className="lowerBorderGradient" />
    </div>
  );
}

export default Navbar;
