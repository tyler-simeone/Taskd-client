import React, { useState, useEffect } from "react"
import { useDrop } from 'react-dnd';
import { Column } from "../column/Column";
import { TestData } from "../../TestData";
import './styles/Board.css';

export const Board = ({ didMove, setDidMove }) => {
    const [columns, setColumns] = useState(TestData.Columns);
    
    const handleDrop = (newTask, destinationColumnId, sourceColumnId, position) => {
      const updatedColumns = [ ...columns ];

      var sourceColumnIdx = updatedColumns.findIndex(col => col.columnId === sourceColumnId);
      const sourceColumn = updatedColumns[sourceColumnIdx];
      const destinationColumn = updatedColumns.filter(col => col.columnId === destinationColumnId)[0];

      console.log("position: ", position);
      // console.log("newTask: ", newTask);
      
      if (sourceColumn.columnId === destinationColumn.columnId) {
        destinationColumn.tasks.splice(position, 0, newTask);
      }
      else 
        destinationColumn.tasks.push(newTask)

      // console.log("destinationColumn.tasks: ", destinationColumn.tasks);

      updatedColumns[updatedColumns.findIndex(col => col.columnId === destinationColumnId)] = destinationColumn;
      
      // remove from old column
      var sourceTaskIdx = sourceColumn.tasks.findIndex(col => col.taskId === newTask.taskId);
      sourceColumn.tasks.splice(sourceTaskIdx, 1);
      updatedColumns[sourceColumnIdx] = sourceColumn;

      setColumns(updatedColumns);
    };

    const useCustomDrop = (destinationColumnId) => {
      return useDrop({
        accept: 'CARD',
        hover: (item, monitor) => {
          // Called when a draggable item is hovered over the drop target
          // Perform any hover-related actions here
          setDidMove(true);
        },
        drop: (draggedItem, monitor) => {
          const { task, sourceColumnId } = draggedItem;
          console.log("draggedItem: ", draggedItem);

          // const draggedPosition = monitor.didDrop() ? monitor.getDropResult().index : columns.filter(col => col.columnId === sourceColumnId).length;
          handleDrop(task, destinationColumnId, sourceColumnId);
          
          columns.forEach(c => console.log("from within drop hook... ", c.tasks.length));
          console.log("monitor.didDrop(): ", monitor.didDrop());
          console.log("monitor.getDropResult(): ", monitor.getDropResult());  
        },
        collect: monitor => ({
          isOver: !!monitor.isOver(),
          canDrop: !!monitor.canDrop(),
          didDrop: monitor.didDrop(),
          dropResult: monitor.getDropResult(),
        }),
      });
    };

    useEffect(() => {
      // columns.forEach(c => console.log("rerendering... ", c.tasks.length));
    }, [columns]);

    return (
        <div className="board--container">
            <div className="board">
                {columns.map(column => (
                    <Column 
                      key={column.columnId} 
                      column={column} 
                      useCustomDrop={useCustomDrop} 
                      didMove={didMove}
                    />
                ))}
            </div>
        </div>
    );
}

