import React, { useContext } from "react";
import { AppContext } from "../../../AppContextProvider";
import "./styles/Modal.css"

export const CenterModal = ({ children }) => {
    const { closeDeleteConfirmationModal } = useContext(AppContext);

    return (
        <div className={`modal-content center`}>
            <div className="modal-header--container">
                <span className="close" onClick={closeDeleteConfirmationModal}>&times;</span>
            </div>

            {children}
        </div>
    );
};