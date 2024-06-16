import React from "react";
import "./Input.css"

export const Input = ({ id, label, name, type, value, handleChange, isDisabled, fromModal }) => {

    return (
        <div className="pb-input--container">
            <label className="pb-input-lbl" htmlFor={id}>{label}:</label>

            <input 
                id={id} 
                name={name}
                className={`pb-input ${fromModal ? 'modal-input' : ''}`} 
                type={type === undefined ? "text" : type}
                onChange={handleChange}
                value={value}
                disabled={isDisabled}
            />
        </div>
    );
}