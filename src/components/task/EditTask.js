import React, { useState } from "react";
import { PBInput } from "../controls/inputs/PBInput";
import { PrimaryButton } from "../controls/buttons/PrimaryButton";
import { TestData } from "../../TestData";

export const EditTask = ({ setFormError, task }) => {
    console.log("Hello from EditTask");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editTask, setEditTask] = useState(task);

    const handleChange = (evt) => {
        setFormError();

        const stateToChange = {...editTask};
        stateToChange[evt.target.name] = evt.target.value;
        setEditTask(stateToChange);
    }

    const validateForm = () => {
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
        if (!validateForm())
            return;

        setIsSubmitting(true);
        console.log("Sending data! ", editTask);
        var taskToEditIdx = TestData.Columns[0].tasks.indexOf(task => task.taskId === editTask.taskId);
        TestData.Columns[0].tasks[taskToEditIdx] = editTask;
        setIsSubmitting(false);
    }

    return (
        task !== undefined ? (
            <form>
                <PBInput 
                    name={"taskName"} 
                    label={"Task Name"} 
                    handleChange={handleChange} 
                    value={task.taskName}
                />
                <PBInput 
                    name={"taskDescription"} 
                    label={"Task Description"} 
                    handleChange={handleChange} 
                    value={task.taskDescription}
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