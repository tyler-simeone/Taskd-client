import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../AppContextProvider";
import { tasksClient } from "../../api/tasksClient";
import { tagsClient } from "../../api/tagsClient";
import { handleError } from "../../util/handleError";
import { FlatButton } from "../../controls/buttons/FlatButton";
import { dateHelper } from "../../util/helpers/dateHelper";
import { TagsList } from "../tag/TagsList";
import { XIcon } from "../../controls/icons/XIcon";
import "./styles/ViewTask.css"

export const ViewTask = ({ taskId, openEditTaskModal, setError, handleRerender }) => {
    const { deleteConfirmed,
            openDeleteConfirmationModal,
            closeDeleteConfirmationModalOnDelete,
            taskTags,
            userSession,
            taskTagsHaveChanged,
            closeSideModal
        } = useContext(AppContext);

    const navigate = useNavigate();

    const [task, setTask] = useState();
    const [tagsOnTask, setTagsOnTask] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [deleteModalArgs, setDeleteModalArgs] = useState();

    const handleCloseSideModal = () => {
        closeSideModal();
        navigate('/board');
    }

    const loadTask = () => {
        setError();
        setIsLoading(true);
        tasksClient.getTask(taskId, userSession.userId)
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
                if (err.status === 401)
                    closeSideModal();
                handleError(err, setError);
            });
    }
    
    const openDeleteConfirmation = () => openDeleteConfirmationModal(deleteModalArgs);

    const deleteTask = (taskId) => {
        setError();
        setIsLoading(true);
        tasksClient.deleteTask(taskId, 1)
            .catch(err => handleError(err, setError));
        setIsLoading(false);
        handleRerender();
        closeDeleteConfirmationModalOnDelete();
    }

    const loadTaskTags = () => {
        var tagsForTask = taskTags.filter(tt => tt.taskId === taskId);
        if (tagsForTask.length > 0)
            setTagsOnTask(tagsForTask);
    };

    useEffect(() => {
        if (!task)
            loadTask();

        if (deleteConfirmed)
            deleteTask();
    }, [task, deleteConfirmed]);

    useEffect(() => {
        if (taskTags && (!tagsOnTask || taskTagsHaveChanged))
          loadTaskTags();
      }, [tagsOnTask]);

    return (
        task && (
            <>
                <div className="modal-header--container">
                    <XIcon onClick={handleCloseSideModal} />

                    <h2 className="modal-header">
                        #{task.taskId} - {task.taskName}
                    </h2>
                </div>
                <div className="task-details">
                    <div onClick={() => openEditTaskModal(taskId)}>
                        {task.taskDescription && task.taskDescription.trim().length > 0 ? (
                            <p className="task-description-details">
                                {task.taskDescription}
                            </p>
                        ) : (
                            <p className="task-description-details"><em className="description-not-provided--lbl">No description provided.</em></p>
                        )}
                    </div>

                    {tagsOnTask && 
                        <TagsList tags={tagsOnTask} isTaskDetailsView={true} />}
                    
                    <div className="task-create-date--container">
                        <p className="task-lbl">Created: {dateHelper.formatDateLongMonthShortDayYear(task.createDatetime)}</p>
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
        )
    );
}