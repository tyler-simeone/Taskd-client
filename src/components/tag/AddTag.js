import React, { useState, useContext } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { AppContext } from "../../AppContextProvider";
import { handleError } from "../../util/handleError";
import { Input } from "../../controls/inputs/Input";
import { PrimaryButton } from "../../controls/buttons/PrimaryButton";
import { tagsClient } from "../../api/tagsClient";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

export const AddTag = ({ setFormError, setError, closeSideModal, handleRerender }) => {
    const { userSession,
            boardId,
            taskId,
            isAddTagFromEditTask,
            openEditTaskModal } = useContext(AppContext);

    const navigate = useNavigate();
    const useQuery = () => new URLSearchParams(useLocation().search);
    const query = useQuery();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [newTag, setNewTag] = useState({
        tagName: ""
    });

    const handleRedirectToTaskView = () => {
        const taskId = query.get("taskId");
        if (taskId) {
            openEditTaskModal(taskId);
        }
    }

    const handleChange = (evt) => {
        const stateToChange = {...newTag};
        stateToChange[evt.target.name] = evt.target.value;
        setNewTag(stateToChange);
    }

    const formIsValid = () => {
        if (newTag.tagName.trim().length === 0) {
            setFormError("Tag name is required.");
            return false;
        }
        return true;
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault();

        if (formIsValid()) {   
            setFormError(); 
            setIsSubmitting(true);
    
            const addTagPayload = {
                tagName: newTag.tagName,
                boardId: boardId,
                userId: userSession.userId
            };

            try {
                var newTagId = await tagsClient.createTag(addTagPayload);

                if (isAddTagFromEditTask) {
                    const addTagTaskPayload = {
                        userId: userSession.userId,
                        boardId: boardId,
                        taskId: taskId,
                        tagId: newTagId
                    }
                    var resp = await tagsClient.addTagToTask(addTagTaskPayload);
                }

                if (newTagId)
                    handleRerender();
            } catch (err) {
                handleError(err, setError)
            }
            
            setIsSubmitting(false);
            console.log("isAddTagFromEditTask: ", isAddTagFromEditTask);
            if (isAddTagFromEditTask) {
                handleRedirectToTaskView();
            } else {
                closeSideModal();
                navigate('/board');
            }
        }
    }

    return (
        <>
            {isAddTagFromEditTask && (
                <KeyboardBackspaceIcon 
                    className="update-task-return-arrow"
                    onClick={handleRedirectToTaskView}
                />
            )}

            <form>
                <Input 
                    name={"tagName"} 
                    label={"*Tag Name"} 
                    handleChange={handleChange} 
                    fromModal={true} 
                />

                {/* <TextArea 
                    name={"tagDescription"} 
                    label={"Tag Description"} 
                    handleChange={handleChange} 
                    fromModal={true} 
                /> */}

                <PrimaryButton 
                    text={"Submit"} 
                    handleSubmit={handleSubmit} 
                    isSubmitting={isSubmitting} 
                />
            </form>
        </>
    );
}