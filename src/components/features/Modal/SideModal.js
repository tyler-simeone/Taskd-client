import React, { useContext, useEffect } from "react";
import { AppContext } from "../../../AppContextProvider";
import { XIcon } from "../../../controls/icons/XIcon";
import { Constants } from "../../../util/Constants";
import "./styles/Modal.css"

export const SideModal = ({ children }) => {
    const { 
        isSideModalOpen,
        modalType,
        openEditTaskModal,
        taskId,
        modalHeader,
        formError,
        closeSideModal
     } = useContext(AppContext);


    useEffect(() => {
        if (!isSideModalOpen) return;

        function handleKeyDown(event) {
            if (event.key === "Escape") {
                closeSideModal();
            }
        }

        window.addEventListener("keydown", handleKeyDown);
        
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isSideModalOpen, closeSideModal]);

    return (
        <div className={`modal-content side ${isSideModalOpen ? 'active' : ''}`}>
            <div className="modal-header--container">
                <XIcon onClick={closeSideModal} />
                
                <h2 className="modal-header">
                    {modalType === Constants.MODAL_TYPE.VIEW_TASK ||
                     modalType === Constants.MODAL_TYPE.CONFIRM_DELETE ? `#${taskId} -` : null} {modalHeader}
                </h2>
            </div>

            <div className="form-err-msg">
                <span>{formError}</span>
            </div>

            {children}
        </div>
    );
};