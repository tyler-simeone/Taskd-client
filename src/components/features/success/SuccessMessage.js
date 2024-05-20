import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../../../AppContextProvider";
import "./SuccessMessage.css"

export const SuccessMessage = () => {
    const { success, closeSuccess } = useContext(AppContext);
    const [successMessage, setSuccessMessage] = useState();

    useEffect(() => {
        if (successMessage === undefined)
            setSuccessMessage(success);
    }, [success])
 
    return (
        <div className="success-msg--container">
            <div className="success-msg">{successMessage}</div>
            <span className="close" className="close-success-msg" onClick={closeSuccess}>&times;</span>
        </div>
    );
}