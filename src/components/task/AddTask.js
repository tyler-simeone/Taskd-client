import React, { useState, useContext } from "react";
import { AppContext } from "../../AppContextProvider";
import { tasksClient } from "../../api/tasksClient";
import { handleError } from "../../util/handleError";
import { Input } from "../controls/inputs/Input";
import { PrimaryButton } from "../controls/buttons/PrimaryButton";

export const AddTask = ({ setFormError, setError, closeSideModal, columnId, handleRerender }) => {
    const { userSession } = useContext(AppContext);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [newTask, setNewTask] = useState({
        taskId: null,
        taskName: "",
        taskDescription: "",
    });

    const handleChange = (evt) => {
        setFormError();
        const stateToChange = {...newTask};
        stateToChange[evt.target.name] = evt.target.value;
        setNewTask(stateToChange);
    }

    const formIsValid = () => {
        if (newTask.taskName.trim() === "" && newTask.taskDescription.trim() === "") {
            setFormError("Task name and description are required.");
            return false;
        }
        else if (newTask.taskName.trim() === "") {
            setFormError("Task name is required.");
            return false;
        }
        else if (newTask.taskDescription.trim() === "") {
            setFormError("Task description is required.");
            return false;
        }
    }

    const handleSubmit = () => {
        if (formIsValid() === false)
            return;

        setIsSubmitting(true);

        const addTaskRequestModel = {
            userId: userSession.userId,
            columnId: columnId,
            taskName: newTask.taskName,
            taskDescription: newTask.taskDescription,
        }
        tasksClient.createTask(addTaskRequestModel)
            .then(() => handleRerender())
            .catch(err => handleError(err, setError));
        
        setIsSubmitting(false);
        closeSideModal();
    }

    return (
        <form>
            <Input name={"taskName"} label={"*Task Name"} handleChange={handleChange} fromModal={true} />
            <Input name={"taskDescription"} label={"*Task Description"} handleChange={handleChange} fromModal={true} />
            <PrimaryButton text={"Submit"} handleSubmit={handleSubmit} isSubmitting={isSubmitting} />
        </ form>
    );
}