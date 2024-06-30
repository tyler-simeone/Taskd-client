import React from "react";
import { Button } from "./Button";
import "./FlatButton.css"

export const FlatButton = ({ text, style, className, onClick, isSubmitting }) => {
    return (
        <Button 
            className={`flat ${className !== undefined && className}`} 
            text={text} 
            style={style}
            handleSubmit={onClick} 
            isSubmitting={isSubmitting} 
        />
    );
}