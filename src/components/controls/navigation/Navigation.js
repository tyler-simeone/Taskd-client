import React, { useState } from "react";
import { withRouter, Link } from "react-router-dom";
import "./Navigation.css"

export const Navigation = () => {
    return (
      <div className="nav--container">
        <div className="nav">
          <p className="pb-logo">ProjectB</p>
          
          <ul className="nav-links">
            <li className="nav-link">Board</li>
          </ul>
        </div>
      </div>
    );
}