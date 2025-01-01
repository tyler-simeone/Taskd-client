import React from "react";
import "./styles/XIcon.css"

export const XIcon = ({ onClick, styles }) => {

    return (
        <span className="close" style={styles} onClick={e => onClick(e)}>&times;</span>
    );
}