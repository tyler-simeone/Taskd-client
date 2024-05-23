import React, { useEffect, useState } from "react";
import { tasksClient } from "../../api/tasksClient";
import { handleError } from "../../util/handleError";
import { PBInput } from "../controls/inputs/PBInput";
import { PrimaryButton } from "../controls/buttons/PrimaryButton";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import "./styles/EditTask.css"

export const EditTask = ({ taskId, setFormError, openViewTaskModal, setError, setSuccess, handleRerender }) => {
    const [isLoading, setIsLoading] = useState(false);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editTask, setEditTask] = useState();

    const loadTask = () => {
        setError();
        setIsLoading(true);
        tasksClient.getTask(taskId, 1)
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
        if (editTask.taskName.trim() === "" && editTask.taskDescription.trim() === "") {
            setFormError("Task name and description are required.");
            return false;
        }
        else if (editTask.taskName.trim() === "") {
            setFormError("Task name is required.");
            return false;
        }
        else if (editTask.taskDescription.trim() === "") {
            setFormError("Task description is required.");
            return false;
        }
    }

    const handleSubmit = () => {
        if (formIsValid() === false)
            return;

        setIsSubmitting(true);

        const editTaskRequestModel = {
            userId: 1,
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

    useEffect(() => {
        if (editTask === undefined)
            loadTask();
    }, [editTask])

    return (
        editTask !== undefined ? (
            <>
                <KeyboardBackspaceIcon className="update-task-return-arrow" onClick={() => openViewTaskModal(editTask.taskId, editTask.taskName)} />

                <form>
                    <PBInput 
                        name={"taskName"} 
                        label={"Task Name"} 
                        handleChange={handleChange} 
                        value={editTask.taskName}
                    />
                    <PBInput 
                        name={"taskDescription"} 
                        label={"Task Description"} 
                        handleChange={handleChange} 
                        value={editTask.taskDescription}
                    />
                    <PrimaryButton 
                        text={"Submit"} 
                        handleSubmit={handleSubmit} 
                        isSubmitting={isSubmitting} 
                    />
                </ form>
            </>
        ) : null
    );
}