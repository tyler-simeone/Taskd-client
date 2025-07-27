import React from "react";
import "./styles/Checkbox.css"

export const Checkbox = ({ id, label, name, value, checked, handleChange, isDisabled, fromModal, className, style }) => {

    return (
        <div className="pb-checkbox--container">
            {label && <label className="pb-checkbox-lbl" htmlFor={id}>{label}:</label>}

            <input 
                id={id} 
                name={name}
                className={`pb-checkbox ${className ?? ''}`}
                style={style}
                type="checkbox"
                onChange={(e) => handleChange(e.target.checked)}
                value={value}
                checked={checked}
                disabled={isDisabled}
            />
        </div>
    );
}