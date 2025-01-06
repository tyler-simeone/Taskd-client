import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../../AppContextProvider";
import { tasksClient } from "../../api/tasksClient";
import { tagsClient } from "../../api/tagsClient";
import { handleError } from "../../util/handleError";
import { FlatButton } from "../../controls/buttons/FlatButton";
import { dateHelper } from "../../util/helpers/dateHelper";
import { TagsList } from "../tag/TagsList";
import "./styles/ViewTask.css"

export const ViewTask = ({ taskId, openEditTaskModal, setError, handleRerender }) => {
    const { deleteConfirmed,
            openDeleteConfirmationModal,
            closeDeleteConfirmationModalOnDelete,
            taskTags,
            userSession
        } = useContext(AppContext);

    const [task, setTask] = useState();
    const [tagsOnTask, setTagsOnTask] = useState();
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
    
    const handleTagDeleteFromTask = async (tagId) => {
        setError();
        setIsLoading(true);

        try {
            await tagsClient.deleteTag(tagId, userSession.userId);
            var stateToChange = [...tagsOnTask];
            stateToChange.splice(stateToChange.findIndex(t => t.tagId === tagId), 1);
            setTagsOnTask(stateToChange);
        } catch (err) {
            handleError(err, setError)
        }

        setIsLoading(false);
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
        if (taskTags && !tagsOnTask)
          loadTaskTags();
      }, [tagsOnTask]);

    return (
        task && (
            <>
                <div className="task-details">
                    <div>
                        {task.taskDescription && task.taskDescription.trim().length > 0 ? (
                            <p className="task-description-details">{task.taskDescription}</p>
                        ) : (
                            <p className="task-description-details"><em className="description-not-provided--lbl">No description provided.</em></p>
                        )}
                    </div>

                    {tagsOnTask && 
                        <TagsList tags={tagsOnTask} isTaskDetailsView={true} handleTagDeleteFromTask={handleTagDeleteFromTask} />}
                    
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
        )
    );
}