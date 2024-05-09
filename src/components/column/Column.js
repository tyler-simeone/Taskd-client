import React, { useState, useEffect } from "react"
import { Task } from "../task/Task";
import './styles/Column.css';

export const Column = ({ column, useCustomDrop }) => {
    const [{ isHover }, drop] = useCustomDrop(column.columnName);

    return (
        <div key={column.columnName} className="column--container">
            <div className="column-header--container">
                <h3 className="column-header">{column.columnName}</h3>
            </div>

            <div ref={drop} style={{ backgroundColor: isHover ? 'lightgray' : 'white'}} className="column--body">
                {column.tasks.map(task => (
                    <Task 
                        key={task.taskId} 
                        id={task.taskId} 
                        task={task} 
                        sourceColumnId={column.columnId}
                    />
                ))}
            </div>
        </div>
    );
}

