import React, { useContext } from "react";
import { AppContext } from "../../../AppContextProvider";
import "./styles/Modal.css"

export const Modal = ({ children }) => {
    const { 
        isSideModalOpen,
        isCenterModalOpen
     } = useContext(AppContext);

    return (
        <div id="modal" className={`modal ${isSideModalOpen || isCenterModalOpen ? 'open' : ''}`}>
            {children}
        </div>
    );
};