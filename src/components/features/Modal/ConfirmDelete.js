import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../../../AppContextProvider";
import "./ConfirmDelete.css"

export const ConfirmDelete = ({ deleteHandler }) => {
    const [confirmDelete, setConfirmDelete] = useState(false);

    const handleDelete = () => setConfirmDelete(true);

    useEffect(() => {

    }, [confirmDelete])

    return (
        <div className="confirm-delete--container">

        </div>
    );
}