import React, { useContext } from "react";
import { AppContext } from "../../../AppContextProvider";
import "./Modal.css"

export const Modal = ({ children }) => {
    const { 
        isSideModalOpen,
        isCenterModalOpen
     } = useContext(AppContext);

    return (
        <div id="modal" class={`modal ${isSideModalOpen || isCenterModalOpen ? 'open' : ''}`}>
            {children}
        </div>
    );
};