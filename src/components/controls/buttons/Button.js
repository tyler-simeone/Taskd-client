import React from "react";
import "./Button.css"

export const Button = ({ text, handleSubmit, isSubmitting, className }) => {

    return (
        <button 
            type="button" 
            className={`button ${className} ${isSubmitting ? 'disabled' : ''}`} 
            onClick={handleSubmit} 
        >
            {!isSubmitting ? text : 'Sending...'}
        </button>
    );
}