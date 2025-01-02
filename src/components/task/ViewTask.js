import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../../AppContextProvider";
import { tasksClient } from "../../api/tasksClient";
import { handleError } from "../../util/handleError";
import { TagSelector } from "../tag/TagSelector";
import { FlatButton } from "../../controls/buttons/FlatButton";
import { dateHelper } from "../../util/helpers/dateHelper";
import "./styles/ViewTask.css"

export const ViewTask = ({ taskId, openEditTaskModal, setError, handleRerender }) => {
    const { deleteConfirmed, openDeleteConfirmationModal, closeDeleteConfirmationModalOnDelete } = useContext(AppContext);

    const [task, setTask] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [deleteModalArgs, setDeleteModalArgs] = useState();

    const loadTask = () => {
        setError();
        setIsLoading(true);
        tasksClient.getTask(taskId, 1)
            .then(resp => {
                setTask(resp);
                setDeleteModalArgs({ 
                    resourceName: resp.taskName, 
                    resourceId: resp.taskId, 
                    callback: () => deleteTask(resp.taskId)
                });
                setIsLoading(false);
            })
            .catch(err => {
                setIsLoading(false);
                handleError(err, setError);
            });
    }

    const deleteTask = (taskId) => {
        setError();
        setIsLoading(true);
        tasksClient.deleteTask(taskId, 1)
            .catch(err => handleError(err, setError));
        setIsLoading(false);
        handleRerender();
        closeDeleteConfirmationModalOnDelete();
    }

    const openDeleteConfirmation = () => openDeleteConfirmationModal(deleteModalArgs);

    useEffect(() => {
        if (!task)
            loadTask();

        if (deleteConfirmed)
            deleteTask();
    }, [task, deleteConfirmed]);

    return (
        task !== undefined ? (
            <>
                <div className="task-details">
                    <div>
                        {task.taskDescription && task.taskDescription.trim().length > 0 ? (
                            <p className="task-description-details">{task.taskDescription}</p>
                        ) : (
                            <p className="task-description-details"><em className="description-not-provided--lbl">No description provided.</em></p>
                        )}
                    </div>

                    <TagSelector taskId={task.taskId} />
                    
                    <div className="task-create-date--container">
                        <h3 className="task-lbl">Created on:</h3>
                        <p className="created-date">{dateHelper.formatDateLongMonthShortDayYear(task.createDatetime)}</p>
                    </div>

                </div>
                <div className="task-action-btns">
                    <FlatButton 
                        text={"Edit"} 
                        className={"task-edit"}
                        onClick={() => openEditTaskModal(taskId)}
                    />

                    <FlatButton 
                        text={"Delete"} 
                        className={"task-delete"}
                        onClick={openDeleteConfirmation}
                    />
                </div>
            </>
        ) : null
    );
}