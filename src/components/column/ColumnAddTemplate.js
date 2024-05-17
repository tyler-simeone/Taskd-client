import React, { useState, useEffect } from "react"
import { tasksClient } from "../../api/tasksClient";
import { handleError } from "../../util/handleError";
import { Task } from "../task/Task";
import AddIcon from '@mui/icons-material/Add';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import './styles/ColumnAddTemplate.css';

export const ColumnAddTemplate = ({ openAddColumnModal }) => {

    return (
        <div key={-1} className="add-column-template--container" onClick={openAddColumnModal}>
            <div className="add-column-template--body">
                <h2 className="column-header" style={{fontSize: 22}}>Add new column</h2>
                <div className="add-column-template-icon--container" ><AddIcon className="add-column-icon" /></div>
            </div>
        </div>
    );
}
