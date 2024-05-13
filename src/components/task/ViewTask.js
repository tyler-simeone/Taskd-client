import React from "react";
import EditIcon from '@mui/icons-material/Edit';
import "./ViewTask.css"

export const ViewTask = ({ task, openEditTaskModal }) => {
    return (
        task !== undefined ? (
            <div className="task-details">
                <p>{task.taskDescription}</p>
                <div className="edit-icon" onClick={openEditTaskModal}><EditIcon /></div>
            </div>
        ) : null
    );
}