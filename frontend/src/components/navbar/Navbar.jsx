import React from "react";
import { NavLink } from "react-router-dom";

import "src/static/navbar.css";

const Navbar = () => {
  return (
    <>
      <nav className="navbar">
        <div>
          <NavLink to="/">Plates</NavLink>
          <NavLink to="/map">Map</NavLink>
          <NavLink to="/stats">Statistics</NavLink>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
