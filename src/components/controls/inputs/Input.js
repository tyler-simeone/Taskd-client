import React from "react";
import "./Input.css"

export const Input = ({ label, name, value, handleChange }) => {

    return (
        <div className="pb-input--container">
            <label className="pb-input-lbl" htmlFor="pb-input">{label}:</label>

            <input 
                id="pb-input" 
                name={name}
                className="pb-input" 
                type="text"
                onChange={handleChange}
                value={value}
            />
        </div>
    );
}