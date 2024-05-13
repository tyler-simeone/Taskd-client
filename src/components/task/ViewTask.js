import React, { useEffect, useState } from "react";
import { tasksClient } from "../../api/tasksClient";
import { handleError } from "../../util/handleError";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import "./ViewTask.css"

export const ViewTask = ({ taskId, openEditTaskModal, setError }) => {
    const [task, setTask] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const loadTask = () => {
        setError();
        setIsLoading(true);
        tasksClient.getTask(taskId, 1)
            .then(resp => {
                setTask(resp);
                setIsLoading(false);
            })
            .catch(err => {
                setIsLoading(false);
                handleError(err, setError);
            });
    }

    useEffect(() => {
        if (task === undefined)
            loadTask();
    }, [task]);

    return (
        task !== undefined ? (
            <div className="task-details">
                <p>{task.taskDescription}</p>

                <div className="icon--container">
                    <div className="edit-icon" onClick={() => openEditTaskModal(taskId)}><EditIcon style={{fontSize: 22}} /></div>
                    <div className="delete-icon"><DeleteIcon style={{fontSize: 22}} /></div>
                </div>
            </div>
        ) : null
    );
}