import React, { useState } from "react";
import { withRouter, Link } from "react-router-dom";
import { PBSelect } from "../controls/inputs/PBSelect";
import { Constants } from "../../util/Constants";
import "./Navigation.css"

export const Navigation = () => {
    return (
      <div className="nav--container">
        <div className="nav">
          <p className="pb-logo">ProjectB</p>
          
          {/* <ul className="nav-links">
            <li className="nav-link">
              <Link to={"/"}>Home</Link>
            </li>
            <li className="nav-link">
              <Link to={"/boards"}>My Boards</Link>
            </li>
          </ul> */}

          <PBSelect
            label={""}
            index={0}
            options={Constants.NAV_MENU_OPTIONS_TEST_DATA}
            name={"nav-select"}
          />
        </div>
      </div>
    );
}