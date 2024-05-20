import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../../../AppContextProvider";
import "./ErrorMessage.css"

export const ErrorMessage = () => {
    const { error, closeError } = useContext(AppContext);
    const [errorMessage, setErrorMessage] = useState();

    useEffect(() => {
        if (errorMessage === undefined)
            setErrorMessage(error);
    }, [closeError])
 
    return (
        <div className="err-msg--container">
            <div className="err-msg">{errorMessage}</div>
            <span className="close-err-msg" onClick={closeError}>&times;</span>
        </div>
    );
}