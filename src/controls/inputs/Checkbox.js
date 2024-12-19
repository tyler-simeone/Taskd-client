import React from "react";
import "./Checkbox.css"

export const Checkbox = ({ id, label, name, value, handleChange, isDisabled, fromModal, className }) => {

    return (
        <div className="pb-checkbox--container">
            <label className="pb-checkbox-lbl" htmlFor={id}>{label}:</label>

            <input 
                id={id} 
                name={name}
                className={`pb-checkbox ${className ?? ''}`} 
                type="checkbox"
                onChange={(e) => handleChange(e.target.checked)}
                value={value}
                disabled={isDisabled}
            />
        </div>
    );
}