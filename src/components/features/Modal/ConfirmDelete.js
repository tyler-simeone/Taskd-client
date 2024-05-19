import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../../../AppContextProvider";
import { DeleteButton } from "../../controls/buttons/DeleteButton";
import { CancelButton } from "../../controls/buttons/CancelButton";
import "./ConfirmDelete.css"

export const ConfirmDelete = ({ deleteHandler }) => {
    const { closeDeleteConfirmationModal, modalHeader } = useContext(AppContext);

    const [confirmDelete, setConfirmDelete] = useState(false);

    const handleDelete = () => setConfirmDelete(true);

    useEffect(() => {
        if (confirmDelete === true)
            closeDeleteConfirmationModal();
    }, [confirmDelete])

    return (
        <div className="confirm-delete--container">
            <div className="confirm-delete-msg--container">
                <p>{modalHeader}</p>

                <div className="confirm-delete-btns--container">
                    <DeleteButton handleSubmit={handleDelete} />
                    <CancelButton />
                </div>
            </div>
        </div>
    );
}