import React from "react";
import { Button } from "./Button";
import "./SecondaryButton.css"

export const SecondaryButton = ({ text, style, handleClick, isSubmitting }) => {
    return (
        <Button 
            className={"secondary"} 
            text={text} 
            style={style}
            handleSubmit={handleClick} 
            isSubmitting={isSubmitting} 
        />
    );
}