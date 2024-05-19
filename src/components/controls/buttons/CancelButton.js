import React from "react";
import { Button } from "./Button";
import "./CancelButton.css"

export const CancelButton = ({ text, handleCancel, isSubmitting }) => {
    return (
        <Button 
            className={"cancel"} 
            text={"Cancel"} 
            handleSubmit={handleCancel} 
            isSubmitting={isSubmitting} 
        />
    );
}