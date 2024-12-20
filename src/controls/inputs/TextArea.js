import React from "react";
import "./styles/TextArea.css"

export const TextArea = ({ id, label, name, type, value, handleChange, isDisabled, fromModal, className }) => {

    return (
        <div className="pb-input--container">
            <label className="pb-input-lbl" htmlFor={id}>{label}:</label>

            <textarea 
                id={id} 
                name={name}
                className={`pb-input pb-textarea ${className ?? ''} ${fromModal && 'modal-input'}`} 
                type={type === undefined ? "text" : type}
                onChange={handleChange}
                value={value}
                disabled={isDisabled}
            >
                {value}
            </ textarea>
        </div>
    );
}