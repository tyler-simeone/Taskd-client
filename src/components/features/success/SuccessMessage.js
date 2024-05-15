import React, { useEffect, useState } from "react";
import "./SuccessMessage.css"

export const SuccessMessage = ({ message, closeSuccessMessage }) => {
    const [successMessage, setSuccessMessage] = useState();

    useEffect(() => {
        if (successMessage === undefined)
            setSuccessMessage(message);
    }, [message])
 
    return (
        <div className="success-msg--container">
            <div className="success-msg">{successMessage}</div>
            <span class="close" className="close-success-msg" onClick={closeSuccessMessage}>&times;</span>
        </div>
    );
}