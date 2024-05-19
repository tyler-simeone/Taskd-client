import React, { useContext } from "react";
import { AppContext } from "../../../AppContextProvider";
import { DeleteButton } from "../../controls/buttons/DeleteButton";
import { CancelButton } from "../../controls/buttons/CancelButton";
import "./ConfirmDelete.css"

export const ConfirmDelete = () => {
    const { deleteMessage, setDeleteConfirmed } = useContext(AppContext);

    const handleDelete = () => setDeleteConfirmed(true);

    return (
        <div className="confirm-delete--container">
            <div className="confirm-delete-msg--container">
                <h3 className="confirm-delete-msg">{deleteMessage}</h3>
            </div>

            <form className="confirm-delete-btns--container">
                <DeleteButton text={"Delete"} handleSubmit={handleDelete} />
                <CancelButton />
            </form>
        </div>
    );
}