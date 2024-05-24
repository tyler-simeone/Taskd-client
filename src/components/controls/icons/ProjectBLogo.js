import React from "react";
import { Link } from "react-router-dom";

export const ProjectBLogo = ({ isAuthenticated, style }) => {
    return (
        <div style={style} className="pb-logo"><Link to={isAuthenticated === true ? "/board" : "/login"}>ProjectB</Link></div>
    );
}