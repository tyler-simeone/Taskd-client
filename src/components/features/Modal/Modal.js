import React from "react";
import "./Modal.css"
import { AddTask } from "../../task/AddTask";

export const Modal = ({ isOpen, setIsModalOpen }) => {
    return (
        <div id="modal" class={`modal ${isOpen ? 'open' : ''}`}>
            <div class={`modal-content ${isOpen ? 'active' : ''}`}>
                <div className="modal-header--container">
                    <span class="close" onClick={() => setIsModalOpen(false)}>&times;</span>
                    <h2 className="modal-header">Add a Task</h2>
                </div>

                <AddTask />
            </div>
        </div>
    );
};