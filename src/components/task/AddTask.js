import React, { useState } from "react";
import { PBInput } from "../controls/inputs/PBInput";
import { PrimaryButton } from "../controls/buttons/PrimaryButton";
import { TestData } from "../../TestData";

export const AddTask = ({ formError, setFormError }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [newTask, setNewTask] = useState({
        taskId: null,
        taskName: "",
        taskDescription: "",
    });

    const handleChange = (evt) => {
        setFormError();
        const stateToChange = {...newTask};

        var sortedTestTasks = TestData.Columns[0].tasks.sort((a ,b) => a.id - b.id);
        var mostRecentTask = sortedTestTasks[sortedTestTasks.length - 1];
        stateToChange.taskId = mostRecentTask.taskId + 1;

        stateToChange[evt.target.name] = evt.target.value;
        setNewTask(stateToChange);
    }

    const handleSubmit = () => {
        if ((newTask.taskName === "" || newTask.taskName === null) && (newTask.taskDescription === "" || newTask.taskDescription === null))
            setFormError("Task name and description are required.");
        else if (newTask.taskName === "" || newTask.taskName === null)
            setFormError("Task name is required.");
        else if (newTask.taskDescription === "" || newTask.taskDescription === null)
            setFormError("Task description is required.");

        setIsSubmitting(true);
        console.log("Sending data! ", newTask);
        TestData.Columns[0].tasks.push(newTask);
        setIsSubmitting(false);
    }

    return (
        <form>
            <PBInput name={"taskName"} label={"Task Name"} handleChange={handleChange} />
            <PBInput name={"taskDescription"} label={"Task Description"} handleChange={handleChange} />
            <PrimaryButton text={"Submit"} handleSubmit={handleSubmit} isSubmitting={isSubmitting} />
        </ form>
    );
}