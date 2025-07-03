import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const TaskdLogo = ({ isAuthenticated, boardName, isLink, style }) => {
    const [isEdit, setIsEdit] = useState(false);

    const handleEdit = () => setIsEdit(!isEdit);

    useEffect(() => {
        console.log("isEdit: ", isEdit);
    }, [isEdit])

    return (
        <div style={style} className="pb-logo">
            {isLink ? (
                <Link to={isAuthenticated ? "/board" : "/login"}>Task'd</Link>
            ) : (
                <div style={{display: "flex"}}>
                    <p>Task'd</p> 
                    
                    {boardName && (
                        <div style={{display: "flex", marginTop: 8, marginLeft: 2, fontSize: 18, color: "#949494"}}>
                            <p style={{margin: "0px 8px"}}>/</p> 
                            <p onClick={handleEdit}>{boardName}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}