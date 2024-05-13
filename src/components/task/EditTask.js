import React, { useEffect, useState } from "react";
import { tasksClient } from "../../api/tasksClient";
import { handleError } from "../../util/handleError";
import { PBInput } from "../controls/inputs/PBInput";
import { PrimaryButton } from "../controls/buttons/PrimaryButton";
import { TestData } from "../../TestData";

export const EditTask = ({ taskId, setFormError, openViewTaskModal, setError }) => {
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
        console.log("task being edited... ", editTask);
        setEditTask(stateToChange);
    }

    const formIsValid = () => {
        if (editTask.taskName.trim() === "" && editTask.taskDescription.trim() === "") {
            console.log("hi")
            setFormError("Task name and description are required.");
            return false;
        }
        else if (editTask.taskName.trim() === "") {
            console.log("hiii")
            setFormError("Task name is required.");
            return false;
        }
        else if (editTask.taskDescription.trim() === "") {
            console.log("hiiiiii")
            setFormError("Task description is required.");
            return false;
        }
    }

    const handleSubmit = () => {
        if (formIsValid() === false) {
            return;
        }

        setIsSubmitting(true);
        console.log("Sending data! ", editTask);
        var taskToEditIdx = TestData.Columns[0].tasks.indexOf(task => task.taskId === editTask.taskId);
        TestData.Columns[0].tasks[taskToEditIdx] = editTask;
        setIsSubmitting(false);
        openViewTaskModal(editTask);
    }

    useEffect(() => {
        if (editTask === undefined)
            loadTask();
    }, [editTask])

    return (
        editTask !== undefined ? (
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
        ) : null
    );
}