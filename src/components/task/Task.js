import React, { useEffect } from "react";
import { useDrag } from 'react-dnd';
import "./Task.css"

export const Task = ({ id, task }) => {
    const [{ isDragging }, drag] = useDrag({
        type: 'CARD',
        item: id,
        collect: monitor => ({
          isDragging: !!monitor.isDragging(),
        }),
      });

    return (
        // task !== undefined ? (
            <div 
                className="task--container"
                ref={drag}
                style={{
                    opacity: isDragging ? 0.5 : 1,
                    cursor: 'move',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    padding: '10px',
                    marginBottom: '10px',
                    backgroundColor: 'white',
                }}
            >
                <div>
                    <h4 className="task-title">{task.taskName}</h4>
                </div>
                <div>
                    <p className="task-description">{task.taskDescription}</p>
                </div>
            </div>
        // ) : null
    );
}