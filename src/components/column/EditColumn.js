import React, { useState, useEffect } from "react";
import { columnsClient } from "../../api/columnsClient";
import { handleError } from "../../util/handleError";
import { PBInput } from "../controls/inputs/PBInput";
import { PrimaryButton } from "../controls/buttons/PrimaryButton";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

export const EditColumn = ({ setFormError, setError, closeModal, handleRerender, columnId }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [updatedColumn, setUpdatedColumn] = useState();

    const handleChange = (evt) => {
        setFormError();
        const stateToChange = {...updatedColumn};
        stateToChange[evt.target.name] = evt.target.value;
        setUpdatedColumn(stateToChange);
    }

    const formIsValid = () => {
        if (updatedColumn.columnName.trim() === "" && updatedColumn.columnDescription.trim() === "") {
            setFormError("Column name and description are required.");
            return false;
        }
        else if (updatedColumn.columnName.trim() === "") {
            setFormError("Column name is required.");
            return false;
        }
        else if (updatedColumn.columnDescription.trim() === "") {
            setFormError("Column description is required.");
            return false;
        }
    }

    const handleSubmit = () => {
        setError();
        if (formIsValid() === false)
            return;

        setIsSubmitting(true);

        var editColumnRequest = {
            userId: 1,
            columnId: updatedColumn.columnId,
            columnName: updatedColumn.columnName,
            columnDescription: updatedColumn.columnDescription
        }
        columnsClient.updateColumn(editColumnRequest)
            .then(() =>  handleRerender())
            .catch(err => handleError(err, setError));
        
        setIsSubmitting(false);
        closeModal();
    }

    const loadColumn = () => {
        columnsClient.getColumn(columnId, 1)
            .then(column => {
                // const columnState = {...updatedColumn};
                // columnState.userId = 1;
                // columnState.columnId = column.columnId;
                // columnState.columnName = column.columnName;
                // columnState.columnDescription = column.columnDescription;
                setUpdatedColumn(column);
            })
            .catch(err => handleError(err, setError));
    }

    useEffect(() => {
        console.log("updatedColumn: ", updatedColumn);
        console.log("columnId: ", columnId);
        if (updatedColumn === undefined)
            loadColumn();
    }, [updatedColumn])

    return (
        updatedColumn !== undefined ? (
            <>
                <form>
                    <PBInput 
                        name={"columnName"} 
                        label={"Column Name"} 
                        handleChange={handleChange} 
                        value={updatedColumn.columnName}
                    />
                    <PBInput 
                        name={"columnDescription"} 
                        label={"Column Description"} 
                        handleChange={handleChange} 
                        value={updatedColumn.columnDescription}
                    />
                    <PrimaryButton 
                        text={"Submit"} 
                        handleSubmit={handleSubmit} 
                        isSubmitting={isSubmitting} 
                    />
                </ form>
            </>
        ) : null
    );
}