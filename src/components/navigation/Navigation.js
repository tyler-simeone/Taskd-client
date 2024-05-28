import React, { useState, useContext } from "react";
import { withRouter, Link } from "react-router-dom";
import { PBSelect } from "../controls/inputs/PBSelect";
import { Constants } from "../../util/Constants";
import { NavigationSelect } from "./NavigationSelect";
import { AppContext } from "../../AppContextProvider";
import { ProjectBLogo } from "../controls/icons/ProjectBLogo";
import "./Navigation.css"

export const Navigation = () => {
  const { isAuthenticated, logout } = useContext(AppContext);
  return (
    <div className="nav--container">
      <div className="nav">
        {isAuthenticated() && <ProjectBLogo isAuthenticated={isAuthenticated} />}
        {isAuthenticated() && (
          <div style={{display: "flex"}}>
            <NavigationSelect />
            <div onClick={logout}><span>Logout</span></div>
          </div>
        )}
      </div>
    </div>
  );
}