import React from "react";
import "./Input.css"

export const Input = ({ id, label, name, type, value, handleChange }) => {

    return (
        <div className="pb-input--container">
            <label className="pb-input-lbl" htmlFor={id}>{label}:</label>

            <input 
                id={id} 
                name={name}
                className="pb-input" 
                type={type === undefined ? "text" : type}
                onChange={handleChange}
                value={value}
            />
        </div>
    );
}