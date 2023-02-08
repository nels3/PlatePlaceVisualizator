import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { setLanguage } from "src/store/slices/language/languageSlice";

import "src/static/navbar.css";
import { GB, PL } from "country-flag-icons/react/3x2";

import {
  getDisplayText,
  getDisplayTextFromChoices,
  dictionary as dict,
} from "src/utils/languageUtil";

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
          <NavLink to="/">
            {getDisplayText(language, dict.navbar.plates)}
          </NavLink>
          <NavLink to="/gallery">
            {getDisplayText(language, dict.navbar.gallery)}
          </NavLink>
          <NavLink to="/map">
            {getDisplayText(language, dict.navbar.map)}
          </NavLink>
          <NavLink to="/stats">
            {getDisplayText(language, dict.navbar.statistics)}
          </NavLink>
          <NavLink to="/world">
            {getDisplayText(language, dict.navbar.world)}
          </NavLink>

          <PL
            style={{ marginLeft: "auto" }}
            title="pl"
            className={
              "flag " + getDisplayTextFromChoices(language, "", "selected")
            }
            onClick={() => changeLanguage("pl")}
          />
          <GB
            style={{ marginRight: "20px" }}
            title="en"
            className={
              "flag " + getDisplayTextFromChoices(language, "selected", "")
            }
            onClick={() => changeLanguage("en")}
          />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
