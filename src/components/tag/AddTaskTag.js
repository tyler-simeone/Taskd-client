import React from "react";
import { AddIcon } from "../../controls/icons/AddIcon";
import "./styles/AddTaskTag.css"

export const AddTaskTag = ({ onClick, isAddNewTag }) => {
    return (
        <div className={`add-task-tag--container ${isAddNewTag && 'new-tag'}`} onClick={onClick}>
            <p className="add-task-tag--lbl">{!isAddNewTag ? "Add Tag" : "Add New Tag"}</p>

            <AddIcon classname={`task-tag ${isAddNewTag && 'new-tag'}`} />
        </div>
    );
}