import React, { useState, useEffect } from "react"
import { Task } from "../task/Task";
import { TestData } from "../../TestData";
import './styles/Column.css';

export const Column = ({ column }) => {

    useEffect(() => {
        console.log("column: ", column);
        console.log("column.tasks: ", column.tasks);
    })

    return (
        <div className="column--container">
            <div className="column-header--container">
                <h3 className="column-header">{column.columnName}</h3>
            </div>

            <div className="column--body">
                {column.tasks.map(task => <Task task={task} />)}
            </div>  
        </div>
    );
}

