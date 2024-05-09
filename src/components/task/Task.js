import React, { useEffect } from "react";
import { useDrag } from 'react-dnd';
import "./Task.css"

export const Task = ({ task, sourceColumnId, index }) => {
    const [{ isDragging }, drag] = useDrag({
        type: 'CARD',
        item: { task, sourceColumnId, index },
        collect: monitor => ({
          isDragging: !!monitor.isDragging(),
        }),
      });

    return (
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
    );
}