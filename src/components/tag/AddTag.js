import React, { useState, useContext } from "react";
import { AppContext } from "../../AppContextProvider";
import { handleError } from "../../util/handleError";
import { Input } from "../../controls/inputs/Input";
import { PrimaryButton } from "../../controls/buttons/PrimaryButton";
import { TextArea } from "../../controls/inputs/TextArea";
import { tagsClient } from "../../api/tagsClient";

export const AddTag = ({ setFormError, setError, closeSideModal, handleRerender }) => {
    const { userSession, boardId } = useContext(AppContext);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [newTag, setNewTag] = useState({
        tagName: ""
    });

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
    
            const payload = {
                tagName: newTag.tagName,
                boardId: boardId,
                userId: userSession.userId
            };

            try {
                var newTagId = await tagsClient.createTag(payload);
                if (newTagId)
                    handleRerender();
            } catch (err) {
                handleError(err, setError)
            }
            
            setIsSubmitting(false);
            closeSideModal();
        }
    }

    return (
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
        </ form>
    );
}