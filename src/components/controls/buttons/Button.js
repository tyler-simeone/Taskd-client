import React from "react";
import "./Button.css"

export const Button = ({ text, handleSubmit, isSubmitting, className, isSubmitBtn }) => {

    return (
        <button 
            type={isSubmitBtn === true ? 'submit' : 'button' }
            className={`button ${className} ${isSubmitting ? 'disabled' : ''}`} 
            onClick={handleSubmit} 
        >
            {!isSubmitting ? text : 'Sending...'}
        </button>
    );
}