import React, { useContext } from "react";
import { AppContext } from "../../../AppContextProvider";
import "./Modal.css"

export const SideModal = ({ children }) => {
    const { 
        isSideModalOpen,
        modalHeader,
        formError,
        closeModal
     } = useContext(AppContext);

    return (
        <div class={`modal-content ${isSideModalOpen ? 'active' : ''}`}>
            <div className="modal-header--container">
                <span class="close" onClick={closeModal}>&times;</span>
                <h2 className="modal-header">{modalHeader}</h2>
            </div>

            <div className="form-err-msg">
                <span>{formError}</span>
            </div>

            {children}
        </div>
    );
};