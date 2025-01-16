import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../../AppContextProvider";
import { tasksClient } from "../../api/tasksClient";
import { handleError } from "../../util/handleError";
import { Input } from "../../controls/inputs/Input";
import { PrimaryButton } from "../../controls/buttons/PrimaryButton";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { TextArea } from "../../controls/inputs/TextArea";
import { TagsList } from "../tag/TagsList";
import { tagsClient } from "../../api/tagsClient";
import { TagSelector } from "../tag/TagSelector";
import "./styles/EditTask.css"

export const EditTask = ({ taskId, setFormError, openViewTaskModal, setError, showSuccess, handleRerender }) => {
    const { userSession, taskTags, boardId } = useContext(AppContext);

    const [isLoading, setIsLoading] = useState(false);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editTask, setEditTask] = useState();
    const [tagsOnTask, setTagsOnTask] = useState();
    const [tagsHaveChanged, setTagsHaveChanged] = useState(false);

    const loadTask = () => {
        setError();
        setIsLoading(true);
        tasksClient.getTask(taskId, userSession.userId)
            .then(resp => {
                setEditTask(resp);
                setIsLoading(false);
            })
            .catch(err => {
                setIsLoading(false);
                handleError(err, setError);
            });
    }

    const handleChange = (evt) => {
        setFormError();
        const stateToChange = {...editTask};
        stateToChange[evt.target.name] = evt.target.value;
        setEditTask(stateToChange);
    }

    const formIsValid = () => {
        if (editTask.taskName.trim() === "") {
            setFormError("Task name is required.");
            return false;
        }
        return true;
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();

        if (formIsValid()) {
            setIsSubmitting(true);
    
            const editTaskRequestModel = {
                userId: userSession.userId,
                taskId: editTask.taskId,
                columnId: editTask.columnId,
                taskName: editTask.taskName,
                taskDescription: editTask.taskDescription,
            };
            tasksClient.updateTask(editTaskRequestModel)
                .then(() => handleRerender())
                .catch(err => handleError(err, setError));
    
            setIsSubmitting(false);
            openViewTaskModal(editTask.taskId, editTask.taskName);
        }
    }

    const loadTaskTags = async () => {
        var taskTags = await tagsClient.getTaskTags(boardId, taskId);
        setTagsOnTask(taskTags.data);
        handleTagsHaveChanged();
    };

    const handleTagDeleteFromTask = async (taskTagId) => {
        setError();
        setIsLoading(true);

        try {
            var resp = await tagsClient.deleteTagFromTask(taskTagId, userSession.userId);            
            if (resp) {
                loadTaskTags();
            }
        } catch (err) {
            handleError(err, setError)
        }

        setIsLoading(false);
    }

    const handleTagsHaveChanged = () => setTagsHaveChanged(!tagsHaveChanged);
    
    useEffect(() => {
        if (!editTask)
            loadTask();
    }, [editTask])

    useEffect(() => {
        if ((taskTags && !tagsOnTask) || tagsHaveChanged) {
            if (tagsHaveChanged)
                handleTagsHaveChanged();

            loadTaskTags();
        }
    }, [tagsOnTask, tagsHaveChanged])

    return (
        editTask && (
            <>
                <KeyboardBackspaceIcon 
                    className="update-task-return-arrow" 
                    onClick={() => openViewTaskModal(editTask.taskId, editTask.taskName)} 
                />

                <form>
                    <Input 
                        name={"taskName"} 
                        label={"*Task Name"} 
                        handleChange={handleChange} 
                        fromModal={true}
                        value={editTask.taskName}
                    />

                    <TextArea 
                        name={"taskDescription"} 
                        label={"Task Description"} 
                        handleChange={handleChange} 
                        value={editTask.taskDescription}
                        fromModal={true} 
                    />

                    {tagsOnTask && tagsOnTask.length > 0 && 
                        <TagsList 
                            tags={tagsOnTask}
                            handleTagDeleteFromTask={handleTagDeleteFromTask} 
                            isTaskEditView={true} 
                        />
                    }

                    <TagSelector 
                        taskId={taskId}
                        handleTagsHaveChanged={handleTagsHaveChanged}
                        tagsHaveChanged={tagsHaveChanged}
                        setFormError={setFormError}
                    />

                    <PrimaryButton 
                        text={"Submit"} 
                        handleSubmit={handleSubmit} 
                        isSubmitting={isSubmitting} 
                    />
                </ form>
            </>
        )
    );
}