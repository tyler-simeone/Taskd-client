import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../AppContextProvider";
import { columnsClient } from "../../api/columnsClient";
import { handleError } from "../../util/handleError";
import { Input } from "../controls/inputs/Input";
import { PrimaryButton } from "../controls/buttons/PrimaryButton";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

export const EditColumn = ({ setFormError, setError, closeSideModal, handleRerender, columnId }) => {
    const { userSession } = useContext(AppContext);

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
        return true;
    }

    const handleSubmit = () => {
        setError();
        if (formIsValid() === false)
            return;

        setIsSubmitting(true);

        var editColumnRequest = {
            userId: userSession.userId,
            columnId: updatedColumn.columnId,
            columnName: updatedColumn.columnName,
            columnDescription: updatedColumn.columnDescription
        }
        columnsClient.updateColumn(editColumnRequest)
            .then(() =>  handleRerender())
            .catch(err => handleError(err, setError));
        
        setIsSubmitting(false);
        closeSideModal();
    }

    const loadColumn = () => {
        columnsClient.getColumn(columnId, userSession.userId)
            .then(column => setUpdatedColumn(column))
            .catch(err => handleError(err, setError));
    }

    useEffect(() => {
        if (updatedColumn === undefined)
            loadColumn();
    }, [updatedColumn])

    return (
        updatedColumn !== undefined ? (
            <>
                <form>
                    <Input 
                        name={"columnName"} 
                        label={"*Column Name"} 
                        handleChange={handleChange}
                        fromModal={true} 
                        value={updatedColumn.columnName}
                    />
                    <Input 
                        name={"columnDescription"} 
                        label={"Column Description"} 
                        handleChange={handleChange}
                        fromModal={true} 
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