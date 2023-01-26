import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { setLanguage } from "src/store/slices/language/languageSlice";

import "src/static/navbar.css";
import { GB, PL } from "country-flag-icons/react/3x2";

const Navbar = () => {
  const language = useSelector((state: RootState) => state.language.language);

  const dispatch = useDispatch();
  const changeLanguage = (language) => {
    dispatch(setLanguage(language));
  };

  return (
    <>
      <nav className="navbar">
        <div>
          <NavLink to="/">{language == "en" ? "Plates" : "Talerzyki"}</NavLink>
          <NavLink to="/map">{language == "en" ? "Map" : "Mapa"}</NavLink>
          <NavLink to="/stats">
            {language == "en" ? "Statistics" : "Statystyki"}
          </NavLink>

          <PL
            style={{ marginLeft: "auto" }}
            title="pl"
            className={"flag " + (language === "pl" ? "selected" : "")}
            onClick={() => changeLanguage("pl")}
          />
          <GB
            style={{ marginRight: "20px" }}
            title="en"
            className={"flag " + (language === "en" ? "selected" : "")}
            onClick={() => changeLanguage("en")}
          />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
