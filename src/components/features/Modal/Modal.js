import React, { useContext } from "react";
import { AppContext } from "../../../AppContextProvider";
import "./Modal.css"

export const Modal = ({ children }) => {
    const { 
        isSideModalOpen
     } = useContext(AppContext);

    return (
        <div id="modal" class={`modal ${isSideModalOpen ? 'open' : ''}`}>
            {children}
        </div>
    );
};