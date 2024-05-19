import React from "react";
import { Button } from "./Button";
import "./PrimaryButton.css"

export const PrimaryButton = ({ text, handleSubmit, isSubmitting }) => {

    return (
        <Button 
            className={"primary"} 
            text={text} 
            handleSubmit={handleSubmit} 
            isSubmitting={isSubmitting} 
            isSubmitBtn={true}
        />
    );
}