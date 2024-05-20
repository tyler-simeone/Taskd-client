import React, { useContext } from "react";
import { AppContext } from "../../../AppContextProvider";
import { DeleteButton } from "../../controls/buttons/DeleteButton";
import { CancelButton } from "../../controls/buttons/CancelButton";
import "./styles/ConfirmDelete.css"

export const ConfirmDelete = () => {
    const { deleteModalArgs, closeDeleteConfirmationModal } = useContext(AppContext);

    return (
        <div className="confirm-delete--container">
            <div className="confirm-delete-msg--container">
                <h3 className="confirm-delete-msg">
                    Are you sure you want to delete <span className="resource-to-delete">{deleteModalArgs.resourceName}</span>?
                </h3>
            </div>

            <form onSubmit={deleteModalArgs.callback} className="confirm-delete-btns--container">
                <DeleteButton text={"Delete"} />
                <CancelButton handleCancel={closeDeleteConfirmationModal} />
            </form>
        </div>
    );
}