import React from "react";
import { Button } from "./Button";
import "./DeleteButton.css"

export const DeleteButton = ({ text, handleSubmit, isSubmitting }) => {
    return (
        <Button 
            className={"delete"} 
            text={text !== undefined ? text : "Delete"} 
            handleSubmit={handleSubmit} 
            isSubmitting={isSubmitting} 
            isSubmitBtn={true}
        />
    );
}