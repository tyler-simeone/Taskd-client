import React from "react";
import "./styles/Input.css"

export const Input = ({ id, label, name, type, value, handleChange, isDisabled, fromModal, className, style }) => {

    return (
        <div className="pb-input--container">
            {label && <label className="pb-input-lbl" htmlFor={id}>{label}:</label>}

            <input 
                id={id} 
                name={name}
                className={`pb-input ${className ?? ''} ${fromModal && 'modal-input'}`} 
                type={!type ? "text" : type}
                onChange={handleChange}
                value={value}
                disabled={isDisabled}
                style={style}
            />
        </div>
    );
}