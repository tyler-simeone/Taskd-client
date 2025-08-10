import React, { useEffect, useState, useContext, useRef } from "react";
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
import { AddTaskTag } from "../tag/AddTaskTag";
import "./styles/EditTask.css"

export const EditTask = ({ 
    taskId,
    setFormError,
    openViewTaskModal,
    setError,
    showSuccess,
    handleRerender 
}) => {
    const { userSession,
            taskTags,
            boardId,
            setTaskTagsHaveChanged,
            setTaskTagsChangedTaskId 
        } = useContext(AppContext);

    const taskNameInputRef = useRef(null);
    const hasFocused = useRef(false);

    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editTask, setEditTask] = useState();
    const [tagsOnTask, setTagsOnTask] = useState();
    const [tagsHaveChanged, setTagsHaveChanged] = useState(false);
    const [showTagSelector, setShowTagSelector] = useState(false);

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

    const loadTaskTags = async () => {
        var taskTags = await tagsClient.getTaskTags(boardId, taskId);
        setTagsOnTask(taskTags.data);
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
        } finally {
            handleTagsHaveChanged();
            setIsLoading(false);
        }
    }

    const handleTagsHaveChanged = () => {
        console.log("tagsHaveChanged: ", tagsHaveChanged);
        
        // setTagsHaveChanged(!tagsHaveChanged);

        if (!tagsHaveChanged) {
            setTagsHaveChanged(true);
            setTaskTagsHaveChanged(true);
            setTaskTagsChangedTaskId(taskId);
        } else {
            setTagsHaveChanged(false);
            setTaskTagsHaveChanged(false);
        }

        // setTaskTagsHaveChanged(true);
    };

    const handleShowTagSelector = () => {
        setShowTagSelector(true);
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
        console.log("submitting!");

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
    
    useEffect(() => {
        if (!editTask)
            loadTask();
        else if (taskNameInputRef.current && !hasFocused.current) {
            // Autofocus the Name input when the component mounts
            taskNameInputRef.current.focus();
            taskNameInputRef.current.setSelectionRange(0, 0);
            taskNameInputRef.current.scrollLeft = 0;
            hasFocused.current = true;
        }
    }, [editTask])

    useEffect(() => {
        if ((taskTags && !tagsOnTask) || tagsHaveChanged) {
            loadTaskTags();
        }
    }, [editTask, tagsOnTask, tagsHaveChanged])

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
                        ref={taskNameInputRef}
                    />

                    <TextArea 
                        name={"taskDescription"} 
                        label={"Description"} 
                        handleChange={handleChange} 
                        value={editTask.taskDescription}
                        fromModal={true} 
                    />

                    {tagsOnTask && tagsOnTask.length > 0 && 
                        <TagsList 
                            tags={tagsOnTask}
                            handleTagDeleteFromTask={handleTagDeleteFromTask} 
                            isTaskEditView={true}
                            onClick={handleShowTagSelector}
                            showTagSelector={showTagSelector}
                        />
                    }
                    
                    {!showTagSelector && tagsOnTask && tagsOnTask.length === 0 
                        && <AddTaskTag onClick={handleShowTagSelector} />}

                    {showTagSelector && (
                        <TagSelector 
                            taskId={taskId}
                            handleTagsHaveChanged={handleTagsHaveChanged}
                            tagsHaveChanged={tagsHaveChanged}
                            setFormError={setFormError}
                            isTaskEditView={true} 
                        />
                    )}

                    <PrimaryButton 
                        text={"Save"} 
                        handleSubmit={handleSubmit} 
                        isSubmitting={isSubmitting} 
                        style={{height: 40, fontSize: 15.5}}
                    />
                </ form>
            </>
        )
    );
}