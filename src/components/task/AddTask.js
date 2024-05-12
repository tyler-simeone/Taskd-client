import React, { useState } from "react";
import { PBInput } from "../controls/inputs/PBInput";

export const AddTask = ({  }) => {
    const [newTask, setNewTask] = useState({
        taskName: "",
        taskDescription: "",
    });

    const handleChange = (evt) => {
        const stateToChange = {...newTask};
        stateToChange[evt.target.name] = evt.target.value;
        console.log("stateToChange: ", stateToChange);
        setNewTask(stateToChange);
    }

    return (
        <>
            <PBInput name={"taskName"} label={"Task Name"} handleChange={handleChange} />
            <PBInput name={"taskDescription"} label={"Task Description"} handleChange={handleChange} />
        </>
    );
}