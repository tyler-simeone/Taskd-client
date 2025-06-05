import React from "react";
import { AddIcon } from "../../controls/icons/AddIcon";
import "./styles/AddTaskTag.css"

export const AddTaskTag = ({ onClick }) => {
    return (
        <div className="add-task-tag--container" onClick={onClick}>
            <p className="add-task-tag--lbl">Add Tag</p>

            <AddIcon classname={"task-tag"} />
        </div>
    );
}