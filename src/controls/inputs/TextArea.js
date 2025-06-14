import React, { useEffect, useRef } from "react";
import "./styles/TextArea.css"

export const TextArea = ({ id, label, name, type, value, handleChange, isDisabled, fromModal, className }) => {

    const textareaRef = useRef(null);

    useEffect(() => {
        // var txtArea = document.querySelector('.pb-textarea');
        // txtArea.style.height = txtArea.scrollHeight + 'px';

        // console.log("txtArea.style.height: ", txtArea.style.height);
        // console.log("txtArea.scrollHeight: ", txtArea.scrollHeight);

        const el = textareaRef.current;
        if (el) {
            el.style.height = 'auto';
            el.style.height = el.scrollHeight + 'px';
        }
    }, [value]);

    return (
        <div className="pb-input--container">
            <label className="pb-input-lbl" htmlFor={id}>{label}:</label>

            <textarea 
                id={id} 
                ref={textareaRef}
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