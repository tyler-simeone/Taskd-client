import React from "react";
import "./Button.css"

export const Button = ({ text, handleSubmit, isSubmitting, className, isSubmitBtn, style }) => {

    return (
        <button 
            type={isSubmitBtn === true ? 'submit' : 'button' }
            className={`button ${className} ${isSubmitting ? 'disabled' : ''}`} 
            onClick={evt => handleSubmit(evt)} 
            style={style}
        >
            {!isSubmitting ? text : 'Sending...'}
        </button>
    );
}