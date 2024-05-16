import React, { useState } from "react";
import { columnsClient } from "../../api/columnsClient";
import { handleError } from "../../util/handleError";
import { PBInput } from "../controls/inputs/PBInput";
import { PrimaryButton } from "../controls/buttons/PrimaryButton";

export const AddColumn = ({ setFormError, setError, closeModal }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [newColumn, setNewColumn] = useState({
        boardId: null,
        userId: null,
        columnName: "",
        columnDescription: "",
    });

    const handleChange = (evt) => {
        setFormError();
        const stateToChange = {...newColumn};
        stateToChange[evt.target.name] = evt.target.value;
        setNewColumn(stateToChange);
    }

    const formIsValid = () => {
        if (newColumn.columnName.trim() === "" && newColumn.columnDescription.trim() === "") {
            setFormError("Column name and description are required.");
            return false;
        }
        else if (newColumn.columnName.trim() === "") {
            setFormError("Column name is required.");
            return false;
        }
        else if (newColumn.columnDescription.trim() === "") {
            setFormError("Column description is required.");
            return false;
        }
    }

    const handleSubmit = () => {
        if (formIsValid() === false)
            return;

        setIsSubmitting(true);

        const addColumnRequestModel = {
            userId: 1,
            boardId: 1,
            columnName: newColumn.columnName,
            columnDescription: newColumn.columnDescription,
        }
        columnsClient.addColumn(addColumnRequestModel)
            .catch(err => handleError(err, setError));
        
        setIsSubmitting(false);
        closeModal();
    }

    return (
        <form>
            <PBInput name={"columnName"} label={"Column Name"} handleChange={handleChange} />
            <PBInput name={"columnDescription"} label={"Column Description"} handleChange={handleChange} />
            <PrimaryButton text={"Submit"} handleSubmit={handleSubmit} isSubmitting={isSubmitting} />
        </ form>
    );
}