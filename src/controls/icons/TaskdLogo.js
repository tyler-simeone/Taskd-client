import React from "react";
import { Link } from "react-router-dom";

export const TaskdLogo = ({ isAuthenticated, boardName, isLink, style }) => {
    return (
        <div style={style} className="pb-logo">
            {isLink ? (
                <Link to={isAuthenticated === true ? "/board" : "/login"}>Task'd</Link>
            ) : (
                <>
                    <span>Task'd</span> {boardName && (<><span style={{fontSize: 18, color: "#8d8d8d", margin: "0px 6px"}}>/</span> <span style={{fontSize: 18, color: "#8d8d8d"}}>{boardName}</span></>)}
                </>
            )}
        </div>
    );
}