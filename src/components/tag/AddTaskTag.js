import React from "react";
import { AddIcon } from "../../controls/icons/AddIcon";
import "./styles/AddTaskTag.css"

export const AddTaskTag = ({ onClick, isAddNewTag }) => {
    return (
        <div className="add-task-tag--container" onClick={onClick}>
            <p className="add-task-tag--lbl">{!isAddNewTag ? "Add Tag" : "New Tag"}</p>

            <AddIcon classname={`task-tag ${isAddNewTag && 'new-tag'}`} />
        </div>
    );
}