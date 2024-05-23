import React, { useState, useContext } from "react";
import { withRouter, Link } from "react-router-dom";
import { PBSelect } from "../controls/inputs/PBSelect";
import { Constants } from "../../util/Constants";
import { NavigationSelect } from "./NavigationSelect";
import { AppContext } from "../../AppContextProvider";
import "./Navigation.css"

export const Navigation = () => {
  const { isAuthenticated } = useContext(AppContext);
  return (
    <div className="nav--container">
      <div className="nav">
        <div className="pb-logo"><Link>ProjectB</Link></div>
        {isAuthenticated && <NavigationSelect />}
      </div>
    </div>
  );
}