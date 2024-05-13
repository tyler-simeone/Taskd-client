import React, { useEffect, useState } from "react";
import "./ErrorMessage.css"

export const ErrorMessage = ({ message, closeErrorMessage }) => {
    const [errorMessage, setErrorMessage] = useState();

    useEffect(() => {
        if (errorMessage === undefined)
            setErrorMessage(message);
    }, [message])
 
    return (
        <div className="err-msg--container">
            <div className="err-msg">{errorMessage}</div>
            <span class="close-err-msg" onClick={closeErrorMessage}>&times;</span>
        </div>
    );
}