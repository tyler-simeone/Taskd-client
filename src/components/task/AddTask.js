import React, { useState, useContext } from "react";
import { AppContext } from "../../AppContextProvider";
import { tasksClient } from "../../api/tasksClient";
import { handleError } from "../../util/handleError";
import { Input } from "../../controls/inputs/Input";
import { PrimaryButton } from "../../controls/buttons/PrimaryButton";
import { TextArea } from "../../controls/inputs/TextArea";
import { TagSelector } from "../tag/TagSelector";
import { AddTaskTag } from "../tag/AddTaskTag";

export const AddTask = ({ setFormError, setError, closeSideModal, columnId, handleRerender }) => {
    const { userSession } = useContext(AppContext);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showTagSelector, setShowTagSelector] = useState(false);
    const [newTask, setNewTask] = useState({
        taskId: null,
        taskName: "",
        taskDescription: "",
    });
    const [tagId, setTagId] = useState();

    const handleChange = (evt) => {
        const stateToChange = {...newTask};
        stateToChange[evt.target.name] = evt.target.value;
        setNewTask(stateToChange);
    }

    const formIsValid = () => {
        if (newTask.taskName.trim() === "") {
            setFormError("Task name is required.");
            return false;
        }
        return true;
    }

    const handleShowTagSelector = () => setShowTagSelector(true);

    const handleSubmit = (evt) => {
        evt.preventDefault();

        if (formIsValid()) {   
            setFormError(); 
            setIsSubmitting(true);
    
            const addTaskRequestModel = {
                userId: userSession.userId,
                columnId: columnId,
                taskName: newTask.taskName,
                taskDescription: newTask.taskDescription,
                tagId: tagId ? tagId : null
            };
    
            tasksClient.createTask(addTaskRequestModel)
                .then(() => handleRerender())
                .catch(err => handleError(err, setError));
            
            setIsSubmitting(false);
            closeSideModal();
        }
    }

    return (
        <form>
            <Input 
                name={"taskName"} 
                label={"*Task Name"} 
                handleChange={handleChange} 
                fromModal={true} 
            />

            <TextArea 
                name={"taskDescription"} 
                label={"Description"} 
                handleChange={handleChange} 
                fromModal={true} 
            />

            {/* {!showTagSelector && <AddTaskTag onClick={handleShowTagSelector} />} */}

            {/* {showTagSelector && <TagSelector setTagId={setTagId} setFormError={setFormError} />} */}

            <PrimaryButton 
                text={"Submit"} 
                handleSubmit={handleSubmit} 
                isSubmitting={isSubmitting} 
            />
        </ form>
    );
}