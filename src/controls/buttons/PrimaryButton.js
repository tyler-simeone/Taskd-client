import React from "react";
import { Button } from "./Button";
import "./PrimaryButton.css"

export const PrimaryButton = ({ text, handleSubmit, isSubmitting, style }) => {

    return (
        <Button 
            className={"primary"} 
            text={text} 
            handleSubmit={handleSubmit} 
            isSubmitting={isSubmitting} 
            isSubmitBtn={true}
            style={style}
        />
    );
}