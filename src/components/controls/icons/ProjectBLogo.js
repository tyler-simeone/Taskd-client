import React from "react";
import { Link } from "react-router-dom";

export const ProjectBLogo = ({ isAuthenticated, isLink, style }) => {
    return (
        <div style={style} className="pb-logo">
            {isLink ? (
                <Link to={isAuthenticated === true ? "/board" : "/login"}>Task'd</Link>
            ) : (
                <span>Task'd</span>
            )}
        </div>
    );
}