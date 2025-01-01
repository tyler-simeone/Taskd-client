import React, { useContext } from "react";
import { AppContext } from "../../../AppContextProvider";
import { XIcon } from "../../../controls/icons/XIcon";
import "./styles/Modal.css"

export const SideModal = ({ children }) => {
    const { 
        isSideModalOpen,
        modalHeader,
        formError,
        closeSideModal
     } = useContext(AppContext);

    return (
        <div className={`modal-content side ${isSideModalOpen ? 'active' : ''}`}>
            <div className="modal-header--container">
                <XIcon handleClick={closeSideModal} />
                
                <h2 className="modal-header">{modalHeader}</h2>
            </div>

            <div className="form-err-msg">
                <span>{formError}</span>
            </div>

            {children}
        </div>
    );
};