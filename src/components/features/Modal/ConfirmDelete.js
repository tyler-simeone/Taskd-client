import React, { useContext } from "react";
import { AppContext } from "../../../AppContextProvider";
import { DeleteButton } from "../../controls/buttons/DeleteButton";
import { CancelButton } from "../../controls/buttons/CancelButton";
import "./ConfirmDelete.css"

export const ConfirmDelete = () => {
    const { resourceToDelete, setDeleteConfirmed } = useContext(AppContext);

    const handleDelete = () => setDeleteConfirmed(true);

    return (
        <div className="confirm-delete--container">
            <div className="confirm-delete-msg--container">
                <h3 className="confirm-delete-msg">Are you sure you want to delete <span className="resource-to-delete">{resourceToDelete}</span></h3>
            </div>

            <form onSubmit={handleDelete} className="confirm-delete-btns--container">
                <DeleteButton text={"Delete"} />
                <CancelButton />
            </form>
        </div>
    );
}