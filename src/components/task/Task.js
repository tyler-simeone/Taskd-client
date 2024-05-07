import React, { useEffect } from "react";
import "./Task.css"

export const Task = ({ task }) => {

    return (
        task !== undefined ? (
            <div className="task--container">
                <div>
                    <h4 className="task-title">{task.taskName}</h4>
                </div>
                <div>
                    <p className="task-description">{task.taskDescription}</p>
                </div>
            </div>
        ) : null
    );
}