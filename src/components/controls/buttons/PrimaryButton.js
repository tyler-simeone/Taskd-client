import React from "react";
import "./PrimaryButton.css"

export const PrimaryButton = ({ text, handleSubmit, isSubmitting }) => {

    return (
        <button 
            type="button" 
            className={`primary-button ${isSubmitting ? 'disabled' : ''}`} 
            onClick={handleSubmit} 
        >
            {!isSubmitting ? text : 'Sending...'}
        </button>
    );
}