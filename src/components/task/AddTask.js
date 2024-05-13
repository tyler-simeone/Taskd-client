import React, { useState } from "react";
import { tasksClient } from "../../api/tasksClient";
import { handleError } from "../../util/handleError";
import { PBInput } from "../controls/inputs/PBInput";
import { PrimaryButton } from "../controls/buttons/PrimaryButton";
import { TestData } from "../../TestData";

export const AddTask = ({ setFormError }) => {
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

        // console.log("Sending data! ", newTask);
        // TestData.Columns[0].tasks.push(newTask);

        const addTaskRequestModel = {
            userId: 1,
            columnId: 1,
            taskName: newTask.taskName,
            taskDescription: newTask.taskDescription,
        }
        tasksClient.createTask(addTaskRequestModel)
            .catch(err => setFormError(err));
        
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