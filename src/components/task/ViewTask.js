import React from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import "./ViewTask.css"

export const ViewTask = ({ task, openEditTaskModal }) => {
    return (
        task !== undefined ? (
            <div className="task-details">
                <p>{task.taskDescription}</p>

                <div className="icon--container">
                    <div className="edit-icon" onClick={() => openEditTaskModal(task)}><EditIcon style={{fontSize: 22}} /></div>
                    <div className="delete-icon" onClick={() => openEditTaskModal(task)}><DeleteIcon style={{fontSize: 22}} /></div>
                </div>
            </div>
        ) : null
    );
}