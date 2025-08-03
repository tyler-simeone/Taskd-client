import React, { useState, useEffect, useContext, useRef } from "react";
import { AppContext } from "../../AppContextProvider";
import { columnsClient } from "../../api/columnsClient";
import { handleError } from "../../util/handleError";
import { Input } from "../../controls/inputs/Input";
import { PrimaryButton } from "../../controls/buttons/PrimaryButton";

export const AddColumn = ({ setFormError, setError, closeSideModal, handleRerender }) => {
    const { userSession, boardId, handleColumnAdded } = useContext(AppContext);

    const columnNameInputRef = useRef(null);
    const hasFocused = useRef(false);

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
        if (newColumn.columnName.trim() === "") {
            setFormError("Column name is required.");
            return false;
        }
        return true;
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();

        if (formIsValid()) {
            setIsSubmitting(true);
    
            const addColumnRequestModel = {
                userId: userSession.userId,
                boardId: boardId,
                columnName: newColumn.columnName,
                columnDescription: newColumn.columnDescription,
            }
            columnsClient.addColumn(addColumnRequestModel)
                .then(() => {
                    handleColumnAdded();
                    handleRerender();
                })
                .catch(err => handleError(err, setError));
            
            setIsSubmitting(false);
            closeSideModal();
        }
    }

    useEffect(() => {
        if (columnNameInputRef.current && !hasFocused.current) {
            columnNameInputRef.current.focus();
            columnNameInputRef.current.setSelectionRange(0, 0);
            columnNameInputRef.current.scrollLeft = 0;
            hasFocused.current = true;
        }
    }, []);

    return (
        <form>
            <Input 
                name={"columnName"}
                label={"*Column Name"}
                handleChange={handleChange}
                fromModal={true}
                ref={columnNameInputRef}
            />
            <Input name={"columnDescription"} label={"Description"} handleChange={handleChange} fromModal={true} />
            <PrimaryButton text={"Submit"} handleSubmit={evt => handleSubmit(evt)} isSubmitting={isSubmitting} />
        </ form>
    );
}