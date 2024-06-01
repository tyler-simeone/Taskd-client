import React, { useState, useContext } from "react";
import { AppContext } from "../../AppContextProvider";
import { columnsClient } from "../../api/columnsClient";
import { handleError } from "../../util/handleError";
import { Input } from "../controls/inputs/Input";
import { PrimaryButton } from "../controls/buttons/PrimaryButton";
import { boardsClient } from "../../api/boardClient";

export const AddBoard = ({ setFormError, setError, closeSideModal, handleRerender }) => {
    const { userSession, boardId } = useContext(AppContext);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [newBoard, setNewBoard] = useState({
        boardId: null,
        userId: null,
        boardName: "",
        boardDescription: "",
    });

    const handleChange = (evt) => {
        setFormError();
        const stateToChange = {...newBoard};
        stateToChange[evt.target.name] = evt.target.value;
        setNewBoard(stateToChange);
    }

    const formIsValid = () => {
        if (newBoard.boardName.trim() === "" && newBoard.boardDescription.trim() === "") {
            setFormError("Board name and description are required.");
            return false;
        }
        else if (newBoard.boardName.trim() === "") {
            setFormError("Board name is required.");
            return false;
        }
        else if (newBoard.boardDescription.trim() === "") {
            setFormError("Board description is required.");
            return false;
        }
    }

    const handleSubmit = () => {
        if (formIsValid() === false)
            return;

        setIsSubmitting(true);

        const addBoardRequestModel = {
            userId: userSession.userId,
            boardName: newBoard.boardName,
            boardDescription: newBoard.boardDescription,
        }
        boardsClient.addBoard(addBoardRequestModel)
            .then(() => handleRerender())
            .catch(err => handleError(err, setError));
        
        setIsSubmitting(false);
        closeSideModal();
    }

    return (
        <form>
            <Input name={"boardName"} label={"Board Name"} handleChange={handleChange} />
            <Input name={"boardDescription"} label={"Board Description"} handleChange={handleChange} />
            <PrimaryButton text={"Submit"} handleSubmit={handleSubmit} isSubmitting={isSubmitting} />
        </ form>
    );
}