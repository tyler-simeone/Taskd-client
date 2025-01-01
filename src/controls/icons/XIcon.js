import React from "react";
import "./styles/XIcon.css"

export const XIcon = ({ handleClick }) => {

    return (
        <span className="close" onClick={handleClick}>&times;</span>
    );
}