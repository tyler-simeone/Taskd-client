import React, { useState, useEffect } from "react"
import { tasksClient } from "../../api/tasksClient";
import { handleError } from "../../util/handleError";
import { Task } from "../task/Task";
import AddIcon from '@mui/icons-material/Add';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import './styles/ColumnAddTemplate.css';

export const ColumnAddTemplate = ({ openAddColumnModal }) => {

    return (
        <div key={-1} className="add-column-template--container">
            <div className="column-header--container">
                <div className="more-icon--container"><MoreHorizIcon className="more-icon" /></div>
                <h3 className="column-header">Add new column</h3>
                <div className="add-task-icon--container" onClick={openAddColumnModal} ><AddIcon className="add-task-icon" /></div>
            </div>

            <div className="column--body">
            </div>
        </div>
    );
}

