import React, { useState, useEffect } from "react"
import { Task } from "../task/Task";
import './styles/Column.css';

export const Column = ({ column, useCustomDrop }) => {
    const [{ isHover }, drop] = useCustomDrop(column.columnId);

    return (
        <div key={column.columnId} className="column--container">
            <div className="column-header--container">
                <h3 className="column-header">{column.columnName}</h3>
            </div>

            <div ref={drop} style={{ backgroundColor: isHover ? 'lightgray' : 'white'}} className="column--body">
                {column.tasks.map((task, index) => (
                    <Task 
                        key={task.taskId} 
                        index={index}
                        id={task.taskId} 
                        task={task} 
                        sourceColumnId={column.columnId}
                    />
                ))}
            </div>
        </div>
    );
}

