import React, { useEffect } from "react";
import "./styles/TextArea.css"

export const TextArea = ({ id, label, name, type, value, handleChange, isDisabled, fromModal, className }) => {

    useEffect(() => {
        var txtArea = document.querySelector('.pb-textarea');
        txtArea.style.height = txtArea.scrollHeight + 'px';
    }, []);

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