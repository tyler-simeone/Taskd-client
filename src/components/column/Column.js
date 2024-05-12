import React, { useState, useEffect } from "react"
import { Task } from "../task/Task";
import './styles/Column.css';

export const Column = ({ column, useCustomDrop, didMove }) => {
    const [{ isHover, isOver, canDrop, didDrop, dropResult }, drop] = useCustomDrop(column.columnId);

    useEffect(() => {
        console.log("isHover, isOver, canDrop: ", isHover, isOver, canDrop);
        console.log("didDrop, dropResult: ", didDrop, dropResult);
    }, [isOver]);

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
                        didMove={didMove}
                    />
                ))}
            </div>
        </div>
    );
}

