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
          <NavLink to="/country">Country</NavLink>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
