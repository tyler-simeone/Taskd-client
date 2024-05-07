import React, { useState } from "react";
import { withRouter, Link } from "react-router-dom";
import { PBSelect } from "../controls/inputs/PBSelect";
import { Constants } from "../../util/Constants";
import { NavigationSelect } from "./NavigationSelect";
import "./Navigation.css"

export const Navigation = () => {
    return (
      <div className="nav--container">
        <div className="nav">
          <div className="pb-logo"><Link>ProjectB</Link></div>
          <NavigationSelect />
        </div>
      </div>
    );
}