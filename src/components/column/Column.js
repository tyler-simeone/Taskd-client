import React, { useState, useEffect } from "react"
import DropContainer from "../controls/features/DropContainer/DropContainer";
import { Task } from "../task/Task";
import { TestData } from "../../TestData";
import './styles/Column.css';

export const Column = ({ key, column, onDrop }) => {

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
                <DropContainer onDrop={(id) => onDrop(id, column.id)}>
                    {column.tasks.map(task => <Task key={task.taskId} id={task.taskId} task={task} />)}
                </DropContainer>
                </div>  
        </div>
    );
}

