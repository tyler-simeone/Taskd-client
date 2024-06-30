import React, { useContext } from "react";
import { AppContext } from "../../../AppContextProvider";
import "./styles/Modal.css"

export const CenterModal = ({ children }) => {
    const { closeDeleteConfirmationModal } = useContext(AppContext);

    return (
        <div className={`modal-content center`}>
            <span className="close center-modal" onClick={closeDeleteConfirmationModal}>&times;</span>

            {children}
        </div>
    );
};