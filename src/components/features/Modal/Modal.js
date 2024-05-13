import React from "react";
import "./Modal.css"

export const Modal = ({ isOpen, header, children, closeModal, formError }) => {
    return (
        <div id="modal" class={`modal ${isOpen ? 'open' : ''}`}>
            <div class={`modal-content ${isOpen ? 'active' : ''}`}>
                <div className="modal-header--container">
                    <span class="close" onClick={closeModal}>&times;</span>
                    <h2 className="modal-header">{header}</h2>
                </div>

                <div className="form-err-msg">
                    <span>{formError}</span>
                </div>

                {children}
            </div>
        </div>
    );
};