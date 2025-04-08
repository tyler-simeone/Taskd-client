import React, { useContext } from "react";
import { AppContext } from "../../../AppContextProvider";
import { DeleteButton } from "../../../controls/buttons/DeleteButton";
import { FlatButton } from "../../../controls/buttons/FlatButton";
import "./styles/ConfirmDelete.css"

export const ConfirmDelete = () => {
    const { deleteModalArgs, closeDeleteConfirmationModal } = useContext(AppContext);

    return (
        <div className="confirm-delete--container">
            <div className="confirm-delete-msg--container">
                <h3 className="confirm-delete-msg">
                    Are you sure you want to delete: <span className="resource-to-delete">{deleteModalArgs.resourceName}</span>?
                </h3>
            </div>

            <form className="confirm-delete-btns--container">
                <DeleteButton handleSubmit={deleteModalArgs.callback} />
                <FlatButton text={"Cancel"} onClick={closeDeleteConfirmationModal} style={{width: "42%", marginRight: "3%"}} />
            </form>
        </div>
    );
}