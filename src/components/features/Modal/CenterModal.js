import React, { useContext } from "react";
import { AppContext } from "../../../AppContextProvider";
import "./Modal.css"

export const CenterModal = ({ children }) => {
    const { 
        isSideModalOpen,
        modalHeader,
        closeModal
     } = useContext(AppContext);

    return (
        <div class={`modal-content ${isSideModalOpen ? 'active' : ''}`}>
            <div className="modal-header--container">
                <span class="close" onClick={closeModal}>&times;</span>
                <h2 className="modal-header">{modalHeader}</h2>
            </div>

            {children}
        </div>
    );
};